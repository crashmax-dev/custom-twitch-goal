import { useState } from 'react'
import {
  Box,
  Center,
  Checkbox,
  ColorInput,
  createStyles,
  NumberInput,
  rem,
  SegmentedControl,
  Select,
  SimpleGrid,
  Stack
} from '@mantine/core'
import {
  IconBorderCorners,
  IconTextSize,
  IconTexture
} from '@tabler/icons-react'
import { borderStyles } from '../constants'
import { getBrightness, pxParser, remParser } from '../utils'
import type { WidgetOptions, WidgetSetValue } from '../types'

interface OptionsProps {
  options: WidgetOptions
  updateOptions: WidgetSetValue
}

const useStyles = createStyles<string, string>((theme, backgroundColor) => ({
  root: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
    boxShadow: theme.shadows.md,
    border: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[1]
    }`
  },

  indicator: {
    background: backgroundColor
  },

  control: {
    border: '0 !important'
  },

  label: {
    '&, &:hover': {
      '&[data-active]': {
        color: getBrightness(backgroundColor) > 128 ? theme.black : theme.white
      }
    }
  }
}))

const tabs = {
  border: BorderOptions,
  background: BackgroundOptions,
  text: TextOptions
}

type Tabs = keyof typeof tabs

export function Options({ options, updateOptions }: OptionsProps) {
  const [tab, setTab] = useState<Tabs>('border')
  const { classes } = useStyles(options.progressBar.backgroundColor)
  const Component = tabs[tab]

  return (
    <Stack pt="lg">
      <SegmentedControl
        fullWidth
        radius="lg"
        data={[
          {
            value: 'border',
            label: (
              <Center>
                <IconBorderCorners size={16} />
                <Box ml={10}>Border</Box>
              </Center>
            )
          },
          {
            value: 'background',
            label: (
              <Center>
                <IconTexture size={16} />
                <Box ml={10}>Background</Box>
              </Center>
            )
          },
          {
            value: 'text',
            label: (
              <Center>
                <IconTextSize size={16} />
                <Box ml={10}>Text</Box>
              </Center>
            )
          }
        ]}
        classNames={classes}
        onChange={(value: Tabs) => setTab(value)}
      />
      <Component
        options={options}
        updateOptions={updateOptions}
      />
    </Stack>
  )
}

// box-shadow: 0 0 0 1px skyblue;
function BorderOptions({ options, updateOptions }: OptionsProps) {
  const isOutline = options.widget.outlineWidth !== '0px'

  return (
    <>
      <SimpleGrid
        cols={2}
        spacing="sm"
        verticalSpacing="sm"
      >
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
      </SimpleGrid>
      <Checkbox
        label="Outline"
        description="Use outline border"
        checked={isOutline}
        onChange={(event) => {
          const isChecked = event.currentTarget.checked
          updateOptions(
            'widget',
            'outlineWidth',
            isChecked ? options.widget.borderWidth : '0px'
          )
        }}
      />
      {isOutline && (
        <SimpleGrid
          cols={3}
          spacing="sm"
          verticalSpacing="sm"
        >
          <ColorInput
            label="Color"
            format="hex"
            value={options.widget.outlineColor}
            onChange={(value) => {
              updateOptions('widget', 'outlineColor', value)
            }}
          />
          <NumberInput
            label="Width"
            min={0}
            step={1}
            value={Number(pxParser.parser(options.widget.outlineWidth))}
            onChange={(value) => {
              updateOptions('widget', 'outlineWidth', `${value}px`)
            }}
            {...pxParser}
          />
          <Select
            label="Style"
            value={options.widget.outlineStyle}
            data={borderStyles}
            onChange={(value) => {
              updateOptions('widget', 'outlineStyle', value!)
            }}
            searchable
          />
        </SimpleGrid>
      )}
    </>
  )
}

function BackgroundOptions({ options, updateOptions }: OptionsProps) {
  return (
    <>
      <SimpleGrid
        cols={2}
        spacing="sm"
        verticalSpacing="sm"
      >
        <ColorInput
          label="Color"
          format="hex"
          value={options.progressBar.backgroundColor}
          onChange={(value) => {
            updateOptions('progressBar', 'backgroundColor', value)
          }}
        />
        <ColorInput
          label="Color"
          format="hex"
          value={options.widget.backgroundColor}
          onChange={(value) => {
            updateOptions('widget', 'backgroundColor', value)
          }}
        />
      </SimpleGrid>
    </>
  )
}

function TextOptions({ options, updateOptions }: OptionsProps) {
  return (
    <>
      <SimpleGrid
        cols={2}
        spacing="sm"
        verticalSpacing="sm"
      >
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
        <NumberInput
          label="Font size"
          min={0}
          step={1}
          value={Number(pxParser.parser(options.leftText.fontSize))}
          onChange={(value) => {
            updateOptions('leftText', 'fontSize', `${value}px`)
          }}
          {...pxParser}
        />
        <NumberInput
          label="Font size"
          min={0}
          step={1}
          value={Number(pxParser.parser(options.rightText.fontSize))}
          onChange={(value) => {
            updateOptions('rightText', 'fontSize', `${value}px`)
          }}
          {...pxParser}
        />
        <NumberInput
          label="Font weight"
          min={100}
          step={100}
          max={900}
          value={options.leftText.fontWeight}
          onChange={(value) => {
            updateOptions('leftText', 'fontWeight', value)
          }}
        />
        <NumberInput
          label="Font weight"
          min={100}
          step={100}
          max={900}
          value={options.rightText.fontWeight}
          onChange={(value) => {
            updateOptions('rightText', 'fontWeight', value)
          }}
        />
        <Checkbox
          label="Italic"
          description="Applies on the left text"
          checked={options.leftText.fontStyle === 'italic'}
          onChange={(event) => {
            const isChecked = event.currentTarget.checked
            updateOptions(
              'leftText',
              'fontStyle',
              isChecked ? 'italic' : 'normal'
            )
          }}
        />
        <Checkbox
          label="Italic"
          description="Applies on the right text"
          checked={options.rightText.fontStyle === 'italic'}
          onChange={(event) => {
            const isChecked = event.currentTarget.checked
            updateOptions(
              'rightText',
              'fontStyle',
              isChecked ? 'italic' : 'normal'
            )
          }}
        />
      </SimpleGrid>
      <Checkbox
        label="Inherit font weight"
        description="Applies on the goal counter"
        checked={options.counterText.fontWeight === 'inherit'}
        onChange={(event) => {
          const isChecked = event.currentTarget.checked
          updateOptions(
            'counterText',
            'fontWeight',
            isChecked ? 'inherit' : 600
          )
        }}
      />
    </>
  )
}
