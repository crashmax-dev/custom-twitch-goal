export type WidgetOptions = {
  widget: {
    backgroundColor: string
    borderRadius: string
    borderWidth: string
    borderStyle: string
    borderColor: string
  }
  progressBar: {
    backgroundColor: string
  }
  image: {
    contentVisibility: string
    content: string
  }
  leftText: {
    color: string
    fontFamily: string
    fontSize: string
    fontWeight: number
    fontStyle: string
  }
  rightText: {
    color: string
    fontFamily: string
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
