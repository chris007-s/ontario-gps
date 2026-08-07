# Ontario Back-Road GPS

A free, self-hosted GPS for Ontario that avoids all 400-series highways and their connecting ramps.

**Live at:** https://chris007-s.github.io/ontario-gps/

## Features
- Avoids Hwy 400, 401, 404, 407, 410, 416, 417, 427, QEW and all connecting ramps
- Live GPS tracking — follows you as you drive
- Auto-recalculates if you miss a turn (within 60m off-route)
- Voice turn-by-turn narration in Canadian English
- Lane direction guidance
- Saved favourites (persist across sessions)
- Installable as a PWA — works like a native app on iPhone and Android
- Map tiles cached offline as you browse

## Deploy to GitHub Pages
See setup instructions in SETUP.md

## Tech Stack
- Leaflet.js — map rendering
- OpenStreetMap — map tiles
- GraphHopper API — routing with motorway/trunk avoidance
- OSRM — fallback router
- Nominatim — address geocoding
- Web Speech API — voice narration
- Service Worker — offline caching + PWA
