import { useCallback, useEffect, useState } from 'react'
import { Button } from '@mantine/core'
import { IconCheck, IconShare } from '@tabler/icons-react'
import type { WidgetOptions } from '../types'

interface Props {
  options: WidgetOptions
  setQueryParams: (value: WidgetOptions) => void
}

export function ShareButton({ options, setQueryParams }: Props) {
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
      leftIcon={copied ? <IconCheck size={16} /> : <IconShare size={16} />}
      variant="default"
      onClick={() => {
        onCopy()
        setQueryParams(options)
      }}
    >
      {copied ? 'Copied' : 'Share'}
    </Button>
  )
}
