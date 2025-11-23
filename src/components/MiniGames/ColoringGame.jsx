import React, { useRef, useEffect, useState } from 'react'

export default function ColoringGame({ hint = 'Colorie le nid avec ton doigt.' }) {
  const canvasRef = useRef(null)
  const [drawing, setDrawing] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }, [])

  function drawStroke(e) {
    if (!drawing) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const rect = canvas.getBoundingClientRect()
    const point = e.touches ? e.touches[0] : e
    if (!point) return
    const x = point.clientX - rect.left
    const y = point.clientY - rect.top
    ctx.fillStyle = '#ff4081'
    ctx.beginPath()
    ctx.arc(x, y, 12, 0, Math.PI * 2)
    ctx.fill()
  }

  function start(e) {
    e.preventDefault()
    setDrawing(true)
    drawStroke(e)
  }

  function move(e) {
    if (!drawing) return
    e.preventDefault()
    drawStroke(e)
  }

  function end() {
    setDrawing(false)
  }

  return (
    <section className="mini-game-card coloring-game">
      <canvas
        ref={canvasRef}
        width={320}
        height={200}
        className="color-canvas"
        onPointerDown={start}
        onPointerMove={move}
        onPointerUp={end}
        onPointerLeave={end}
        onPointerCancel={end}
      />
      <p className="hint">{hint}</p>
    </section>
  )
}
