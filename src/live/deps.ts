import type { Expr, Param, Stmt } from './ast.ts'

type CollectOpts = {
  systemVars: Set<string>
}

function collectParamNames(params: Param[]): Set<string> {
  const names = new Set<string>()
  for (const p of params) {
    if (p.type === 'param') {
      names.add(p.name)
    }
    else if (p.type === 'param-destructure') {
      for (const n of p.names) names.add(n)
    }
    else if (p.type === 'param-named-destructure') {
      names.add(p.paramName)
      for (const n of p.names) names.add(n)
    }
  }
  return names
}

export function collectClosureVarNames(
  fnExpr: Extract<Expr, { type: 'fn' }>,
  outerLocals: Array<Map<string, unknown>>,
  opts: CollectOpts,
): string[] {
  if (outerLocals.length === 0) return []
  const out = new Set<string>()
  const params = collectParamNames(fnExpr.params)
  let outerLocalNames: Set<string> | null = null

  const hasOuterLocalName = (name: string): boolean => {
    if (outerLocalNames === null) {
      const names = new Set<string>()
      for (let i = 0; i < outerLocals.length; i++) {
        for (const key of outerLocals[i]!.keys()) names.add(key)
      }
      outerLocalNames = names
    }
    return outerLocalNames.has(name)
  }

  const maybeCapture = (name: string): void => {
    if (params.has(name) || opts.systemVars.has(name)) return
    if (hasOuterLocalName(name)) out.add(name)
  }

  const walkExpr = (e: Expr): void => {
    switch (e.type) {
      case 'number':
      case 'string':
        return
      case 'identifier':
        maybeCapture(e.name)
        return
      case 'array':
        for (const it of e.items) walkExpr(it)
        return
      case 'object':
        for (const entry of e.entries) walkExpr(entry.value)
        return
      case 'index':
        walkExpr(e.object)
        walkExpr(e.index)
        return
      case 'member':
        walkExpr(e.object)
        return
      case 'unary':
        walkExpr(e.expr)
        return
      case 'binary':
        walkExpr(e.left)
        walkExpr(e.right)
        return
      case 'ternary':
        walkExpr(e.test)
        walkExpr(e.then)
        walkExpr(e.else)
        return
      case 'call':
        walkExpr(e.callee)
        for (let i = 0; i < e.args.length; i++) walkExpr(e.args[i]!.value)
        return
      case 'assign':
        if (e.left.type === 'identifier') {
          walkExpr(e.right)
          if (e.op !== ':=') maybeCapture(e.left.name)
          return
        }
        if (e.left.type === 'destructure') {
          // For destructuring assignments, check each name in the pattern
          walkExpr(e.right)
          for (const name of e.left.names) {
            if (e.op !== ':=') maybeCapture(name)
          }
          return
        }
        walkExpr(e.left)
        walkExpr(e.right)
        return
      case 'destructure':
        // Destructure patterns don't have child expressions to walk
        return
      case 'fn':
        // Recurse into nested function body so we capture outer vars it closes over.
        if (e.body.type === 'block') walkStmt(e.body)
        else walkExpr(e.body)
        return
      case 'switch':
        walkExpr(e.test)
        for (const c of e.cases) {
          if (c.test) walkExpr(c.test)
          for (const st of c.body) walkStmt(st)
        }
        return
    }
  }

  const walkStmt = (s: Stmt): void => {
    switch (s.type) {
      case 'expr':
        walkExpr(s.expr)
        return
      case 'block':
        for (const it of s.body) walkStmt(it)
        return
      case 'if':
        walkExpr(s.test)
        walkStmt(s.then)
        if (s.else) walkStmt(s.else)
        return
      case 'while':
        walkExpr(s.test)
        walkStmt(s.body)
        return
      case 'do':
        walkStmt(s.body)
        walkExpr(s.test)
        return
      case 'for':
        walkExpr(s.from)
        walkExpr(s.to)
        walkStmt(s.body)
        return
      case 'for-of':
        walkExpr(s.iterable)
        walkStmt(s.body)
        return
      case 'switch':
        walkExpr(s.test)
        for (const c of s.cases) {
          for (const st of c.body) walkStmt(st)
        }
        return
      case 'return':
        if (s.value) walkExpr(s.value)
        return
      case 'throw':
        if (s.value) walkExpr(s.value)
        return
      case 'try':
        walkStmt(s.body)
        if (s.catch) walkStmt(s.catch.body)
        if (s.finally) walkStmt(s.finally)
        return
      case 'label':
        walkStmt(s.stmt)
        return
      case 'break':
      case 'continue':
        return
    }
  }

  // Walk default expressions to detect closure variables
  if (fnExpr.defaults) {
    for (const defaultExpr of fnExpr.defaults) {
      if (defaultExpr) {
        walkExpr(defaultExpr)
      }
    }
  }

  if (fnExpr.body.type === 'block') walkStmt(fnExpr.body)
  else walkExpr(fnExpr.body)

  return Array.from(out)
}

