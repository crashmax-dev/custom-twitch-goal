import { forwardRef, useImperativeHandle, useRef } from 'react'
import { nbsp } from 'zero-dependency'
import type { WidgetHandlers } from '../types'

export const Widget = forwardRef<WidgetHandlers>((props, ref) => {
  const borderRef = useRef<HTMLDivElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const leftTextRef = useRef<HTMLDivElement>(null)
  const rightTextRef = useRef<HTMLDivElement>(null)

  useImperativeHandle(ref, () => ({
    get border() {
      return borderRef.current!
    },
    get progressBar() {
      return progressBarRef.current!
    },
    get image() {
      return imageRef.current!
    },
    get leftText() {
      return leftTextRef.current!
    },
    get rightText() {
      return rightTextRef.current!
    }
  }))

  return (
    <div className="Layout-sc-1xcs6mc-0 hRLJMK goal_widget_preview">
      <div
        ref={borderRef}
        className="Layout-sc-1xcs6mc-0 eKxtVw goal_widget"
      >
        <div
          ref={progressBarRef}
          className="Layout-sc-1xcs6mc-0 ljqBaS goal_widget__progress_bar"
        ></div>
        <div className="Layout-sc-1xcs6mc-0 crsJCR goal_widget__body">
          <img
            ref={imageRef}
            className="goal_widget__image tw-image"
            src="/follow.svg"
          />
          <div className="Layout-sc-1xcs6mc-0 kDZnES goal_widget__metadata">
            <div
              ref={leftTextRef}
              className="Layout-sc-1xcs6mc-0 beAYWq"
              style={{ color: 'rgb(14, 14, 16)' }}
            >
              Follower Goal
            </div>
            <div
              ref={rightTextRef}
              className="Layout-sc-1xcs6mc-0 bTJhJp goal_widget__contributions"
              style={{ color: 'rgb(83, 83, 95)' }}
            >
              <span className="CoreText-sc-1txzju1-0 feJdGm InjectLayout-sc-1i43xsx-0 ScTransitionBase-sc-hx4quq-0 eUxEWt hlGewn tw-transition">
                1500{nbsp().textContent}
              </span>
              / 3000 Followers
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})
