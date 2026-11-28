import { describe, expect, it } from 'vitest'
import { FallbackReveal } from '../src/fallbacks-section.js'

describe('opening Fallbacks lands on a heading (council picker round 6 V2, round 7 W2)', () => {
  it('stays when the first route or Add fallback already shows', () => {
    expect(FallbackReveal.plan({ scrollTop: 40, maxScroll: 400, below: -6, headings: [100, 220] })).toEqual({ top: 40, room: 0 })
  })

  it('scrolls to the least heading snap (12 px under the line) that shows the target whole', () => {
    expect(FallbackReveal.plan({ scrollTop: 0, maxScroll: 400, below: 30, headings: [100, 220] })).toEqual({ top: 88, room: 0 })
    expect(FallbackReveal.plan({ scrollTop: 0, maxScroll: 400, below: 150, headings: [100, 220] })).toEqual({ top: 208, room: 0 })
  })

  it('adds the room a short body needs below, rather than stopping on a row cut in half', () => {
    expect(FallbackReveal.plan({ scrollTop: 0, maxScroll: 14, below: 14, headings: [100, 220] })).toEqual({ top: 88, room: 74 })
  })
})
