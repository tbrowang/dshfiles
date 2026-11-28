import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

describe('the fallback policy select is 44 pt on touch (council picker round 7, W6)', () => {
  it("draws 44 pt on touch over the kit's small size", () => {
    const source = readFileSync(new URL('../src/fallbacks-section.tsx', import.meta.url), 'utf8')
    expect(source).toMatch(/className="dshx:h-7 dshx:gap-1 dshx:px-2 dshx:text-xs dshx:pointer-coarse:h-11!"\s+data-model-fallback-policy-select/u)
  })
})
