import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { AccountRows } from '../src/account-rows.js'

const radios = (): string[] => {
  const html = renderToStaticMarkup(
    <AccountRows
      accents={new Map()}
      accounts={[
        { id: 'cc1', name: 'Command Code 1' },
        { id: 'cc2', name: 'Command Code 2' },
      ]}
      onChoose={() => undefined}
      quotas={new Map()}
      selected="cc1"
    />,
  )
  return [...html.matchAll(/<button[^>]*role="radio"[^>]*>/gu)].map(match => match[0])
}

describe('hover is not selection in the account rows (council picker round 3, R14)', () => {
  it('draws hover as a lighter wash than the selected one', () => {
    const [, other] = radios()
    expect(other).toMatch(/dshx:hover:bg-accent\/50/u)
    expect(other).not.toMatch(/dshx:hover:bg-muted|dshx:hover:bg-selected-wash/u)
  })

  it('draws the chosen account with its check and weight only, no wash or edge (round 5 U4, round 7 W8)', () => {
    const [chosen] = radios()
    expect(chosen).not.toMatch(/dshx:selected-edge/u)
    expect(chosen).not.toMatch(/bg-selected-wash/u)
    expect(chosen).toMatch(/dshx:font-selected/u)
  })
})
