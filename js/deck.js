// Just One companion · the deck.
//
// A shuffled bag, not repeated random picks. Random picking feels wrong fast:
// with 1479 words you'd still see a repeat within the first fifty cards, and
// at a table that reads as "the app is broken". A bag deals every word once
// before any word comes back.
//
// No DOM, no globals, no GK — tests/deck.test.js runs this in a bare sandbox.

const CARD_SIZE = 5;

function makeDeck(words, rng) {
  if (!Array.isArray(words) || words.length < CARD_SIZE)
    throw new Error("makeDeck: need at least " + CARD_SIZE + " words");

  const random = rng || Math.random;

  // Fisher-Yates on a copy — the caller's bank is a shared const.
  function shuffled() {
    const a = words.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      const t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  let bag = shuffled();
  let at = 0;

  // Every card dealt this session, oldest first, plus where we're looking.
  // `pos` is an index into history; it only differs from the end while the
  // player is walking back through earlier cards.
  const history = [];
  let pos = -1;

  // The tail of the bag can be shorter than a card. Rather than deal a short
  // card or let a word appear twice on one card, top up from a fresh shuffle
  // and drop the leftovers — at 5 of 1479 that costs nothing and keeps the
  // "no word twice on a card" invariant absolute.
  function take() {
    if (at + CARD_SIZE > bag.length) { bag = shuffled(); at = 0; }
    const card = bag.slice(at, at + CARD_SIZE);
    at += CARD_SIZE;
    return card;
  }

  return {
    CARD_SIZE,

    // Deal a new card. Dealing while looking at an older card throws away the
    // cards after it — same as a real deck: once you've moved on, you've
    // moved on.
    deal() {
      if (pos < history.length - 1) history.length = pos + 1;
      history.push(take());
      pos = history.length - 1;
      return this.card();
    },

    card() { return pos < 0 ? null : history[pos].slice(); },

    canBack() { return pos > 0; },
    canForward() { return pos >= 0 && pos < history.length - 1; },
    back() { if (this.canBack()) pos--; return this.card(); },
    forward() { if (this.canForward()) pos++; return this.card(); },

    // 1-based, for "card 12" in the header.
    position() { return pos + 1; },
    dealt() { return history.length; },

    // How many words are left before the bag reshuffles — the honest answer
    // to "have we seen everything yet?".
    remaining() { return Math.max(0, bag.length - at); },
  };
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { makeDeck, CARD_SIZE };
}
