// Generates the PWA icons with the kit's PNG painter.
// The card itself: five stacked word slots on off-white paper, each outlined
// in its number's colour. No lettering — at 192px a glyph turns to mush, but
// five coloured bars stay legible and are unmistakably this app.
// Run: node tools/make-icons.js   (from the app folder)
const fs = require("fs");
const path = require("path");
const { makeCanvas, downsample, encodePNG } = require("../lib/tools/png.js");

const PAPER = "#f4f1e8";
const CARD = "#ffffff";
const HAIR = "#ddd7c9";
const ROWS = ["#1ca5da", "#5fb447", "#e23e67", "#ef8a22", "#f0c11c"];

// `scale` shrinks the motif toward the centre (maskable keeps its art ~76%).
function drawIcon(size, scale) {
  const SS = 4, big = size * SS;
  const cv = makeCanvas(big);

  cv.fillRoundRect(0, 0, big, big, big * 0.22, PAPER);

  const cw = big * 0.72 * scale;
  const ch = big * 0.78 * scale;
  const cx = (big - cw) / 2;
  const cy = (big - ch) / 2;

  cv.fillRoundRect(cx, cy, cw, ch, big * 0.05, HAIR);
  cv.fillRoundRect(cx + big * 0.008, cy + big * 0.008, cw - big * 0.016, ch - big * 0.016, big * 0.045, CARD);

  // Five slots down the card, each an outline (fill the colour, then knock a
  // paper-coloured rect out of the middle) with its numeral bar to the left.
  const padX = cw * 0.10;
  const slotX = cx + padX + cw * 0.13;
  const slotW = cw - padX * 2 - cw * 0.13;
  const gap = ch * 0.045;
  const slotH = (ch - gap * 6) / 5;
  const border = Math.max(2, big * 0.009);

  for (let i = 0; i < 5; i++) {
    const y = cy + gap * (i + 1) + slotH * i;
    cv.fillRoundRect(slotX, y, slotW, slotH, slotH * 0.28, ROWS[i]);
    cv.fillRoundRect(slotX + border, y + border, slotW - border * 2, slotH - border * 2, slotH * 0.22, CARD);
    // The numeral, abstracted to a short stub of the same colour.
    cv.fillRoundRect(cx + padX * 0.6, y + slotH * 0.22, cw * 0.055, slotH * 0.56, cw * 0.02, ROWS[i]);
  }

  return encodePNG(size, size, downsample(cv.px, big, SS));
}

const out = path.join(__dirname, "..", "icons");
fs.mkdirSync(out, { recursive: true });
fs.writeFileSync(path.join(out, "icon-512.png"), drawIcon(512, 1.0));
fs.writeFileSync(path.join(out, "icon-192.png"), drawIcon(192, 1.0));
fs.writeFileSync(path.join(out, "maskable-512.png"), drawIcon(512, 0.76));
console.log("Just One icons written");
