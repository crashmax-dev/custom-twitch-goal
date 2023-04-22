import { useCallback } from 'react'
import { Button } from '@mantine/core'
import { IconTrash } from '@tabler/icons-react'

interface Props {
  resetOptions: () => void
}

export function ResetButton({ resetOptions }: Props) {
  const onReset = useCallback(() => {
    const isConfirm = confirm('Are you sure you want to reset?')
    if (isConfirm) {
      resetOptions()
    }
  }, [])

  return (
    <Button
      fullWidth
      leftIcon={<IconTrash size={16} />}
      variant="default"
      onClick={onReset}
    >
      Reset
    </Button>
  )
}
