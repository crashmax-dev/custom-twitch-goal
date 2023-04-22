import decamelize from 'decamelize'
import { el } from 'zero-dependency'
import { selectors } from './constants'
import type { WidgetOptions } from './types'

function parserFactory(type: string) {
  const regexp = new RegExp(`${type}`)
  return {
    parser: (value: string) => value.replace(regexp, ''),
    formatter: (value: string) => `${value}${type}`
  }
}

export const pxParser = parserFactory('px')
export const remParser = parserFactory('rem')
export const percentParser = parserFactory('%')
export const imageParser = {
  parser: (value: string) => value.replaceAll(/url\(|\)/g, ''),
  formatter: (value: string) => `url(${value})`
}

export function isFunction(value: unknown): value is Function {
  return typeof value === 'function'
}

export function getBrightness(color: string) {
  const r = parseInt(color.substring(1, 3), 16)
  const g = parseInt(color.substring(3, 5), 16)
  const b = parseInt(color.substring(5, 7), 16)
  const brightness = (r * 299 + g * 587 + b * 114) / 1000
  return brightness
}

export function transformOptionsToStyles(styles: WidgetOptions) {
  return Object.entries(styles)
    .reduce<string[]>((classes, [selector, styles]) => {
      const classStyles = Object.entries(styles).reduce<string[]>(
        (styles, [property, value]) => {
          styles.push(
            `\n${decamelize(property, {
              separator: '-'
            })}: ${value} !important;`
          )
          return styles
        },
        []
      )
      classes.push(`${selectors[selector]} {${classStyles.join('')}}`)
      return classes
    }, [])
    .join('\n ')
}

export function copyToClipboard(text: string) {
  const copyTextarea = el(
    'textarea',
    {
      style: {
        position: 'fixed',
        opacity: '0'
      }
    },
    text
  )
  document.body.appendChild(copyTextarea)
  copyTextarea.select()
  document.execCommand('copy')
  document.body.removeChild(copyTextarea)
}
