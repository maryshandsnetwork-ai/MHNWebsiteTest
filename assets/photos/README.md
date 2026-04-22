# MHN Website Photo Brief

Drop photos into this folder with the exact filenames below, commit, and push. The HTML already references these paths, so when the file exists the image appears; when it doesn't, the site degrades to the current clean gradient design (no broken image icons).

## How photos work on this site

Photos are used as **layered backgrounds** on existing sections. The CSS falls back to a purple gradient if a photo isn't present. This means:
- You can ship the site today without any photos (current state).
- You can add or swap one photo at a time without touching HTML.
- When you push to GitHub and deploy to Vercel, photos in this folder deploy alongside the HTML automatically.

## Naming & specs

Use JPG for photography (smaller files), PNG for illustrations or logos. Export at 2x the display size for retina screens. Compress with [squoosh.app](https://squoosh.app) before committing — aim for under 200KB per image.

| Filename | Where it appears | Aspect ratio | Min resolution | Notes |
|---|---|---|---|---|
| `hero-home.jpg` | Home page hero | 4:5 portrait | 800 × 1000 | Louisiana mom with doula's hands, warm natural light |
| `hero-families.jpg` | For Families hero sidebar | 4:5 portrait | 800 × 1000 | Expecting mother, warm, hopeful |
| `founder.jpg` | About page — Founder section | 4:5 portrait | 800 × 1000 | Madeline LeBlanc headshot |
| `origin.jpg` | About page — Origin/Mary section | 4:5 portrait | 800 × 1000 | Hands, candle, or symbolic warmth |
| `training-group.jpg` | Doula Training, after-the-course panel | 4:5 portrait | 800 × 1000 | Two doulas at coating ceremony |
| `bereavement.jpg` | For Families — Loss & Bereavement | 4:5 portrait | 800 × 1000 | Still, quiet; open hand or candle |
| `birth-vision.jpg` | For Families — Birth Vision guide | 4:3 landscape | 1200 × 900 | Mom writing her birth vision |
| `family-1.jpg` — `family-6.jpg` | Testimonials (future rotation) | 1:1 square | 600 × 600 | Portrait of client families |

## Legal / consent

Every photograph of a real person must have a signed MHN photo release on file before it goes on the public site. Use the MHN standard consent form. Keep originals + signed releases in your internal drive, not in this repo.

## Style guide

- **Natural daylight.** No flash, no harsh color grading, no heavy saturation.
- **Documentary, not editorial.** Real moments over staged poses.
- **Warm tones.** No black-and-white, no cool/blue-leaning photos.
- **Real Louisiana families.** No stock imagery.
- **Frame intentionally.** Keep key subjects away from edges — CSS crops can be tight at some breakpoints.

## What to do when you have photos

1. Export at the specs above.
2. Rename to the exact filenames in the table.
3. Drop into this folder.
4. `git add assets/photos/<filename>` → commit → push.
5. Vercel redeploys automatically. The photo appears on the live site within about a minute.
