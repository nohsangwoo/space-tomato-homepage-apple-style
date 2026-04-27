
You are a senior frontend engineer and design system architect.

Your task is to build a **production-level landing page** using **Next.js + TailwindCSS + shadcn/ui**, based on a **cosmic horror + organic sci-fi design system**.

This is NOT a generic website.
This must feel like a **ritual interface connected to a living entity**.

---

# 🎯 Core Concept

* Theme: Cosmic Horror × Organic Tech × Cinematic UI
* Mood: Dark, ominous, alive
* UX Philosophy:

  * The UI should feel **subordinate to the background entity**
  * The page should feel like **something is watching the user**
  * Minimal UI, but extremely intentional

---

# 🖼️ IMAGE HANDLING (IMPORTANT)

* All images must be implemented as placeholders
* DO NOT generate or assume images
* Use empty containers like:

```tsx
<div className="w-full h-full bg-black/20" />
```

* Use comments like:

```tsx
{/* HERO_BACKGROUND_IMAGE */}
{/* CAPABILITY_IMAGE_01 */}
{/* PORTFOLIO_IMAGE_01 */}
```

---

# 🎬 HERO SECTION

## Layout

* Fullscreen (100vh)
* Left: text content
* Right or center: image placeholder

## Background

* Dark overlay gradient on top of image

```css
background: linear-gradient(180deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 60%);
```

## Headline

Large, bold, left-aligned:

"We don’t build websites.
We summon experiences."

Alternative style:
"Something is watching.
Let’s make them stay."

## Typography

* Font: Inter Tight or similar
* Tracking: slightly negative
* Strong hierarchy

## CTA Buttons

Primary:

* Background: #FF2D2D
* Glow effect
* Text: "Start the Project"

Secondary:

* Outline style
* Text: "View Works"

---

# 🎨 DESIGN SYSTEM

## Colors

* Background: #000000
* Primary Red: #FF2D2D
* Deep Red: #8A0F0F
* Text: #FFFFFF
* Subtext: #AAAAAA

## Effects

Glow:

```css
box-shadow: 0 0 20px rgba(255, 45, 45, 0.6);
```

Glass UI:

```css
background: rgba(255,255,255,0.03);
backdrop-filter: blur(10px);
border: 1px solid rgba(255,0,0,0.1);
```

---

# 🧩 SECTION 2 — CAPABILITIES

3 cards:

* Interactive Web
* AI Content System
* Conversion UX

## Card Style

* Glass morphism
* Subtle red border
* Hover → red glow expands

Each card should include:

* image placeholder
* title
* description

---

# 🧬 SECTION 3 — PROCESS

This is NOT a normal step UI.

Use organic naming:

* 01 Seed
* 02 Growth
* 03 Mutation
* 04 Domination

## Layout

* Horizontal timeline
* Connected with red glowing line

---

# ⚙️ SECTION 4 — SELECTED WORKS

Grid layout (4 items)

Each item:

* image placeholder
* title
* category

## Interaction

* Hover → red overlay
* Slight scale
* Optional distortion effect

---

# 🎨 SECTION 5 — DESIGN SYSTEM (SHOWCASE)

Include:

* Color palette blocks
* Typography preview
* Button variants

---

# 🚨 FINAL CTA SECTION

Full width

Text:
"Ready to summon something extraordinary?"

Button:
"Start the Project"

Background:

* dark red glow effect
* optional radial gradient

---

# ✨ MICRO INTERACTIONS (IMPORTANT)

Implement:

* Fade-in on scroll
* Stagger animation for text
* Button hover glow
* Subtle floating motion (optional)

---

# ⚙️ TECH REQUIREMENTS

* Next.js App Router
* TailwindCSS
* shadcn/ui components
* Responsive design
* Clean component structure

---

# 📦 OUTPUT FORMAT

* Full working page
* Componentized structure
* Clean, readable code
* No placeholder lorem ipsum → use meaningful text

---

# 🚫 DO NOT

* Do not use bright colors except red accent
* Do not overcrowd UI
* Do not make it look like a template
* Do not use generic SaaS design patterns

---

# ✅ GOAL

The final result should feel like:

"A cinematic, living interface where the UI is secondary to a cosmic entity."

---
