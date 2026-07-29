// Deck invariants.
//
// The deck is the only real logic in the app, and its bugs are the kind you
// don't notice at the table until the third repeat. A seeded RNG makes every
// case here deterministic.

const test = require("node:test");
const assert = require("node:assert");

const { makeDeck, CARD_SIZE } = require("../js/deck.js");
const { WORDS_SFW } = require("../js/words-sfw.js");

// Small deterministic LCG — no reliance on Math.random anywhere below.
function seeded(seed) {
  let s = seed >>> 0;
  return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
}

const alphabet = (n) => Array.from({ length: n }, (_, i) => "W" + i);

test("a card is five distinct words from the bank", () => {
  const deck = makeDeck(WORDS_SFW, seeded(1));
  const card = deck.deal();
  assert.strictEqual(card.length, CARD_SIZE);
  assert.strictEqual(new Set(card).size, CARD_SIZE);
  for (const w of card) assert.ok(WORDS_SFW.includes(w), w + " is not in the bank");
});

test("no word repeats until the bag is spent", () => {
  const words = alphabet(200);
  const deck = makeDeck(words, seeded(7));
  const seen = new Set();
  for (let i = 0; i < 40; i++) {                 // 40 x 5 = the whole bag
    for (const w of deck.deal()) {
      assert.ok(!seen.has(w), w + " came back before the bag was spent");
      seen.add(w);
    }
  }
  assert.strictEqual(seen.size, 200);
});

test("the bag reshuffles instead of dealing a short card", () => {
  // 12 words = two clean cards, then a 2-word tail that must not be dealt.
  const deck = makeDeck(alphabet(12), seeded(3));
  for (let i = 0; i < 10; i++) {
    const card = deck.deal();
    assert.strictEqual(card.length, CARD_SIZE);
    assert.strictEqual(new Set(card).size, CARD_SIZE, "a word appeared twice on one card");
  }
});

test("remaining() counts down and resets on reshuffle", () => {
  const deck = makeDeck(alphabet(20), seeded(5));
  assert.strictEqual(deck.remaining(), 20);
  deck.deal();
  assert.strictEqual(deck.remaining(), 15);
  for (let i = 0; i < 3; i++) deck.deal();       // spends the bag exactly
  assert.strictEqual(deck.remaining(), 0);
  deck.deal();                                   // forces the reshuffle
  assert.strictEqual(deck.remaining(), 15);
});

test("history walks back and forward without changing the cards", () => {
  const deck = makeDeck(WORDS_SFW, seeded(11));
  const a = deck.deal(), b = deck.deal(), c = deck.deal();

  assert.strictEqual(deck.position(), 3);
  assert.ok(!deck.canForward());

  assert.deepStrictEqual(deck.back(), b);
  assert.deepStrictEqual(deck.back(), a);
  assert.ok(!deck.canBack(), "can't go back past the first card");
  assert.deepStrictEqual(deck.back(), a, "back() at the start is a no-op");

  assert.deepStrictEqual(deck.forward(), b);
  assert.deepStrictEqual(deck.forward(), c);
  assert.ok(!deck.canForward());
  assert.deepStrictEqual(deck.forward(), c, "forward() at the end is a no-op");
});

test("dealing from inside the history throws away what came after", () => {
  const deck = makeDeck(WORDS_SFW, seeded(13));
  const a = deck.deal();
  deck.deal();
  deck.deal();
  deck.back();
  deck.back();
  assert.deepStrictEqual(deck.card(), a);

  const fresh = deck.deal();
  assert.strictEqual(deck.dealt(), 2, "the two cards after this one are gone");
  assert.strictEqual(deck.position(), 2);
  assert.ok(!deck.canForward());
  assert.notDeepStrictEqual(fresh, a);
});

test("card() is a copy — a caller can't mutate the history", () => {
  const deck = makeDeck(WORDS_SFW, seeded(17));
  const card = deck.deal();
  card[0] = "Tampered";
  assert.notStrictEqual(deck.card()[0], "Tampered");
});

test("the bank itself is never shuffled in place", () => {
  const words = alphabet(50);
  const before = words.slice();
  const deck = makeDeck(words, seeded(19));
  for (let i = 0; i < 20; i++) deck.deal();
  assert.deepStrictEqual(words, before);
});

test("a bank too small for one card is refused", () => {
  assert.throws(() => makeDeck(["A", "B", "C"], seeded(1)), /at least 5/);
  assert.throws(() => makeDeck(null, seeded(1)), /at least 5/);
});

test("nothing is dealt before the first deal()", () => {
  const deck = makeDeck(WORDS_SFW, seeded(23));
  assert.strictEqual(deck.card(), null);
  assert.strictEqual(deck.position(), 0);
  assert.ok(!deck.canBack() && !deck.canForward());
});
