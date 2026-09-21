# ADR 0001: Asset packing script stays in JavaScript until delivery

Date: 2026-09-19. Status: accepted.

## Context

`tools/pack-textures.js` builds the texture atlases (see PR #17). It is a one-off build tool run
with `npm run assets:pack`, not part of the game bundle. The task requires typed variables and
the game code is TypeScript strict; the script is plain JavaScript.

## Decision

Keep the script in JavaScript for the delivery deadline. Its output is committed, so nobody
needs to run it. Converting it (compile with `tsc -p tools`, lint with the game code) is tracked
as a follow-up issue.

## Consequences

- One untyped file in `tools/`, outside the game code and outside ESLint.
- Time goes to the required gameplay first; the conversion is a contained, low-risk change later.
- The script packs a fixed grid. All frames in one atlas share one size, so a MaxRects packer
  would produce the same layout. Trimming transparent margins would shrink the character atlas
  (frames are opaque on 52 of 84 px) and cut fragment work per sprite; at five sprites on screen
  this is not measurable.
- A dedicated packer (for example free-tex-packer-cli) can replace the script without touching
  game code: the PIXI spritesheet loader reads trimmed frames natively (`trimmed`,
  `spriteSourceSize`, `sourceSize`).
