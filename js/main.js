// Just One companion · wiring.

const App = {
  deck: null,
  nsfw: false,
  chosen: -1,          // spotlit row, or -1
  settings: Settings.load(),

  init() {
    GK.Sfx.enabled = this.settings.sound;
    this.buildDeck();
    this.applySettings();
    this.deal();

    // Keys 1-5 spotlight, space/right deals, left goes back. Handy when the
    // phone is propped up and someone's reaching over.
    document.addEventListener("keydown", (e) => {
      if (GK.UI.screen && GK.UI.screen !== "card") return;
      if (e.key >= "1" && e.key <= "5") this.choose(+e.key - 1);
      else if (e.key === " " || e.key === "Enter" || e.key === "ArrowRight") { e.preventDefault(); this.deal(); }
      else if (e.key === "ArrowLeft") this.back();
    });

    GK.initPWA({ appName: "Just One" });
  },

  bank() { return this.nsfw ? WORDS_NSFW : WORDS_SFW; },

  buildDeck() { this.deck = makeDeck(this.bank()); },

  // --- dealing -------------------------------------------------------------

  deal() {
    this.deck.deal();
    this.chosen = -1;
    GK.Sfx.click();
    this.render();
  },

  back() { if (this.deck.canBack()) { this.deck.back(); this.chosen = -1; this.render(); } },
  forward() { if (this.deck.canForward()) { this.deck.forward(); this.chosen = -1; this.render(); } },

  choose(i) {
    if (!this.settings.spotlight) return;
    this.chosen = this.chosen === i ? -1 : i;
    GK.Sfx.click();
    this.render();
  },

  render() {
    const words = this.deck.card() || [];
    const card = GK.UI.el("card");

    card.innerHTML = words.map((w, i) => {
      const dim = this.chosen >= 0 && this.chosen !== i ? " dim" : "";
      const on = this.chosen === i ? " on" : "";
      return `<button class="row n${i + 1}${dim}${on}" onclick="App.choose(${i})" aria-label="Word ${i + 1}: ${GK.util.esc(w)}">
                <span class="num">${i + 1}</span>
                <span class="word">${GK.util.esc(w)}</span>
              </button>`;
    }).join("");

    GK.UI.el("counter").textContent = "card " + this.deck.position();
    GK.UI.el("hint").textContent = this.chosen >= 0
      ? "Word " + (this.chosen + 1) + " — everyone writes one clue"
      : (this.settings.spotlight ? "Tap the number the guesser called" : "The guesser calls a number");

    GK.UI.el("btn-back").disabled = !this.deck.canBack();
    GK.UI.el("btn-forward").disabled = !this.deck.canForward();
    GK.UI.el("btn-deal").textContent = this.deck.canForward() ? "New card" : "Next card";
  },

  // --- screens -------------------------------------------------------------

  showCard() { GK.UI.showScreen("card"); },
  showRules() { GK.UI.showScreen("rules"); },

  showSettings() {
    GK.UI.el("bank-note").textContent =
      this.bank().length.toLocaleString() + " words in the deck · " +
      this.deck.remaining().toLocaleString() + " still unseen this shuffle";
    GK.UI.showScreen("settings");
  },

  // --- settings ------------------------------------------------------------

  applySettings() {
    document.documentElement.classList.toggle("big-text", this.settings.bigText);
    document.documentElement.classList.toggle("dark-mode", this.nsfw);
    GK.UI.el("dark-strip").style.display = this.nsfw ? "" : "none";
    GK.Sfx.enabled = this.settings.sound;

    const set = (id, on) => GK.UI.el(id).setAttribute("aria-checked", on ? "true" : "false");
    set("tog-nsfw", this.nsfw);
    set("tog-spotlight", this.settings.spotlight);
    set("tog-bigtext", this.settings.bigText);
    set("tog-sound", this.settings.sound);
  },

  toggleSetting(key) {
    this.settings[key] = !this.settings[key];
    Settings.save(this.settings);
    if (key === "spotlight" && !this.settings.spotlight) this.chosen = -1;
    this.applySettings();
    GK.Sfx.click();
    this.render();
  },

  // After-dark is session-only and never saved: a second deliberate action
  // turns it on, and closing the app turns it off again.
  toggleNsfw() {
    if (this.nsfw) { this.setNsfw(false); return; }
    GK.UI.openModal("modal-nsfw");
  },

  confirmNsfw() {
    GK.UI.closeModal("modal-nsfw");
    this.setNsfw(true);
  },

  setNsfw(on) {
    this.nsfw = on;
    this.buildDeck();          // a bank swap is a whole new deck, history and all
    this.chosen = -1;
    this.applySettings();
    this.deal();
    GK.UI.toast(on ? "After dark — " + this.bank().length + " rude words" : "Back to the family deck");
  },
};

// Wait for the document to finish parsing. Rendering the first card mid-parse
// resolved `font-size: clamp(19px, 5.6vw, 30px)` to the inherited 16px — so
// card one came up in body text and every card after it was correct, which is
// exactly the kind of bug nobody reports and everybody notices.
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => App.init());
} else {
  App.init();
}
