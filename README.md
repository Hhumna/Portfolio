# Obsidian Portfolio

A modern, minimalist portfolio site built with Next.js 15, TypeScript, Tailwind CSS, and shadcn/ui.

## Features

- ✨ Modern design with glass morphism effects
- 🎨 Dark mode support
- 📱 Fully responsive
- ⚡ Fast performance with Next.js 15 App Router
- 🎭 Smooth animations with Framer Motion
- 🔗 GitHub integration for live project data
- 📈 SEO optimized with metadata generation
- 🧩 Reusable component library with shadcn/ui

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd obsidian-portfolio
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Then edit `.env.local` with your values:
- `NEXT_PUBLIC_SITE_URL`: Your site URL (public)
- `GITHUB_TOKEN`: GitHub personal access token (server-only)

4. Start the development server:
```bash
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Project Structure

See the detailed architecture documentation in the project root for the complete folder structure.

## Development

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm type-check` - Type check with TypeScript
- `pnpm format` - Format code with Prettier

## Technologies

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui, Radix UI
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **UI Notifications**: Sonner
- **Social Media Cards**: @vercel/og

## License

MIT
