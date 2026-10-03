# ARCADE — Season 01

A complete, continuously scrolling campus event website built with React, Vite, Three.js, GSAP, and ScrollTrigger.

## Run

```sh
npm install
npm run dev
```

Open the URL printed by Vite. `npm run build` creates the production build in `dist`; `npm run preview` serves it locally.

## Design and motion

The site combines a full-bleed cinematic arcade photograph, large condensed typography, real WebGL game collectibles, off-white editorial sections, a dark event gallery, and a magenta reservation section.

Scrolling stays native. Motion includes headline entrances, hero image parallax, a scroll-driven marquee, word-by-word manifesto color reveals, rotating stamps, content reveals, and a desktop pinned event gallery that travels horizontally as you scroll. On touch devices and in reduced-motion mode, the gallery uses a normal horizontal scroll container. Reduced-motion also disables decorative movement and reveals. The hero includes a bevelled 3D arcade cabinet with an emissive game screen, neon rails, and floating tokens. Event cards and details contain extruded Pac-Man and ghost geometry, a joystick, and a metal coin. Real mesh rotations respond to scrolling and pointer movement; reduced-motion preferences keep them still. IntersectionObserver creates WebGL renderers only for nearby visible objects, disposes offscreen resources, and rendering stops after input settles. Vector artwork remains as a no-WebGL fallback and for the compact event directory. Native dialogs trap keyboard focus and return you to the invoking control without resetting the page position.

## Content

Edit `src/events.js` to add or change events. Six featured nights are shown in the gallery; the full event directory contains all twelve with category filters. The schedule highlights the first six nights, and every event detail includes its full date, time, and venue. Dates and campus venues are fictional placeholders for October 2026.

## Reservations

The form validates name and email and saves a **demo reservation to localStorage on the current device**. It does not send a booking or email. Connect a real reservation endpoint before using this for a live event.

## Assets

- `public/assets/arcade-night.png`: generated with the built-in image generation tool, then saved into this project. Used by the hero and interlude.
- `src/ArcadeObject.jsx`: original Three.js game objects and visibility-driven rendering.
- `src/Poster.jsx`: poster layout, vector fallbacks, and directory thumbnails.
- Google Fonts supplies Barlow Condensed and Space Grotesk, with local font fallbacks.

Higgsfield was checked for an optional hero video; no general video generation credits were available, so no paid generation was submitted.

The final hero image prompt is preserved in `ASSET-PROMPT.md`.
