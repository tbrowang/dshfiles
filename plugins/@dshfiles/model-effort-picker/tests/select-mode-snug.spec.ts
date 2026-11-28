import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

describe('a long name stays snug in select mode (council picker round 7, W4)', () => {
  const row = readFileSync(new URL('../src/model-row.tsx', import.meta.url), 'utf8')

  it('refits when select mode narrows the row, watching the name itself too', () => {
    expect(row).toContain('}, [parts.tail, name, props.selectSeveral])')
    expect(row).toContain('observer.observe(parent)')
  })

  it("measures with a hidden span in the head's own computed font, not a canvas", () => {
    expect(row).toMatch(/Object\.assign\(ruler\.style, \{\s*font: style\.font/u)
    expect(row).not.toContain("getContext('2d')")
  })

  it("keeps the ruler outside the name, so the name's text stays the model's", () => {
    expect(row).toContain('document.body.append(ruler)')
  })
})
