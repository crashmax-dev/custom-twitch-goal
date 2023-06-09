import { useCallback, useEffect, useLayoutEffect, useRef } from 'react'
import { Button, Flex, Stack } from '@mantine/core'
import { entries, useLocalStorage } from 'zero-dependency'
import { CopyButton } from './components/copy-button'
import { FontProvider } from './components/fonts'
import { Options } from './components/options'
import { ResetButton } from './components/reset-button'
import { ShareButton } from './components/share-button'
import { Widget } from './components/widget'
import { defaultOptions } from './constants'
import { useQueryParams } from './hooks/use-query-params'
import type { WidgetElements, WidgetOptions, WidgetSetValue } from './types'

export function App() {
  const widgetRef = useRef<WidgetElements>(null)
  const [
    options,
    setOptions,
    resetOptions
  ] = useLocalStorage<WidgetOptions>('options_v4', defaultOptions)

  const [queryParams, setQueryParams] = useQueryParams({
    name: 'q',
    deserialize: (value) => {
      try {
        return value ? JSON.parse(atob(value)) : ''
      } catch (error) {
        return ''
      }
    },
    serialize: (value) => {
      try {
        const actualValue = value ? btoa(JSON.stringify(value)) : ''
        if (actualValue) {
          navigator.clipboard.writeText(`${location.origin}/?q=${actualValue}`)
        }
        return actualValue
      } catch (error) {
        return ''
      }
    }
  })

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

  useEffect(() => {
    if (queryParams) {
      setOptions(queryParams)
    }
  }, [])

  useLayoutEffect(() => {
    for (const [el, styles] of entries(options)) {
      for (const [property, value] of entries(styles)) {
        setStyle(el, property, value)
      }
    }
  }, [options])

  return (
    <Stack
      p="lg"
      h="100vh"
    >
      <Widget ref={widgetRef} />
      <Flex
        h="inherit"
        direction="column"
        justify="space-between"
      >
        <FontProvider
          leftText={options.leftText}
          rightText={options.rightText}
        >
          <Options
            options={options}
            updateOptions={updateOptions}
          />
          <Button.Group>
            <CopyButton options={options} />
            <ShareButton
              options={options}
              setQueryParams={setQueryParams}
            />
            <ResetButton
              resetOptions={resetOptions}
              setQueryParams={setQueryParams}
            />
          </Button.Group>
        </FontProvider>
      </Flex>
    </Stack>
  )
}
