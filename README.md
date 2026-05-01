# 🚨 The Kidney Project (AI-Assisted Care)

A high-performance educational platform built with **Next.js 14** and **Tailwind CSS 4** for detecting kidney disease and promoting renal wellness.

## 🌟 Key Features

- **🎯 ML Diagnostic Tool**: An AI-powered classifier that predicts kidney disease probability based on patient vitals.
- **🎨 Editorial Design System**: A premium "Liquid Glass" UI with dynamic dark mode, custom cursors, and smooth micro-interactions.
- **⚡ Performance First**: Built on the Next.js App Router with automatic code splitting and optimized rendering.

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v18 or higher
- **pnpm**: v8 or higher (recommended)

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd kidney-diseases-website
```

2. Install dependencies

```bash
pnpm install
```

### Running the Development Server

```bash
pnpm dev
```

## 🏗️ Project Structure

```
kidney-diseases-website/
├── src/
│   ├── app/                # Next.js App Router (Pages)
│   ├── components/         # Reusable UI Components (React)
│   │   ├── common/       # Layout, Nav, Header
│   │   ├── ui/           # Primitive UI Kit (Buttons, Cards)
│   │   └── ml/           # Machine Learning specific components
│   ├── data/               # Static Data & Assets
│   ├── hooks/              # Custom React Hooks (useMagneticCursor, etc.)
│   ├── services/           # API Clients (ML API)
│   ├── styles/             # Global Styles (Tailwind config, globals)
│   └── types/              # TypeScript Definitions
├── public/                 # Static Assets
└── .env.local              # Environment Variables
```

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Primitives**: Radix UI
- **Icons**: [Lucide React](https://lucide.dev/)

## 📄 License

This project is licensed under the MIT License.
