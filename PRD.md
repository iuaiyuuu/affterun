# PRD.md

````md
# PRODUCT REQUIREMENTS DOCUMENT

# Affterun

Turning runs into indie posters.

by Abiyyu Rahman  
Supported by Google Cloud Platform Juara Vibe Coding

---

# 1. Overview

Affterun adalah aplikasi web mobile-friendly yang mengubah aktivitas Strava menjadi poster indie aesthetic yang siap dibagikan ke Instagram Story dan media sosial lainnya.

Aplikasi ini bukan fitness tracker, bukan social media, dan bukan platform kompetitif.

Affterun berfokus pada pengalaman emosional setelah lari:
- suasana kota pagi
- night run
- recovery run
- nostalgia
- healing
- cinematic running moment

Tujuan utama aplikasi adalah membuat aktivitas lari terasa lebih personal dan visual dibanding screenshot Strava biasa.

---

# 2. Product Vision

Membuat aktivitas lari terasa seperti momen dalam film indie, bukan sekadar statistik olahraga.

---

# 3. Core User Flow

User membuka website  
↓  
Paste link aktivitas Strava  
↓  
Upload foto  
↓  
Pilih style poster  
↓  
Generate poster  
↓  
Download PNG  
↓  
Share ke Instagram Story

---

# 4. Target Users

## Primary Users
- Pelari casual
- Pengguna Strava
- Running community
- Orang yang suka upload story setelah lari

## Secondary Users
- Urban runner
- Creative runner community
- Lifestyle runner
- Social media active users

---

# 5. Core Features

## 5.1 Paste Strava Link

User memasukkan link aktivitas Strava.

Contoh:
```txt
https://www.strava.com/activities/123456789
````

System mengambil data dasar aktivitas:

* distance
* duration
* pace
* elevation
* date
* time

Jika route preview tersedia:

* tampilkan route sebagai elemen visual tambahan

---

## 5.2 Upload Photo

User dapat upload:

* selfie
* sunrise
* jalan kota
* sepatu lari
* pemandangan
* night run photo

Foto menjadi elemen visual utama poster.

---

## 5.3 Style Selection

Tersedia 6 preset style.

### 1. AFTER SUN

Warm cinematic indie poster.

### 2. TRAVEL ZINE

Editorial magazine style.

### 3. PATIENCE

Minimal calm aesthetic.

### 4. RETRO POSTER

Vintage urban typography.

### 5. MINIMAL GRID

Swiss modern layout.

### 6. FILM FRAME

Analog film aesthetic.

---

# 6. Poster Output

Output berupa poster portrait:

* 1080 × 1920
* optimized untuk Instagram Story

Poster berisi:

* uploaded photo
* activity data
* route preview
* typography
* overlays
* preset filters

---

# 7. Design Direction

## Visual Style

* indie movie poster
* cinematic typography
* japanese editorial
* analog film
* zine aesthetic
* urban running culture

## UI Feel

* minimal
* mobile-first
* clean
* modern
* emotional

---

# 8. Platform

## Main Platform

Web application

## Device Priority

Mobile first

## Secondary

Desktop browser

---

# 9. Technical Scope

## Frontend Only Approach

Sebagian besar proses dilakukan client-side.

## No Complex Backend

Tidak menggunakan:

* database kompleks
* authentication
* realtime features
* social feed

---

# 10. Non Goals

Affterun TIDAK memiliki:

* leaderboard
* training analysis
* AI chat
* AI image generation
* social media timeline
* comments
* likes
* user profile system
* community system

---

# 11. Success Criteria

Project dianggap berhasil jika:

* user dapat generate poster < 15 detik
* mobile experience nyaman
* hasil poster layak di-share
* style visual konsisten
* aplikasi terasa ringan dan cepat

---

# 12. MVP Scope

## Included

* paste Strava link
* upload image
* 6 visual styles
* poster rendering
* PNG export
* mobile responsive UI

## Excluded

* login
* cloud storage
* AI API
* online gallery
* user history
* analytics dashboard

---

# 13. Branding

## Product Name

Affterun

## Tagline

Turning runs into indie posters.

## Credit

by Abiyyu Rahman
Supported by Google Cloud Platform Juara Vibe Coding

```
```
