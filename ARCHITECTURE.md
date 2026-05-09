# ARCHITECTURE.md

````md id="2bnq4v"
# SYSTEM ARCHITECTURE

# Affterun

Turning runs into indie posters.

---

# 1. Architecture Overview

Affterun menggunakan arsitektur frontend-first yang ringan dan sederhana.

Tujuan utama:
- cepat dibuat
- mudah maintenance
- murah deploy
- mobile friendly
- tidak over-engineered

Sebagian besar proses dilakukan langsung di browser user.

---

# 2. High Level Flow

User Input
↓
Paste Strava Link
↓
Upload Photo
↓
Choose Style
↓
Generate Poster
↓
Render HTML/CSS Poster
↓
Export PNG
↓
Download & Share

---

# 3. Core Principle

Affterun bukan:
- aplikasi fitness
- social media
- analytics dashboard

Affterun adalah:
- visual generator
- indie poster maker
- social sharing tool

---

# 4. Tech Stack

## Frontend
- React
- Vite
- TailwindCSS

## Poster Rendering
- HTML
- CSS
- Layer overlays
- Typography system

## Export System
- html-to-image

## Hosting
- Vercel

---

# 5. Why Frontend First

Karena project berskala kecil:
- tidak perlu backend kompleks
- tidak perlu database
- tidak perlu login
- tidak perlu cloud storage

Keuntungan:
- biaya hampir nol
- deployment cepat
- maintenance mudah
- performa lebih ringan

---

# 6. Folder Structure

```txt
src/
├── assets/
│
├── components/
│   ├── ActivityInput.jsx
│   ├── UploadPhoto.jsx
│   ├── StyleSelector.jsx
│   ├── PosterCanvas.jsx
│   ├── PosterMeta.jsx
│   └── DownloadButton.jsx
│
├── presets/
│   ├── aftersun.js
│   ├── travelzine.js
│   ├── patience.js
│   ├── retro.js
│   ├── minimalgrid.js
│   └── filmframe.js
│
├── styles/
│   ├── aftersun.css
│   ├── travelzine.css
│   ├── patience.css
│   ├── retro.css
│   ├── minimalgrid.css
│   └── filmframe.css
│
├── utils/
│   ├── parseStrava.js
│   ├── exportImage.js
│   ├── filters.js
│   └── posterHelpers.js
│
├── pages/
│   └── Home.jsx
│
└── App.jsx
````

---

# 7. Rendering System

## Core Rendering Approach

Poster dibuat menggunakan:

* HTML
* CSS
* image overlays
* typography layers

Bukan generated image AI.

---

# 8. Poster Composition

Setiap poster terdiri dari:

## Background Layer

Foto upload user.

## Overlay Layer

Gradient / texture / grain.

## Typography Layer

Title + metadata.

## Activity Data Layer

* distance
* duration
* pace
* date

## Route Layer

Optional route preview.

---

# 9. Style Preset System

Setiap style memiliki:

* warna
* typography
* image filter
* layout composition
* overlay texture

Preset dikontrol menggunakan:

* CSS class
* config object

---

# 10. Export System

Poster HTML diubah menjadi PNG menggunakan:

* html-to-image

Output:

* portrait
* 1080x1920
* Instagram Story optimized

---

# 11. Mobile First Design

Affterun wajib:

* responsive
* touch-friendly
* vertical-first
* optimized untuk mobile browser

Prioritas utama:
Instagram Story workflow.

---

# 12. Performance Rules

## Target

* fast interaction
* low loading time
* lightweight rendering

## Avoid

* unnecessary animation
* heavy libraries
* large dependencies
* complex state management

---

# 13. State Management

Gunakan:

* React useState
* React props

Tidak perlu:

* Redux
* Zustand
* MobX

Karena scope project kecil.

---

# 14. Security

Karena project sederhana:

* tidak menyimpan akun user
* tidak menyimpan foto user
* tidak memiliki authentication system

Semua proses dilakukan client-side sebanyak mungkin.

---

# 15. Deployment Strategy

## Platform

Vercel

## Reason

* cepat
* gratis
* cocok untuk frontend app
* auto deploy GitHub
* mobile performance baik

---

# 16. Future Expansion (Optional)

Bukan bagian MVP.

Possible future:

* additional poster styles
* save poster history
* public gallery
* QR share
* animation export
* video poster mode

```
```
