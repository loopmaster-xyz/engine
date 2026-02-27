/**
 * Parses a tram sequence string into bytecode.
 * 
 * Format:
 * - 'x' = impulse (1.0)
 * - 'X' = strong impulse (2.0)
 * - '.' = half impulse (0.5)
 * - '-' = pause (0.0)
 * - '[...]' = subdivision (all enclosed beats fit in one outer beat)
 * 
 * Bytecode format:
 * - 1.0 = impulse
 * - 2.0 = strong impulse
 * - 0.5 = half impulse
 * - 0.0 = pause
 * - -1.0 = subdivision marker
 * - After -1.0: beatCount (number of beats in subdivision), then content
 */
export type TramBeatMapping = {
  linearIndex: number // Linear position in sequence (0, 1, 2, ...) including all beats and pauses
  startCol: number
  endCol: number
}

export type TramParseResult = {
  bytecode: number[]
  beatMapping: TramBeatMapping[]
}

export function parseTramSequence(sequence: string): TramParseResult {
  const bytecode: number[] = []
  const beatMapping: TramBeatMapping[] = []
  let i = 0
  let linearIndex = 0

  const parseSubsequenceInto = (target: number[], startCharIndex: number): { beatCount: number; endCharIndex: number; linearIndex: number } => {
    let beatCount = 0
    let charIndex = startCharIndex
    const startLinearIndex = linearIndex
    
    while (i < sequence.length) {
      const ch = sequence[i]
      const charStart = charIndex
      
      if (ch === 'X') {
        target.push(2.0) // Strong impulse
        beatMapping.push({
          linearIndex: linearIndex++,
          startCol: charStart + 1, // 1-based column
          endCol: charStart + 2, // 1-based column, exclusive end
        })
        beatCount++
        i++
        charIndex++
      }
      else if (ch === 'x') {
        target.push(1.0) // Impulse
        beatMapping.push({
          linearIndex: linearIndex++,
          startCol: charStart + 1, // 1-based column
          endCol: charStart + 2, // 1-based column, exclusive end
        })
        beatCount++
        i++
        charIndex++
      }
      else if (ch === '.') {
        target.push(0.5) // Half impulse
        beatMapping.push({
          linearIndex: linearIndex++,
          startCol: charStart + 1,
          endCol: charStart + 2,
        })
        beatCount++
        i++
        charIndex++
      }
      else if (ch === '-') {
        target.push(0.0) // Pause
        beatMapping.push({
          linearIndex: linearIndex++,
          startCol: charStart + 1, // 1-based column
          endCol: charStart + 2, // 1-based column, exclusive end
        })
        beatCount++
        i++
        charIndex++
      }
      else if (ch === '[') {
        i++ // Skip '['
        charIndex++
        target.push(-1.0) // Subdivision marker
        const subContent: number[] = []
        const subResult = parseSubsequenceInto(subContent, charIndex)
        const subBeatCount = subResult.beatCount
        // Format: -1.0 (marker), beatCount, ...content...
        target.push(subBeatCount) // Number of beats in subdivision (before content)
        target.push(...subContent) // Content (after beat count)
        beatCount++ // Subdivision counts as 1 outer beat
        charIndex = subResult.endCharIndex
      }
      else if (ch === ']') {
        i++ // Skip ']'
        charIndex++
        break
      }
      else {
        // Skip unknown characters (whitespace, etc.)
        i++
        charIndex++
      }
    }
    
    return { beatCount, endCharIndex: charIndex, linearIndex: linearIndex - startLinearIndex }
  }

  const result = parseSubsequenceInto(bytecode, 0)

  return {
    bytecode,
    beatMapping,
  }
}
