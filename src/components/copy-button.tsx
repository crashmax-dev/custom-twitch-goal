import { Button, CopyButton as Clipboard } from '@mantine/core'
import { IconCheck, IconCopy } from '@tabler/icons-react'
import { transformOptionsToStyles } from '../utils'
import type { WidgetOptions } from '../types'

interface Props {
  options: WidgetOptions
}

export function CopyButton({ options }: Props) {
  return (
    <Clipboard value={transformOptionsToStyles(options)}>
      {({ copied, copy }) => (
        <Button
          fullWidth
          leftIcon={copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
          variant="default"
          onClick={copy}
        >
          {copied ? 'Copied' : 'Copy'}
        </Button>
      )}
    </Clipboard>
  )
}
