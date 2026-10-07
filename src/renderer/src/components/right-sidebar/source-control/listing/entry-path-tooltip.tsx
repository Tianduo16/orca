import type React from 'react'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

/** Shows a row's full path on hover, since the row label truncates and leads with the file name. */
export function SourceControlEntryPathTooltip({
  path,
  children
}: {
  path: string
  children: React.ReactElement
}): React.JSX.Element {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent
        side="bottom"
        sideOffset={4}
        className="max-w-80 whitespace-normal break-words text-left"
      >
        {path}
      </TooltipContent>
    </Tooltip>
  )
}
