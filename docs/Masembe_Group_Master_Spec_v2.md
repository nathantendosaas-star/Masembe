# MASEMBE GROUP INTEGRATED PLATFORM
## Master Design, Architecture & Implementation Specification — v2.0

> **Project Codename:** DUAL GATEWAY  
> **Client:** Naseeb Masembe — CEO & Founder, Masembe Group of Companies / Grid Motors Kla  
> **Stack:** React (Vite) + TypeScript · Tailwind CSS · Framer Motion · GSAP ScrollTrigger  
> **Deployment:** Vercel (Preview Branches + Instant Rollback)  
> **Aesthetic Reference:** Pratap Design Luxury Showroom — adapted for dual-identity architecture

---

## TABLE OF CONTENTS

1. [Strategic Vision](#1-strategic-vision)
2. [Design System & Visual Language](#2-design-system--visual-language)
3. [Global Architecture & Navigation](#3-global-architecture--navigation)
4. [Entry Portal — The "Zero Page"](#4-entry-portal--the-zero-page)
5. [Grid Motors Kla — Automotive Side (7 Pages)](#5-grid-motors-kla--automotive-side)
6. [Masembe Group — Real Estate Side (5 Pages)](#6-masembe-group--real-estate-side)
7. [Shared Sections (3 Modules)](#7-shared-sections)
8. [Animation Architecture](#8-animation-architecture)
9. [Parallax System — Deep Dive](#9-parallax-system--deep-dive)
10. [Component Library](#10-component-library)
11. [Data Layer & Content Schema](#11-data-layer--content-schema)
12. [Mobile & Responsive Strategy](#12-mobile--responsive-strategy)
13. [Performance & Optimization](#13-performance--optimization)
14. [SEO & Metadata Strategy](#14-seo--metadata-strategy)
15. [File & Folder Structure](#15-file--folder-structure)
16. [Phased Build Roadmap](#16-phased-build-roadmap)

---

## 1. STRATEGIC VISION

### 1.1 The Core Problem
Naseeb Masembe operates two premium, high-trust businesses (luxury automotive and luxury real estate) that share a CEO identity but serve slightly different audiences. A separate website for each would dilute the personal brand. A single generic site would fail to serve either business' aesthetic.

### 1.2 The Solution: "The Dual Gateway"
A single URL (e.g., `masembegroup.com`) that functions as two fully-themed worlds connected by a persistent, elegant identity switcher. The user CHOOSES their journey. Both sides share the same design DNA but execute in entirely different color systems, typography pairs, and content flows.

### 1.3 The Dual Audience
| Audience | Side | Behavior |
|---|---|---|
| High-net-worth individuals seeking bespoke vehicles | Grid Motors | Browse inventory, inquire on import orders, book workshop |
| Investors & property buyers in Kampala | Masembe Group Real Estate | View portfolio, book advisory, explore developments |
| Both (Naseeb's personal brand audience) | Shared | About page, CEO narrative, unified contact |

### 1.4 North Star Metrics for the Build
- First Contentful Paint: < 1.5s
- Lighthouse Performance Score: > 90
- Mobile Conversion: WhatsApp CTA click rate > 4%
- Lead form completions: > 2% of unique sessions

---

## 2. DESIGN SYSTEM & VISUAL LANGUAGE

### 2.1 The "Pratap Rules" — Non-Negotiable Design Laws
Every page on both sides of the site must obey these three laws:

**Law 1 — The Floating Subject**
Every hero section must feature one primary subject (car or building) as a high-resolution, background-removed PNG or WebP that appears to "float" in the center of the viewport. No ground shadows. The subject is the page.

**Law 2 — The Parallax Watermark**
Behind every subject, massive low-opacity display text (5–10% opacity) moves at exactly 50% of the user's scroll/swipe speed. This creates the illusion of dimensional depth without 3D rendering cost.

**Law 3 — Staggered Data Reveal**
No data appears at once. After the subject lands (animation complete), each data node (price, HP figure, bedroom count) fades in on a 100ms stagger. This creates the feeling of the page "breathing" information to the user.

### 2.2 Grid Motors Kla — Theme Tokens

```css
/* AUTOMOTIVE THEME */
--bg-primary: #F7F7F5;           /* Warm off-white — cleaner than pure white */
--bg-secondary: #EDEDEA;          /* Subtle gray panels */
--bg-dark: #111111;               /* For contrast sections */
--accent-primary: #C8102E;        /* Grid Motors red — power, performance */
--accent-secondary: #1A1A1A;      /* Near-black for typography */
--text-primary: #0D0D0D;
--text-muted: #6B6B6B;
--text-watermark: rgba(0,0,0,0.06); /* The "G-WAGON" layer */
--border-subtle: rgba(0,0,0,0.08);
--glass-bg: rgba(247,247,245,0.7);
--glass-border: rgba(255,255,255,0.4);
```

**Typography (Automotive):**
- Display / Watermark: `Bebas Neue` — brutal, mechanical, unforgettable
- Subheadings / Labels: `DM Sans` — modern, precise, readable
- Body / Descriptions: `Inter` — utilitarian legibility
- Price / Stats: `Space Mono` — monospaced data feel, like a performance spec sheet

**Visual Motifs:** Thin horizontal rule lines, rpm-dial circles, micro-grid textures in backgrounds.

### 2.3 Masembe Group — Real Estate Theme Tokens

```css
/* REAL ESTATE THEME */
--bg-primary: #0C0C0C;           /* Deep obsidian */
--bg-secondary: #141414;          /* Slightly lifted dark */
--bg-light: #1E1E1E;             /* Card surfaces */
--accent-primary: #C9A84C;        /* Premium matte gold */
--accent-glow: #E8C97A;           /* Light gold for hover states */
--accent-secondary: #FFFFFF;      /* Pure white as contrast accent */
--text-primary: #F0EDE6;          /* Warm cream — not harsh white */
--text-muted: #8A8275;            /* Warm gray */
--text-watermark: rgba(201,168,76,0.07); /* Gold watermark layer */
--border-subtle: rgba(201,168,76,0.15);
--glass-bg: rgba(12,12,12,0.75);
--glass-border: rgba(201,168,76,0.2);
```

**Typography (Real Estate):**
- Display / Hero: `Cormorant Garamond` — luxury, heritage, architectural
- Subheadings: `Montserrat` — clean, corporate authority
- Body: `Lora` — readable serif that stays warm
- Data / Floor Plans: `Space Mono` — shared with auto side, unifies the brand DNA

**Visual Motifs:** Gold fine lines, architectural grid overlays, grain texture overlays (subtle noise filter), diagonal accent lines.

### 2.4 Shared Brand Identity
Both sides share:
- The "M" monogram of Masembe Group as the favicon and loader element
- `Space Mono` for all numerical data (unifies the brand feel across both themes)
- Consistent border-radius philosophy: `4px` on inputs/buttons, `0px` on large card containers (sharp luxury feel)
- WhatsApp green CTA button as a global persistent element

---

## 3. GLOBAL ARCHITECTURE & NAVIGATION

### 3.1 The Persistent Shell
Every page on the entire site shares this shell — it does not unmount during route changes or identity switches:

```
┌─────────────────────────────────────────────────────────────┐
│  [M Logo]           MASEMBE GROUP      [Cars | Property] [↗] │  ← Fixed Header
├─────────────────────────────────────────────────────────────┤
│ [X]  │                                                  [WA] │  ← Left social rail / Right WA
│ [IG] │            PAGE CONTENT                               │
│ [TK] │                                                       │
│      │                                                       │
└─────────────────────────────────────────────────────────────┘
```

**Fixed Header (`GlobalHeader.tsx`)**
- Height: 72px desktop / 60px mobile
- Glassmorphism: `backdrop-filter: blur(20px)` over either theme background
- Left: Masembe Group "M" monogram — clicking it always returns to the Zero Page
- Center: Page title that animates in per route (fades up on each page change)
- Right: The Dual Identity Switcher toggle + an external "Book Appointment" icon link

**The Identity Switcher**
- Appears as a pill toggle: `[ AUTOMOTIVE | REAL ESTATE ]`
- The active side label is filled with the active theme's accent color
- Clicking the inactive side triggers the "Page Flip" transition (see §8.3)
- On mobile: collapses into a single icon (steering wheel ↔ building icon)

**Left Social Rail (`SocialRail.tsx`)**
- Fixed vertical strip on left edge, desktop only
- Icons: X (Twitter), Instagram, TikTok (for Grid Motors side) / X, LinkedIn (for Real Estate side)
- Icons are 20px, spaced 24px apart, color matches theme accent
- A thin vertical line runs above and below the icons

**WhatsApp CTA (`WhatsAppCTA.tsx`)**
- Fixed bottom-right, always visible
- Circular button (56px diameter) with WhatsApp icon
- Subtle pulse animation (scale 1.0 → 1.08 → 1.0 on 3s loop)
- On hover: expands to show "Chat with Sales" or "Chat with Property Team" (context-aware based on active theme)
- Routes to the specific WhatsApp number for each department

### 3.2 Navigation Menus (Per Theme)

**Grid Motors Kla Nav:**
```
Showroom  |  Inventory  |  Workshop  |  Import-on-Order  |  About
```

**Masembe Group Real Estate Nav:**
```
Properties  |  Portfolio  |  Advisory  |  Developments  |  About
```

Both navs share "About" which routes to the unified CEO/legacy page.

Nav link hover state: A thin underline that draws from left to right (200ms ease). No background color changes.

### 3.3 Route Map

```
/                           → Zero Page (Entry Portal)
/cars/                      → Grid Motors Home (Showroom)
/cars/inventory             → All Stock Grid
/cars/workshop              → Customz & Tuning
/cars/import                → Import-on-Order Portal
/cars/car/:slug             → Individual Car Detail Page
/property/                  → Real Estate Home
/property/portfolio         → Full Development Portfolio
/property/advisory          → Investment Advisory
/property/listing/:slug     → Individual Property Detail
/about                      → CEO Legacy (Shared)
/contact                    → Unified Contact (Shared)
```

---

## 4. ENTRY PORTAL — THE "ZERO PAGE"

**Route:** `/`  
**Purpose:** Force a choice. Make that choice feel cinematic.

### 4.1 Layout: The Living Split Screen

The viewport is divided into two halves. These halves are alive — they respond to mouse position.

**Left Half — Grid Motors (Automotive):**
- Background: `#111111` (dark) with a looping, muted video of the G63 driving at night, desaturated to 80%
- Foreground: Large centered text `GRID MOTORS KLA` in Bebas Neue, white
- Sub-label: "Luxury. Performance. Prestige." in DM Sans Light
- CTA: `[ ENTER THE SHOWROOM → ]` button (white text, red underline on hover)

**Right Half — Masembe Group Real Estate:**
- Background: `#0C0C0C` with a slow-moving drone video of a Nakasero property exterior
- Foreground: `MASEMBE GROUP` in Cormorant Garamond, gold
- Sub-label: "Premium Real Estate. Kampala's Finest." in Montserrat Light
- CTA: `[ EXPLORE THE PORTFOLIO → ]` button (gold text, gold underline on hover)

**The Divider:**
- A 2px vertical line of gradient (white on auto side, gold on RE side) sits exactly center
- The Masembe Group "M" monogram sits directly on this line, perfectly centered, 80px size

### 4.2 Mouse Hover Interaction

```typescript
// Pseudo-logic for split screen interaction
const [mouseX, setMouseX] = useState(50); // percentage from left

// On mouse move:
// leftWidth = clamp(mouseX, 35, 65) — the left panel expands toward the cursor
// rightWidth = 100 - leftWidth
// Transition: 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94)
```

When cursor is on the left side, the automotive panel expands to ~60% width. The right panel compresses to ~40%. The dividing line shifts accordingly. Neither side fully disappears.

### 4.3 Mobile Version of Zero Page
No split screen (too small). Instead:
- Full-screen auto-cycling between the two identities every 5 seconds
- The transition is a full-screen vertical wipe (bottom to top)
- Two stacked buttons: `AUTOMOTIVE` and `REAL ESTATE`
- The M monogram centers the screen, tap it to enter with the last hovered identity

### 4.4 Entry Animations (Sequence)
1. `0ms` — Page loads. Both panels are black.
2. `300ms` — The M monogram fades in at center.
3. `600ms` — The divider line draws itself top-to-bottom.
4. `900ms` — Both background videos fade in (opacity 0 → 0.6).
5. `1100ms` — Left text block slides up from y:40.
6. `1250ms` — Right text block slides up from y:40.
7. `1500ms` — Both CTA buttons fade in.
8. `2000ms+` — Mouse interaction becomes active.

---

## 5. GRID MOTORS KLA — AUTOMOTIVE SIDE

### PAGE 1: THE INTERACTIVE SHOWROOM (`/cars/`)

**The Primary "Pratap" Experience**

#### 5.1.1 Layout Architecture
```
[Full Viewport]
│
├── Layer 0 (z-0): Subtle dot-grid background texture, fixed
├── Layer 1 (z-10): WATERMARK TEXT (e.g., "G-WAGON") — moves at 50% scroll speed
├── Layer 2 (z-20): CAR PNG — the floating subject
├── Layer 3 (z-30): SPEC NODES — fade in after car lands
├── Layer 4 (z-40): SLIDE CONTROLS (Prev / Next / Indicator dots)
└── Layer 5 (z-50): HEADER (global)
```

#### 5.1.2 The Watermark Layer
- Font: Bebas Neue
- Size: `clamp(120px, 18vw, 240px)` — always fills at least 70% of viewport width
- Opacity: `0.06` on white background (barely there, but creates dimension)
- Color: `var(--text-primary)` — same as text, not accent color
- Letter-spacing: `-0.02em` (tightly kerned, architectural)
- Parallax: `translateY(scrollY * -0.5)` — moves opposite to scroll direction
- The text is the car's model name: "G-WAGON", "LAND CRUISER", "RANGE ROVER", "RS6"

#### 5.1.3 The Car PNG Layer
- Container: `width: 75vw, max-width: 900px` centered horizontally
- The PNG is positioned slightly right of center (55% from left) to leave room for spec data on the left
- **Entry Animation:**
  ```
  initial: { x: 300, opacity: 0, scale: 0.88 }
  animate: { x: 0, opacity: 1, scale: 1 }
  transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] }
  ```
- **Exit Animation:**
  ```
  exit: { x: -400, opacity: 0, scale: 0.88 }
  transition: { duration: 0.5, ease: [0.55, 0, 1, 0.45] }
  ```
- Drop shadow: `filter: drop-shadow(0px 40px 80px rgba(0,0,0,0.15))`

#### 5.1.4 Spec Nodes (Left Column)
These appear on the LEFT side of the screen while the car occupies the right.

**Layout (top to bottom):**
```
CAR MAKE (small caps label, muted)
CAR MODEL NAME (Bebas Neue, 72px)
CAR YEAR

━━━━━━━━━━━ (thin rule)

⚡ [HP]        hp
🏁 [0-100]     sec
🔝 [TOP SPEED] km/h
💰 [PRICE]     USD / UGX

━━━━━━━━━━━

[ BOOK A VIEWING ]   [ REQUEST IMPORT QUOTE ]
```

**Animation (stagger after car lands):**
- Car landing completes at ~850ms
- At 900ms: CAR MAKE fades in (y: 20 → 0)
- At 1000ms: CAR MODEL slides up
- At 1100ms: YEAR fades in
- At 1200ms: Rule line draws from left to right (scaleX: 0 → 1)
- At 1300ms–1600ms: Each stat node fades in with 100ms stagger
  - Each number "counts up" from 0 to its value over 800ms (easing: easeOut)
- At 1700ms: CTA buttons fade in

#### 5.1.5 Slider Navigation
- Bottom-center: 4 thin horizontal lines (one per car in fleet)
- Active car = full-width line, `var(--accent-primary)` color
- Inactive = 30px width, `var(--text-muted)` color
- Previous / Next arrows: hairline arrow icons, positioned left and right edges of the car
- Keyboard: Arrow keys navigate between cars
- Touch/Mobile: Horizontal swipe gesture (velocity threshold: > 300px/s)
- Auto-advance: Every 8 seconds if no user interaction

#### 5.1.6 Fleet Data (Initial 4 Cars)
```typescript
const fleet = [
  {
    id: "g63-amg",
    make: "Mercedes-Benz",
    model: "G63 AMG",
    year: 2024,
    watermark: "G-WAGON",
    hp: 577,
    zeroToHundred: 4.5,
    topSpeed: 220,
    price: { usd: 185000, ugx: 690000000 },
    status: "In Showroom",
    origin: "Germany via Dubai",
    image: "/assets/cars/g63-hero.webp",
    customization: "Mansory Body Kit | Matte Black Wrap | Custom Interior"
  },
  {
    id: "lc300",
    make: "Toyota",
    model: "Land Cruiser LC300",
    year: 2024,
    watermark: "LAND CRUISER",
    hp: 415,
    zeroToHundred: 6.7,
    topSpeed: 210,
    price: { usd: 95000, ugx: 354000000 },
    status: "In Showroom",
    origin: "Japan",
    image: "/assets/cars/lc300-hero.webp",
    customization: "TRD Body Kit | Black Alloys | 4x4 Lift Kit"
  },
  {
    id: "range-rover-sv",
    make: "Land Rover",
    model: "Range Rover SV Autobiography",
    year: 2024,
    watermark: "RANGE ROVER",
    hp: 530,
    zeroToHundred: 5.1,
    topSpeed: 225,
    price: { usd: 210000, ugx: 783000000 },
    status: "Arriving Soon",
    origin: "UK",
    image: "/assets/cars/rrsvab-hero.webp",
    customization: "Luxury Interior Package | 23\" Gloss Black Wheels"
  },
  {
    id: "audi-rs6",
    make: "Audi",
    model: "RS6 Avant",
    year: 2024,
    watermark: "RS SIX",
    hp: 630,
    zeroToHundred: 3.4,
    topSpeed: 305,
    price: { usd: 145000, ugx: 540000000 },
    status: "Import-on-Order",
    origin: "Germany via UK",
    image: "/assets/cars/rs6-hero.webp",
    customization: "ABT Aero Package | Carbon Fiber Accents"
  }
];
```

---

### PAGE 2: THE GRID INVENTORY (`/cars/inventory`)

#### 5.2.1 Layout
A controlled grid of vehicle cards. Desktop: 3 columns. Tablet: 2 columns. Mobile: 1 column.

#### 5.2.2 Filter Bar
Sticky below the header. Filters:
- **By Brand:** All | Mercedes | Land Rover | Toyota | Audi | BMW | (expandable)
- **By Status:** All | In Showroom | Arriving Soon | Import-on-Order
- **By Price:** Under $80k | $80k–$150k | $150k+ | Price on Request

Filter chips are small pills. Active chip: filled with `--accent-primary`, white text. Inactive: outlined.

#### 5.2.3 Car Card Design
Each card:
```
┌────────────────────────────┐
│  [STATUS TAG]              │  ← "In Showroom" badge (top left)
│                            │
│     [ CAR PNG ]            │  ← PNG pops up 20px above card frame on hover
│   (floating, no bg)        │
│                            │
├────────────────────────────┤
│  MERCEDES-BENZ             │  ← Make (small caps, muted)
│  G63 AMG 2024              │  ← Model (Bebas Neue, 24px)
│  ─────────────────         │
│  577hp  |  4.5s  |  220kmh │  ← Stats inline
│                            │
│  USD 185,000               │  ← Price (Space Mono)
│              [ VIEW → ]    │  ← CTA (right aligned)
└────────────────────────────┘
```

**Card Hover State:**
- Background lifts: `box-shadow: 0 24px 48px rgba(0,0,0,0.12)`
- Car PNG `transform: translateY(-20px)` — "pops" out of the card
- A subtle red accent line appears at the bottom of the card (scaleX: 0 → 1, 300ms)
- `[ VIEW → ]` text slides right by 4px

#### 5.2.4 "Arriving Soon" Cards
Cards for cars in transit get:
- A slightly desaturated car image (`filter: grayscale(0.3)`)
- An orange "ARRIVING SOON" pill badge
- A progress indicator showing transit stage: Sourced → Shipped → Clearing → Ready
- The price is shown but the CTA changes to `[ RESERVE YOURS ]`

---

### PAGE 3: INDIVIDUAL CAR DETAIL (`/cars/car/:slug`)

#### 5.3.1 Hero Section
Full-viewport Pratap display for the single car. Same layers as Showroom but no slider navigation. The spec data expands to show full details.

#### 5.3.2 Below the Fold — Detail Tabs
Four tabbed sections below the hero:

**Tab 1: Overview**
- Paragraph about the vehicle's significance, customization done by Grid Motors
- Origin story (where sourced, why this specific model)

**Tab 2: Specs**
Full technical spec table in Space Mono:
```
Engine          | 4.0L V8 Biturbo
Power           | 577 hp @ 6,000 rpm
Torque          | 850 Nm @ 2,500 rpm
Transmission    | 9-speed AMG Speedshift Plus
Drive System    | AMG 4MATIC+
Suspension      | Adaptive damping
Brakes          | Carbon ceramic (optional)
Weight          | 2,560 kg
...etc
```

**Tab 3: Grid Customz**
- Image gallery of the customization work done by Grid Motors
- Before/After slider if wrap was applied
- Bullet list of all modifications with their individual pricing

**Tab 4: Financing**
- A simple interactive calculator:
  - Deposit percentage slider (20%–50%)
  - Term selector (12 / 24 / 36 months)
  - Estimated monthly (shown in both UGX and USD)
  - Disclaimer: "Final rates subject to bank approval. Grid Motors partners with Stanbic, DFCU, and Centenary Bank."

#### 5.3.3 Inquiry Form (Sticky Sidebar)
On desktop, a sticky `InquiryPanel` floats right of the tabs:
```
┌──────────────────────────┐
│  Interested in this car? │
│                          │
│  Your Name               │
│  Phone / WhatsApp        │
│  Email (optional)        │
│                          │
│  I want to...            │
│  ○ Book a Viewing        │
│  ○ Get Import Quote      │
│  ○ Discuss Financing     │
│                          │
│  [ SEND INQUIRY ]        │
│                          │
│  ── or ──                │
│  [WhatsApp] Chat Now     │
└──────────────────────────┘
```

---

### PAGE 4: WORKSHOP — GRID CUSTOMZ & PERFORMANCE (`/cars/workshop`)

#### 5.4.1 Hero Section
- Background: Dark (`#111111`) — the only automotive page with a dark background for dramatic effect
- Floating subject: A close-up PNG of a wrapped G63 hood detail or custom wheel
- Watermark text: `"CUSTOM."`
- Tagline: "We don't sell cars. We build legends."

#### 5.4.2 Service Sections

**Section A: Vehicle Wrapping**
- Full-width Before/After interactive slider (drag handle)
  - LEFT: Car before wrap (factory color)
  - RIGHT: Car after wrap (custom)
  - Drag handle is a vertical line with a circular grip featuring the Grid Motors logo
- Below: Color swatch grid — available wrap colors and finishes (Matte, Satin, Chrome, PPF)
- CTA: `[ GET WRAP QUOTE ]`

**Section B: Body Kit Installations**
- Horizontal scroll gallery of body kit options:
  - Mansory Kit (G63)
  - AMG Line Full Conversion
  - TRD Off-Road Package (LC300)
  - Carbon Fiber Aero Kit (RS6)
- Each kit card shows: Kit name, compatible models, lead time, price range

**Section C: Performance Tuning**
- Three-column grid:
  ```
  Stage 1 ECU Remap    |  Stage 2 Full Tune    |  Exhaust Upgrade
  +50-80hp gains       |  +100-150hp gains      |  Akrapovič / Milltek
  Software only        |  Software + hardware   |  Sound + performance
  From $800            |  From $2,500           |  From $1,800
  ```

**Section D: Interior Detailing**
- Fullscreen image gallery of custom interiors: alcantara seats, ambient lighting, custom stitching
- Price ranges and lead times shown as data tags

#### 5.4.3 Workshop Booking Form
A multi-step form:
- Step 1: Your vehicle details (Make, Model, Year)
- Step 2: Service selection (checkboxes, multiple allowed)
- Step 3: Budget range and preferred timeline
- Step 4: Contact info and preferred contact method
- Confirmation: Animated checkmark + "Our workshop team will reach out within 24 hours."

---

### PAGE 5: IMPORT-ON-ORDER PORTAL (`/cars/import`)

#### 5.5.1 Hero
- Background: Dark map visual (stylized world map with glowing route lines)
- Subject: A shipping container with a luxury car silhouette inside — or a generic luxury SUV in transit imagery
- Watermark: `"GLOBAL"`
- Tagline: "From the world's finest showrooms to your driveway in Kampala."

#### 5.5.2 The "Keys-in-Hand" Journey Timeline
An interactive vertical (desktop) / horizontal (mobile) timeline:

```
STEP 1    STEP 2    STEP 3    STEP 4    STEP 5    STEP 6
  ●───────────●───────────●───────────●───────────●───────────●
CONSULT    SOURCE    PURCHASE  SHIPPING  CLEARING  DELIVERY
  │          │          │         │         │         │
"You tell  "We find  "Secure   "15-45    "URA tax  "We drive
 us your    the car   payment   days at   & port    it to your
 dream."    globally" via escrow  sea"    clearance" door"
```

Each step, when hovered/clicked, expands to show:
- Duration estimate
- What Grid Motors does
- What the client does
- Documents required

#### 5.5.3 URA Import Cost Calculator

```
┌────────────────────────────────────────┐
│  IMPORT COST ESTIMATOR                 │
│                                        │
│  Vehicle Value (USD)  [ __________ ]   │
│  Origin Country       [ UK ▾ ]         │
│  Vehicle Year         [ 2024 ▾ ]       │
│  Engine Size (CC)     [ 4000 ▾ ]       │
│  Fuel Type            [ ○ Petrol ○ Hybrid ]
│                                        │
│  ─────────────────────────────────     │
│  ESTIMATED COSTS:                      │
│                                        │
│  Import Duty (25%)         UGX ___     │
│  VAT (18%)                 UGX ___     │
│  Withholding Tax (6%)      UGX ___     │
│  Port Handling & Clearing  UGX ___     │
│  Grid Motors Service Fee   UGX ___     │
│                            ─────────   │
│  ESTIMATED TOTAL           UGX ___     │
│  (USD Equivalent)          USD ___     │
│                                        │
│  * Estimates only. Exact figures from  │
│    URA assessment on arrival.          │
│                                        │
│  [ REQUEST FORMAL QUOTE ]              │
└────────────────────────────────────────┘
```

The calculator updates all values in real time as the user types/selects. No form submit needed.

#### 5.5.4 Source Regions Section
Three destination cards with imagery:

**UNITED KINGDOM**
- Sourcing from: London dealerships, BCA auctions, AutoTrader UK
- Strengths: Right-hand drive stock, full service history, lower mileage
- Typical transit time: 35–45 days
- Preferred for: Range Rovers, Land Rovers, Bentley, Rolls-Royce

**JAPAN**
- Sourcing from: USS Tokyo, HAA Kobe, ZIP auctions
- Strengths: Pristine condition, low mileage, competitive pricing
- Typical transit time: 28–35 days
- Preferred for: Toyota LC300, Lexus, Nissan Patrol

**DUBAI (UAE)**
- Sourcing from: Al Ain Class, Dubai auction houses
- Strengths: Pre-modified stock, tax-free pricing, fast availability
- Typical transit time: 10–18 days
- Preferred for: G-Class, Bentley, Lamborghini, Ferrari

---

## 6. MASEMBE GROUP — REAL ESTATE SIDE

### PAGE 1: PROPERTY SHOWCASE HOME (`/property/`)

#### 6.1.1 Layout Architecture (Dark Theme)
```
[Full Viewport — Obsidian Background]
│
├── Layer 0 (z-0): Fine grain noise texture overlay (5% opacity)
├── Layer 1 (z-10): Gold geometric accent lines (diagonal, architectural)  
├── Layer 2 (z-20): PROPERTY NAME WATERMARK in Cormorant Garamond
├── Layer 3 (z-30): BUILDING/PROPERTY PNG (floating, background removed)
├── Layer 4 (z-40): PROPERTY DATA NODES
└── Layer 5 (z-50): HEADER (global)
```

#### 6.1.2 The Watermark Layer (Real Estate)
- Font: Cormorant Garamond, italic
- Opacity: `0.07` on dark background (gold color)
- Content: Property or neighborhood name — "NAKASERO", "MUNYONYO", "KOLOLO"
- Parallax: Same 50% scroll speed rule

#### 6.1.3 Property Data Nodes (Right Column)
```
LOCATION (small caps, gold muted)
PROPERTY NAME (Cormorant Garamond, 64px, cream)
TYPE + YEAR

━━━━━━━━━━━━━━━━━━ (gold rule)

🛏  [BEDROOMS]       beds
📐  [TOTAL AREA]     sqm / acres
🏢  [FLOORS]         levels
💰  [PRICE FROM]     USD

━━━━━━━━━━━━━━━━━━

[ SCHEDULE VIEWING ]   [ INVESTMENT INQUIRY ]
```

#### 6.1.4 Initial Property Portfolio (Slider)
```typescript
const properties = [
  {
    id: "nakasero-hill-residences",
    name: "Nakasero Hill Residences",
    location: "Nakasero, Kampala",
    watermark: "NAKASERO",
    type: "Luxury Apartments",
    bedrooms: "2 – 4",
    area: { min: 180, max: 420, unit: "sqm" },
    floors: 12,
    price: { from: 280000, currency: "USD" },
    status: "Ongoing Development",
    completion: "Q4 2026",
    image: "/assets/property/nakasero-hero.webp"
  },
  {
    id: "munyonyo-lake-villas",
    name: "Munyonyo Lake Villas",
    location: "Munyonyo, Kampala",
    watermark: "MUNYONYO",
    type: "Private Villas",
    bedrooms: "5 – 7",
    area: { min: 600, max: 1200, unit: "sqm" },
    floors: 2,
    price: { from: 850000, currency: "USD" },
    status: "Available",
    completion: null,
    image: "/assets/property/munyonyo-hero.webp"
  },
  {
    id: "kololo-commercial-hub",
    name: "Kololo Commercial Hub",
    location: "Kololo, Kampala",
    watermark: "KOLOLO",
    type: "Commercial Offices",
    bedrooms: null,
    area: { min: 80, max: 2000, unit: "sqm" },
    floors: 8,
    price: { from: 18, currency: "USD/sqm/month" },
    status: "Leasing",
    completion: null,
    image: "/assets/property/kololo-hero.webp"
  }
];
```

---

### PAGE 2: DEVELOPMENT PORTFOLIO (`/property/portfolio`)

#### 6.2.1 Category Tabs
Three categories: `Residential | Commercial | Ongoing`

#### 6.2.2 Property Card (Dark Theme)
```
┌────────────────────────────────┐
│  [STATUS: AVAILABLE]           │  ← Gold pill badge
│                                │
│  [ PROPERTY IMAGE ]            │  ← Full card fill image with gold grain overlay
│                                │
│  ────────────────────────────  │  ← Gold separator
│  NAKASERO · KAMPALA            │  ← Location (small, muted gold)
│  Nakasero Hill Residences      │  ← Name (Cormorant Garamond, white)
│                                │
│  3 Beds  |  280sqm  |  12 Fl.  │  ← Stats
│                                │
│  From USD 280,000              │  ← Price (Space Mono)
│              [ EXPLORE → ]     │
└────────────────────────────────┘
```

Card hover: Gold border appears (opacity 0 → 1, 300ms). Image zooms very slightly (scale 1.0 → 1.04).

#### 6.2.3 "Ongoing" Projects
Shows a project progress bar:
```
NAKASERO HILL RESIDENCES
Foundation ████████████░░░░ Planning Complete
Structure  ████░░░░░░░░░░░░ In Progress (40%)
Interior   ░░░░░░░░░░░░░░░░ Not Started
Completion: Q4 2026
```

---

### PAGE 3: INDIVIDUAL PROPERTY (`/property/listing/:slug`)

#### 6.3.1 Hero
Full Pratap display for the property. The building PNG floats with watermark behind it.

#### 6.3.2 Below the Fold Tabs

**Tab 1: Overview**
- Architectural narrative — why this property is significant
- Neighborhood context (walkability, views, nearby landmarks)

**Tab 2: Floor Plans**
- Interactive floor plan viewer
- Toggle between apartment types (2BR, 3BR, 4BR)
- Floor plan renders displayed in light gold line-art on dark background

**Tab 3: Amenities**
- Icon grid: Pool, Gym, Concierge, Parking Bays, Generator Backup, High-Speed Internet, 24hr Security, etc.
- Each amenity has a short description

**Tab 4: Investment Snapshot**
```
Purchase Price (3BR)    USD 380,000
Rental Yield Est.       8.5 – 11% p.a.
Capital Growth (5yr)    +35% projected
Rental Rate (monthly)   USD 2,800 – 3,500
Management Fee          8% of rental
Break-even Period       ~9 years
```

#### 6.3.3 Virtual Tour Embed
If available, a Matterport or YouTube 360 embed in a full-width 16:9 container.

---

### PAGE 4: REAL ESTATE ADVISORY (`/property/advisory`)

#### 6.4.1 Hero
- Watermark: `"ADVISORY"`
- Tagline: "Where capital meets Kampala's finest opportunities."
- Naseeb Masembe's portrait (professional, dark background, gold accent lighting)

#### 6.4.2 Services Offered (4 Cards)
1. **Land Acquisition** — Identifying and securing prime plots in Kampala's growth corridors
2. **Investment Strategy** — Portfolio structuring for foreign investors and diaspora Ugandans
3. **Development Consulting** — Architecture, contractor sourcing, and project oversight
4. **Off-Plan Purchasing** — Early-access pricing on upcoming Masembe Group developments

#### 6.4.3 Advisory Booking Form
A luxury, minimal form:
- Full Name
- Company / Fund Name (optional)
- Investment Budget (USD, dropdown ranges)
- Investment Type (Land | Residential | Commercial | Mixed-Use)
- Preferred Meeting Mode (In-Person Kampala | Video Call | WhatsApp)
- Brief (textarea, 300 char max)
- `[ REQUEST ADVISORY SESSION ]`

---

## 7. SHARED SECTIONS

### 7.1 THE CEO'S LEGACY — ABOUT PAGE (`/about`)

#### 7.1.1 Theme
A NEUTRAL midpoint between both themes: Pure black background, cream text, gold accents. Neither automotive nor real estate — this is the Masembe BRAND.

#### 7.1.2 Cinematic Hero
- Full viewport. No car. No building.
- Centered: A professional portrait photo of Naseeb Masembe (background removed, floating)
- Watermark behind him: `"NASEEB"` in enormous Cormorant Garamond, very low opacity gold
- Below portrait: `"Founder. Builder. Visionary."` in Bebas Neue, small
- Below that: `"Naseeb Masembe"` in Cormorant Garamond, large, cream

#### 7.1.3 The Story Section
Scrolling narrative with text on left, imagery on right (alternating per paragraph):
- **Origin:** Growing up in Uganda, early entrepreneurial instinct
- **Grid Motors:** How automotive passion became a business — the first vehicle imported, the first custom job
- **Masembe Group:** Expanding the vision to real estate, building Kampala's future
- **The Philosophy:** "Every car should be an extension of its owner's identity. Every building should outlive its builder."

#### 7.1.4 Achievement Timeline
Horizontal scroll (or vertical) timeline:

```
2015         2018         2020         2022         2024
  │            │            │            │            │
Founded    First luxury   Grid Customz  Real Estate  10,000+
Grid Motors  G-Wagon     division       division     sqm under
Kla          import       launched     founded       management
```

Each milestone expands on click to show a quote from Naseeb and an image.

---

### 7.2 UNIFIED CONTACT PAGE (`/contact`)

#### 7.2.1 Hero
- Watermark: `"CONTACT"`
- Tagline: "Reach the right team. We respond within 2 hours."

#### 7.2.2 The Routing Form
The form has a FIRST field that routes everything else:

```
INDUSTRY OF INTEREST
● Automotive (Grid Motors Kla)
● Real Estate (Masembe Group)
● Both / General Inquiry
```

Based on the selection, the rest of the form adapts:
- **Automotive:** Vehicle interest dropdown, budget range, preferred contact time
- **Real Estate:** Property type, investment size, timeline
- **General:** Free-text message only

#### 7.2.3 Dual-Mode Map
A Google Maps embed that shows TWO markers:
- **Grid Motors Kla:** Plot 1, Old Port Bell Road, Industrial Area (Red marker)
- **Masembe Group HQ:** Nakasero Office (Gold marker)

Both show in a single map view. Clicking a marker shows an info card with address, phone, and "Get Directions" link.

#### 7.2.4 WhatsApp Department Routing
Two WhatsApp buttons side by side:
```
[WhatsApp Icon] AUTOMOTIVE SALES         [WhatsApp Icon] PROPERTY TEAM
"Chat with Grid Motors"                  "Chat with Masembe Group"
```

---

### 7.3 FOOTER (GLOBAL)

```
┌────────────────────────────────────────────────────────────────┐
│                     M                                          │
│               MASEMBE GROUP                                    │
│          of Companies & Grid Motors Kla                        │
│                                                                │
│  Grid Motors Kla        │  Masembe Group RE    │  Connect      │
│  Showroom               │  Properties          │  Instagram    │
│  Inventory              │  Portfolio           │  TikTok       │
│  Workshop               │  Advisory            │  X (Twitter)  │
│  Import-on-Order        │  Developments        │  Facebook     │
│                         │                      │  WhatsApp     │
│                                                                │
│  Plot 1, Old Port Bell Road, Industrial Area, Kampala, Uganda  │
│                                                                │
│  © 2025 Masembe Group of Companies. All rights reserved.       │
│                                    Privacy Policy | Terms      │
└────────────────────────────────────────────────────────────────┘
```

Footer theme: Mirrors the ACTIVE identity (dark for RE, light for Automotive).

---

## 8. ANIMATION ARCHITECTURE

### 8.1 The Three Animation Tiers

**Tier 1: Micro-Interactions (CSS Only)**
- Button hover states (color transitions, underline draws)
- Card hover lifts (box-shadow transitions)
- Icon scale on hover
- All transitions: 200–300ms, `ease`
- Implementation: Tailwind `transition-*` utilities

**Tier 2: Page & Component Animations (Framer Motion)**
- Page enter/exit transitions
- The Pratap car/building "landing" sequence
- Spec node stagger reveals
- The watermark parallax effect
- The dual-identity page flip transition
- Implementation: Framer Motion `motion` components + `AnimatePresence`

**Tier 3: Scroll-Triggered Animations (GSAP ScrollTrigger)**
- Section reveals as user scrolls (fade up, slide in from sides)
- The timeline horizontal scroll on the About page
- Number counter animations (HP, prices, etc.) triggered on scroll into view
- Implementation: `gsap.from()` + `ScrollTrigger.create()`

### 8.2 The Pratap Car Landing Sequence (Full Detail)

```typescript
// Variants for AnimatePresence with mode="wait"
const carVariants: Variants = {
  enter: {
    x: 320,
    opacity: 0,
    scale: 0.88,
    filter: "blur(4px)"
  },
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      x: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
      opacity: { duration: 0.6, ease: "easeOut" },
      scale: { duration: 1.1, ease: [0.34, 1.56, 0.64, 1] }, // Spring-like backOut
      filter: { duration: 0.4 }
    }
  },
  exit: {
    x: -320,
    opacity: 0,
    scale: 0.92,
    filter: "blur(4px)",
    transition: {
      duration: 0.45,
      ease: [0.55, 0, 1, 0.45]
    }
  }
};

const watermarkVariants: Variants = {
  enter: { opacity: 0, x: 40 },
  center: {
    opacity: 0.06,
    x: 0,
    transition: { delay: 0.2, duration: 1.2, ease: "easeOut" }
  },
  exit: { opacity: 0, transition: { duration: 0.3 } }
};

const specContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.9 }
  }
};

const specItemVariants: Variants = {
  hidden: { y: 24, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};
```

### 8.3 The Identity Switch "Page Flip" Transition

When the user clicks the Dual Identity Switcher:

```
STEP 1 (0ms):    User clicks toggle. Switcher pill animates immediately.
STEP 2 (0ms):    A full-screen overlay div animates in from the right edge:
                 { x: "100%", opacity: 1 } → { x: "0%", opacity: 1 }
                 Duration: 400ms, ease: [0.76, 0, 0.24, 1]
                 Color: The DESTINATION theme's background color
STEP 3 (200ms):  While overlay is mid-transition, the theme tokens swap.
                 The M logo spins 360° during this moment.
STEP 4 (400ms):  Overlay fully covers screen. Routes to destination home.
STEP 5 (400ms):  New page content is mounted underneath.
STEP 6 (600ms):  Overlay slides OUT to the LEFT:
                 { x: "0%" } → { x: "-100%" }
                 Duration: 400ms, ease: [0.76, 0, 0.24, 1]
STEP 7 (1000ms): Transition complete. New identity fully revealed.
```

```typescript
// Implementation using a global ThemeContext + Framer Motion
const [theme, setTheme] = useTheme(); // 'automotive' | 'realEstate'
const [transitioning, setTransitioning] = useState(false);

const switchIdentity = () => {
  setTransitioning(true);
  // After 500ms (mid-flip), switch theme and route
  setTimeout(() => {
    setTheme(theme === 'automotive' ? 'realEstate' : 'automotive');
    router.push(theme === 'automotive' ? '/property/' : '/cars/');
  }, 500);
  // After 1000ms, allow interaction again
  setTimeout(() => setTransitioning(false), 1000);
};
```

---

## 9. PARALLAX SYSTEM — DEEP DIVE

### 9.1 The Watermark Parallax Layer

The parallax watermark must feel effortless and performant. Use `transform: translateY()` only (GPU-composited, never `top`/`margin`).

```typescript
// useParallax hook
const useParallax = (speed: number = 0.5) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const scrolled = window.scrollY;
      // translateY OPPOSITE of scroll for upward drift effect
      ref.current.style.transform = `translateY(${scrolled * -speed}px)`;
    };

    // Use requestAnimationFrame for 60fps smoothness
    let rafId: number;
    const throttledScroll = () => {
      rafId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', throttledScroll);
      cancelAnimationFrame(rafId);
    };
  }, [speed]);

  return ref;
};
```

### 9.2 Scroll-Triggered Section Reveals

Every section below the hero uses GSAP ScrollTrigger:

```typescript
// Standard section reveal
gsap.from('.section-reveal', {
  y: 60,
  opacity: 0,
  duration: 0.9,
  ease: 'power3.out',
  stagger: 0.15,
  scrollTrigger: {
    trigger: '.section-container',
    start: 'top 80%',
    end: 'bottom 20%',
    toggleActions: 'play none none reverse'
  }
});
```

### 9.3 The Horizontal Timeline Scroll (About Page)

The achievement timeline section has a pinned horizontal scroll:

```typescript
// Pin the section while scrolling horizontally through milestones
gsap.to('.timeline-track', {
  x: () => -(document.querySelector('.timeline-track').scrollWidth - window.innerWidth),
  ease: 'none',
  scrollTrigger: {
    trigger: '.timeline-container',
    pin: true,
    scrub: 1,
    end: () => `+=${document.querySelector('.timeline-track').scrollWidth}`
  }
});
```

### 9.4 Number Count-Up Animation

For spec stats (HP, prices, areas):

```typescript
// GSAP counter animation, triggered on scroll
const animateCounter = (element: HTMLElement, target: number, duration: number = 1.5) => {
  const obj = { value: 0 };
  gsap.to(obj, {
    value: target,
    duration,
    ease: 'power2.out',
    onUpdate: () => {
      element.textContent = Math.round(obj.value).toLocaleString();
    },
    scrollTrigger: {
      trigger: element,
      start: 'top 85%',
      once: true // Only animate once
    }
  });
};
```

---

## 10. COMPONENT LIBRARY

### 10.1 Component Index

```
src/components/
├── global/
│   ├── GlobalHeader.tsx        # Fixed header with switcher
│   ├── SocialRail.tsx          # Left social icons strip
│   ├── WhatsAppCTA.tsx         # Fixed WhatsApp button
│   ├── IdentitySwitcher.tsx    # The pill toggle
│   ├── PageFlipOverlay.tsx     # Full-screen transition overlay
│   └── Footer.tsx              # Unified footer
│
├── automotive/
│   ├── HeroShowroom.tsx        # Main Pratap slider
│   ├── CarPNG.tsx              # Animated car image wrapper
│   ├── WatermarkText.tsx       # Parallax background text
│   ├── SpecPanel.tsx           # Left data node panel
│   ├── SliderControls.tsx      # Prev/Next/Dots navigation
│   ├── InventoryGrid.tsx       # Fleet grid view
│   ├── CarCard.tsx             # Single car card
│   ├── BeforeAfterSlider.tsx   # Wrap comparison tool
│   ├── ImportTimeline.tsx      # The sourcing journey steps
│   ├── ImportCalculator.tsx    # URA tax estimator
│   └── InquiryPanel.tsx        # Sticky inquiry sidebar
│
├── realEstate/
│   ├── PropertyShowroom.tsx    # Main Pratap slider (dark)
│   ├── BuildingPNG.tsx         # Animated building image wrapper
│   ├── PropertyPanel.tsx       # Right data node panel
│   ├── PortfolioGrid.tsx       # Property cards grid
│   ├── PropertyCard.tsx        # Single property card
│   ├── FloorPlanViewer.tsx     # Interactive floor plan
│   ├── AdvisoryBooking.tsx     # Advisory session form
│   └── InvestmentSnapshot.tsx  # ROI data table
│
├── shared/
│   ├── CEOTimeline.tsx         # Horizontal milestone scroll
│   ├── UnifiedContactForm.tsx  # Routed contact form
│   ├── DualMap.tsx             # Google Maps dual marker
│   ├── CountUpNumber.tsx       # Animated stat number
│   ├── PremiumButton.tsx       # Themed CTA button
│   ├── GoldRule.tsx            # Thin horizontal line divider
│   └── LoadingScreen.tsx       # M monogram preloader
│
└── ui/
    ├── TabGroup.tsx            # Accessible tab navigation
    ├── Modal.tsx               # Full-screen detail modal
    ├── Toast.tsx               # Success/error notifications
    └── Skeleton.tsx            # Loading state placeholders
```

### 10.2 Key Component Specs

**`PremiumButton.tsx`**
```typescript
interface PremiumButtonProps {
  label: string;
  variant: 'primary' | 'outline' | 'ghost';
  theme: 'automotive' | 'realEstate';
  onClick?: () => void;
  href?: string;
  icon?: 'arrow' | 'whatsapp' | 'phone' | null;
}
```
- Primary (Automotive): Red fill, white text, no border-radius (sharp)
- Primary (Real Estate): Gold fill, black text, no border-radius
- Outline: Transparent fill, theme accent border, theme accent text
- Ghost: No fill, no border, underline draw on hover
- All: 48px height, 24px horizontal padding, letter-spacing 0.08em, uppercase

**`WatermarkText.tsx`**
```typescript
interface WatermarkTextProps {
  text: string;           // "G-WAGON", "NAKASERO", etc.
  font: 'bebas' | 'cormorant'; // Matches active theme
  parallaxSpeed?: number; // Default 0.5
}
```

---

## 11. DATA LAYER & CONTENT SCHEMA

### 11.1 Data Strategy
No backend required for v1 (MVP). All content lives in typed JSON files under `src/data/`. When ready to scale, these schemas map directly to a headless CMS (Sanity.io or Contentful).

### 11.2 Car Data Schema (`/src/data/cars.ts`)
```typescript
interface Car {
  id: string;
  slug: string;
  make: string;
  model: string;
  variant: string;
  year: number;
  watermarkText: string;
  specs: {
    engineCC: number;
    hp: number;
    torqueNm: number;
    zeroToHundred: number;  // seconds
    topSpeedKmh: number;
    transmissionSpeeds: number;
    driveType: '4WD' | 'AWD' | 'RWD' | 'FWD';
    fuelType: 'Petrol' | 'Diesel' | 'Hybrid' | 'Electric';
  };
  pricing: {
    usd: number | 'POR';  // Price on Request
    ugx: number | 'POR';
    negotiable: boolean;
  };
  availability: {
    status: 'In Showroom' | 'Arriving Soon' | 'Import-on-Order' | 'Sold';
    estimatedArrival?: string;   // ISO date string
    transitStage?: number;       // 1-6 for timeline
    origin: 'UK' | 'Japan' | 'Dubai' | 'Germany' | 'USA';
  };
  media: {
    heroImage: string;           // WebP path
    gallery: string[];           // Array of WebP paths
    videoUrl?: string;           // YouTube/Vimeo embed URL
  };
  customization: {
    wrap?: string;               // e.g., "Matte Black PPF"
    bodyKit?: string;            // e.g., "Mansory Edition"
    interiorWork?: string;
    performanceMods?: string[];
  };
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}
```

### 11.3 Property Data Schema (`/src/data/properties.ts`)
```typescript
interface Property {
  id: string;
  slug: string;
  name: string;
  location: {
    neighborhood: string;     // "Nakasero", "Munyonyo"
    city: "Kampala";
    country: "Uganda";
    lat: number;
    lng: number;
  };
  watermarkText: string;      // "NAKASERO"
  type: 'Apartments' | 'Villas' | 'Commercial' | 'Mixed-Use' | 'Land';
  specs: {
    bedroomsRange?: { min: number; max: number };
    areaRange: { min: number; max: number; unit: 'sqm' | 'acres' };
    floors?: number;
    totalUnits?: number;
    parkingBays?: number;
  };
  pricing: {
    from: number;
    currency: 'USD' | 'UGX';
    basis: 'sale' | 'rent-monthly' | 'rent-annual' | 'sqm';
  };
  availability: {
    status: 'Available' | 'Ongoing' | 'Sold Out' | 'Leasing' | 'Coming Soon';
    completionDate?: string;
    percentSold?: number;
  };
  amenities: string[];
  media: {
    heroImage: string;
    gallery: string[];
    floorPlans: { type: string; image: string }[];
    virtualTourUrl?: string;
    videoUrl?: string;
  };
  investment: {
    rentalYieldPercent?: number;
    capitalGrowthPercent5yr?: number;
    avgRentalMonthlyUsd?: { min: number; max: number };
  };
}
```

---

## 12. MOBILE & RESPONSIVE STRATEGY

### 12.1 Breakpoints
```css
/* Tailwind custom breakpoints */
xs: 375px   /* iPhone SE */
sm: 640px   /* Large phones */
md: 768px   /* Tablet portrait */
lg: 1024px  /* Tablet landscape / Small laptop */
xl: 1280px  /* Desktop */
2xl: 1536px /* Large monitors */
```

### 12.2 Per-Page Mobile Adaptations

**Zero Page:**
- Full-screen cycling between identities (5s each) instead of split-screen
- Swipe left/right to choose identity

**Showroom / Property Showcase:**
- Car/building PNG takes full width (85vw)
- Spec nodes move BELOW the car (stacked, not side-by-side)
- Watermark text scales down to fit (15vw font size minimum)
- Swipe left/right to cycle cars/properties (velocity-based gesture)

**Inventory / Portfolio Grids:**
- Single column card layout
- Filters collapse into a bottom sheet modal (tap filter icon → drawer slides up)

**Workshop (Before/After Slider):**
- Touch-drag gesture for the comparison handle
- Section scrolls normally (no horizontal layout on mobile)

**Import Timeline:**
- Vertical timeline (no horizontal scroll on mobile)
- Each step is a full-width accordion card

### 12.3 Touch Gesture Implementation
```typescript
// useSwipeGesture hook (wraps Framer Motion drag)
const useSwipeGesture = (onSwipeLeft: () => void, onSwipeRight: () => void) => {
  const dragConstraints = { left: 0, right: 0, top: 0, bottom: 0 };

  const handleDragEnd = (event: any, info: PanInfo) => {
    const SWIPE_THRESHOLD = 50;
    const VELOCITY_THRESHOLD = 300;

    if (Math.abs(info.velocity.x) > VELOCITY_THRESHOLD || Math.abs(info.offset.x) > SWIPE_THRESHOLD) {
      if (info.offset.x < 0) onSwipeLeft();
      else onSwipeRight();
    }
  };

  return { dragConstraints, handleDragEnd };
};
```

### 12.4 WhatsApp Priority on Mobile
The WhatsApp CTA grows from 56px to 64px on mobile. On all product detail pages (car or property), a full-width "Chat on WhatsApp" button is added at the bottom of the screen (not just the floating button). This is the PRIMARY mobile CTA.

---

## 13. PERFORMANCE & OPTIMIZATION

### 13.1 Image Strategy
- All hero images: WebP format, 90% quality, max 1400px wide
- Background-removed car PNGs: WebP with alpha channel, max 1200px wide
- Lazy loading: All images below the fold use `loading="lazy"`
- Blur placeholder: A 10px×10px base64 encoded version preloads as the blurDataURL
- Priority loading: The hero image of the current page gets `priority={true}` and is preloaded via `<link rel="preload">`

### 13.2 Font Loading
```html
<!-- Preload critical fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- Load fonts with display=swap (prevents FOIT) -->
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@300;400;500&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
```

### 13.3 Code Splitting
- Each major route gets its own chunk via Vite's automatic code splitting
- GSAP is only imported in components that use it (no global import)
- Framer Motion: Use `LazyMotion` + `domAnimation` to cut bundle size by ~50%

```typescript
import { LazyMotion, domAnimation, m } from 'framer-motion';
// Use <m.div> instead of <motion.div> — same API, smaller bundle
```

### 13.4 Animation Performance
- All animations use `transform` and `opacity` only (GPU-composited)
- `will-change: transform` applied only during active animation (added on mount, removed on completion)
- Scroll listeners always use `{ passive: true }`
- GSAP uses `requestAnimationFrame` internally — no manual raf needed
- Reduce motion: Respect `prefers-reduced-motion` media query
  ```css
  @media (prefers-reduced-motion: reduce) {
    .animated { transition: none !important; animation: none !important; }
  }
  ```

### 13.5 The Loading Screen

A premium preloader while assets initialize:

```
[Black/White screen based on entry choice]
     ┌──────────┐
     │          │
     │    M     │  ← The Masembe monogram SVG, animates in
     │          │
     └──────────┘
  MASEMBE GROUP
  [Thin loading bar, fills left to right]
```

The M monogram traces its own outline (SVG stroke animation: `stroke-dashoffset` from full to 0). When the bar reaches 100%, the entire preloader scales up and fades out simultaneously.

---

## 14. SEO & METADATA STRATEGY

### 14.1 Meta Tags (Per Route)

**Root Layout:**
```html
<meta name="author" content="Masembe Group of Companies">
<meta name="geo.region" content="UG-102">
<meta name="geo.placename" content="Kampala">
<link rel="canonical" href="https://masembegroup.com{pathname}">
```

**Grid Motors Home (`/cars/`):**
```
title: "Grid Motors Kla | Luxury Car Showroom Kampala Uganda"
description: "Uganda's premier luxury automotive dealership. Mercedes, Range Rover, Land Cruiser imports and bespoke customization in Kampala. Book your viewing today."
keywords: ["luxury cars Uganda", "import cars Uganda", "Mercedes Benz Uganda", "Range Rover Uganda", "Grid Motors Kla", "car customization Kampala"]
og:image: /og/grid-motors-showroom.jpg
```

**Masembe Group Home (`/property/`):**
```
title: "Masembe Group Real Estate | Luxury Properties Kampala Uganda"
description: "Premium residential and commercial real estate in Kampala. Nakasero, Munyonyo, and Kololo. Investment advisory by Naseeb Masembe."
keywords: ["luxury apartments Kampala", "real estate Uganda", "property investment Kampala", "Nakasero apartments", "Munyonyo villas"]
og:image: /og/masembe-properties.jpg
```

### 14.2 Structured Data (JSON-LD)
- `LocalBusiness` schema for Grid Motors Kla with address, phone, openingHours
- `LocalBusiness` schema for Masembe Group HQ
- `Product` schema for each car in inventory
- `RealEstateListing` schema for each property
- `Person` schema for Naseeb Masembe on the About page

### 14.3 Sitemap & robots.txt
Auto-generated sitemap.xml via Vite plugin (vite-plugin-sitemap) covering all static and dynamic routes. Dynamic routes (car slugs, property slugs) included via crawl of the data files at build time.

---

## 15. FILE & FOLDER STRUCTURE

```
masembe-group/
├── public/
│   ├── favicon.ico
│   ├── robots.txt
│   ├── sitemap.xml
│   └── og/                    # Open Graph preview images
│
├── src/
│   ├── main.tsx
│   ├── App.tsx                # Router + global providers
│   ├── index.css              # CSS variables + Tailwind base
│   │
│   ├── context/
│   │   ├── ThemeContext.tsx   # 'automotive' | 'realEstate' state
│   │   └── TransitionContext.tsx # Page flip overlay state
│   │
│   ├── hooks/
│   │   ├── useParallax.ts
│   │   ├── useSwipeGesture.ts
│   │   ├── useCountUp.ts
│   │   └── useScrollTrigger.ts
│   │
│   ├── data/
│   │   ├── cars.ts
│   │   └── properties.ts
│   │
│   ├── pages/
│   │   ├── ZeroPage.tsx
│   │   ├── automotive/
│   │   │   ├── ShowroomPage.tsx
│   │   │   ├── InventoryPage.tsx
│   │   │   ├── CarDetailPage.tsx
│   │   │   ├── WorkshopPage.tsx
│   │   │   └── ImportPage.tsx
│   │   ├── realEstate/
│   │   │   ├── PropertyHomePage.tsx
│   │   │   ├── PortfolioPage.tsx
│   │   │   ├── PropertyDetailPage.tsx
│   │   │   └── AdvisoryPage.tsx
│   │   └── shared/
│   │       ├── AboutPage.tsx
│   │       └── ContactPage.tsx
│   │
│   └── components/
│       └── (see §10.1)
│
├── assets/
│   ├── cars/                  # Hero WebPs, gallery images
│   ├── property/              # Building renders, floor plans
│   └── brand/                 # Logo variants, M monogram SVG
│
├── .env
│   VITE_GOOGLE_MAPS_API_KEY=
│   VITE_WHATSAPP_AUTOMOTIVE=+256...
│   VITE_WHATSAPP_PROPERTY=+256...
│   VITE_FORMSPREE_ID=         # Or other form backend
│
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 16. PHASED BUILD ROADMAP

### Phase 1 — Foundation (Week 1–2)
- [ ] Vite + React + TypeScript project scaffold
- [ ] Tailwind config with both theme token sets
- [ ] Global CSS variables
- [ ] ThemeContext and router setup
- [ ] GlobalHeader, SocialRail, WhatsAppCTA, Footer components
- [ ] IdentitySwitcher (visual only, no animation yet)
- [ ] PageFlipOverlay component (the transition mechanism)
- [ ] Zero Page (split screen, hover interaction, entry animations)

### Phase 2 — Automotive Core (Week 3–4)
- [ ] WatermarkText component with parallax hook
- [ ] HeroShowroom with CarPNG, SpecPanel, SliderControls
- [ ] Full Framer Motion animation sequence (Pratap landing)
- [ ] InventoryGrid and CarCard with hover effects
- [ ] CarDetailPage (hero + tabs + InquiryPanel)
- [ ] Seed all 4 cars in data file

### Phase 3 — Real Estate Core (Week 5–6)
- [ ] PropertyShowroom with BuildingPNG, PropertyPanel
- [ ] Dark theme application across all RE pages
- [ ] PortfolioGrid and PropertyCard
- [ ] PropertyDetailPage (hero + tabs + FloorPlanViewer)
- [ ] AdvisoryPage with booking form
- [ ] Seed 3 properties in data file

### Phase 4 — Workshop & Import Pages (Week 7)
- [ ] BeforeAfterSlider component
- [ ] WorkshopPage full build (4 service sections)
- [ ] ImportTimeline interactive component
- [ ] ImportCalculator (URA tax estimator logic)
- [ ] ImportPage full build

### Phase 5 — Shared Pages & Polish (Week 8)
- [ ] AboutPage with CEOTimeline horizontal scroll
- [ ] ContactPage with UnifiedContactForm + DualMap
- [ ] LoadingScreen (M monogram SVG tracer)
- [ ] GSAP ScrollTrigger integration for all section reveals
- [ ] Count-up number animations
- [ ] Identity Switch full animation sequence

### Phase 6 — Mobile, Performance & Launch (Week 9–10)
- [ ] Full mobile responsive pass (all pages)
- [ ] Touch swipe gestures on slider components
- [ ] Image optimization pass (all WebP conversion, blur placeholders)
- [ ] Font loading optimization
- [ ] Lighthouse audit and fixes (target score: 90+)
- [ ] SEO meta tags, structured data JSON-LD
- [ ] Form backend integration (Formspree or EmailJS)
- [ ] WhatsApp routing (correct numbers per department)
- [ ] Deploy to Vercel, configure custom domain
- [ ] Final cross-browser testing (Chrome, Safari, Firefox, Samsung Internet)
- [ ] Launch 🚀

---

## APPENDIX: KEY DEPENDENCIES

```json
{
  "dependencies": {
    "react": "^18.x",
    "react-dom": "^18.x",
    "react-router-dom": "^6.x",
    "framer-motion": "^11.x",
    "gsap": "^3.x",
    "tailwindcss": "^3.x",
    "lucide-react": "^0.x"
  },
  "devDependencies": {
    "typescript": "^5.x",
    "vite": "^5.x",
    "@types/react": "^18.x",
    "autoprefixer": "^10.x",
    "postcss": "^8.x"
  }
}
```

**Google Fonts (loaded via HTML link tag):**
- Bebas Neue (automotive display)
- Cormorant Garamond (real estate display, italic + regular + semibold)
- DM Sans (automotive body, 300/400/500)
- Space Mono (shared data/numbers, 400/700)
- Montserrat (real estate subheadings, 300/400/600)

---

*Document Version: 2.0 — Masembe Group Integrated Platform*  
*Prepared for: Naseeb Masembe, CEO — Masembe Group of Companies & Grid Motors Kla*  
*Architecture Scope: Full dual-identity website — 12 pages, 2 themes, 1 unified platform*
```
