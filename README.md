# crypto-random-cli

A small, **cryptographically secure** randomness helper CLI written in Node.js.

You can use it to:

- Generate random integers
- Generate random floats
- Shuffle a list of items (e.g. wallet addresses)
- Pick random winners from a file (for giveaways, airdrops, contests, etc.)

This tool is useful around Web3 / crypto projects where you want transparent,
reproducible random selection workflows, without relying on insecure `Math.random()`.

> ⚠️ This is an **off-chain** helper. It does not interact with any blockchain.
> For on-chain randomness, use a VRF solution (e.g. Chainlink VRF) like in your
> smart contracts.

---

## 📦 Installation

Clone the repo (or unpack the ZIP) and install dependencies:

```bash
npm install
```

Optionally link the CLI globally:

```bash
npm link
```

Now you can call:

```bash
crypto-random help
```

from anywhere.

---

## 🚀 Usage

### 1. Random integer

```bash
crypto-random int 100
```

Outputs a random integer in `[0, 100)`.

### 2. Random float

```bash
crypto-random float
```

Outputs a random float in `[0, 1)`.

### 3. Shuffle lines in a file

Given a file `addresses.txt`:

```text
0x123...
0x456...
0x789...
```

Run:

```bash
crypto-random shuffle addresses.txt
```

The output will be the same lines in random order.

### 4. Pick N winners from a list

Using the same `addresses.txt`:

```bash
crypto-random winners addresses.txt 10
```

This prints 10 unique randomly selected lines from the file.

> ❗ `count` cannot be greater than the number of non-empty lines in the file.

---

## 🔐 How randomness works

All randomness uses Node's built-in `crypto` module:

- `crypto.randomBytes`
- `crypto.randomInt` (when available)

We **never** use `Math.random()`.

Helpers implemented:

- `randomInt(maxExclusive)` – secure integer in `[0, maxExclusive)`
- `randomFloat()` – secure float in `[0, 1)`
- `shuffleArray(arr)` – Fisher-Yates shuffle using secure randomness
- `pickWinners(arr, count)` – picks `count` unique random items from `arr`

---

## 🧪 Tests

Run:

```bash
npm test
```

This runs a small test suite in `test/random.test.js` that sanity-checks the functions.

---

## 🛠 Project Structure

```text
crypto-random-cli/
├─ src/
│  ├─ index.js      # CLI entry point
│  └─ random.js     # Cryptographically secure random helpers
├─ test/
│  └─ random.test.js  # Minimal test runner
├─ .github/
│  └─ workflows/
│     └─ ci.yml     # GitHub Actions workflow (install + test)
├─ package.json
├─ README.md
└─ .gitignore
```

---

## ✅ GitHub Actions CI

This repo includes a simple CI workflow:

- Runs on push and PR
- Installs dependencies
- Runs the test suite

You can customize it further with linting, publishing, etc.

---

## 📄 License

MIT – use it however you like, modify, extend, or embed in your own tooling.
