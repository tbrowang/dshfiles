import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const details = readFileSync(new URL('../src/model-details.tsx', import.meta.url), 'utf8')

describe('the details body under its header line (council picker round 5, U10)', () => {
  it('keeps a 12 px top fade under the hairline once scrolled, with an 8 px top inset (round 7 W2 revises U10)', () => {
    const at = details.indexOf('data-model-details-body')
    const tag = details.slice(details.lastIndexOf('<div', at), details.indexOf('>\n', at))
    expect(tag).toContain('dshx:data-[scrolled]:[mask-image:linear-gradient(to_bottom,transparent,black_12px,black_calc(100%-8px),transparent)]')
    expect(tag).toContain('dshx:pt-2 dshx:[scroll-padding-top:12px]')
    expect(tag).toContain('data-scrolled={scrolled || undefined}')
  })
})
