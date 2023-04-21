import type { WidgetOptions } from './types'

export const selectors = {
  border: '.goal_widget',
  progressBar: '.goal_widget__progress_bar',
  image: '.goal_widget__image.tw-image',
  leftText: '.goal_widget__metadata > div:first-child',
  rightText: '.goal_widget__contributions'
}

export const tabs = Object.keys(selectors)

const borderStyles = [
  'dashed',
  'dotted',
  'double',
  'groove',
  'hidden',
  'inset',
  'none',
  'outset',
  'ridge',
  'solid'
]

export const replacers: Record<
  string,
  {
    parser: (value: any) => string
    formatter: (value: any) => string
  }
> = {
  px: {
    parser: (value) => value.replace(/px/g, ''),
    formatter: (value) => `${value}px`
  },
  percentage: {
    parser: (value) => value.replace(/%/g, ''),
    formatter: (value) => `${value}%`
  },
  image: {
    parser: (value) => value.replaceAll(/url\(|\)/g, ''),
    formatter: (value) => `url(${value})`
  }
}

export const defaultOptions: WidgetOptions = {
  border: {
    borderRadius: {
      type: 'NumberInput',
      value: 1,
      label: 'Radius',
      replace: 'px'
    },
    borderWidth: {
      type: 'NumberInput',
      value: 3,
      label: 'Width',
      replace: 'px'
    },
    borderStyle: {
      type: 'Select',
      value: 'solid',
      label: 'Style',
      options: borderStyles
    },
    borderColor: {
      type: 'ColorInput',
      value: '#000000',
      label: 'Color'
    }
  },
  progressBar: {
    width: {
      type: 'NumberInput',
      value: 50,
      label: 'Width',
      replace: 'percentage'
    },
    backgroundColor: {
      type: 'ColorInput',
      value: 'rgb(2, 153, 255)',
      label: 'Color'
    }
  },
  image: {
    content: {
      type: 'NumberInput',
      value: 'follow.svg',
      label: 'Image URL',
      replace: 'image'
    }
  },
  leftText: {},
  rightText: {}
}
