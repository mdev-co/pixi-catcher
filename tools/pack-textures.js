const fs = require('fs');
const path = require('path');
const { PNG } = require('pngjs');

const ASSETS_DIR = path.join(__dirname, '..', 'public', 'assets');
const SOURCE_DIR = path.join(__dirname, 'source');

const CHARACTER = {
  frameSize: 84,
  columns: 4,
  animations: {
    idle: ['idle_0', 'idle_1', 'idle_2', 'idle_3'],
    runLeft: ['run_left_0', 'run_left_1', 'run_left_2', 'run_left_3', 'run_left_4', 'run_left_5'],
    runRight: [
      'run_right_0',
      'run_right_1',
      'run_right_2',
      'run_right_3',
      'run_right_4',
      'run_right_5',
    ],
  },
};

const FOOD = { cellSize: 16, columns: 8, rows: 8 };

function readPng(file) {
  return PNG.sync.read(fs.readFileSync(file));
}

function writePng(file, png) {
  fs.writeFileSync(file, PNG.sync.write(png));
}

function writeJson(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n');
}

function frameEntry(x, y, size) {
  return {
    frame: { x, y, w: size, h: size },
    sourceSize: { w: size, h: size },
    spriteSourceSize: { x: 0, y: 0, w: size, h: size },
  };
}

function packCharacter() {
  const names = Object.values(CHARACTER.animations).flat();
  const rows = Math.ceil(names.length / CHARACTER.columns);
  const size = CHARACTER.frameSize;
  const sheet = new PNG({ width: CHARACTER.columns * size, height: rows * size });
  const frames = {};

  names.forEach((name, index) => {
    const source = readPng(path.join(SOURCE_DIR, 'character', `${name}.png`));
    const x = (index % CHARACTER.columns) * size;
    const y = Math.floor(index / CHARACTER.columns) * size;
    PNG.bitblt(source, sheet, 0, 0, size, size, x, y);
    frames[name] = frameEntry(x, y, size);
  });

  writePng(path.join(ASSETS_DIR, 'character.png'), sheet);
  writeJson(path.join(ASSETS_DIR, 'character.json'), {
    frames,
    animations: CHARACTER.animations,
    meta: { image: 'character.png', size: { w: sheet.width, h: sheet.height }, scale: '1' },
  });
}

function describeFood() {
  const frames = {};
  for (let index = 0; index < FOOD.columns * FOOD.rows; index++) {
    const x = (index % FOOD.columns) * FOOD.cellSize;
    const y = Math.floor(index / FOOD.columns) * FOOD.cellSize;
    frames[`food_${index}`] = frameEntry(x, y, FOOD.cellSize);
  }
  writeJson(path.join(ASSETS_DIR, 'food.json'), {
    frames,
    meta: {
      image: 'food.png',
      size: { w: FOOD.columns * FOOD.cellSize, h: FOOD.rows * FOOD.cellSize },
      scale: '1',
    },
  });
}

packCharacter();
describeFood();
console.log('packed: character.png, character.json, food.json');
