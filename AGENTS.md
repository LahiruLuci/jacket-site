# AGENT.MD — Premium Bike Jacket eCommerce Platform

## PROJECT GOAL

Build a **modern, premium, high-performance eCommerce platform** for a motorcycle jacket brand.

This system must deliver:
- Luxury UI/UX
- High conversion rates
- Scalable architecture
- Clean, maintainable codebase

---

# SYSTEM ARCHITECTURE

## Frontend
- Next.js (App Router)
- TypeScript (strict mode)
- Tailwind CSS
- Framer Motion (UI animations)

## Backend
- Next.js Server Actions / API Routes

## Database
- Neon (PostgreSQL Serverless)

## ORM
- Prisma ORM

## Hosting
- Vercel

## Media Handling
- Cloudinary (image optimization + CDN)

<!-- ## Payments -->
<!-- - Stripe (primary)
- Future-ready: PayPal / Apple Pay / Google Pay -->

---

<!-- # DATABASE DESIGN (Neon + PostgreSQL)

## Core Tables

### User
- id (UUID)
- name
- email
- password (hashed)
- createdAt

### Product
- id
- name
- description
- price
- images[]
- categoryId
- stock
- createdAt

### Category
- id
- name
- slug

### Order
- id
- userId
- totalAmount
- status (pending, paid, shipped, delivered)
- createdAt

### OrderItem
- id
- orderId
- productId
- quantity
- price

### Review
- id
- userId
- productId
- rating
- comment

### Cart
- id
- userId

### CartItem
- id
- cartId
- productId
- quantity

---

## Relationships

- User → Orders (1:N)
- Order → OrderItems (1:N)
- Product → Category (N:1)
- Product → Reviews (1:N)
- User → Cart (1:1)

--- -->

<!-- # PAYMENT SYSTEM

## Stripe Integration (Primary)

Features:
- Secure checkout
- Payment Intents API
- Webhooks for order confirmation
- Support for cards, Apple Pay, Google Pay

## Payment Flow

1. User clicks "Checkout"
2. Create Stripe Payment Intent
3. Redirect to secure payment
4. On success → webhook updates order status
5. Show success page

## Security Rules

- Never store card details
- Use Stripe hosted or client SDK
- Validate webhook signatures
- Use environment variables for keys

--- -->

# WEBSITE STRUCTURE

## Pages

- Home
- Shop
- Product Detail
- About
- Technology
- Size Guide
- Blog
- Contact
- Cart
- Checkout
- Account

---

# HOME PAGE SECTIONS

1. Hero Section
2. Category Showcase
3. Best Sellers
4. Brand Values
5. Lifestyle Section
6. Technology Section
7. Featured Product
8. Reviews
9. Community Feed
10. Newsletter
11. Footer

---

# SHOP PAGE

- Sidebar Filters
- Product Grid
- Sorting (price, popularity)

Filters:
- Size
- Price
- Category
- Material
- Season

---

# PRODUCT PAGE

## Top Section
- Image Gallery
- Product Info
- Size Selector
- Add to Cart / Buy Now

## Sections
- Features
- Protection Details
- Materials
- Reviews
- Related Products

---

# DESIGN SYSTEM

## Color Palette (60-30-10 Rule)

### Primary (60%)
- #0B0B0B (Matte Black)
- #111111 (Carbon Black)

### Secondary (30%)
- #2A2A2A (Gunmetal Gray)
- #3A3A3A (Steel Gray)

### Accent (10%) — Choose ONE
- #E10600 (Racing Red)
- #0066FF (Electric Blue)
- #C9A227 (Luxury Gold)

## Text Colors
- Primary: #FFFFFF
- Secondary: #B3B3B3

---

# TYPOGRAPHY

## Headings
- Bebas Neue / Oswald / Sora

## Body
- Inter (recommended)
- Poppins / Manrope

---

# SPACING SYSTEM

- 8px → micro
- 16px → small
- 32px → medium
- 64px → section spacing
- 120px → large spacing

---

# RESPONSIVENESS

## Breakpoints

- Mobile: < 640px
- Tablet: 640px – 1024px
- Desktop: > 1024px

## Rules

### Mobile
- Sticky Add-to-Cart
- Swipeable gallery
- Collapsible filters
- Large touch targets

### Tablet
- 2-column layouts
- Balanced UI spacing

### Desktop
- Full grid layouts
- Hover effects
- Advanced animations

---

# UI / UX PRINCIPLES

- Minimal UI
- Premium spacing
- High-quality images
- Strong typography
- Dark theme dominance

Golden Rule:
Less clutter = more luxury

---

# ANIMATION GUIDELINES

- Fade-in on scroll
- Smooth transitions
- Hover interactions
- Subtle parallax

Timing:
- 200ms → micro
- 400ms → standard
- 600ms → hero animations

---

# PERFORMANCE

- Use Next.js Image optimization
- Lazy load images
- Use server components
- Optimize fonts
- Reduce JS bundle size

Target:
Lighthouse score > 90

---

# SECURITY

- Use HTTPS only
- Hash passwords (bcrypt)
- Validate API inputs
- Protect routes
- Use secure cookies

---

# CODE QUALITY

- TypeScript strict mode
- ESLint + Prettier
- Reusable components
- Clean architecture

## Naming

- camelCase → variables
- PascalCase → components
- kebab-case → files

---

# FOLDER STRUCTURE
/app
/components
/lib
/hooks
/utils
/types
/prisma
/styles


---

# UX FLOW

WOW → TRUST → DESIRE → CONFIDENCE → BUY

---

# CONVERSION FEATURES

- Sticky Add-to-Cart
- Reviews & ratings
- Fast checkout
- Trust badges
- Clear pricing

---

# FUTURE FEATURES

- AI size recommendation
- 360° product view
- AR try-on
- Smart recommendations (ML-based)

---

# FINAL PRINCIPLES

- Images dominate
- Text supports
- Animation guides
- Whitespace sells

If it feels minimal + powerful → correct  
If it feels crowded → redesign
