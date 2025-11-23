import React from 'react'
import BubbleGame from './MiniGames/BubbleGame'
import LightningGame from './MiniGames/LightningGame'
import YinYangGame from './MiniGames/YinYangGame'
import ColoringGame from './MiniGames/ColoringGame'

function GameLoader({ name }) {
  if (name === 'BubbleGame') return <BubbleGame />
  if (name === 'LightningGame') return <LightningGame />
  if (name === 'YinYangGame') return <YinYangGame />
  if (name === 'ColoringGame') return <ColoringGame />
  return null
}

export default function Scene({ scene, index, total }) {
  if (!scene) return null
  return (
    <main className="scene-root">
      <div className="video-wrapper">
        <video className="scene-video" src={scene.video} playsInline muted autoPlay loop />
      </div>
      <section className="scene-content">
        <h1 className="scene-title">{scene.title}</h1>
        <p className="scene-text">{scene.text}</p>

        {scene.questions && scene.questions.length > 0 && (
          <div className="scene-questions">
            {scene.questions.map((q, i) => (
              <div key={i} className="question">
                <strong>{q.q}</strong>
                <ul>
                  {q.choices.map((c, j) => (
                    <li key={j}>{c}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        <div className="mini-game">
          <GameLoader name={scene.game} />
        </div>

        <div className="scene-footer">
          <small>{index + 1} / {total}</small>
        </div>
      </section>
    </main>
  )
}
