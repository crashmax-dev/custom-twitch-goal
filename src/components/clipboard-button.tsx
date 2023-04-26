import { useCallback, useEffect, useState } from 'react'
import { Button } from '@mantine/core'
import { IconCheck } from '@tabler/icons-react'

interface Props {
  disabled?: boolean
  icon: React.ReactNode
  onClick: () => void
  children: React.ReactNode
}

export function ClipboardButton({
  disabled = false,
  icon,
  onClick,
  children
}: Props) {
  const [copied, setCopied] = useState(() => false)

  const onCopy = useCallback(() => {
    setCopied(true)
  }, [])

  useEffect(() => {
    if (!copied) return

    const timeoutId = setTimeout(() => {
      setCopied(false)
    }, 1000)

    return () => clearTimeout(timeoutId)
  }, [copied])

  return (
    <Button
      fullWidth
      loading={disabled}
      disabled={disabled}
      leftIcon={copied ? <IconCheck size={16} /> : icon}
      variant="default"
      onClick={() => {
        onCopy()
        onClick()
      }}
    >
      {copied ? 'Copied' : children}
    </Button>
  )
}
