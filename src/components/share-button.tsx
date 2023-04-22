import { Button } from '@mantine/core'
import { IconShare } from '@tabler/icons-react'

export function ShareButton() {
  return (
    <Button
      fullWidth
      leftIcon={<IconShare size={16} />}
      variant="default"
    >
      Share
    </Button>
  )
}
