import React, { useState } from 'react'

export default function LightningGame({ hint = 'Glisse pour adoucir la foudre.' }) {
  const [intensity, setIntensity] = useState(50)

  function handleChange(e) {
    setIntensity(Number(e.target.value))
  }

  return (
    <section className="mini-game-card lightning-game">
      <div
        className="lightning-visual"
        style={{ filter: `brightness(${120 - intensity}%)` }}
        aria-live="polite"
      >
        ⚡
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={intensity}
        onChange={handleChange}
        aria-label="Adoucir la foudre"
      />
      <p className="hint">
        {hint} ({intensity}%)
      </p>
    </section>
  )
}
