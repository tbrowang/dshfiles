import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

describe('the phone fallback quota ends on the account quota column (council picker round 7, W5)', () => {
  it('pulls the fallback quota 22 px on touch, as it pulls 7 px with a mouse', () => {
    expect(readFileSync(new URL('../src/fallbacks-section.tsx', import.meta.url), 'utf8')).toContain('dshx:pointer-coarse:-mr-5.5')
  })
})
