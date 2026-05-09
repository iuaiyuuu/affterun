# IMPLEMENTATION_PLAN.md

```md id="3b1n7k"
# IMPLEMENTATION PLAN

# Affterun

Turning runs into indie posters.

---

# DEVELOPMENT STRATEGY

Project dibangun dengan pendekatan:
- small scope
- fast iteration
- visual-first
- mobile-first

Prioritas utama:
hasil poster harus terlihat keren dan shareable.

Bukan fokus ke fitur kompleks.

---

# PHASE 1 — Project Initialization

## Goals
Membuat fondasi project yang ringan dan stabil.

## Tasks

### Setup Project
- create React + Vite app
- install TailwindCSS
- setup folder structure
- setup responsive viewport

### Setup Base UI
- landing page
- upload section
- style selection section
- poster preview section

### Setup Fonts
Install:
- Inter
- Bebas Neue
- IBM Plex Mono
- Space Mono

## Deliverables
- project running
- mobile layout working
- clean base structure

---

# PHASE 2 — Input System

## Goals
Membuat sistem input sederhana dan cepat.

## Tasks

### Strava Link Input
Create:
- input field
- validation state
- activity placeholder

### Photo Upload
Create:
- image uploader
- image preview
- image replace system

### Style Selector
Create:
- poster preset gallery
- clickable preview cards
- active preset state

## Deliverables
- user dapat upload foto
- user dapat pilih style
- input flow stabil

---

# PHASE 3 — Poster Rendering Engine

## Goals
Membuat sistem poster HTML/CSS.

## Tasks

### Create Poster Container
Setup:
- portrait aspect ratio
- overlay layers
- typography layers
- image positioning

### Dynamic Data Injection
Inject:
- distance
- pace
- duration
- date
- title text

### Route Placement
Optional:
- route image layer
- transparent overlay route

## Deliverables
- poster dynamic working
- responsive rendering stable

---

# PHASE 4 — Style Presets

## Goals
Membuat 6 visual identity presets.

---

## STYLE 01 — AFTER SUN

### Direction
Warm indie cinematic.

### Tasks
- warm overlay
- soft grain
- large typography
- cinematic spacing

---

## STYLE 02 — TRAVEL ZINE

### Direction
Editorial travel magazine.

### Tasks
- paper texture
- metadata-heavy layout
- mono typography
- zine composition

---

## STYLE 03 — PATIENCE

### Direction
Minimal calm poster.

### Tasks
- whitespace composition
- pastel overlay
- soft bloom
- clean typography

---

## STYLE 04 — RETRO POSTER

### Direction
Vintage urban print.

### Tasks
- film grain
- large typography
- dusty texture
- retro crop

---

## STYLE 05 — MINIMAL GRID

### Direction
Swiss modern layout.

### Tasks
- grid system
- thin line composition
- grayscale aesthetic
- structured spacing

---

## STYLE 06 — FILM FRAME

### Direction
Analog cinematic frame.

### Tasks
- frame borders
- kodak-style overlays
- orange typography
- heavy grain

---

## Deliverables
- all 6 presets visually distinct
- mobile rendering stable
- export compatibility stable

---

# PHASE 5 — Export System

## Goals
Membuat poster dapat di-download.

## Tasks

### PNG Export
Implement:
- html-to-image
- export resolution
- quality optimization

### Download Button
Create:
- save image button
- export loading state

### Export Optimization
Ensure:
- no blurry export
- typography sharp
- proper spacing

## Deliverables
- downloadable PNG
- Instagram Story ready export

---

# PHASE 6 — Mobile Optimization

## Goals
Menyempurnakan UX mobile.

## Tasks

### Responsive Layout
Improve:
- spacing
- typography scale
- button placement

### Touch Interaction
Improve:
- upload interaction
- scrolling
- tap targets

### Performance Optimization
Reduce:
- unnecessary re-render
- oversized assets
- heavy CSS

## Deliverables
- smooth mobile experience
- fast rendering
- stable interaction

---

# PHASE 7 — Landing Page Polish

## Goals
Membuat branding terasa kuat.

## Tasks

### Hero Section
Add:
- cinematic poster previews
- scrolling showcase
- clean typography

### Branding
Display:
Affterun

by Abiyyu Rahman  
Supported by Google Cloud Platform Juara Vibe Coding

### Footer
Add:
- minimal footer
- GitHub link
- small project feel

## Deliverables
- cohesive visual identity
- strong first impression

---

# FINAL MVP CHECKLIST

## Functional
- paste link works
- upload image works
- style selection works
- poster rendering works
- PNG export works

---

## UI
- mobile friendly
- visually consistent
- aesthetic output
- smooth interaction

---

## Performance
- lightweight build
- fast loading
- stable rendering

---

# POST-MVP IDEAS

Bukan prioritas sekarang.

Possible future:
- animated poster
- video export
- public gallery
- more presets
- route animation
- spotify integration
- weather overlay

---

# MVP COMPLETION TARGET

MVP dianggap selesai jika:
- poster terlihat layak share
- mobile experience nyaman
- visual identity kuat
- aplikasi terasa ringan
- flow cepat tanpa friction
```
