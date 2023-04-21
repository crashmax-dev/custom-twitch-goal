import { Box, ColorInput, NumberInput, Select, TextInput } from '@mantine/core'
import { capitalize, entries } from 'zero-dependency'
import { replacers } from '../constants'
import type { WidgetOptions } from '../types'

interface Props {
  el: string
  options: WidgetOptions
  updateOptions: (el: string, property: string, value: string) => void
}

function getInputByType(type: string) {
  switch (type) {
    case 'ColorInput':
      return ColorInput
    case 'TextInput':
      return TextInput
    case 'NumberInput':
      return NumberInput
    case 'Select':
      return Select
    default:
      return null
  }
}

export function Options({ options, el, updateOptions }: Props) {
  return (
    <Box>
      {entries(options[el]!).map(([property, option]) => {
        const Input = getInputByType(option.type)
        const props = {}

        if (option.type === 'Select') {
          props.data = option.options!.map((option) => ({
            value: option,
            label: capitalize(option)
          }))
        }

        if (option.replace) {
          if (option.type === 'NumberInput') {
            Object.assign(props, replacers[option.replace])
          }

          if (option.replace === 'image') {
            props.hideControls = true
          }
        }

        return (
          <Input
            key={option.label}
            label={capitalize(option.label)}
            value={option.value}
            onChange={(value: string) => {
              updateOptions(el, property, value)
            }}
            {...props}
          />
        )
      })}
    </Box>
  )
}
