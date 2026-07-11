# Crumb & Ember — Cookie Website

A static, no-build website for a cookie shop: flavors, features, prices in ₹,
and a "build a box" section. Pure HTML/CSS/JS — no frameworks, no build step —
so it's ready to host on GitHub Pages as-is.

**Interactive bits:**
- Each flavor card has +/− controls and an "Add to box" button that feeds a
  real shopping cart (bottom-right floating button).
- The cart drawer lists items, lets you adjust quantities, shows a running
  subtotal in ₹, and tells you how much more to add for free shipping.
- Tap the small "i" on any cookie to flip the card and see nutrition/allergen
  info; flip it back with the button on the reverse side.
- The flavor filter buttons narrow the grid to Classic/Specialty/Vegan/GF.
- "Send this order" and "Email an order" build a pre-filled email with your
  exact order and total — the person just has to hit send.
- The cart is saved in the browser's local storage, so it survives a page
  refresh (per-device, not shared between visitors).

## Files in this folder

- `index.html` — all page content (hero, flavors, features, boxes, order CTA)
- `style.css` — all styling
- `script.js` — mobile nav toggle, flavor filter buttons, footer year
- `README.md` — this file

