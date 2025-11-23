import React from 'react'
import BubbleGame from './MiniGames/BubbleGame'
import LightningGame from './MiniGames/LightningGame'
import YinYangGame from './MiniGames/YinYangGame'
import ColoringGame from './MiniGames/ColoringGame'

const MINI_GAMES = {
  BubbleGame,
  LightningGame,
  YinYangGame,
  ColoringGame
}

function QuestionsBlock({ questions }) {
  if (!questions?.length) return null
  return (
    <div className="scene-questions">
      {questions.map((q) => (
        <div key={q.q} className="question">
          <strong>{q.q}</strong>
          <ul>
            {q.choices.map((choice) => (
              <li key={choice}>{choice}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default function Scene({ scene, index, total }) {
  if (!scene) return null
  const GameComponent = scene.game ? MINI_GAMES[scene.game] : null
  const gameProps = {
    hint: scene.gameHint,
    ...(scene.gameProps ?? {})
  }

  return (
    <main className="scene-root" aria-live="polite">
      <div className="video-wrapper">
        <video
          className="scene-video"
          src={scene.video}
          playsInline
          muted
          loop
          autoPlay
          preload="metadata"
        />
      </div>

      <section className="scene-content">
        <header>
          <p className="scene-progress">
            Scène {index + 1} sur {total}
          </p>
          <h1 className="scene-title">{scene.title}</h1>
        </header>

        <p className="scene-text">{scene.text}</p>

        <QuestionsBlock questions={scene.questions} />

        <div className="mini-game" aria-label="Mini-jeu interactif">
          {GameComponent ? (
            <GameComponent {...gameProps} />
          ) : (
            <p>Mini-jeu en préparation…</p>
          )}
        </div>
      </section>
    </main>
  )
}
