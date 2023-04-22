import { capitalize } from 'zero-dependency'
import type { WidgetOptions } from './types'

export const selectors = {
  border: '.goal_widget',
  progressBar: '.goal_widget__progress_bar',
  image: '.goal_widget__image.tw-image',
  leftText: '.goal_widget__metadata > div:first-child',
  rightText: '.goal_widget__contributions'
}

export const borderStyles = [
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
].map((border) => ({
  value: border,
  label: capitalize(border)
}))

export const fontStyles = [
  'normal',
  'italic',
  'oblique'
]

export const defaultOptions: WidgetOptions = {
  widget: {
    borderRadius: '1rem',
    borderWidth: '3px',
    borderStyle: 'solid',
    borderColor: '#000000',
    backgroundColor: '#ffffff',
    outlineWidth: '0px',
    outlineStyle: 'solid',
    outlineColor: '#0299FF'
  },
  progressBar: {
    backgroundColor: '#0299FF'
  },
  image: {
    contentVisibility: 'visible',
    content: `url(${location.href}follow.svg)`
  },
  leftText: {
    color: '#0E0E10',
    fontSize: '28px',
    fontWeight: 400,
    fontStyle: 'normal'
  },
  rightText: {
    color: '#53535F',
    fontSize: '28px',
    fontWeight: 400,
    fontStyle: 'normal'
  },
  counterText: {
    fontWeight: 600
  }
}
