# Setup Guide — Ontario Back-Road GPS

## What you need

- A GitHub account (free)
- 3 free API keys (no credit card for any of them)
- About 15 minutes

---

## Step 1 — Get your API keys

### GraphHopper (routing)
1. Go to **graphhopper.com** → Sign up free
2. Dashboard → **API Keys** → copy your key
3. Free tier: 500 route calculations/day

### TomTom (nearby POIs)
1. Go to **developer.tomtom.com** → Sign up free
2. Create a new app
3. Click the app → **Settings** → under **General**, find the **Key** field
4. Copy the key — it looks like `6Cjy...` (NOT the UUID App ID)
5. Free tier: 2,500 requests/day

### Firebase (Live Share)
1. Go to **console.firebase.google.com** → Sign in with Google
2. Click **Add project** → name it `ontario-gps` → Create
3. Left sidebar → **Build** → **Realtime Database**
4. Click **Create database** → choose **United States** → **Start in test mode** → Enable
5. Copy the database URL shown at the top (e.g. `https://ontario-gps-default-rtdb.firebaseio.com`)
6. Click the **Rules** tab → replace all content with:
```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```
7. Click **Publish**

> ⚠️ Set a calendar reminder for 30 days from now to re-publish these rules — Firebase test mode expires.

---

## Step 2 — Add your keys to index.html

Open `index.html` in any text editor (Notepad, VS Code, etc.).

Find this block near the top of the file (around line 515):

```js
const GPS_CONFIG = {
  graphhopperKey: 'YOUR_GRAPHHOPPER_KEY_HERE',
  firebaseUrl:    'https://ontario-gps-default-rtdb.firebaseio.com',
  foursquareKey:  'NOT_USED',
  tomtomKey:      'YOUR_TOMTOM_KEY_HERE',
  myName:         'Jo'
};
```

Replace:
- `YOUR_GRAPHHOPPER_KEY_HERE` → your GraphHopper key
- The Firebase URL → your actual Firebase database URL
- `YOUR_TOMTOM_KEY_HERE` → your TomTom key
- `Jo` → your name (shown to others in Live Share)

Save the file.

---

## Step 3 — Deploy to GitHub Pages

1. Go to **github.com/new**
2. Repository name: `ontario-gps` (exact)
3. Set to **Public**
4. Click **Create repository**
5. On the new empty repo page → **Add file** → **Upload files**
6. Drag all 7 files into the upload area:
   - `index.html` (with your real keys)
   - `sw.js`
   - `manifest.json`
   - `icon-192.png`
   - `icon-512.png`
   - `README.md`
   - `.gitignore`
7. Click **Commit changes**
8. Go to **Settings** → **Pages** → Branch: **main** → **Save**
9. Wait 60 seconds → open **https://yourusername.github.io/ontario-gps/**

---

## Step 4 — Install on your phone

### Android (Chrome)
1. Open your site URL in Chrome
2. Tap the **3-dot menu** → **Add to Home Screen**
3. Tap **Add**

### iPhone (Safari)
1. Open your site URL in Safari
2. Tap the **Share button** (box with arrow)
3. Scroll down → **Add to Home Screen**
4. Tap **Add**

The GPS icon appears on your home screen. Tap it to launch full-screen like a native app.

---

## Updating the app

When a new version of `index.html` is available:

1. Open the new file in a text editor
2. Find the config block and add your real keys (same as Step 2)
3. Go to **github.com/yourusername/ontario-gps**
4. Click `index.html` → pencil ✏️ edit icon → delete all content → paste new content
5. Or: **Add file** → **Upload files** → drag the new file → Commit
6. Changes go live in about 60 seconds

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Orange dashed route | GraphHopper key issue or daily limit hit (resets midnight) |
| Nearby not working | Check TomTom key in config block |
| Live Share dots not appearing | Check Firebase rules are published (Step 1) |
| Map blank on load | Hard reload: Ctrl+Shift+R (desktop) or clear cache in Chrome settings |
| GPS not working | Must use HTTPS — GitHub Pages provides this automatically |
| Still seeing old version | Hard reload or wait 60 seconds after deploy |

---

## Key status indicator

The 🔑 pill in the chip row shows your key status:
- 🔑 **keys OK** (green) — GraphHopper and TomTom both responding
- 🔑 **key err** (red) — one of the keys is invalid
- 🔑 **no keys** (red) — placeholders still in the config block
