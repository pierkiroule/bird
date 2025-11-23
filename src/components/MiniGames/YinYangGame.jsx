import React, { useRef } from 'react'

export default function YinYangGame() {
  const wrapRef = useRef(null)

  function onPointerDown(e) {
    const el = wrapRef.current
    if (!el) return
    el.setPointerCapture(e.pointerId)
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2

    function move(ev) {
      const ang = Math.atan2(ev.clientY - cy, ev.clientX - cx)
      el.style.transform = `rotate(${ang}rad)`
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
    <div className="yinyang-game">
      <div className="yinyang-wrap" ref={wrapRef} onPointerDown={onPointerDown}>
        <div className="yinyang" />
      </div>
      <p className="hint">Touchez et faites tourner le cercle.</p>
    </div>
  )
}
