import React, { useState, useRef, useEffect } from 'react'
import scenes from './data/scenes.json'
import Scene from './components/Scene'

export default function App() {
  const [index, setIndex] = useState(0)
  const touchStartX = useRef(null)

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [index])

  function prev() {
    setIndex((i) => Math.max(0, i - 1))
  }
  function next() {
    setIndex((i) => Math.min(scenes.length - 1, i + 1))
  }

  function handleTouchStart(e) {
    touchStartX.current = e.touches ? e.touches[0].clientX : e.clientX
  }

  function handleTouchEnd(e) {
    const x = e.changedTouches ? e.changedTouches[0].clientX : e.clientX
    const start = touchStartX.current
    if (start == null) return
    const diff = x - start
    if (Math.abs(diff) > 40) {
      if (diff < 0) next()
      else prev()
    }
    touchStartX.current = null
  }

  return (
    <div
      className="app-root"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleTouchStart}
      onMouseUp={handleTouchEnd}
    >
      <Scene scene={scenes[index]} index={index} total={scenes.length} />
    </div>
  )
}
