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

## How to put it on GitHub and go live

### 1. Create a GitHub account (skip if you have one)
Go to https://github.com and sign up.

### 2. Create a new repository
1. Click the **+** icon top-right → **New repository**.
2. Name it anything, e.g. `cookie-site`. For a *user site* at
   `yourname.github.io`, name it exactly `yourname.github.io` instead
   (see note at the bottom).
3. Keep it **Public** (GitHub Pages on the free plan needs a public repo).
4. Don't add a README/gitignore here — you already have files. Click
   **Create repository**.

### 3. Upload the files
Easiest way, no command line needed:
1. On your new repo's page, click **Add file → Upload files**.
2. Drag in `index.html`, `style.css`, `script.js`, and `README.md`
   (all four, from this folder).
3. Scroll down, add a commit message like "Add cookie site", click
   **Commit changes**.

Or, if you prefer Git on the command line:
```bash
cd cookie-site
git init
git add .
git commit -m "Add cookie site"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/cookie-site.git
git push -u origin main
```

### 4. Turn on GitHub Pages
1. In the repo, go to **Settings → Pages** (left sidebar).
2. Under **Build and deployment → Source**, choose **Deploy from a branch**.
3. Under **Branch**, pick **main** and folder **/ (root)**, then **Save**.
4. Wait about 1 minute, refresh the page — GitHub will show your live URL:
   `https://YOUR-USERNAME.github.io/cookie-site/`

### 5. Update the site later
Edit files directly on GitHub (pencil icon on any file) or upload new
versions the same way as step 3 — GitHub Pages redeploys automatically
within a minute or two of every commit to `main`.

## Notes

- **Repo name matters for the URL.** A repo named `cookie-site` publishes to
  `yourname.github.io/cookie-site/`. A repo named exactly
  `yourname.github.io` publishes at the root: `yourname.github.io`.
- **Custom domain (optional):** Settings → Pages → Custom domain, then point
  your domain's DNS at GitHub per their docs.
- **Editing content:** flavor cards, prices, and features are plain text in
  `index.html` — search for the flavor name or price to change it, no
  build tools required.
- **Contact link:** the "Email an order" button points to a placeholder
  address (`order@crumbandember.example`) in `index.html` and `script.js`
  (search for it in both files) — replace it with a real email before going
  live.
- **Cookie images:** each card currently uses a small illustrated SVG
  (`<svg class="cookie-illustration">`) instead of a stock photo, so the
  site has no external image dependencies and nothing can ever break or load
  slowly. To swap in your own photos: add image files to a new `images/`
  folder in this repo, then in `index.html` replace a card's
  `<div class="card-media ...">...</div>` block with
  `<div class="card-media"><img src="images/your-photo.jpg" alt="Flavor name"></div>`,
  and add `.card-media img { width:100%; height:220px; object-fit:cover;
  border-radius: var(--radius) var(--radius) 0 0; }` to `style.css`.
