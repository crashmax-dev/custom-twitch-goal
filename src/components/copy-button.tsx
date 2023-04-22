import { Button, CopyButton as Clipboard } from '@mantine/core'
import { IconCheck, IconCopy } from '@tabler/icons-react'
import type { WidgetOptions } from '../types'

interface Props {
  options: WidgetOptions
}

export function CopyButton({ options }: Props) {
  return (
    <Clipboard value={JSON.stringify(options, null, 2)}>
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
