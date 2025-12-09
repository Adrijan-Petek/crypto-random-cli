#!/usr/bin/env node
/**
 * crypto-random-cli
 *
 * A simple CLI wrapper around Node's crypto module to generate
 * cryptographically secure randomness:
 *  - random integers
 *  - random floats
 *  - shuffle arrays (e.g. addresses)
 *  - pick random winners from a list
 *
 * This is designed as a utility / helper tool for crypto / Web3 projects,
 * but it does NOT interact with any blockchain directly.
 */

const fs = require("fs");
const path = require("path");
const { randomInt, randomFloat, shuffleArray, pickWinners } = require("./random");

function printHelp() {
  console.log(`
crypto-random-cli

Usage:
  crypto-random int <maxExclusive>
  crypto-random float
  crypto-random shuffle <file>
  crypto-random winners <file> <count>

Commands:
  int <maxExclusive>     Print a random integer in [0, maxExclusive)
  float                  Print a random float in [0, 1)
  shuffle <file>         Shuffle lines from a file and print them
  winners <file> <count> Pick <count> random unique lines from file

Examples:
  crypto-random int 100
  crypto-random float
  crypto-random shuffle addresses.txt
  crypto-random winners addresses.txt 10
`);
}

async function main() {
  const args = process.argv.slice(2);
  if (args.length === 0 || args[0] === "help" || args[0] === "--help") {
    printHelp();
    process.exit(0);
  }

  const cmd = args[0];

  if (cmd === "int") {
    const maxExclusive = parseInt(args[1], 10);
    if (!Number.isInteger(maxExclusive) || maxExclusive <= 0) {
      console.error("maxExclusive must be a positive integer");
      process.exit(1);
    }
    console.log(randomInt(maxExclusive));
    process.exit(0);
  }

  if (cmd === "float") {
    console.log(randomFloat().toString());
    process.exit(0);
  }

  if (cmd === "shuffle") {
    const file = args[1];
    if (!file) {
      console.error("Missing <file> argument");
      process.exit(1);
    }
    const fullPath = path.resolve(process.cwd(), file);
    if (!fs.existsSync(fullPath)) {
      console.error("File not found:", fullPath);
      process.exit(1);
    }
    const contents = fs.readFileSync(fullPath, "utf8");
    const lines = contents.split(/\r?\n/).filter((l) => l.trim().length > 0);
    const shuffled = shuffleArray(lines);
    console.log(shuffled.join("\n"));
    process.exit(0);
  }

  if (cmd === "winners") {
    const file = args[1];
    const count = parseInt(args[2], 10);
    if (!file || !Number.isInteger(count) || count <= 0) {
      console.error("Usage: crypto-random winners <file> <count>");
      process.exit(1);
    }
    const fullPath = path.resolve(process.cwd(), file);
    if (!fs.existsSync(fullPath)) {
      console.error("File not found:", fullPath);
      process.exit(1);
    }
    const contents = fs.readFileSync(fullPath, "utf8");
    const lines = contents.split(/\r?\n/).filter((l) => l.trim().length > 0);
    if (lines.length === 0) {
      console.error("File has no non-empty lines");
      process.exit(1);
    }
    if (count > lines.length) {
      console.error("count cannot be greater than number of lines");
      process.exit(1);
    }
    const winners = pickWinners(lines, count);
    console.log(winners.join("\n"));
    process.exit(0);
  }

  console.error("Unknown command:", cmd);
  printHelp();
  process.exit(1);
}

if (require.main === module) {
  main();
}
