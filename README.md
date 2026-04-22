# 🐾 Kuro Corner Nail — Website

> **Korea • Japan • Y2K Design** — Chuyên vẽ tay & Nailbox thiết kế

## 🌐 Live Demo

[Visit Website](https://<your-username>.github.io/KuroNailsWeb/)

## ✨ Features

- **Responsive Design** — Works beautifully on desktop, tablet, and mobile
- **Bilingual** — Vietnamese & English with one-click toggle
- **Gallery Carousel** — 7 collections with swipe support on mobile
- **Video Playback** — Embedded videos with controls
- **Lightbox** — Click any image to view fullscreen
- **CRT Effect** — Subtle retro scanline overlay for chill vibes
- **Smooth Animations** — Scroll-triggered fade-ins, hover effects, floating particles
- **Direct Booking** — "Đặt Lịch" button links directly to Instagram
- **Tap to Call** — Phone number triggers instant call on mobile
- **Social Links** — Instagram, Facebook, Threads

## 📁 Project Structure

```
KuroNailsWeb/
├── index.html          # Main single-page website
├── css/
│   └── style.css       # All styles (responsive, animations, CRT)
├── js/
│   └── main.js         # Interactivity (carousel, lightbox, language toggle)
├── gallery-web/        # Gallery images & videos (web-optimized paths)
│   ├── collection-1/   # 10 photos — Nhật Ký (Diary)
│   ├── collection-2/   # 7 photos — Bầu Trời Sao (Starry Sky)
│   ├── collection-3/   # 1 photo + 1 video — Malibu Cover
│   ├── collection-4/   # 1 video — Nail Box
│   ├── collection-5/   # 3 photos + 1 video — Cyber-core
│   ├── collection-6/   # 1 video — Tết Xinh (Spring Festival)
│   └── collection-7/   # 1 photo — Dịu Dàng (Gentle)
├── .nojekyll           # GitHub Pages config (disable Jekyll)
└── README.md           # This file
```

## 🚀 Deploy to GitHub Pages

### Option 1: Using GitHub CLI (Recommended)

```bash
# Navigate to project folder
cd /path/to/KuroNailsWeb

# Initialize git repo
git init
git add .
git commit -m "Initial commit — Kuro Corner Nail website"

# Create GitHub repo
gh repo create KuroNailsWeb --public --source=. --remote=origin --push

# Enable GitHub Pages
gh api repos/:owner/KuroNailsWeb/pages \
  --method PUT \
  --field source='{"branch":"main","path":"/"}'
```

### Option 2: Manual Steps

1. Go to [GitHub](https://github.com) → **New Repository**
2. Name it `KuroNailsWeb`, make it **Public**
3. Push your code:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/<your-username>/KuroNailsWeb.git
   git push -u origin main
   ```
4. Go to **Settings → Pages → Source** → Select `main` branch, `/` (root)
5. Click **Save** — your site will be live at `https://<your-username>.github.io/KuroNailsWeb/`

## 🎨 Tech Stack

- **HTML5** — Semantic, accessible markup
- **CSS3** — Custom properties, Grid, Flexbox, Animations
- **Vanilla JavaScript** — No frameworks, fast loading
- **Google Fonts** — Be Vietnam Pro + Playfair Display
- **Zero dependencies** — No build tools needed

## 📱 Contact

- **Phone:** 0369.710.440
- **Instagram:** [@kuro.corner.nail](https://www.instagram.com/kuro.corner.nail/)
- **Facebook:** [Kuro Corner Nail](https://www.facebook.com/Kuro.Corner.Nail)
- **Address:** 212/4 Đỗ Xuân Hợp, Phước Long A, TP Thủ Đức
- **Hours:** 10:00 AM — 10:00 PM (Daily)

## 📄 License

© 2024 Kuro Corner Nail. All rights reserved.
