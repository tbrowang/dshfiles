import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { AccountRows } from '../src/account-rows.js'

describe('an outline means only the keyboard row (council picker round 7, W8)', () => {
  it('marks the chosen account by its check and weight, without the 1 px edge', () => {
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
    const chosen = /<button[^>]*aria-checked="true"[^>]*>/u.exec(html)?.[0] ?? ''
    expect(chosen).not.toContain('selected-edge')
    expect(chosen).toContain('dshx:font-selected')
  })
})
