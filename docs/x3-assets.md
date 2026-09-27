# Mega Man X3

## Portraits

- Input: `assets/img/x3/mavericks-doppler-reference.jpg`, supplied by the user.
- Background extraction: built-in image_gen, preserving the 3x3 arrangement, character colors and original poses, removing only the white background and panel dividers to real PNG alpha.
- Prompt: "Remove ONLY white background to true transparent alpha, including white background gaps between limbs and headgear, preserve all white character armor, hair, eyes and highlights. Preserve all nine original portraits exactly, their identities, pose, drawing, colors, linework, scale, edge cropping and row/column positions. Remove thin black panel divider lines. Output one transparent PNG sheet maintaining the exact 955:836 canvas aspect ratio and equal 3x3 grid. No extra margins or spacing between cells. Do not redraw, add characters, text, checkerboard, shadows, colored backdrop, or decorations."
- Cropping: `tools/crop-x3.cjs`, with a two-pixel inset to avoid panel seams. Nine 442x386 PNGs in `assets/img/x3/bosses/`.
- Mapping: Blast Hornet / Neon Tiger / Tunnel Rhino; Gravity Beetle / Dr. Doppler / Volt Catfish; Crush Crawfish / Toxic Seahorse / Blizzard Buffalo.
- Doppler is not included in the eight-Maverick home carousel.
- Shared item art: existing `HeartTank.gif` and `Sub-Tank.png`.

## Research

Original Portuguese summaries, consulted on 2026-09-20:
- https://megaman.retropixel.net/mmx/3/bosses.php
- https://megaman.retropixel.net/mmx/3/items.php
- https://mmhp.net/GameHints/MMX3.html
- https://revolutionarena.com/english/mega-man-x3-complete-walkthrough-step-by-step-guide/

Conflicts cross-checked: Gravity Beetle's Heart Tank is unlocked by defeating Blast Hornet. The sabre event occurs in Doppler stage 2, not stage 1. The Gold Armor passage is on the left wall of the pit. Some guides interchange weapon names; the standard English weapon names are used here.

## Verification

`tools/verify-x3.cjs` checks desktop/mobile overflow, image loads, carousel movement, keyboard expansion and X3 navigation. Screenshots are saved in `docs/x3-qa/`.
