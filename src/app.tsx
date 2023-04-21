import { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Stack, Tabs } from '@mantine/core'
import { capitalize, entries, useLocalStorage } from 'zero-dependency'
import { CopyButton } from './components/copy-button'
import { Options } from './components/options'
import { ResetButton } from './components/reset-button'
import { Widget } from './components/widget'
import { defaultOptions, replacers, tabs } from './constants'
import type { WidgetHandlers, WidgetOptions } from './types'

export function App() {
  const widgetRef = useRef<WidgetHandlers>(null)
  const [
    options,
    setOptions,
    resetOptions
  ] = useLocalStorage<WidgetOptions>('options', defaultOptions)
  const [activeTab, setActiveTab] = useState<string | null>('border')

  const updateOptions = useCallback(
    (el: string, property: string, value: string) => {
      setOptions((prevValue) => {
        prevValue[el]![property]!.value = value
        return prevValue
      })
    },
    []
  )

  const setStyle = useCallback(
    (el: string, property: string, value: string) => {
      // @ts-ignore
      widgetRef.current[el].style[property] = value
    },
    []
  )

  useLayoutEffect(() => {
    for (const [key, value] of entries(options)) {
      for (const [style, styleValue] of entries(value)) {
        setStyle(
          key,
          style,
          `${
            styleValue.replace
              ? replacers[styleValue.replace]!.formatter(styleValue.value)
              : styleValue.value
          }`
        )
      }
    }
  }, [options])

  return (
    <Stack
      p="lg"
      w="100%"
    >
      <Widget ref={widgetRef} />
      <Tabs
        radius="md"
        value={activeTab}
        onTabChange={setActiveTab}
      >
        <Tabs.List grow>
          {tabs.map((tab) => (
            <Tabs.Tab
              key={tab}
              value={tab}
            >
              {capitalize(tab)}
            </Tabs.Tab>
          ))}
        </Tabs.List>
        {tabs.map((tab) => (
          <Tabs.Panel
            key={tab}
            value={tab}
            pt="xs"
          >
            <Options
              el={tab}
              options={options}
              updateOptions={updateOptions}
            />
          </Tabs.Panel>
        ))}
      </Tabs>
      <CopyButton options={options} />
      <ResetButton resetOptions={resetOptions} />
    </Stack>
  )
}
