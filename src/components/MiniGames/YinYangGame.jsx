import React, { useRef, useState } from 'react'

export default function YinYangGame({ hint = 'Touchez et faites tourner pour équilibrer.' }) {
  const wrapRef = useRef(null)
  const [angle, setAngle] = useState(0)
  const draggingRef = useRef(false)

  function updateAngle(e) {
    const wrap = wrapRef.current
    if (!wrap) return
    const rect = wrap.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const point = e.touches ? e.touches[0] : e
    if (!point) return
    const rad = Math.atan2(point.clientY - cy, point.clientX - cx)
    setAngle(rad)
  }

  function start(e) {
    draggingRef.current = true
    updateAngle(e)
  }

  function move(e) {
    if (!draggingRef.current) return
    e.preventDefault()
    updateAngle(e)
  }

  function end() {
    draggingRef.current = false
  }

  return (
    <section className="mini-game-card yinyang-game">
      <div
        ref={wrapRef}
        className="yinyang-wrap"
        onPointerDown={start}
        onPointerMove={move}
        onPointerUp={end}
        onPointerLeave={end}
        onPointerCancel={end}
      >
        <div className="yinyang" style={{ transform: `rotate(${angle}rad)` }} />
      </div>
      <p className="hint">{hint}</p>
    </section>
  )
}
