# Ed Cwiertniewicz – Personal Site

Plain HTML, CSS and JavaScript. No build step.

## Files
- `index.html` – all page content (edit text here)
- `styles.css` – colors, fonts, layout (change `--accent` at the top to switch the highlight color)
- `script.js` – menu, project filters, number count-up, scroll effects
- `Ed-Cwiertniewicz-Resume.pdf` – resume the Download buttons point to (made from Master 2026.docx)

## Put it online (GitHub + Vercel)
1. Create a new repo on GitHub (e.g. `ed-site`) and upload everything in this folder.
2. In Vercel: Add New → Project → import that repo.
3. Framework preset: **Other**. Leave build command and output directory empty. Deploy.
4. Optional: add your own domain under Project → Settings → Domains.

## Swapping in your own photos
Activity photos are stock shots from Unsplash (free license), loaded from Unsplash's servers.
To use your own, drop them in `images/` (e.g. `images/golf.jpg`) and change the `src` on
the matching `<img>` in the "Off the Clock" section. Remove that photo's name from the footer credit.
