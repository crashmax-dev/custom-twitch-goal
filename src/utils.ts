import decamelize from 'decamelize'
import { el, entries } from 'zero-dependency'
import { selectors } from './constants'
import type { SelectedFonts } from './components/fonts'
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

export function transformOptionsToStyles(
  styles: WidgetOptions,
  fonts: SelectedFonts
) {
  const widgetStyles = entries(styles)
    .reduce<string[]>((classes, [selector, styles]) => {
      const classStyles = entries(styles).reduce<string[]>(
        (styles, [property, value]) => {
          styles.push(
            `\n${decamelize(property, {
              separator: '-'
            })}: ${
              property === 'fontFamily' ? `"${value}", sans-serif` : value
            } !important;`
          )
          return styles
        },
        []
      )
      classes.push(`${selectors[selector]} {${classStyles.join('')}}`)
      return classes
    }, [])
    .join('\n')

  const fontFaces = entries(fonts)
    .reduce<string[]>((fontFaces, [selector, font]) => {
      fontFaces.push(`@font-face {
      font-family: "${font!.id}";
      font-style: normal;
      font-weight: 400;
      src: url(${font!.variants['400'].normal.latin.url.woff2}) format("woff2");
      unicode-range: ${
        font!.unicodeRange?.latin ?? font!.unicodeRange.cyrillic
      };
    }`)
      return fontFaces
    }, [])
    .join('\n')

  return `${fontFaces}\n${widgetStyles}`
}
