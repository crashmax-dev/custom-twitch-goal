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
