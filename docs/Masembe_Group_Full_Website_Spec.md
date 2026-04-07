# Full Technical & Design Specification: Masembe Group & Grid Motors

## 1. Executive Summary
The goal is to create a singular, high-performance web application that serves two distinct business arms of **Naseeb Masembe**: **Grid Motors Kla** (Automotive) and **Masembe Group of Companies** (Real Estate). The website will feature a "Dual-Identity" toggle, changing the entire look and feel based on the user's focus.

---

## 2. Core Visual Language: "The Pratap Aesthetic"
Inspired by high-end automotive design mockups, the website will follow these three rules:
1. **The Floating Subject:** Every car or building is a high-resolution, background-removed PNG that "floats" in the center of the viewport.
2. **Parallax Watermarks:** Massive, low-opacity text (e.g., "G-WAGON" or "NAKASERO") sits behind the subject and moves at 50% scroll speed.
3. **Staggered Data:** Information nodes (HP, Price, Bedrooms) fade in one by one only after the subject has landed.

---

## 3. The "Dual-Identity" Switcher
A persistent global component that toggles the site's state.

| Feature | **Grid Motors Kla (Automotive)** | **Masembe Group (Real Estate)** |
| :--- | :--- | :--- |
| **Primary Theme** | Clean White / Minimalist Gray | Deep Obsidian / Premium Gold |
| **Main Subject** | Luxury SUVs / Performance Cars | High-End Villas / Commercial Hubs |
| **Typography** | Bold, Modern Sans-Serif (Bebas Neue) | Sophisticated Serif (Cormorant Garamond) |
| **CTA Goal** | Showroom Visit / Import Quote | Property Inquiry / Investment Advisory |

---

## 4. Page-by-Page Sitemap

### **Section A: Grid Motors Kla**
1. **The Showroom (Home):**
   - Interactive slider of the current fleet (G63, LC300, Range Rover).
   - "Pratap" animation sequence for each car.
2. **The Inventory (Stock List):**
   - Filterable grid (Brand, Year, Price).
   - "Coming Soon" section for cars currently in transit from Dubai/Japan.
3. **Grid Customz & Performance:**
   - **Wrapping:** Interactive "Before/After" slider.
   - **Tuning:** Detailed list of ECU remapping stages and body kit options.
4. **Import-on-Order Portal:**
   - Dedicated page explaining the sourcing and logistics process.
   - Live "Import Calculator" for estimated URA taxes and clearing costs.

### **Section B: Masembe Group of Companies**
1. **Luxury Living (Home):**
   - Showcase of flagship properties in Nakasero and Munyonyo.
   - "Pratap" animation sequence for high-res architectural renders.
2. **Development Portfolio:**
   - Categorized by "Residential," "Commercial," and "Ongoing."
   - High-quality image galleries and virtual tour embeds.
3. **Real Estate Advisory:**
   - Content on land acquisition and investment strategy in Kampala.
   - Strategic consulting services by Naseeb Masembe.

### **Section C: Shared Experience**
1. **The CEO’s Legacy (About Us):**
   - A cinematic storytelling page about Naseeb Masembe's vision.
   - Timeline of the Group’s expansion and achievements.
2. **Direct Concierge (Contact):**
   - Unified contact form with a dropdown for "Industry of Interest."
   - Dual-mode Google Map showing the Plot 1 showroom and office locations.
   - WhatsApp CTA that routes to the specific department (Cars or Property).

---

## 5. Animation & Technical Specs

### **Subject "Landing" Sequence (Framer Motion)**
- **Enter:** `x: 300, opacity: 0 -> x: 0, opacity: 1` (Duration: 0.8s, Ease: "easeOut")
- **Scale:** `scale: 0.9 -> scale: 1.0` (Duration: 1.2s, Ease: "backOut")
- **Watermark:** `opacity: 0 -> opacity: 0.05` (Delayed by 0.3s)

### **Page "Flip" Transition**
- **Overlay:** A full-screen color wipe (White for Cars, Black for Property).
- **Logo:** The Masembe Group "M" logo spins and scales up during the transition.
- **Duration:** 1.0s total "flip" time.

---

## 6. Mobile Strategy
- **Horizontal Swipe:** The "Pratap" slider reacts to thumb gestures.
- **Sticky Typography:** Background text remains fixed while the user scrolls vertically through car/property specs.
- **WhatsApp Priority:** The primary CTA is a persistent "Chat with us" button for instant lead generation.
