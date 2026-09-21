import { HUD } from '../config/game';

export async function loadHudFont(): Promise<void> {
  await document.fonts.load(`${HUD.style.fontSize}px "${HUD.style.fontFamily}"`);
}