export function collectCapturedVarNames(body: Expr | Stmt, opts: CollectOpts): string[] {
  const out = new Set<string>()

  const add = (name: string): void => {
    if (name === '$') return
    if (opts.systemVars.has(name)) return
    out.add(name)
  }

  const walkExpr = (e: Expr): void => {
    switch (e.type) {
      case 'number':
      case 'string':
        return
      case 'identifier':
        add(e.name)
        return
      case 'array':
        for (const it of e.items) walkExpr(it)
        return
      case 'object':
        for (const entry of e.entries) walkExpr(entry.value)
        return
      case 'index':
        walkExpr(e.object)
        walkExpr(e.index)
        return
      case 'member':
        walkExpr(e.object)
        return
      case 'unary':
        walkExpr(e.expr)
        return
      case 'binary':
        walkExpr(e.left)
        walkExpr(e.right)
        return
      case 'ternary':
        walkExpr(e.test)
        walkExpr(e.then)
        walkExpr(e.else)
        return
      case 'call':
        walkExpr(e.callee)
        for (let i = 0; i < e.args.length; i++) walkExpr(e.args[i]!.value)
        return
      case 'assign':
        if (e.left.type === 'identifier' && e.op !== ':=') add(e.left.name)
        if (e.left.type === 'destructure' && e.op !== ':=') {
          for (const name of e.left.names) add(name)
        }
        if (e.left.type !== 'identifier' && e.left.type !== 'destructure') walkExpr(e.left)
        walkExpr(e.right)
        return
      case 'destructure':
        // Destructure patterns don't have child expressions to walk
        return
      case 'fn':
        // Nested function has its own capture.
        return
      case 'switch':
        walkExpr(e.test)
        for (const c of e.cases) {
          if (c.test) walkExpr(c.test)
          for (const st of c.body) walkStmt(st)
        }
        return
    }
  }

  const walkStmt = (s: Stmt): void => {
    switch (s.type) {
      case 'expr':
        walkExpr(s.expr)
        return
      case 'block':
        for (const it of s.body) walkStmt(it)
        return
      case 'if':
        walkExpr(s.test)
        walkStmt(s.then)
        if (s.else) walkStmt(s.else)
        return
      case 'while':
        walkExpr(s.test)
        walkStmt(s.body)
        return
      case 'do':
        walkStmt(s.body)
        walkExpr(s.test)
        return
      case 'for':
        walkExpr(s.from)
        walkExpr(s.to)
        walkStmt(s.body)
        return
      case 'for-of':
        walkExpr(s.iterable)
        walkStmt(s.body)
        return
      case 'switch':
        walkExpr(s.test)
        for (const c of s.cases) {
          for (const st of c.body) walkStmt(st)
        }
        return
      case 'return':
        if (s.value) walkExpr(s.value)
        return
      case 'throw':
        if (s.value) walkExpr(s.value)
        return
      case 'try':
        walkStmt(s.body)
        if (s.catch) walkStmt(s.catch.body)
        if (s.finally) walkStmt(s.finally)
        return
      case 'label':
        walkStmt(s.stmt)
        return
      case 'break':
      case 'continue':
        return
    }
  }

  const exprTypes: Expr['type'][] = [
    'number',
    'string',
    'identifier',
    'fn',
    'array',
    'object',
    'index',
    'unary',
    'binary',
    'ternary',
    'call',
    'member',
    'assign',
    'destructure',
  ]
  if (exprTypes.includes((body as Expr).type)) {
    walkExpr(body as Expr)
    return Array.from(out)
  }
  walkStmt(body as Stmt)
  return Array.from(out)
}

