import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

describe('the Actions sheet shares the picker sheet surface (council picker round 7, W10)', () => {
  it('draws the popover surface on the phone', () => {
    expect(readFileSync(new URL('../src/fallbacks-section.tsx', import.meta.url), 'utf8')).toContain('dshx:in-[html[data-shell-phone-nav]]:bg-popover!')
  })
})
