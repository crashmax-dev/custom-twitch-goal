import { useCallback } from 'react'
import { Button } from '@mantine/core'

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
      color="red"
      variant="outline"
      onClick={onReset}
    >
      Reset
    </Button>
  )
}
