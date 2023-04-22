import {
  ColorInput,
  NumberInput,
  Select,
  SimpleGrid,
  Stack,
  Tabs
} from '@mantine/core'
import {
  IconBorderCorners,
  IconTextSize,
  IconTexture
} from '@tabler/icons-react'
import { borderStyles } from '../constants'
import { pxParser, remParser } from '../utils'
import type { WidgetOptions, WidgetSetValue } from '../types'

interface OptionsProps {
  options: WidgetOptions
  updateOptions: WidgetSetValue
}

export function Options({ options, updateOptions }: OptionsProps) {
  return (
    <Tabs
      radius="md"
      variant="pills"
      defaultValue="border"
    >
      <Tabs.List grow>
        <Tabs.Tab
          icon={<IconBorderCorners size={16} />}
          value="border"
        >
          Border
        </Tabs.Tab>
        <Tabs.Tab
          icon={<IconTexture size={16} />}
          value="background"
        >
          Background
        </Tabs.Tab>
        <Tabs.Tab
          icon={<IconTextSize size={16} />}
          value="text"
        >
          Text
        </Tabs.Tab>
      </Tabs.List>
      <Stack pt="lg">
        <BorderOptions
          options={options}
          updateOptions={updateOptions}
        />
        <BackgroundOptions
          options={options}
          updateOptions={updateOptions}
        />
        <TextOptions
          options={options}
          updateOptions={updateOptions}
        />
      </Stack>
    </Tabs>
  )
}

function BorderOptions({ options, updateOptions }: OptionsProps) {
  return (
    <Tabs.Panel value="border">
      <ColorInput
        label="Color"
        format="hex"
        value={options.widget.borderColor}
        onChange={(value) => {
          updateOptions('widget', 'borderColor', value)
        }}
      />
      <NumberInput
        label="Width"
        min={0}
        step={1}
        value={Number(pxParser.parser(options.widget.borderWidth))}
        onChange={(value) => {
          updateOptions('widget', 'borderWidth', `${value}px`)
        }}
        {...pxParser}
      />
      <NumberInput
        label="Radius"
        min={0}
        step={1}
        value={Number(remParser.parser(options.widget.borderRadius))}
        onChange={(value) => {
          updateOptions('widget', 'borderRadius', `${value}rem`)
        }}
        {...remParser}
      />
      <Select
        label="Style"
        value={options.widget.borderStyle}
        data={borderStyles}
        onChange={(value) => {
          updateOptions('widget', 'borderStyle', value!)
        }}
        searchable
      />
    </Tabs.Panel>
  )
}

function BackgroundOptions({ options, updateOptions }: OptionsProps) {
  return (
    <Tabs.Panel value="background">
      <SimpleGrid
        cols={2}
        spacing="sm"
        verticalSpacing="sm"
      >
        <ColorInput
          label="Left"
          format="hex"
          value={options.progressBar.backgroundColor}
          onChange={(value) => {
            updateOptions('progressBar', 'backgroundColor', value)
          }}
        />
        <ColorInput
          label="Right"
          format="hex"
          value={options.widget.backgroundColor}
          onChange={(value) => {
            updateOptions('widget', 'backgroundColor', value)
          }}
        />
      </SimpleGrid>
    </Tabs.Panel>
  )
}

function TextOptions({ options, updateOptions }: OptionsProps) {
  return (
    <Tabs.Panel value="text">
      <SimpleGrid
        cols={2}
        spacing="sm"
        verticalSpacing="sm"
      >
        <NumberInput
          label="Size"
          min={0}
          step={1}
          value={Number(pxParser.parser(options.leftText.fontSize))}
          onChange={(value) => {
            updateOptions('leftText', 'fontSize', `${value}px`)
          }}
          {...pxParser}
        />
        <NumberInput
          label="Size"
          min={0}
          step={1}
          value={Number(pxParser.parser(options.rightText.fontSize))}
          onChange={(value) => {
            updateOptions('rightText', 'fontSize', `${value}px`)
          }}
          {...pxParser}
        />
        <ColorInput
          label="Color"
          format="hex"
          value={options.leftText.color}
          onChange={(value) => {
            updateOptions('leftText', 'color', value)
          }}
        />
        <ColorInput
          label="Color"
          format="hex"
          value={options.rightText.color}
          onChange={(value) => {
            updateOptions('rightText', 'color', value)
          }}
        />
      </SimpleGrid>
    </Tabs.Panel>
  )
}
