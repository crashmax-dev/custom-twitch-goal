import { Button, CopyButton as Clipboard } from '@mantine/core'
import type { WidgetOptions } from '../types'

interface Props {
  options: WidgetOptions
}

export function CopyButton({ options }: Props) {
  return (
    <Clipboard value={JSON.stringify(options, null, 2)}>
      {({ copied, copy }) => (
        <Button
          variant="outline"
          color={copied ? 'teal' : 'blue'}
          onClick={copy}
        >
          {copied ? 'Copied' : 'Copy custom styles'}
        </Button>
      )}
    </Clipboard>
  )
}
