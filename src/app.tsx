import { useCallback, useLayoutEffect, useRef } from 'react'
import { Button, Group, Stack } from '@mantine/core'
import { entries, useLocalStorage } from 'zero-dependency'
import { CopyButton } from './components/copy-button'
import { Options } from './components/options'
import { ResetButton } from './components/reset-button'
import { ShareButton } from './components/share-button'
import { Widget } from './components/widget'
import { defaultOptions } from './constants'
import type { WidgetElements, WidgetOptions, WidgetSetValue } from './types'

export function App() {
  const widgetRef = useRef<WidgetElements>(null)
  const [
    options,
    setOptions,
    resetOptions
  ] = useLocalStorage<WidgetOptions>('options', defaultOptions)

  const updateOptions = useCallback<WidgetSetValue>((el, property, value) => {
    setOptions((prevValue) => ({
      ...prevValue,
      [el]: {
        ...prevValue[el],
        [property]: value
      }
    }))
  }, [])

  const setStyle = useCallback<WidgetSetValue>((el, property, value) => {
    // @ts-ignore
    widgetRef.current[el].style[property] = value
  }, [])

  useLayoutEffect(() => {
    for (const [el, styles] of entries(options)) {
      for (const [property, value] of entries(styles)) {
        setStyle(el, property, value)
      }
    }
  }, [options])

  return (
    <Stack p="lg">
      <Widget ref={widgetRef} />
      <Options
        options={options}
        updateOptions={updateOptions}
      />
      <Button.Group>
        <CopyButton options={options} />
        <ShareButton />
        <ResetButton resetOptions={resetOptions} />
      </Button.Group>
    </Stack>
  )
}
