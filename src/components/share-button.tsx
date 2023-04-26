import { IconShare } from '@tabler/icons-react'
import { ClipboardButton } from './clipboard-button'
import type { WidgetOptions } from '../types'

interface Props {
  options: WidgetOptions
  setQueryParams: (value: WidgetOptions) => void
}

export function ShareButton({ options, setQueryParams }: Props) {
  return (
    <ClipboardButton
      icon={<IconShare size={16} />}
      onClick={() => setQueryParams(options)}
    >
      Share
    </ClipboardButton>
  )
}
