# Implementation Plan: Masembe Group Luxury Showroom Website

## Objective
To develop a high-end, animated website for the **Masembe Group of Companies** (Naseeb Masembe), replicating the minimalist and high-motion aesthetic seen in the "Pratap Design" car showroom videos.

---

## 1. Project Setup & Tech Stack
- **Framework:** React.js (Vite) with TypeScript.
- **Styling:** Tailwind CSS for a clean, responsive layout.
- **Animations:** Framer Motion (industry standard for the "slick" UI feel).
- **Icons:** Lucide-React or Phosphor Icons for a premium feel.
- **Image Optimization:** Next/Image or custom WebP wrappers to ensure fast load times despite heavy visuals.

---

## 2. Component Architecture
### A. The Master Layout (`MainLayout.tsx`)
- Fixed Header with glassmorphism effect.
- Sticky Social Media links (X, Instagram, TikTok) on the left margin.
- Fixed WhatsApp Floating CTA on the bottom right.

### B. The "Showroom" Hero Slider (`HeroSlider.tsx`)
- **State Management:** Track the `activeCarIndex` to trigger synchronized animations.
- **Layers:**
  1. **Bottom Layer:** Bold Watermark Text (e.g., "G-WAGON") with low opacity.
  2. **Middle Layer:** High-res Car PNG with `initial={{ x: 300, opacity: 0 }}` and `animate={{ x: 0, opacity: 1 }}`.
  3. **Top Layer:** Car Name, Specs (HP, Speed, 0-100), and "Book Now" / "Details" buttons.

### C. Service Cards (`Services.tsx`)
- Minimalist tiles for "Bespoke Customization," "Performance Tuning," and "Global Logistics."
- Hover-trigger animations to show "Learn More."

### D. Lead Generation (`InquiryForm.tsx`)
- A clean, multi-step form for "Import-on-Order" or "Service Booking."

---

## 3. Core Animations (Framer Motion Variants)
### Car Slide Sequence
```typescript
const carVariants = {
  enter: { x: 1000, opacity: 0, scale: 0.8 },
  center: { x: 0, opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } },
  exit: { x: -1000, opacity: 0, scale: 0.8, transition: { duration: 0.5 } }
};

const textVariants = {
  enter: { y: 100, opacity: 0 },
  center: { y: 0, opacity: 0.1, transition: { delay: 0.3, duration: 0.8 } }
};
```

---

## 4. Content Mapping (Naseeb Masembe Inventory)
- **Model 1:** Mercedes-Benz G63 AMG (Customized by Grid Motors).
- **Model 2:** Range Rover SV Autobiography (The Luxury Flagship).
- **Model 3:** Toyota Land Cruiser LC300 (The King of East Africa).
- **Model 4:** Audi RS6 Avant (The Performance Choice).

---

## 5. Verification & Final Polish
- **SEO:** Meta tags for "Luxury Car Imports Uganda," "Grid Motors Kampala."
- **Mobile:** Horizontal swipe gestures for the car slider.
- **Loading:** A premium "Masembe Group" logo loader while assets pre-fetch.

---

## 6. Migration & Rollback
- Deployment via Vercel or Netlify for instant rollbacks and preview branches.
- Version control (Git) for all design iterations.
