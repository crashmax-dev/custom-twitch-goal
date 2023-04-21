export type WidgetOptions = Record<string, WidgetStyleOptions>
export type WidgetStyleOptions = Record<
  string,
  {
    type: string
    value: string | number
    label: string
    replace?: string
    options?: string[]
  }
>

export interface WidgetHandlers {
  border: HTMLDivElement
  progressBar: HTMLDivElement
  image: HTMLImageElement
  leftText: HTMLDivElement
  rightText: HTMLDivElement
}
