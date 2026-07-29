// Just One companion · settings.
//
// Plain localStorage under the "jo" prefix (checked free against every other
// game sharing the rvenning.github.io origin). No gamekit storage: there are
// no players, no scores and nothing to sync between devices.
//
// After-dark is deliberately NOT in here. It resets to off every time the app
// opens, so a phone left on the coffee table can't be picked up already rude.

const Settings = {
  KEY: "jo:settings",

  defaults: { sound: true, spotlight: true, bigText: false },

  load() {
    let saved = {};
    try { saved = JSON.parse(localStorage.getItem(this.KEY)) || {}; } catch (e) { saved = {}; }
    return Object.assign({}, this.defaults, saved);
  },

  save(s) {
    try { localStorage.setItem(this.KEY, JSON.stringify(s)); } catch (e) { /* private mode */ }
  },
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = { Settings };
}
