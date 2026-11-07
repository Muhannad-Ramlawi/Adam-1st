# 👑 Boss Party – Digital Invitation

A tap-to-open, bilingual (English / عربي) first-birthday invitation in a Boss Baby style. Pure HTML, CSS & JavaScript — ready for GitHub Pages.

**Friday 18 December 2026 · 1:00 PM · Triumph Luxury Hotel – Pool Restaurant, New Cairo**

## What guests experience
1. A navy **"Baby Corp." briefcase** — tap to open: the lid lifts, the invitation card rises, confetti, and the music starts
2. **Hero**: your baby popping out of a gold arch with a crown, shimmering "BOSS PARTY!" title, date & time
3. **Countdown** with animated progress rings (live to 18 Dec 2026, 1:00 PM)
4. A short **note from Mom & Dad**
5. A looping **photo strip** (tap a photo to enlarge)
6. **Meeting details**: date, time, venue, attire, an embedded **Google Map**, **Open in Maps**, **Add to Calendar** (.ics) and optional **RSVP on WhatsApp**
7. **English ⇄ عربي** switch (full right-to-left layout and Arabic numerals) and a **music mute** button

## Customize (everything is at the top of `script.js`)
```js
const INVITE = {
  dateTime: "2026-12-18T13:00:00+02:00",
  mapsLink: "https://maps.app.goo.gl/...",
  mapQuery: "Triumph Luxury Hotel New Cairo",   // what the embedded map shows
  whatsapp: "201001234567",                     // country code, no "+"; leave "" to hide the RSVP button
  babyName: { en: "Our Little Boss", ar: "زعيمنا الصغير" },
  moments: ["assets/moments/full.jpg", ...],    // add your own photos here
};
```
The English and Arabic texts (including the note from Mom & Dad) are in the `I18N` block just below.

## Music
By default a Happy Birthday melody is played live in the browser. To use a real recording, add **`assets/song.mp3`** (or `assets/happy-birthday.mp3`) — it's picked up automatically.

## Add more photos
Copy photos into `assets/moments/` and add their paths to `moments` in `script.js`. (Portrait 4:5 photos look best.)

## Publish on GitHub Pages
1. Create a repository (e.g. `boss-invitation`) and upload all files, keeping the `assets` folder.
2. **Settings → Pages** → Deploy from a branch → `main` / `(root)`.
3. Share `https://<your-username>.github.io/boss-invitation/` with your guests.
