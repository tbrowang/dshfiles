import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { FallbackEdits } from '../src/fallbacks-section.js'

const row = { id: 'cc2/gpt-6-luna', model: 'gpt-6-luna', account: 'Command Code 2' }

describe('fallback edits are announced once the Host confirms them (council picker round 7, W9)', () => {
  it('announces a move with the rank the Host confirmed, and keeps focus where it is', async () => {
    const said: string[] = []
    let refocused = 0
    await FallbackEdits.move({
      row,
      write: async () => ({
        ok: true,
        chain: [
          { provider: 'codex', model: 'gpt-6-luna' },
          { provider: 'cc2', model: 'gpt-6-luna' },
        ],
      }),
      announce: text => said.push(text),
      refocus: () => (refocused += 1),
    })
    expect(said).toEqual(['gpt-6-luna on Command Code 2 is now fallback 2'])
    expect(refocused).toBe(0)
  })

  it('says nothing before the write settles', async () => {
    const said: string[] = []
    let settle: (value: { ok: true; chain: [] }) => void = () => undefined
    const done = FallbackEdits.remove({
      row,
      write: () => new Promise(resolve => (settle = resolve)),
      announce: text => said.push(text),
      refocus: () => undefined,
    })
    expect(said).toEqual([])
    settle({ ok: true, chain: [] })
    await done
    expect(said).toEqual(['gpt-6-luna on Command Code 2 removed'])
  })

  it('announces a refused write once and gives focus back to the route', async () => {
    const said: string[] = []
    let refocused = 0
    await FallbackEdits.remove({
      row,
      write: async () => ({ ok: false, error: 'The chain changed elsewhere.' }),
      announce: text => said.push(text),
      refocus: () => (refocused += 1),
    })
    expect(said).toEqual(['Could not remove gpt-6-luna on Command Code 2. The chain changed elsewhere.'])
    expect(refocused).toBe(1)
  })

  it('wires the section to the confirmed writes', () => {
    const source = readFileSync(new URL('../src/fallbacks-section.tsx', import.meta.url), 'utf8')
    expect(source).toContain('void FallbackEdits.move({ row, write: () => props.onMove(from, to), announce: setMoved')
    expect(source).toContain('return { ok: true, chain: confirmed.threadChain ?? confirmed.defaultChain }')
  })
})
