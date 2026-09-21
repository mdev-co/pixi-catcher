# Pixi Catcher

[![CI](https://github.com/mdev-co/pixi-catcher/actions/workflows/ci.yml/badge.svg)](https://github.com/mdev-co/pixi-catcher/actions/workflows/ci.yml)

Catch the falling food. A small arcade game written in TypeScript with PixiJS 7.

## Requirements

- Node.js 16.16.0 and npm 8.11.0 (see `.nvmrc`; with nvm run `nvm use`)
- A modern browser with WebGL

## Quick start

```bash
npm install
npm start
```

The dev server prints a local URL; open it in the browser.

## Scripts

| Command                | What it does                                         |
| ---------------------- | ---------------------------------------------------- |
| `npm start`            | dev server with hot reload                           |
| `npm run build`        | type-check and production build into `dist/`         |
| `npm run preview`      | serve the production build locally                   |
| `npm test`             | unit tests (Vitest)                                  |
| `npm run check`        | type-check, ESLint and Prettier, the same gate as CI |
| `npm run lint:fix`     | fix lint issues automatically                        |
| `npm run format:write` | format all files                                     |

A husky pre-commit hook runs `npm run check`; CI runs check, tests and build on Node 16.16.0 and Node 20.

## Decisions

- **Node 16.16.0 / npm 8.11.0.** Required by the task. Declared in `.nvmrc` and `engines`, enforced in CI.
- **Own minimal setup (Vite 4, TypeScript, PixiJS 7)** instead of the suggested pixi-hotwire boilerplate, whose current dependencies target Node 18+ and print engine warnings on Node 16. Three dev dependencies and a five-line Vite config.
- **PixiJS 7.4.3, pinned.** Same major as the boilerplates suggested in the task. Exact versions so `npm install` gives everyone the same tree.
- **TypeScript strict** plus `noUncheckedIndexedAccess`, `noImplicitReturns`, `noFallthroughCasesInSwitch`: array access returns `T | undefined`, every code path returns, no accidental switch fall-through.
- **ESLint 8, typescript-eslint 6 (type-aware), Prettier.** The last versions that support Node 16.16.0, hence the deprecation notices during install. Type-aware rules catch unhandled promises the compiler allows.

## Credits

- Character sprites: [4 Directional Character](https://lionheart963.itch.io/4-directional-character) by Warren Clark (free to use, credit appreciated).
- Food sprites: [Free Pixel Food](https://henrysoftware.itch.io/pixel-food) by Henry Software (CC0).
- Font: [Press Start 2P](https://fonts.google.com/specimen/Press+Start+2P) by CodeMan38 (SIL Open Font License 1.1, see `public/fonts/OFL.txt`).

## License

© 2026 Data Technologies. Source published for recruitment review. All rights reserved.
