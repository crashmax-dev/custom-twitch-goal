export type WidgetOptions = {
  widget: {
    backgroundColor: string
    borderRadius: string
    borderWidth: string
    borderStyle: string
    borderColor: string
    outlineWidth: string
    outlineStyle: string
    outlineColor: string
  }
  progressBar: {
    backgroundColor: string
  }
  image: {
    content: string
  }
  leftText: {
    color: string
    fontSize: string
    fontWeight: number
    fontStyle: string
  }
  rightText: {
    color: string
    fontSize: string
    fontWeight: number
    fontStyle: string
  }
  counterText: {
    fontWeight: string | number
  }
}

export interface WidgetElements {
  widget: HTMLDivElement
  progressBar: HTMLDivElement
  image: HTMLImageElement
  leftText: HTMLDivElement
  rightText: HTMLDivElement
  counterText: HTMLDivElement
}

export type WidgetSetValue = <T extends keyof WidgetElements>(
  el: T,
  property: keyof WidgetOptions[T],
  value: string | number | boolean
) => void
