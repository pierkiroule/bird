import React, { useRef, useState } from 'react'

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

export default function BubbleGame({ hint = 'Déplace la bulle pour protéger le nid.' }) {
  const areaRef = useRef(null)
  const [pos, setPos] = useState({ x: 50, y: 50 })
  const [dragging, setDragging] = useState(false)

  function updatePosition(e) {
    const area = areaRef.current
    if (!area) return
    const rect = area.getBoundingClientRect()
    const point = e.touches ? e.touches[0] : e
    if (!point) return
    const x = ((point.clientX - rect.left) / rect.width) * 100
    const y = ((point.clientY - rect.top) / rect.height) * 100
    setPos({ x: clamp(x, 0, 95), y: clamp(y, 0, 95) })
  }

  function start(e) {
    e.preventDefault()
    setDragging(true)
    updatePosition(e)
  }

  function move(e) {
    if (!dragging) return
    e.preventDefault()
    updatePosition(e)
  }

  function end() {
    setDragging(false)
  }

  return (
    <section className="mini-game-card bubble-game">
      <div
        ref={areaRef}
        className="bubble-area"
        onPointerDown={start}
        onPointerMove={move}
        onPointerUp={end}
        onPointerLeave={end}
        onPointerCancel={end}
      >
        <div
          className="bubble"
          style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
          aria-label="Bulle protectrice"
        />
      </div>
      <p className="hint">{hint}</p>
    </section>
  )
}
