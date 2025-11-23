import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import scenes from './data/scenes.json'
import Scene from './components/Scene'

const SWIPE_THRESHOLD = 40
const HINT_TIMEOUT = 4000

export default function App() {
  const [index, setIndex] = useState(0)
  const [showHint, setShowHint] = useState(true)
  const touchStartX = useRef(null)
  const total = scenes.length
  const scene = useMemo(() => scenes[index], [index])

  const prev = useCallback(() => {
    setIndex((i) => Math.max(0, i - 1))
  }, [])

  const next = useCallback(() => {
    setIndex((i) => Math.min(total - 1, i + 1))
  }, [total])

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev])

  useEffect(() => {
    if (!showHint) return
    const timer = window.setTimeout(() => setShowHint(false), HINT_TIMEOUT)
    return () => window.clearTimeout(timer)
  }, [showHint, index])

  function registerStart(e) {
    const point = e.touches ? e.touches[0] : e
    touchStartX.current = point?.clientX ?? null
    setShowHint(false)
  }

  function handleTouchEnd(e) {
    const point = e.changedTouches ? e.changedTouches[0] : e
    if (!point) return
    const start = touchStartX.current
    if (start == null) return
    const diff = point.clientX - start
    if (Math.abs(diff) > SWIPE_THRESHOLD) {
      if (diff < 0) next()
      else prev()
    }
    touchStartX.current = null
  }

  return (
    <div
      className="app-root"
      onTouchStart={registerStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={registerStart}
      onMouseUp={handleTouchEnd}
    >
      <Scene scene={scene} index={index} total={total} />

      <div className="app-progress" aria-hidden="true">
        <div className="app-progress-bar">
          <span style={{ width: `${((index + 1) / total) * 100}%` }} />
        </div>
        <small>
          {index + 1} / {total}
        </small>
      </div>

      {showHint && (
        <div className="swipe-hint" role="status" aria-live="polite">
          <img src="/assets/icons/swipe.svg" alt="" />
          <span>Glisse pour continuer</span>
        </div>
      )}
    </div>
  )
}
