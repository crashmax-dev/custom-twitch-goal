import { capitalize } from 'zero-dependency'
import type { WidgetOptions } from './types'

export const selectors: Record<string, string> = {
  widget: '.goal_widget',
  progressBar: '.goal_widget__progress_bar',
  image: '.goal_widget__image.tw-image',
  leftText: '.goal_widget__metadata > div:first-child',
  rightText: '.goal_widget__contributions',
  counterText: '.goal_widget__contributions > span'
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
    backgroundColor: '#ffffff'
  },
  progressBar: {
    backgroundColor: '#0299FF'
  },
  image: {
    contentVisibility: 'visible',
    content: `url(${location.origin}/follow.svg)`
  },
  leftText: {
    color: '#0E0E10',
    fontFamily: 'inter',
    fontSize: '28px',
    fontWeight: 400,
    fontStyle: 'normal'
  },
  rightText: {
    color: '#53535F',
    fontFamily: 'inter',
    fontSize: '28px',
    fontWeight: 400,
    fontStyle: 'normal'
  },
  counterText: {
    fontWeight: 600
  }
}

export const baseApiUrl = 'https://api.fontsource.org/v1'
