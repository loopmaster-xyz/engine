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
  const out = new Set<string>()
  const params = collectParamNames(fnExpr.params)
  const inOuterLocals = (name: string): boolean => {
    for (const scope of outerLocals) {
      if (scope.has(name)) return true
    }
    return false
  }

  const walkExpr = (e: Expr): void => {
    switch (e.type) {
      case 'number':
      case 'string':
        return
      case 'identifier':
        if (!params.has(e.name) && !opts.systemVars.has(e.name) && inOuterLocals(e.name)) {
          out.add(e.name)
        }
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
        for (const a of e.args) {
          if (a.type === 'arg') walkExpr(a.value)
        }
        return
      case 'assign':
        if (e.left.type === 'identifier') {
          walkExpr(e.right)
          if (e.op !== ':=' && !params.has(e.left.name) && !opts.systemVars.has(e.left.name)
            && inOuterLocals(e.left.name))
          {
            out.add(e.left.name)
          }
          return
        }
        if (e.left.type === 'destructure') {
          // For destructuring assignments, check each name in the pattern
          walkExpr(e.right)
          for (const name of e.left.names) {
            if (e.op !== ':=' && !params.has(name) && !opts.systemVars.has(name) && inOuterLocals(name)) {
              out.add(name)
            }
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
        for (const a of e.args) {
          if (a.type === 'arg') walkExpr(a.value)
        }
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

  const functionsWithRecord = new Set<string>()
  const functionToRecordCall = new Map<string, string>()

  const checkForRecord = (expr: Expr): boolean => {
    if (expr.type === 'call' && expr.callee.type === 'identifier' && expr.callee.name === 'record') {
      return true
    }
    switch (expr.type) {
      case 'number':
      case 'string':
      case 'identifier':
        return false
      case 'destructure':
        return false
      case 'array':
        for (const it of expr.items) { if (checkForRecord(it)) return true }
        return false
      case 'object':
        for (const entry of expr.entries) { if (checkForRecord(entry.value)) return true }
        return false
      case 'index':
        return checkForRecord(expr.object) || checkForRecord(expr.index)
      case 'member':
        return checkForRecord(expr.object)
      case 'unary':
        return checkForRecord(expr.expr)
      case 'binary':
        return checkForRecord(expr.left) || checkForRecord(expr.right)
      case 'ternary':
        return checkForRecord(expr.test) || checkForRecord(expr.then) || checkForRecord(expr.else)
      case 'call':
        if (checkForRecord(expr.callee)) return true
        for (const a of expr.args) {
          if (a.type === 'arg' && checkForRecord(a.value)) return true
        }
        return false
      case 'assign':
        return checkForRecord(expr.left) || checkForRecord(expr.right)
      case 'fn':
        return false
      case 'switch':
        if (checkForRecord(expr.test)) return true
        for (const c of expr.cases) {
          if (c.test && checkForRecord(c.test)) return true
          for (const st of c.body) { if (checkStmtForRecord(st)) return true }
        }
        return false
    }
  }

  const checkStmtForRecord = (s: Stmt): boolean => {
    switch (s.type) {
      case 'expr':
        return checkForRecord(s.expr)
      case 'block':
        for (const it of s.body) { if (checkStmtForRecord(it)) return true }
        return false
      case 'if':
        return checkForRecord(s.test) || checkStmtForRecord(s.then) || (s.else ? checkStmtForRecord(s.else) : false)
      case 'while':
        return checkForRecord(s.test) || checkStmtForRecord(s.body)
      case 'do':
        return checkStmtForRecord(s.body) || checkForRecord(s.test)
      case 'for':
        return checkForRecord(s.from) || checkForRecord(s.to) || checkStmtForRecord(s.body)
      case 'for-of':
        return checkForRecord(s.iterable) || checkStmtForRecord(s.body)
      case 'switch':
        return checkForRecord(s.test)
          || s.cases.some(c => c.body.some(st => checkStmtForRecord(st)))
      case 'return':
        return s.value ? checkForRecord(s.value) : false
      case 'throw':
        return s.value ? checkForRecord(s.value) : false
      case 'try':
        return checkStmtForRecord(s.body) || (s.catch ? checkStmtForRecord(s.catch.body) : false)
          || (s.finally ? checkStmtForRecord(s.finally) : false)
      case 'label':
        return checkStmtForRecord(s.stmt)
      case 'break':
      case 'continue':
        return false
    }
  }

  // Helper to find the record() call location within an expression
  const findRecordCallLoc = (expr: Expr): string | null => {
    if (expr.type === 'call' && expr.callee.type === 'identifier' && expr.callee.name === 'record') {
      return getLocKey(expr.loc)
    }
    switch (expr.type) {
      case 'number':
      case 'string':
      case 'identifier':
        return null
      case 'array':
        for (const it of expr.items) {
          const loc = findRecordCallLoc(it)
          if (loc) return loc
        }
        return null
      case 'object':
        for (const entry of expr.entries) {
          const loc = findRecordCallLoc(entry.value)
          if (loc) return loc
        }
        return null
      case 'index':
        return findRecordCallLoc(expr.object) || findRecordCallLoc(expr.index)
      case 'member':
        return findRecordCallLoc(expr.object)
      case 'unary':
        return findRecordCallLoc(expr.expr)
      case 'binary':
        return findRecordCallLoc(expr.left) || findRecordCallLoc(expr.right)
      case 'ternary':
        return findRecordCallLoc(expr.test) || findRecordCallLoc(expr.then) || findRecordCallLoc(expr.else)
      case 'call':
        const calleeLoc = findRecordCallLoc(expr.callee)
        if (calleeLoc) return calleeLoc
        for (const a of expr.args) {
          if (a.type === 'arg') {
            const argLoc = findRecordCallLoc(a.value)
            if (argLoc) return argLoc
          }
        }
        return null
      case 'assign':
        return findRecordCallLoc(expr.left) || findRecordCallLoc(expr.right)
      case 'destructure':
        // Destructure patterns don't contain expressions
        return null
      case 'fn':
        return null // Don't recurse into nested functions
      case 'switch': {
        const testLoc = findRecordCallLoc(expr.test)
        if (testLoc) return testLoc
        for (const c of expr.cases) {
          if (c.test) {
            const loc = findRecordCallLoc(c.test)
            if (loc) return loc
          }
          for (const st of c.body) {
            const loc = findRecordCallLocInStmt(st)
            if (loc) return loc
          }
        }
        return null
      }
    }
  }

  // Helper to find the record() call location within a statement
  const findRecordCallLocInStmt = (s: Stmt): string | null => {
    switch (s.type) {
      case 'expr':
        return findRecordCallLoc(s.expr)
      case 'block':
        for (const it of s.body) {
          const loc = findRecordCallLocInStmt(it)
          if (loc) return loc
        }
        return null
      case 'if':
        return findRecordCallLoc(s.test) || findRecordCallLocInStmt(s.then)
          || (s.else ? findRecordCallLocInStmt(s.else) : null)
      case 'while':
        return findRecordCallLoc(s.test) || findRecordCallLocInStmt(s.body)
      case 'do':
        return findRecordCallLocInStmt(s.body) || findRecordCallLoc(s.test)
      case 'for':
        return findRecordCallLoc(s.from) || findRecordCallLoc(s.to) || findRecordCallLocInStmt(s.body)
      case 'for-of':
        return findRecordCallLoc(s.iterable) || findRecordCallLocInStmt(s.body)
      case 'switch': {
        const loc = findRecordCallLoc(s.test)
        if (loc) return loc
        for (const c of s.cases) {
          for (const st of c.body) {
            const stLoc = findRecordCallLocInStmt(st)
            if (stLoc) return stLoc
          }
        }
        return null
      }
      case 'return':
        return s.value ? findRecordCallLoc(s.value) : null
      case 'throw':
        return s.value ? findRecordCallLoc(s.value) : null
      case 'try':
        return findRecordCallLocInStmt(s.body) || (s.catch ? findRecordCallLocInStmt(s.catch.body) : null)
          || (s.finally ? findRecordCallLocInStmt(s.finally) : null)
      case 'label':
        return findRecordCallLocInStmt(s.stmt)
      case 'break':
      case 'continue':
        return null
    }
  }

  const discoverRecordFunctions = (): void => {
    const walkExpr = (e: Expr): void => {
      if (e.type === 'assign' && e.left.type === 'identifier' && e.right.type === 'fn') {
        const funcName = e.left.name
        const hasRecord = e.right.body.type === 'block'
          ? checkStmtForRecord(e.right.body)
          : checkForRecord(e.right.body)
        if (hasRecord) {
          functionsWithRecord.add(funcName)
          const recordLocKey = e.right.body.type === 'block'
            ? findRecordCallLocInStmt(e.right.body)
            : findRecordCallLoc(e.right.body)
          if (recordLocKey) functionToRecordCall.set(funcName, recordLocKey)
        }
      }
      switch (e.type) {
        case 'number':
        case 'string':
        case 'identifier':
        case 'destructure':
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
          for (const a of e.args) {
            if (a.type === 'arg') walkExpr(a.value)
          }
          return
        case 'assign':
          walkExpr(e.left)
          walkExpr(e.right)
          return
        case 'fn':
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
    for (const stmt of program.body) walkStmt(stmt)
  }
  discoverRecordFunctions()

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
          } else if (functionsWithRecord.has(e.callee.name)) {
            const callSiteLocKey = getLocKey(e.loc)
            if (!recordCallIds.has(callSiteLocKey)) recordCallIds.set(callSiteLocKey, nextRecordId++)
          }
        }
        walkExpr(e.callee)
        for (const a of e.args) {
          if (a.type === 'arg') walkExpr(a.value)
        }
        return
      case 'assign':
        walkExpr(e.left)
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
