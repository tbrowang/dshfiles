import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

describe('the desktop details header holds still (council picker round 7, W3)', () => {
  it("keeps Back's slot without a draft (invisible on desktop, shown on the phone) and sets it on the title's line", () => {
    const details = readFileSync(new URL('../src/model-details.tsx', import.meta.url), 'utf8')
    expect(details).toContain("'dshx:flex dshx:size-6 dshx:pointer-fine:-mt-1")
    expect(details).toContain("!draft && 'dshx:invisible dshx:@max-pane-compact:visible'")
    expect(details).not.toContain("draft && 'dshx:flex'")
  })
})
