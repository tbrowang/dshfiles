import { readFileSync } from 'node:fs'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { ListEmptyState } from '../src/empty-state.js'

describe('the phone list starts and centres on the sheet (council picker round 7, W7)', () => {
  it('gives the list no left padding on the phone, so rows start with the search', () => {
    const picker = readFileSync(new URL('../src/model-effort-picker.tsx', import.meta.url), 'utf8')
    expect(picker).toContain('dshx:flex dshx:flex-col dshx:gap-px dshx:py-1 dshx:pr-1 dshx:@max-pane-compact:pr-2')
    expect(picker).not.toContain('dshx:@max-pane-compact:pl-1')
  })

  it('centres "No models match" on the sheet, not 4 px right of it', () => {
    const html = renderToStaticMarkup(<ListEmptyState kind="no-match" onClearSearch={() => undefined} query="zz" />)
    expect(html).toContain('dshx:@max-pane-compact:mr-2')
  })
})
