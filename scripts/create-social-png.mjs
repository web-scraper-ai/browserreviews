import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const width = 1200;
const height = 630;

// Create raw RGBA buffer
// Each row: 1 filter byte (0) + width * 4 bytes (RGBA)
const rowSize = 1 + width * 4;
const rawBuffer = Buffer.alloc(rowSize * height);

for (let y = 0; y < height; y++) {
  const rowOffset = y * rowSize;
  rawBuffer[rowOffset] = 0; // Filter type 0 (None)

  for (let x = 0; x < width; x++) {
    const pxOffset = rowOffset + 1 + x * 4;
    
    // Background gradient: dark slate #0b0f19 to #161e31
    const t = (x + y) / (width + height);
    let r = Math.round(11 + t * 15);
    let g = Math.round(15 + t * 20);
    let b = Math.round(25 + t * 35);

    // Accent line at top (Gold #f59e0b)
    if (y < 8) {
      r = 245; g = 158; b = 11;
    }

    rawBuffer[pxOffset] = r;
    rawBuffer[pxOffset + 1] = g;
    rawBuffer[pxOffset + 2] = b;
    rawBuffer[pxOffset + 3] = 255; // Alpha
  }
}

// Compress data with zlib deflate
const idatData = zlib.deflateSync(rawBuffer);

// Helper for CRC32
function crc32(buf) {
  let table = new Int32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    }
    table[i] = c;
  }
  let crc = -1;
  for (let i = 0; i < buf.length; i++) {
    crc = (crc >>> 8) ^ table[(crc ^ buf[i]) & 0xFF];
  }
  return (crc ^ -1) >>> 0;
}

function makeChunk(type, data) {
  const len = data.length;
  const chunk = Buffer.alloc(8 + len + 4);
  chunk.writeUInt32BE(len, 0);
  chunk.write(type, 4, 4, 'ascii');
  data.copy(chunk, 8);
  const crc = crc32(chunk.subarray(4, 8 + len));
  chunk.writeUInt32BE(crc, 8 + len);
  return chunk;
}

// PNG Signature: 89 50 4E 47 0D 0A 1A 0A
const sig = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);

// IHDR chunk
const ihdrData = Buffer.alloc(13);
ihdrData.writeUInt32BE(width, 0);
ihdrData.writeUInt32BE(height, 4);
ihdrData[8] = 8; // bit depth
ihdrData[9] = 6; // color type RGBA
ihdrData[10] = 0; // compression
ihdrData[11] = 0; // filter
ihdrData[12] = 0; // interlace
const ihdrChunk = makeChunk('IHDR', ihdrData);

// IDAT chunk
const idatChunk = makeChunk('IDAT', idatData);

// IEND chunk
const iendChunk = makeChunk('IEND', Buffer.alloc(0));

const pngBuffer = Buffer.concat([sig, ihdrChunk, idatChunk, iendChunk]);

const outDir = path.join(rootDir, 'public', 'images');
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'social-preview.png'), pngBuffer);

console.log(`Generated social-preview.png (${pngBuffer.length} bytes) at ${path.join(outDir, 'social-preview.png')}`);