export type RecordCallMapping = {
  recordCallIds: Map<string, number>
  functionToRecordCall: Map<string, string>
}

export function assignRecordCallIds(program: { body: Stmt[] }): RecordCallMapping {
  const recordCallIds = new Map<string, number>()
  let nextRecordId = 0

  const getLocKey = (loc: { start: number; end: number; line: number; column: number }): string => {
    return `${loc.line}:${loc.column}:${loc.start}:${loc.end}`
  }

  const functionToRecordCall = new Map<string, string>()
  const functionsWithRecord = new Set<string>()
  const functionContext: Array<string | null> = []

  const currentFunctionContext = (): string | null => {
    if (functionContext.length === 0) return null
    return functionContext[functionContext.length - 1] ?? null
  }

  const discoverExpr = (e: Expr): void => {
    switch (e.type) {
      case 'number':
      case 'string':
      case 'identifier':
      case 'destructure':
        return
      case 'array':
        for (const it of e.items) discoverExpr(it)
        return
      case 'object':
        for (const entry of e.entries) discoverExpr(entry.value)
        return
      case 'index':
        discoverExpr(e.object)
        discoverExpr(e.index)
        return
      case 'member':
        discoverExpr(e.object)
        return
      case 'unary':
        discoverExpr(e.expr)
        return
      case 'binary':
        discoverExpr(e.left)
        discoverExpr(e.right)
        return
      case 'ternary':
        discoverExpr(e.test)
        discoverExpr(e.then)
        discoverExpr(e.else)
        return
      case 'call':
        if (e.callee.type === 'identifier' && e.callee.name === 'record') {
          const functionName = currentFunctionContext()
          if (functionName !== null && !functionToRecordCall.has(functionName)) {
            const locKey = getLocKey(e.loc)
            functionToRecordCall.set(functionName, locKey)
            functionsWithRecord.add(functionName)
          }
        }
        discoverExpr(e.callee)
        for (const a of e.args) discoverExpr(a.value)
        return
      case 'assign':
        if (e.left.type === 'identifier' && e.right.type === 'fn') {
          functionContext.push(e.left.name)
          if (e.right.body.type === 'block') discoverStmt(e.right.body)
          else discoverExpr(e.right.body)
          functionContext.pop()
          return
        }
        if (e.left.type !== 'identifier' && e.left.type !== 'destructure') discoverExpr(e.left)
        discoverExpr(e.right)
        return
      case 'switch':
        discoverExpr(e.test)
        for (const c of e.cases) {
          if (c.test) discoverExpr(c.test)
          for (const st of c.body) discoverStmt(st)
        }
        return
      case 'fn':
        functionContext.push(null)
        if (e.body.type === 'block') discoverStmt(e.body)
        else discoverExpr(e.body)
        functionContext.pop()
        return
    }
  }

  const discoverStmt = (s: Stmt): void => {
    switch (s.type) {
      case 'expr':
        discoverExpr(s.expr)
        return
      case 'block':
        for (const it of s.body) discoverStmt(it)
        return
      case 'if':
        discoverExpr(s.test)
        discoverStmt(s.then)
        if (s.else) discoverStmt(s.else)
        return
      case 'while':
        discoverExpr(s.test)
        discoverStmt(s.body)
        return
      case 'do':
        discoverStmt(s.body)
        discoverExpr(s.test)
        return
      case 'for':
        discoverExpr(s.from)
        discoverExpr(s.to)
        discoverStmt(s.body)
        return
      case 'for-of':
        discoverExpr(s.iterable)
        discoverStmt(s.body)
        return
      case 'switch':
        discoverExpr(s.test)
        for (const c of s.cases) {
          for (const st of c.body) discoverStmt(st)
        }
        return
      case 'return':
        if (s.value) discoverExpr(s.value)
        return
      case 'throw':
        if (s.value) discoverExpr(s.value)
        return
      case 'try':
        discoverStmt(s.body)
        if (s.catch) discoverStmt(s.catch.body)
        if (s.finally) discoverStmt(s.finally)
        return
      case 'label':
        discoverStmt(s.stmt)
        return
      case 'break':
      case 'continue':
        return
    }
  }

  for (const stmt of program.body) discoverStmt(stmt)

  let inFunctionBody = false

  const walkExpr = (e: Expr): void => {
    switch (e.type) {
      case 'number':
      case 'string':
      case 'identifier':
        return
      case 'array':
        for (const it of e.items) walkExpr(it)
        return
      case 'object':
        for (const entry of e.entries) walkExpr(entry.value)
        return
      case 'index':
        walkExpr(e.object)
        walkExpr(e.index)
        return
      case 'member':
        walkExpr(e.object)
        return
      case 'unary':
        walkExpr(e.expr)
        return
      case 'binary':
        walkExpr(e.left)
        walkExpr(e.right)
        return
      case 'ternary':
        walkExpr(e.test)
        walkExpr(e.then)
        walkExpr(e.else)
        return
      case 'call':
        if (e.callee.type === 'identifier') {
          if (e.callee.name === 'record') {
            if (!inFunctionBody) {
              const locKey = getLocKey(e.loc)
              if (!recordCallIds.has(locKey)) recordCallIds.set(locKey, nextRecordId++)
            }
          }
          else if (functionsWithRecord.has(e.callee.name)) {
            const callSiteLocKey = getLocKey(e.loc)
            if (!recordCallIds.has(callSiteLocKey)) recordCallIds.set(callSiteLocKey, nextRecordId++)
          }
        }
        else {
          walkExpr(e.callee)
        }
        for (const a of e.args) {
          walkExpr(a.value)
        }
        return
      case 'assign':
        if (e.left.type !== 'identifier' && e.left.type !== 'destructure') walkExpr(e.left)
        walkExpr(e.right)
        return
      case 'destructure':
        return
      case 'switch':
        walkExpr(e.test)
        for (const c of e.cases) {
          if (c.test) walkExpr(c.test)
          for (const st of c.body) walkStmt(st)
        }
        return
      case 'fn':
        const savedInFunctionBody = inFunctionBody
        inFunctionBody = true
        if (e.body.type === 'block') walkStmt(e.body)
        else walkExpr(e.body)
        inFunctionBody = savedInFunctionBody
        return
    }
  }

  const walkStmt = (s: Stmt): void => {
    switch (s.type) {
      case 'expr':
        walkExpr(s.expr)
        return
      case 'block':
        for (const it of s.body) walkStmt(it)
        return
      case 'if':
        walkExpr(s.test)
        walkStmt(s.then)
        if (s.else) walkStmt(s.else)
        return
      case 'while':
        walkExpr(s.test)
        walkStmt(s.body)
        return
      case 'do':
        walkStmt(s.body)
        walkExpr(s.test)
        return
      case 'for':
        walkExpr(s.from)
        walkExpr(s.to)
        walkStmt(s.body)
        return
      case 'for-of':
        walkExpr(s.iterable)
        walkStmt(s.body)
        return
      case 'switch':
        walkExpr(s.test)
        for (const c of s.cases) {
          for (const st of c.body) walkStmt(st)
        }
        return
      case 'return':
        if (s.value) walkExpr(s.value)
        return
      case 'throw':
        if (s.value) walkExpr(s.value)
        return
      case 'try':
        walkStmt(s.body)
        if (s.catch) walkStmt(s.catch.body)
        if (s.finally) walkStmt(s.finally)
        return
      case 'label':
        walkStmt(s.stmt)
        return
      case 'break':
      case 'continue':
        return
    }
  }

  for (const stmt of program.body) walkStmt(stmt)
  return { recordCallIds, functionToRecordCall }
}
