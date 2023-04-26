import { IconCopy } from '@tabler/icons-react'
import { transformOptionsToStyles } from '../utils'
import { ClipboardButton } from './clipboard-button'
import { useFont } from './fonts'
import type { WidgetOptions } from '../types'

interface Props {
  options: WidgetOptions
}

export function CopyButton({ options }: Props) {
  const { selectedFonts } = useFont()

  return (
    <ClipboardButton
      disabled={
        selectedFonts.leftText?.variants || selectedFonts.rightText?.variants
          ? false
          : true
      }
      icon={<IconCopy size={16} />}
      onClick={() => {
        const styles = transformOptionsToStyles(options, selectedFonts)
        navigator.clipboard.writeText(styles)
      }}
    >
      Copy
    </ClipboardButton>
  )
}
