# Affterun 🎽

> **Turning runs into indie posters.**

Affterun is a web application that generates beautiful, aesthetic poster designs from your Strava running activities. Choose from multiple artistic styles and download your poster as a high-quality PNG.

---

## ✨ Features

- 🔗 **Strava OAuth Integration** — Connect your Strava account and auto-sync your latest activity
- 🖼️ **Photo Upload & Crop** — Upload any photo and interactively crop/zoom it to fit your poster
- 🎨 **Multiple Poster Styles** — Choose from 3 unique indie-style designs
- 📥 **High-Quality Download** — Export your poster as a PNG ready to share

---

## 🎨 Poster Styles

| Style | Size | Vibe |
|---|---|---|
| **After Sun** `Poster 001` | 1080 × 1350 px | Cinematic split-panel with dramatic typography |
| **Retro Sonet** `Poster 002` | 911 × 1350 px | Vintage editorial with masked RETRO lettering |
| **Patience** `Poster 003` | 759 × 1350 px | Serene landscape with elegant Poppins type |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- A [Strava API application](https://www.strava.com/settings/api) (for OAuth)

### Installation

```bash
git clone https://github.com/iuaiyuuu/affterun.git
cd affterun
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
VITE_STRAVA_CLIENT_ID=your_client_id
VITE_STRAVA_CLIENT_SECRET=your_client_secret
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

```bash
npm run build
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + Vite 5 |
| Styling | Tailwind CSS + Vanilla CSS per-preset |
| Image Cropping | `react-easy-crop` |
| Export | `html-to-image` |
| API | Strava REST API v3 |
| Fonts | Google Fonts (Poppins, Reddit Sans, Racing Sans One, Kaisei HarunoUmi, Sofia Sans Semi Condensed) |

---

## 📁 Project Structure

```
affterun/
├── public/
│   └── assets/          # Static assets (noise textures, icons)
├── src/
│   ├── components/
│   │   ├── PosterCanvas.jsx          # After Sun poster
│   │   ├── RetroPosterCanvas.jsx     # Retro Sonet poster
│   │   ├── PatiencePosterCanvas.jsx  # Patience poster
│   │   ├── ControlPanel.jsx          # Left sidebar controls
│   │   ├── ActivityInput.jsx         # Strava input & manual entry
│   │   ├── StyleSelector.jsx         # Poster style switcher
│   │   ├── UploadPhoto.jsx           # Photo upload handler
│   │   └── DownloadButton.jsx        # PNG export button
│   ├── styles/
│   │   ├── aftersun.css              # After Sun styles
│   │   ├── retro.css                 # Retro Sonet styles
│   │   └── patience.css              # Patience styles
│   ├── presets/
│   │   ├── aftersun.js               # Default data for After Sun
│   │   ├── retro.js                  # Default data for Retro
│   │   └── patience.js               # Default data for Patience
│   ├── utils/
│   │   ├── stravaApi.js              # Strava OAuth & API calls
│   │   └── parseStrava.js            # Activity data parser
│   └── App.jsx
├── patience.html         # Patience design reference
├── retro_sonet.html      # Retro design reference
└── vite.config.js
```

---

## 📸 How to Use

1. **Connect Strava** — Click "Connect with Strava" to auto-import your latest run data, or fill in the fields manually
2. **Upload Photo** — Drag & drop or select a photo, then crop and zoom to your liking
3. **Pick a Style** — Choose After Sun, Retro Sonet, or Patience
4. **Download** — Hit the download button to save your poster as PNG

---

## 📄 License

MIT © [Abiyyu Rahman](https://github.com/iuaiyuuu)
