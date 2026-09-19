# ADR 0002: Player is one class that owns its sprite

Date: 2026-09-19. Status: accepted.

## Context

A split into a data object (`PlayerState`), a movement class and a sprite adapter was
considered: it separates logic from rendering and would allow testing movement without PixiJS.

## Decision

`Player` is a single class: position and animation live on its `AnimatedSprite`, movement and
animation switching are its methods. Configuration comes from `config/game.ts`.

## Consequences

- One 40-line file instead of four classes copying the same position every frame.
- Movement logic is not unit-tested in isolation; collision and level rules will be pure
  functions and tested instead.
- Revisit when a second entity needs the same movement logic or when movement must be tested
  without the renderer.
