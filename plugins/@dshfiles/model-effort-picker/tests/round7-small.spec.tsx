import { readFileSync } from 'node:fs'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { TooltipProvider } from '@dshfiles/plugin-ui/components/ui/tooltip'
import { EffortControl } from '../src/effort-control.js'

describe('round 7 smaller fixes (council picker W11)', () => {
  it('sets the tray chip × on the Close line', () => {
    const bar = readFileSync(new URL('../src/fan-out-bar.tsx', import.meta.url), 'utf8')
    expect(bar).toContain('dshx:border dshx:border-border dshx:pr-0 dshx:pl-2 dshx:text-sm')
    expect(bar).toContain('className="dshx:-mr-px dshx:size-7')
  })

  it('says what effort does on touch, where the help icon is hidden', () => {
    const html = renderToStaticMarkup(
      <TooltipProvider>
        <EffortControl efforts={[{ id: 'low', name: 'Low' }]} onChange={() => undefined} selected={undefined} />
      </TooltipProvider>,
    )
    expect(/<p[^>]*data-model-effort-help[^>]*>([^<]*)</u.exec(html)?.[1]?.trim()).toBe('Higher effort lets the model think for longer before it answers.')
    expect(/<p[^>]*data-model-effort-help[^>]*>/u.exec(html)?.[0]).toMatch(/dshx:hidden[^"]*dshx:pointer-coarse:block/u)
  })

  it('documents the quota dash rule in DESIGN.md', () => {
    expect(readFileSync(new URL('../../../../DESIGN.md', import.meta.url), 'utf8')).toContain('An unknown quota is blank in a dense list')
  })
})
