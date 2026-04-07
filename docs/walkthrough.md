# InvoiceFlow Walkthrough

Welcome to **InvoiceFlow**, a premium, high-impact workspace designed for small marketing agencies. This document outlines the architecture, features, and setup instructions for your new application.

## 🚀 Overview

InvoiceFlow solves the "payment chasing" and "feedback loop" problems by providing a unified, branded interface for agencies and their clients. It features a sophisticated dark-mode design system with glassmorphism and mobile optimization.

## 🏗️ Technical Stack

- **Framework**: [Next.js 16.2.0](https://nextjs.org/) (App Router, Turbopack)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with a custom boutique design system.
- **Backend/DB**: [Firebase](https://firebase.google.com/) (Auth, Firestore, Storage).
- **Icons**: [Lucide React](https://lucide.dev/) for high-quality, consistent iconography.
- **Animation**: [Motion](https://motion.dev/) for smooth, premium transitions.
- **Email**: [Resend](https://resend.com/) for transactional communications.

## 📂 Project Structure

- `app/`: Next.js App Router routes.
  - `(agency)/`: Agency workspace (Dashboard, Invoices, Clients, etc.).
  - `(portal)/`: Secure Client Portal (token-based access).
  - `(auth)/`: Login and Signup flows.
  - `(marketing)/`: Landing page and public content.
- `components/ui/`: Reusable premium components (Button, Card, Badge, etc.).
- `lib/`: Utility functions and shared clients (Firebase, Firebase Admin).
- `types/`: Comprehensive TypeScript definitions.
- `docs/`: Project planning and PRD documents.

## 🛠️ Key Features Built

### 1. Agency Workspace
- **Dashboard**: Real-time overview of overdue invoices and pending approvals.
- **Invoice Engine**: Create professional invoices with dynamic line items and tax calculations.
- **Project Tracking**: Visualize progress with gradient bars and status milestones.
- **Branding Control**: Centralized settings for agency colors, logos, and portal previews.

### 2. Secure Client Portal
- **Mobile-First Design**: Optimized for clients on the go.
- **Interactive Approvals**: Clients can approve work or request changes directly in the portal.
- **Deliverable Library**: Secure access to all project assets with file-type recognition.
- **Simple Billing**: Clear visibility into paid and outstanding balances.

### 3. Design System
- **Glassmorphism**: Sophisticated translucent layers for a premium app feel.
- **Boutique Aesthetics**: Custom typography (Geist) and an italicized, minimalist brand voice.
- **Micro-animations**: Fade-ins and hover scales for a responsive experience.

## 🏁 Next Steps for Deployment

To get the application fully functional with real data, follow these steps:

1.  **Firebase Setup**:
    - Create a new project at [firebase.google.com](https://firebase.google.com).
    - Enable **Authentication**, **Firestore Database**, and **Storage**.
    - Create a web app and copy your configuration.

2.  **Environment Variables**:
    - Create a `.env.local` in the root directory.
    - Add the following keys:
      ```env
      NEXT_PUBLIC_FIREBASE_API_KEY=...
      NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
      NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
      NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
      NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
      NEXT_PUBLIC_FIREBASE_APP_ID=...
      RESEND_API_KEY=...
      ```

3.  **Run Development Server**:
    - Run `npm run dev` to start the application.
    - Visit `http://localhost:3000` to see the Landing Page.
    - Navigate to `/login` or `/signup` to test the auth flow.

4.  **Connect Logic**:
    - The UI currently uses mock data for demonstration. 
    - You can now start replacing states in `page.tsx` files with Firebase fetches using the `lib/firebase.ts` client.

## 📝 Compliance & Legal
- Legal placeholders are ready for implementation in `app/(marketing)/terms` and `app/(marketing)/privacy`.

---
*Built with care by Antigravity.*
