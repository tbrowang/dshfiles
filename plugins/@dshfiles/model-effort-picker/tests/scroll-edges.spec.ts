import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const source = (name: string): string => readFileSync(new URL(`../src/${name}`, import.meta.url), 'utf8')

describe('no row cut in half at a scroll edge (council picker round 7, W2)', () => {
  it('marks the section headings the reveal lands on', () => {
    expect(source('account-rows.tsx')).toMatch(/data-model-accounts-heading\s+data-model-section-heading/u)
    expect(source('effort-control.tsx')).toContain('data-model-section-heading')
    expect(source('fallbacks-section.tsx')).toContain('data-model-section-heading')
  })

  it('gives the phone list 12 px fades and rests it on a row start', () => {
    const picker = source('model-effort-picker.tsx')
    expect(picker).toContain('dshx:pointer-coarse:[mask-image:linear-gradient(to_bottom,transparent,black_12px,black_calc(100%-12px),transparent)]')
    expect(picker).toContain('dshx:pointer-coarse:[&_[data-slot=scroll-area-viewport]]:snap-mandatory')
    expect(source('model-row.tsx')).toContain("'dshx:pointer-coarse:snap-start dshx:group/row")
  })
})
