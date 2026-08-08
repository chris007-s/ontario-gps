# 🗺 Ontario Back-Road GPS

A free, browser-based GPS for Ontario that avoids all 400-series highways and their connecting ramps — including the 401, 400, 404, 407, 410, 416, 417, 427, QEW, and all on/off ramps. Installs on your phone as a Progressive Web App (PWA) and works like a native GPS app.

**Live site:** [chris007-s.github.io/ontario-gps](https://chris007-s.github.io/ontario-gps/)

---

## Features

- 🚫 Avoids all 400-series highways, QEW, and connecting ramps
- 📍 Auto-detects your location on load — no setup needed
- 🗺 Full-screen map (Google Maps style) with route drawn in blue
- 🔊 Voice turn-by-turn narration — auto-detects English or Spanish from your phone settings
- 🛣 Lane direction guidance at intersections
- 🚦 Speed limit display from OpenStreetMap data — turns red if speeding
- 🔄 Auto-reroutes if you miss a turn (within 60m)
- 🔀 3 route styles + via point to force a different path
- 📋 Full directions list — tap any step to jump to it
- ⭐ Favourites — save and reload frequent routes
- 👥 Live Share — two-way real-time location sharing with family via 4-digit room code
- 📍 Find Me — share your exact position + nearest landmark via WhatsApp
- 📍 Nearby POIs — gas, coffee, food, pharmacy, hospital, parking, ATM, grocery
- 📤 Share live location as a Google Maps link or WhatsApp message
- 🔑 Key status indicator — shows if your API keys are working
- 📱 Installable as a PWA on Android and iPhone

---

## API Keys Required

You need three free API keys. None require a credit card.

| Service | What it does | Sign up |
|---------|-------------|---------|
| GraphHopper | Highway-free routing | [graphhopper.com](https://graphhopper.com) — free 500 routes/day |
| TomTom | Nearby POI search | [developer.tomtom.com](https://developer.tomtom.com) — free 2500/day |
| Firebase | Live Share real-time tracking | [console.firebase.google.com](https://console.firebase.google.com) — free |

---

## Quick Start

### 1. Get your API keys

**GraphHopper:**
1. Sign up at [graphhopper.com](https://graphhopper.com)
2. Dashboard → API Keys → copy your key

**TomTom:**
1. Sign up at [developer.tomtom.com](https://developer.tomtom.com)
2. Create an app → Settings → copy the API Key (starts with letters, not the UUID App ID)

**Firebase Realtime Database:**
1. Go to [console.firebase.google.com](https://console.firebase.google.com)
2. Create project → Build → Realtime Database → Create database → Test mode
3. Copy the database URL (e.g. `https://your-project-default-rtdb.firebaseio.com`)
4. Go to Rules tab and set:
```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

### 2. Add your keys to index.html

Open `index.html` in a text editor. Find the config block near the top:

```js
const GPS_CONFIG = {
  graphhopperKey: 'YOUR_GRAPHHOPPER_KEY_HERE',
  firebaseUrl:    'https://your-project-default-rtdb.firebaseio.com',
  foursquareKey:  'NOT_USED',
  tomtomKey:      'YOUR_TOMTOM_KEY_HERE',
  myName:         'Your Name'
};
```

Replace the placeholders with your real keys and set `myName` to your name (shown to others in Live Share).

### 3. Deploy

**GitHub Pages (recommended):**
1. Create a repo named `ontario-gps` at [github.com/new](https://github.com/new) — set to Public
2. Upload all 7 files
3. Settings → Pages → Branch: main → Save
4. Live at `https://yourusername.github.io/ontario-gps/`

**Netlify (if you want private source):**
1. Go to [app.netlify.com](https://app.netlify.com) → Deploy manually
2. Drag your folder onto the drop zone
3. Live in 10 seconds

### 4. Install on your phone

**Android (Chrome):**
1. Open the site in Chrome
2. 3-dot menu → Add to Home Screen → Add

**iPhone (Safari):**
1. Open the site in Safari
2. Share button → Add to Home Screen → Add

---

## How to Use

### Planning a route
1. Open the app — it asks for location permission, tap Allow
2. Your position is set as start automatically
3. Type destination in **Where to?** — suggestions appear as you type
4. Tap **Route** — highway-free route draws in blue on the map
5. Search bar collapses to a summary pill

### Driving
1. Tap **▶ Drive** — map locks onto your position at street level
2. Blue nav card shows current turn, street name, distance, lane arrows
3. Voice narrates each turn automatically
4. Speed limit sign appears — turns red if you exceed it
5. Miss a turn — it recalculates automatically
6. Tap **⏹ Stop** to end navigation

### Route options
- **🔀 Routes** — 3 different highway-free route styles drawn on map simultaneously
- **📍 Via point** — tap map or type address to force route through a specific street

### Live Share
1. Tap **👥 Live Share** → **Start Broadcasting**
2. A 4-digit code appears — send it via WhatsApp
3. Family opens the app → Live Share → Join → type code
4. Both see each other's dots on the map in real time
5. Tap anyone's dot → **🗺 Get Directions** to route to their position

### Find Me
1. Tap **👥 Live Share** → **Find Me** tab
2. Tap **📍 Get My Location**
3. Shows your address + nearest landmark
4. Send via WhatsApp or copy link → recipient opens Google Maps to your exact spot

### Nearby
Tap **📍 Nearby** → pick a category → results sorted by distance → tap any to route there

---

## Updating

When a new `index.html` is available:
1. Add your real keys to the config block
2. Upload to GitHub (replaces old file)
3. Changes live in ~60 seconds

---

## Files

| File | Description |
|------|-------------|
| `index.html` | The entire app — HTML, CSS, JavaScript, and your API keys |
| `sw.js` | Service worker — caches app for offline use |
| `manifest.json` | PWA manifest — enables Add to Home Screen |
| `icon-192.png` | App icon (192×192) |
| `icon-512.png` | App icon (512×512) |
| `README.md` | This file |
| `.gitignore` | Standard Git ignores |

---

## Tech Stack

- [Leaflet.js](https://leafletjs.com) — map rendering
- [OpenStreetMap](https://www.openstreetmap.org) — map tiles
- [GraphHopper](https://graphhopper.com) — routing with `car_avoid_motorway` profile
- [OSRM](https://project-osrm.org) — fallback router (may include highways — alert shown)
- [Nominatim](https://nominatim.org) — address geocoding and autocomplete
- [TomTom Places API](https://developer.tomtom.com) — nearby POI search
- [Firebase Realtime Database](https://firebase.google.com) — Live Share real-time sync
- [Overpass API](https://overpass-api.de) — speed limit data
- Web Speech API — voice narration
- Service Worker — PWA offline caching

---

## Notes

- Route shows in **blue** = GraphHopper working, highways avoided ✅
- Route shows in **orange dashed** = OSRM fallback, may include highways ⚠️
- GraphHopper free tier: 500 routes/day, resets at midnight
- TomTom free tier: 2,500 POI searches/day
- Firebase test mode rules expire after 30 days — update rules to keep Live Share working
- Speed limit and lane data richness depends on OSM coverage in the area
- Language auto-detected from phone settings (English or Spanish)

---

## License

MIT — free to use, modify, and deploy.
