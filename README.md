# bird — conte transnumériste tactile

Webapp React + Vite mobile-first pour raconter un conte de 8 scènes vidéo reliées à quatre mini-jeux tactiles.

## Scripts

```bash
npm install      # installe les dépendances
npm run dev      # démarre Vite en mode développement
npm run build    # build de production
npm run preview  # prévisualisation locale du build
```

## Structure clé

- `src/main.jsx` : point d’entrée, applique les styles globaux.
- `src/App.jsx` : navigation swipe + clavier, indicateur de progression, hint gestuel.
- `src/data/scenes.json` : définit les 8 scènes (titre, texte, vidéo, questions, type de mini-jeu, hint).
- `src/components/Scene.jsx` : orchestre vidéo, narration, questions, mini-jeu.
- `src/components/MiniGames/*.jsx` : Bubble, Lightning, YinYang, Coloring (tous pointer/touch friendly).
- `src/styles/global.css` : base mobile-first, thèmes, animations, composants UI.
- `public/assets/scenes/scene{1..8}.mp4` : vidéos 720p max.
- `public/assets/icons/` : icônes SVG (ex. `swipe.svg`).

## Ajouter / mettre à jour les scènes

1. Dupliquer une entrée dans `src/data/scenes.json`.
2. Mettre à jour `id`, `title`, `video` (chemin `/assets/scenes/<nom>.mp4`), `text`, `questions`, `game`, `gameHint`.
3. Placer la vidéo correspondante dans `public/assets/scenes/` (encodage H.264 + AAC, ≤1.5 Mo).
4. Relancer `npm run dev` si nécessaire (Vite recharge automatiquement).

Les mini-jeux acceptent des props additionnelles via le champ optionnel `gameProps` dans le JSON (ex. `{"gameProps":{"color":"#ff0"}}`).

## Gestes & accessibilité

- Swipe gauche/droite (touch/mouse) + flèches clavier.
- Vidéos en lecture automatique `muted` pour compatibilité mobile.
- Mini-jeux compatibles pointer events (touch, stylet, souris).

## Prochaines pistes

- Ajouter une couche audio/musique optionnelle (bouton mute).
- Sauvegarder la progression (localStorage) pour reprendre la lecture.
- Connecter les mini-jeux à un scoring narratif.
