import { useLayoutEffect, useRef } from 'react'

type CallbackFn<T extends (...args: any[]) => void> = (
  ...args: Parameters<T>
) => void

export function useCallbackRef<T extends (...args: any[]) => any>(
  callback: T
): CallbackFn<T> {
  const ref: React.MutableRefObject<{
    stableFn: CallbackFn<T>
    callback: CallbackFn<T>
  }> = useRef({
    stableFn: (...args) => ref.current.callback(...args),
    callback
  })

  useLayoutEffect(() => {
    ref.current.callback = callback
  })

  return ref.current.stableFn
}
