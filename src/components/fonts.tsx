import { useCallback, useEffect, useMemo, useState } from 'react'
import { createProvider, Fetcher } from 'zero-dependency'
import { baseApiUrl } from '../constants'
import { WidgetOptions } from '../types'

export type FontVariants =
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900'
export type FontStyle = 'normal' | 'italic'
export type FontSubset = 'latin' | 'cyrillic'
export type FontType = 'woff2'

export interface FontItem {
  category: string
  defSubset: string
  family: string
  id: string
  lastModified: string
  styles: FontStyle[]
  subsets: FontSubset[]
  type: string
  variable: boolean
  version: string
  weights: number[]
}

export type FontVariant = {
  [key in FontVariants]: {
    [key in FontStyle]: {
      [key in FontSubset]: {
        url: {
          [key in FontType]: string
        }
      }
    }
  }
}

export interface Font {
  id: string
  family: string
  subsets: FontSubset
  weights: number[]
  styles: string[]
  unicodeRange: {
    [key in FontSubset]: string
  }
  defSubset: string
  variable: boolean
  category: string
  version: string
  type: string
  variants: FontVariant
}

const fetcher = new Fetcher(baseApiUrl)

class Fetch<T> {
  data: T | null = null
  isLoading = false

  async load(path: string, signal: AbortSignal): Promise<T | null> {
    try {
      this.isLoading = true
      signal.addEventListener('abort', () => (this.isLoading = false))
      this.data = await fetcher.get<T>(path, { signal })
      return this.data
    } catch (err) {
      console.log(err)
      return this.data
    }
  }
}

class FontService {
  loadFontList() {
    const fonts = new Fetch<Font[]>()
    const abortController = new AbortController()

    return {
      abortController,
      isLoading: fonts.isLoading,
      load: async () => await fonts.load('/fonts', abortController.signal)
    }
  }

  loadFont() {
    const font = new Fetch<Font>()
    const abortController = new AbortController()

    return {
      abortController,
      isLoading: font.isLoading,
      load: async (fontId: string) => {
        for (const fontFace of document.fonts.values()) {
          if (fontFace.family === fontId) {
            console.log('Font already loaded', fontFace)
            return
          }
        }

        const response = await font.load(
          `/fonts/${fontId}`,
          abortController.signal
        )

        if (!response) {
          console.log('Font not found')
          return
        }

        const fontSource = `url(${response.variants[400].normal.latin.url.woff2})`
        const fontFace = new FontFace(response.id, fontSource)
        document.fonts.add(fontFace)
        await fontFace.load()

        return response
      }
    }
  }
}

interface FontList {
  value: string
  label: string
}

export interface SelectedFonts {
  leftText: Font | null
  rightText: Font | null
}

const [useFont, Provider] = createProvider<{
  fonts: FontList[]
  selectedFonts: SelectedFonts
  changeFont: (type: string, fontId: string) => void
}>('Font')

export { useFont }

type FontProviderProps = React.PropsWithChildren<
  Pick<WidgetOptions, 'leftText' | 'rightText'>
>

export function FontProvider(props: FontProviderProps) {
  const [fonts, setFonts] = useState<Font[]>([])
  const [selectedFonts, setSelectedFont] = useState<{
    leftText: Font | null
    rightText: Font | null
  }>(() => ({
    leftText: null,
    rightText: null
  }))

  const fontService = useMemo(() => {
    const service = new FontService()

    return {
      loadFont: service.loadFont,
      loadFontList: service.loadFontList()
    }
  }, [])

  const changeFont = useCallback(
    (type: string, newFont: Font | string) => {
      if (typeof newFont === 'string') {
        const font = fonts.find((font) => font.id === newFont)
        if (!font) return
        setSelectedFont((prevValue) => ({ ...prevValue, [type]: font }))
      } else {
        setSelectedFont((prevValue) => ({ ...prevValue, [type]: newFont }))
      }
    },
    [fonts]
  )

  const fontsSelectors = useMemo(() => {
    changeFont('leftText', props.leftText.fontFamily)
    changeFont('rightText', props.rightText.fontFamily)

    return fonts.map((font) => {
      return {
        value: font.id,
        label: font.family
      }
    })
  }, [fonts])

  useEffect(() => {
    if (!selectedFonts.leftText) return

    const loadFont = fontService.loadFont()
    async function load() {
      const font = await loadFont.load(selectedFonts.leftText!.id)
      if (!font) return
      changeFont('leftText', font!)
    }

    load()
    return () => loadFont.abortController.abort()
  }, [selectedFonts.leftText])

  useEffect(() => {
    if (!selectedFonts.rightText) return

    const loadFont = fontService.loadFont()
    async function load() {
      const font = await loadFont.load(selectedFonts.rightText!.id)
      if (!font) return
      changeFont('rightText', font!)
    }

    load()
    return () => loadFont.abortController.abort()
  }, [selectedFonts.rightText])

  useEffect(() => {
    if (fontService.loadFontList.isLoading) return

    async function loadFonts() {
      const fonts = await fontService.loadFontList.load()
      if (fonts) {
        setFonts(fonts)
      }
    }

    loadFonts()

    return () => fontService.loadFontList.abortController.abort()
  }, [])

  return (
    <Provider value={{ fonts: fontsSelectors, selectedFonts, changeFont }}>
      {props.children}
    </Provider>
  )
}
