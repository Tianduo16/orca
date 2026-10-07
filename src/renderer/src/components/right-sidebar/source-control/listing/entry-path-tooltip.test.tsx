import type { ReactNode } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it, vi } from 'vitest'
import { BranchEntryRow } from './branch-entry-row'
import { UncommittedEntryRow } from './uncommitted-entry-row'

vi.mock('@/components/ui/tooltip', () => ({
  Tooltip: ({ children }: { children: ReactNode }) => <>{children}</>,
  TooltipTrigger: ({ children }: { children: ReactNode }) => (
    <span data-tooltip-trigger>{children}</span>
  ),
  TooltipContent: ({ children }: { children: ReactNode }) => (
    <div data-tooltip-content>{children}</div>
  )
}))

vi.mock('./entry-context-menu', () => ({
  SourceControlEntryContextMenu: ({ children }: { children: ReactNode }) => <>{children}</>
}))

const ROW_PATH = 'src/components/tab-bar/EditorFileTab.tsx'

function tooltipText(markup: string): string {
  const match = markup.match(/<div data-tooltip-content="true">([^<]*)<\/div>/)
  expect(match).not.toBeNull()
  return match?.[1] ?? ''
}

describe('source control row path tooltip', () => {
  it('shows the absolute path on an uncommitted change row', () => {
    const markup = renderToStaticMarkup(
      <UncommittedEntryRow
        entryKey="unstaged::src/components/tab-bar/EditorFileTab.tsx"
        entry={{ path: ROW_PATH, status: 'modified', area: 'unstaged' }}
        currentWorktreeId="wt-1"
        worktreePath="/repo"
        onRevealInExplorer={vi.fn()}
        onOpen={vi.fn()}
        onStage={vi.fn()}
        onUnstage={vi.fn()}
        onDiscard={vi.fn()}
        commentCount={0}
      />
    )

    expect(tooltipText(markup)).toBe(`/repo/${ROW_PATH}`)
  })

  it('shows the absolute path on a committed branch change row', () => {
    const markup = renderToStaticMarkup(
      <BranchEntryRow
        entry={{ path: ROW_PATH, status: 'modified' }}
        currentWorktreeId="wt-1"
        worktreePath="/repo"
        onRevealInExplorer={vi.fn()}
        onOpen={vi.fn()}
        commentCount={0}
      />
    )

    expect(tooltipText(markup)).toBe(`/repo/${ROW_PATH}`)
  })
})
