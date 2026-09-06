# Deploying KUYBIIGST-M Website to Vercel

This folder is a clean, self-contained, production-ready package for **KUYBIIGST-M** (Koc University Structural Biology & Innovative Drug Development Center).

---

## Deployment Option 1: Via GitHub (Recommended)

1. **Create a new repository** on [GitHub](https://github.com/new) (e.g. kuybim-web).
2. **Push this folder to your repository:**
   `ash
   git remote add origin https://github.com/<your-username>/kuybim-web.git
   git branch -M main
   git push -u origin main
   `
3. **Import into Vercel:**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Click **Import** next to your kuybim-web repository.
   - Vercel will automatically detect **Next.js**.
   - Click **Deploy**.

---

## Deployment Option 2: Direct CLI Deployment

You can deploy directly from your terminal using Vercel CLI without pushing to GitHub:

`ash
# Run inside this folder:
npx vercel
`
- Follow the interactive prompts (select your account/team, confirm project settings).
- To deploy directly to production:
  `ash
  npx vercel --prod
  `

---

## Project Configuration & Settings

- **Framework Preset:** Next.js (automatically detected)
- **Node.js Version:** 20.x or 22.x (default on Vercel)
- **Build Command:** 
pm run build
- **Output Directory:** .next (default)
- **Install Command:** 
pm install (default)
- **Environment Variables:** None required (the site is fully static and pre-rendered).

---

## What is included in this package:

- **All 122 Publications:** Complete research articles with original PMC figures and experimental tables.
- **Academic Partners:** Stanford Medicine, The RNA Institute, Koc University logos and laboratory profiles.
- **Responsive Navigation:** Hamburger drawer menu on mobile, smooth navigation on desktop.
- **Hero Parallax:** 7336x2660 ultra-wide laboratory panorama with smooth horizontal panning on both web and mobile.
- **100% English Content:** Fully localized to international academic standards.
