import React, { useRef, useEffect, useState } from 'react'

export default function ColoringGame() {
  const canvasRef = useRef(null)
  const [drawing, setDrawing] = useState(false)

  useEffect(() => {
    const c = canvasRef.current
    if (!c) return
    const ctx = c.getContext('2d')
    ctx.fillStyle = '#fff0'
    ctx.fillRect(0, 0, c.width, c.height)
  }, [])

  function start(e) {
    setDrawing(true)
    draw(e)
  }
  function end() {
    setDrawing(false)
  }
  function draw(e) {
    if (!drawing) return
    const c = canvasRef.current
    const ctx = c.getContext('2d')
    const rect = c.getBoundingClientRect()
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left
    const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top
    ctx.fillStyle = '#ff4081'
    ctx.beginPath()
    ctx.arc(x, y, 12, 0, Math.PI * 2)
    ctx.fill()
  }

  return (
    <div className="coloring-game">
      <canvas
        ref={canvasRef}
        width={300}
        height={200}
        className="color-canvas"
        onMouseDown={start}
        onMouseUp={end}
        onMouseMove={draw}
        onTouchStart={start}
        onTouchEnd={end}
        onTouchMove={draw}
      />
      <p className="hint">Colorie le nid avec ton doigt.</p>
    </div>
  )
}
