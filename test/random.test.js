const { randomInt, randomFloat, shuffleArray, pickWinners } = require("../src/random");

function assert(condition, message) {
  if (!condition) {
    throw new Error(message || "Assertion failed");
  }
}

function testRandomInt() {
  const max = 100;
  for (let i = 0; i < 100; i++) {
    const value = randomInt(max);
    assert(Number.isInteger(value), "randomInt should return integer");
    assert(value >= 0 && value < max, "randomInt out of range");
  }
  console.log("✔ randomInt tests passed");
}

function testRandomFloat() {
  for (let i = 0; i < 100; i++) {
    const value = randomFloat();
    assert(typeof value === "number", "randomFloat should return number");
    assert(value >= 0 && value < 1, "randomFloat out of range");
  }
  console.log("✔ randomFloat tests passed");
}

function testShuffleAndWinners() {
  const arr = [1, 2, 3, 4, 5];
  const shuffled = shuffleArray(arr);
  assert(shuffled.length === arr.length, "shuffle should preserve length");

  const winners = pickWinners(arr, 3);
  assert(winners.length === 3, "pickWinners length mismatch");
  const unique = new Set(winners);
  assert(unique.size === winners.length, "pickWinners should be unique");
  console.log("✔ shuffleArray / pickWinners tests passed");
}

function runTests() {
  testRandomInt();
  testRandomFloat();
  testShuffleAndWinners();
  console.log("All tests passed.");
}

if (require.main === module) {
  runTests();
}

module.exports = { runTests };
