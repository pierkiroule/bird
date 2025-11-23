import React, { useState } from 'react'

export default function LightningGame() {
  const [soft, setSoft] = useState(50)

  return (
    <div className="lightning-game">
      <div className="lightning-visual" style={{ filter: `brightness(${100 - soft}%)` }}>
        ⚡
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={soft}
        onChange={(e) => setSoft(Number(e.target.value))}
        aria-label="Adoucir la foudre"
      />
      <p className="hint">Glisse pour adoucir la foudre ({soft}%).</p>
    </div>
  )
}
