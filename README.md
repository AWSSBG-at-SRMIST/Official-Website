# AWS Student Builder Group SRMIST Website

A modern and scalable **AWS Student Builder Group SRMIST Website** built with **TypeScript**, **Tailwind CSS v4**, and **shadcn/ui**. This website is designed for production-ready applications with a clean architecture, reusable components, and developer-friendly tooling.

## ✨ Features

### Core Features

- **Next.js 16.1.1** with App Router and React 19
- **TypeScript** for strong type safety
- **React Compiler** enabled for automatic performance optimizations
- **ESLint** configured with Next.js best practices

### UI & Styling

- **Tailwind CSS v4** with PostCSS integration
- **shadcn/ui** component system powered by Radix UI
- **Lucide React** icon library
- **Class Variance Authority** for scalable component variants
- **tailwind-merge** and **clsx** for conditional styling

### Developer Experience

- Responsive design utilities and a custom mobile detection hook
- **react-hot-toast** for elegant notifications
- **js-cookie** for cookie management
- Clean folder structure with reusable components and utilities

---

## 📦 Tech Stack

### Core

| Technology | Version | Description                     |
| ---------- | ------- | ------------------------------- |
| Next.js    | 16.1.1  | React framework with App Router |
| React      | 19.2.3  | UI library                      |
| TypeScript | ^5      | Static typing                   |

### Styling & UI

- Tailwind CSS `^4`
- shadcn/ui
- Radix UI
- Lucide React
- Class Variance Authority (CVA)
- tailwind-merge
- clsx

### Development Tools

- ESLint `^9`
- Babel React Compiler
- PostCSS

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/AWSSBG-SRMIST/club-website
cd club-website
```

### 2. Install Dependencies

```bash
npm install
```

or

```bash
yarn install
```

or

```bash
pnpm install
```

### 3. Start the Development Server

```bash
npm run dev
```

or

```bash
yarn dev
```

or

```bash
pnpm dev
```

### 4. Open the Application

Navigate to:

```text
http://localhost:3000
```

---

## 📜 Available Scripts

| Command         | Description                          |
| --------------- | ------------------------------------ |
| `npm run dev`   | Start the development server         |
| `npm run build` | Build the application for production |
| `npm run start` | Start the production server          |
| `npm run lint`  | Run ESLint checks                    |

---

## 📁 Project Structure

```text
club-website/
├── public/
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
│
├── src/
│   ├── app/
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   ├── components/
│   │   └── ui/
│   │       ├── badge.tsx
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── carousel.tsx
│   │       ├── dialog.tsx
│   │       ├── input.tsx
│   │       ├── select.tsx
│   │       ├── separator.tsx
│   │       ├── sheet.tsx
│   │       ├── sidebar.tsx
│   │       ├── skeleton.tsx
│   │       └── tooltip.tsx
│   │
│   ├── hooks/
│   │   └── use-mobile.ts
│   │
│   └── lib/
│       └── utils.ts
│
├── components.json
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── postcss.config.mjs
└── tsconfig.json
```

---

## ⚙️ Configuration Highlights

### Next.js

- App Router enabled
- React Compiler enabled
- Strict TypeScript mode
- Path aliases configured

```ts
@/* → ./src/*
```

### Tailwind CSS

- Tailwind CSS v4
- PostCSS integration
- CSS Variables enabled
- Zinc color palette
- New York shadcn/ui style

### shadcn/ui

- React Server Components compatible
- Radix UI primitives
- Lucide React icons
- Accessible by default

### ESLint

- Next.js Core Web Vitals rules
- TypeScript support
- Optimized build directory ignores

---

## 🎨 Included UI Components

### Layout

- Card
- Separator
- Sheet
- Sidebar

### Forms

- Button
- Input
- Select

### Feedback

- Badge
- Skeleton
- Tooltip
- Dialog

### Navigation

- Carousel

### Utilities

- `useIsMobile()` hook
- `cn()` utility helper

All components are built with:

- Accessibility-first design
- Full TypeScript support
- Tailwind CSS styling
- CVA-based variants

---

## 📱 Responsive Design

This code follows a **mobile-first** approach and includes:

- Tailwind responsive utilities
- Mobile detection hook
- Adaptive layouts
- Default mobile breakpoint at **768px**

---

## 🔧 Customization

### Add New shadcn/ui Components

```bash
npx shadcn@latest add <component-name>
```

### Customize Theme Colors

Modify:

```text
src/app/globals.css
```

or update:

```text
components.json
```

### Path Aliases

Import modules cleanly using:

```ts
import Button from "@/components/ui/button";
```

instead of:

```ts
import Button from "../../components/ui/button";
```

---

## 📚 Useful Resources

- Next.js Documentation
- React Documentation
- Tailwind CSS Documentation
- shadcn/ui Documentation
- Radix UI Documentation
- TypeScript Documentation

---

## ❤️ Author

Built and maintained by **Aakarsh**.
