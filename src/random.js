/**
 * random.js
 *
 * Cryptographically secure random helpers built on Node's `crypto` module.
 */

const crypto = require("crypto");

/**
 * Return a random integer in [0, maxExclusive).
 */
function randomInt(maxExclusive) {
  if (!Number.isInteger(maxExclusive) || maxExclusive <= 0) {
    throw new Error("maxExclusive must be a positive integer");
  }

  // Use crypto.randomInt when available
  if (crypto.randomInt) {
    return crypto.randomInt(0, maxExclusive);
  }

  // Fallback if needed (older Node): use randomBytes + modulo bias mitigation
  const maxUint32 = 0xffffffff;
  const limit = maxUint32 - (maxUint32 % maxExclusive);

  while (true) {
    const buf = crypto.randomBytes(4);
    const u32 = buf.readUInt32BE(0);
    if (u32 < limit) {
      return u32 % maxExclusive;
    }
  }
}

/**
 * Return a random float in [0, 1).
 */
function randomFloat() {
  const buf = crypto.randomBytes(6); // 48 bits
  const int = buf.readUIntBE(0, 6);
  const max = Math.pow(2, 48);
  return int / max;
}

/**
 * Shuffle an array using Fisher-Yates with crypto-based randomness.
 */
function shuffleArray(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = randomInt(i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Pick `count` unique random elements from an array.
 */
function pickWinners(arr, count) {
  if (!Array.isArray(arr)) {
    throw new Error("arr must be an array");
  }
  if (!Number.isInteger(count) || count <= 0) {
    throw new Error("count must be a positive integer");
  }
  if (count > arr.length) {
    throw new Error("count cannot be greater than array length");
  }

  const shuffled = shuffleArray(arr);
  return shuffled.slice(0, count);
}

module.exports = {
  randomInt,
  randomFloat,
  shuffleArray,
  pickWinners,
};
