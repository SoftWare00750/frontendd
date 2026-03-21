# OgaLandlord — Agent & Tenant Platform

A verified real-estate agent platform built with **React 19 + TypeScript + Vite + Tailwind CSS v4**.  
Agents get verified, list properties and manage tenants. Tenants browse listings, find agents and message them.

---

## Tech Stack

| Layer | Library |
|---|---|
| Framework | React 19 + TypeScript 5.9 |
| Build | Vite 7 |
| Styling | Tailwind CSS v4 |
| Routing | React Router DOM v7 |
| Animation | Framer Motion |
| Icons | Lucide React |

---

## Folder Structure

```
ogalandlord/
│
├── index.html
├── vite.config.ts
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
└── eslint.config.js
│
└── src/
    ├── main.tsx                          # app entry point
    ├── App.tsx                           # root — composes AgentRoutes + TenantRoutes
    ├── index.css                         # tailwind import + global styles
    │
    ├── assets/
    │   ├── logo.svg
    │   ├── icons.svg
    │   ├── background.png
    │   └── images/
    │
    ├── data/
    │   ├── Testimonial.ts                # testimonial copy
    │   ├── mockListings.ts               # mock property listing data
    │   ├── mockAgents.ts                 # mock agent data
    │   └── constants.ts                  # shared app constants
    │
    ├── types/
    │   ├── agent.types.ts                # Agent, Listing, Payment types
    │   ├── tenant.types.ts               # Tenant, Message, Search types
    │   └── index.ts                      # barrel export
    │
    ├── hooks/
    │   ├── useAuth.ts
    │   ├── useListings.ts
    │   └── useMessages.ts
    │
    ├── routes/
    │   ├── AgentRoutes.tsx               # all /dashboard/* agent routes
    │   ├── TenantRoutes.tsx              # all /tenant/* routes
    │   └── ProtectedRoute.tsx            # auth guard wrapper
    │
    ├── components/
    │   │
    │   ├── shared/                       # used by both agent + tenant flows
    │   │   ├── Input.tsx
    │   │   ├── InfoCard.tsx
    │   │   ├── ProgressBar.tsx
    │   │   ├── ScrollToTop.ts
    │   │   ├── LeftSection.tsx
    │   │   └── TestimonialCarousel.tsx
    │   │
    │   ├── agent/                        # agent-only UI components
    │   │   ├── ActionItem.tsx
    │   │   ├── ListingCard.tsx
    │   │   ├── OverviewCard.tsx
    │   │   ├── StatusCard.tsx
    │   │   ├── StatusBadge.tsx
    │   │   ├── SkeletonCard.tsx
    │   │   ├── OTPInput.tsx
    │   │   └── UploadBox.tsx
    │   │
    │   └── tenant/                       # tenant-only UI components
    │       ├── PropertyCard.tsx
    │       ├── AgentCard.tsx
    │       ├── SearchBar.tsx
    │       ├── FilterBar.tsx
    │       ├── MessageBubble.tsx
    │       ├── FAQAccordion.tsx
    │       ├── ContactForm.tsx
    │       └── TenantOTPInput.tsx
    │
    ├── layouts/
    │   │
    │   ├── agent/                        # agent dashboard shell
    │   │   ├── DashboardLayout.tsx       # outlet wrapper with top + bottom nav
    │   │   ├── Navbar.tsx
    │   │   └── Footer.tsx                # bottom tab navigation
    │   │
    │   └── tenant/                       # tenant site shell
    │       ├── TenantLayout.tsx          # outlet wrapper
    │       ├── TenantNavbar.tsx          # top nav — logo, search, login CTA
    │       └── TenantFooter.tsx          # site footer with nav links
    │
    └── pages/
        │
        ├── agent/
        │   │
        │   ├── auth/
        │   │   ├── Signup.tsx            # agent create account
        │   │   └── Login.tsx             # agent login
        │   │
        │   ├── onboarding/
        │   │   ├── Welcome.tsx           # landing / onboarding entry
        │   │   ├── VerifyPhone.tsx       # OTP phone verification
        │   │   ├── StepForm.tsx          # multi-step form shell
        │   │   ├── Summary.tsx           # verification pending screen
        │   │   └── steps/
        │   │       ├── Step1UploadID.tsx
        │   │       ├── Step2IdDetails.tsx
        │   │       ├── Step3TakeSelfie.tsx
        │   │       ├── Step4BusinessUpload.tsx
        │   │       └── Step5ReviewDocuments.tsx
        │   │
        │   └── dashboard/               # 🔒 protected — wrapped by DashboardLayout
        │       ├── Dashboard.tsx         # home overview
        │       ├── Listings.tsx          # agent's property listings
        │       ├── Messages.tsx          # agent <-> tenant chat
        │       ├── Settings.tsx          # account settings
        │       ├── Payment.tsx           # subscription & payments
        │       └── ReportsComplaints.tsx # reports and complaints
        │
        └── tenant/
            │
            ├── auth/
            │   ├── TenantSignup.tsx      # tenant create account
            │   └── Waitlist.tsx          # waitlist page
            │
            ├── public/                   # no auth required
            │   ├── Home.tsx              # tenant landing page
            │   ├── AboutUs.tsx           # about OgaLandlord
            │   ├── Listings.tsx          # browse all properties
            │   ├── ListingProperty.tsx   # single property detail page
            │   ├── AgentList.tsx         # browse verified agents
            │   ├── AgentProfile.tsx      # single agent profile
            │   ├── Contact.tsx           # contact page
            │   ├── FAQ.tsx               # frequently asked questions
            │   ├── Privacy.tsx           # privacy policy
            │   └── TermsOfUse.tsx        # terms of use
            │
            └── protected/               # 🔒 requires tenant auth
                └── Message.tsx           # tenant <-> agent chat
```

