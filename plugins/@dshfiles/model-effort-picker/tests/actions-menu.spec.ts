import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const source = readFileSync(new URL('../src/fallbacks-section.tsx', import.meta.url), 'utf8')

describe('the fallback Actions menu names its route (council picker round 7, W1)', () => {
  it('titles the phone sheet with the route and names the menu by it', () => {
    expect(source).toContain('aria-labelledby={`${listId}-actions-${String(index)}`}')
    expect(source).toContain('{`Fallback ${String(index + 1)} · ${row.model} · ${row.tag}`}')
    expect(source).toMatch(/dshx:hidden dshx:px-3 dshx:pt-0 dshx:pb-2 dshx:text-sm dshx:font-medium dshx:text-muted-foreground dshx:pointer-coarse:block dshx:pointer-coarse:pl-2 dshx:pointer-coarse:text-xs/u)
  })

  it('marks the open trigger and its route, borders the dark menu on the strong step, and rings the keyboard item', () => {
    expect(source).toContain('dshx:data-[state=open]:bg-accent')
    expect(source).toContain('dshx:has-[[data-model-fallback-actions][data-state=open]]:bg-accent/50')
    expect(source).toContain('className="dshx:dark:border-(--dshx-tone-6)"')
    expect(source).toMatch(/const ACTION_ITEM =\s*'dshx:focus-visible:outline-2[^']*outline-\(--dsw-alias-state-business-primary\)'/u)
  })
})
