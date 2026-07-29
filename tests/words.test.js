// Data linter for the two word banks.
//
// These banks are hand-written and long, so the failure mode isn't a crash —
// it's a duplicate that quietly halves a word's odds, or a 20-letter entry
// that wraps to three lines and blows the card off the screen. Nothing here
// tests behaviour; it all tests that the data is still shaped like data.

const test = require("node:test");
const assert = require("node:assert");

const { WORDS_SFW, WORDS_SFW_EXPANSION, WORDS_SFW_EXTRA } = require("../js/words-sfw.js");
const { WORDS_NSFW, WORDS_NSFW_BASE, WORDS_NSFW_EXTRA } = require("../js/words-nsfw.js");

// A word has to fit one line of a card at the largest type size. 13 characters
// is where "Rollercoaster" sits, and that is comfortably the longest thing the
// real game prints.
const MAX_LEN = 13;

// Sentence case, letters only. No spaces, hyphens or apostrophes: the card has
// one box per word and a phrase in it is a different game.
const SHAPE = /^[A-Z][a-z]+$/;

const BANKS = [
  ["SFW", WORDS_SFW, 1400],
  ["NSFW", WORDS_NSFW, 600],
];

for (const [name, bank, floor] of BANKS) {
  test(name + ": no duplicates", () => {
    const seen = new Set(), dupes = [];
    for (const w of bank) { if (seen.has(w)) dupes.push(w); seen.add(w); }
    assert.deepStrictEqual(dupes, [], "duplicate words: " + dupes.join(", "));
  });

  test(name + ": every word is a single sentence-cased word", () => {
    const bad = bank.filter((w) => !SHAPE.test(w));
    assert.deepStrictEqual(bad, [], "malformed: " + bad.join(", "));
  });

  test(name + ": nothing longer than " + MAX_LEN + " characters", () => {
    const long = bank.filter((w) => w.length > MAX_LEN);
    assert.deepStrictEqual(long, [], "too long: " + long.join(", "));
  });

  test(name + ": big enough to keep repeats rare", () => {
    assert.ok(bank.length >= floor, name + " has shrunk to " + bank.length + ", floor is " + floor);
  });
}

// The two source blocks are transcriptions, not creative work — if either
// count moves, something was lost in an edit rather than deliberately added.
test("SFW: the fan expansion block is intact", () => {
  assert.strictEqual(WORDS_SFW_EXPANSION.length, 549,
    "the expansion PDF is 550 words with one repeat (Shuffle) dropped");
  assert.strictEqual(WORDS_SFW.length, WORDS_SFW_EXPANSION.length + WORDS_SFW_EXTRA.length);
});

test("NSFW: the Deep Undercover block is intact", () => {
  assert.strictEqual(WORDS_NSFW_BASE.length, 390);
  assert.strictEqual(WORDS_NSFW.length, WORDS_NSFW_BASE.length + WORDS_NSFW_EXTRA.length);
});

// Overlap between banks is fine and often the joke (Bacon, Sheep, Candle).
// Overlap *within* a bank is the bug, and that's covered above.
test("the banks are allowed to overlap each other", () => {
  const sfw = new Set(WORDS_SFW);
  const shared = WORDS_NSFW.filter((w) => sfw.has(w));
  assert.ok(shared.length > 0, "sanity check: the innocent-word overlap should exist");
});