---

## Route Map

### Agent Flow

| Path | Component | Guard |
|---|---|---|
| `/` | `agent/onboarding/Welcome.tsx` | public |
| `/signup` | `agent/auth/Signup.tsx` | public |
| `/login` | `agent/auth/Login.tsx` | public |
| `/verify-phone` | `agent/onboarding/VerifyPhone.tsx` | public |
| `/stepform` | `agent/onboarding/StepForm.tsx` | public |
| `/summary` | `agent/onboarding/Summary.tsx` | public |
| `/dashboard` | `agent/dashboard/Dashboard.tsx` | 🔒 protected |
| `/listings` | `agent/dashboard/Listings.tsx` | 🔒 protected |
| `/messages` | `agent/dashboard/Messages.tsx` | 🔒 protected |
| `/settings` | `agent/dashboard/Settings.tsx` | 🔒 protected |
| `/payment` | `agent/dashboard/Payment.tsx` | 🔒 protected |
| `/reports` | `agent/dashboard/ReportsComplaints.tsx` | 🔒 protected |

### Tenant Flow

| Path | Component | Guard |
|---|---|---|
| `/tenant/signup` | `tenant/auth/TenantSignup.tsx` | public |
| `/tenant/waitlist` | `tenant/auth/Waitlist.tsx` | public |
| `/tenant` | `tenant/public/Home.tsx` | public |
| `/tenant/about` | `tenant/public/AboutUs.tsx` | public |
| `/tenant/listings` | `tenant/public/Listings.tsx` | public |
| `/tenant/listings/:id` | `tenant/public/ListingProperty.tsx` | public |
| `/tenant/agents` | `tenant/public/AgentList.tsx` | public |
| `/tenant/agents/:id` | `tenant/public/AgentProfile.tsx` | public |
| `/tenant/contact` | `tenant/public/Contact.tsx` | public |
| `/tenant/faq` | `tenant/public/FAQ.tsx` | public |
| `/tenant/privacy` | `tenant/public/Privacy.tsx` | public |
| `/tenant/terms` | `tenant/public/TermsOfUse.tsx` | public |
| `/tenant/messages` | `tenant/protected/Message.tsx` | 🔒 protected |

---

## Getting Started

```bash
# install dependencies
npm install

# start dev server
npm run dev

# type-check
npx tsc --noEmit

# build for production
npm run build
```

---

## Key Conventions

- **Asset imports** — always import SVGs and images at the top of the file (`import logo from "../../assets/logo.svg"`). Never use bare string paths in `src=""` — Vite won't process them through the asset pipeline.
- **Return types** — omit explicit `: JSX.Element` return type annotations. React 19 types no longer expose the global `JSX` namespace; TypeScript infers the return type correctly.
- **Ref callbacks** — ref callbacks must return `void`. Use `ref={(el) => { if (el) inputs.current[i] = el; }}` not `ref={(el) => (inputs.current[i] = el!)}`.
- **Components** — one component per file, named export for utilities, default export for pages and layouts.
- **Colours** — green-900 is the primary brand colour throughout both flows.

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Production build (tsc + vite build) |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

---

*© 2026 OgaLandlord*
