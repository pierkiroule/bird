import React, { useRef, useState } from 'react'

export default function BubbleGame() {
  const boxRef = useRef(null)
  const [pos, setPos] = useState({ x: 50, y: 50 })

  function onPointerDown(e) {
    const el = boxRef.current
    if (!el) return
    el.setPointerCapture(e.pointerId)
    const startX = e.clientX
    const startY = e.clientY
    const sx = pos.x
    const sy = pos.y

    function move(ev) {
      const dx = ev.clientX - startX
      const dy = ev.clientY - startY
      setPos({ x: sx + dx, y: sy + dy })
    }
    function up(ev) {
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerup', up)
      try { el.releasePointerCapture(ev.pointerId) } catch {}
    }

    el.addEventListener('pointermove', move)
    el.addEventListener('pointerup', up)
  }

  return (
    <div className="bubble-game">
      <div className="bubble-area">
        <div
          ref={boxRef}
          onPointerDown={onPointerDown}
          className="bubble"
          style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
        />
      </div>
      <p className="hint">Déplace la bulle pour protéger le nid.</p>
    </div>
  )
}
