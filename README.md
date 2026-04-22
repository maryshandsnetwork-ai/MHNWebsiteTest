# Mary's Hands Network — Website

Static HTML site for [maryshandsnetwork.org](https://maryshandsnetwork.org).

## Pages

**English:** Home, About, For Families, Doula Training, Contact, Donate
**Spanish:** Inicio, Nosotras, Apoyo de Doula, Entrenamiento, Contacto, Donar

## Editing content

Every page is a single `.html` file in this folder. Open in any text editor (VS Code is free and good), edit the text inside the HTML tags, save, commit, push. Vercel auto-deploys within a minute.

## Adding photos

Drop photos into `assets/photos/` with the filenames in [assets/photos/README.md](assets/photos/README.md). Commit and push — they appear on the live site automatically.

## Before the site is fully live, two things to do

1. **Formspree** — sign up at [formspree.io](https://formspree.io), create a form with recipient `info@mhndoula.com`, then replace `YOUR_FORMSPREE_ID` in `contact.html` and `contacto.html`.
2. **EIN** — the Donate page says "Available on request." Swap in the real EIN in `donate.html` and `donar.html` when ready.

## Local preview

```bash
python3 -m http.server 4173
```

Then visit `http://localhost:4173/`.

## Deployment

Pushes to `main` auto-deploy to Vercel. See [deploy instructions](https://vercel.com/docs/concepts/deployments/overview).

---

© 2026 Mary's Hands Network · A Louisiana 501(c)(3) nonprofit
