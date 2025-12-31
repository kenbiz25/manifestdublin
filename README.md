Manifest Dublin Church Website
A modern, responsive church website built with React, Vite, and Tailwind CSS. Designed for Manifest Dublin to provide an engaging online presence with sections for Home, About, Ministries, Events, Live Services, Give, and Contact.

✨ Features

Responsive Design – Mobile-friendly layout using Tailwind CSS.
Hero Section – Full-width background image with welcome text and CTAs.
Smooth Navigation – Sticky navbar with smooth scrolling.
Dynamic Sections:

About Us
Ministries Grid
Events Calendar
Live & Previous Services (YouTube Embed)
Giving Section
Contact Form


SEO Ready – Meta tags and Open Graph for social sharing.
Performance Optimized – Built with Vite for fast loading.


🛠 Tech Stack

Frontend: React + Vite
Styling: Tailwind CSS
Icons: SVG-based social icons
Deployment: cPanel (static build)


📂 Project Structure
MANIFESTDUBLIN/
├── dist/                # Production build output (upload to cPanel)
│   ├── assets/          # Minified CSS, JS, and images
│   ├── index.html       # Entry point for the built site
│   ├── favicon.ico
│   ├── robots.txt
│
├── public/              # Static assets served as-is
│   ├── favicon.ico
│   ├── placeholder.svg
│   ├── robots.txt
│
├── src/                 # Source code (edit here for changes)
│   ├── assets/          # Images, fonts, etc.
│   ├── components/      # Reusable UI components
│   │   ├── ui/          # UI primitives (accordion, button, etc.)
│   │   ├── AboutSection.tsx
│   │   ├── ContactSection.tsx
│   │   ├── EventsSection.tsx
│   │   ├── Footer.tsx
│   │   ├── GiveSection.tsx
│   │   ├── Hero.tsx
│   │   ├── LiveSection.tsx
│   │   ├── MinistriesSection.tsx
│   │   ├── Navbar.tsx
│   │   ├── NavLink.tsx
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions
│   ├── pages/           # Page-level components
│   ├── App.tsx          # Main app component
│   ├── main.tsx         # React entry point
│   ├── index.css        # Tailwind base styles
│
├── .gitignore           # Ignore node_modules, dist, env files
├── .gitattributes       # Normalize line endings
├── package.json         # Scripts & dependencies
├── tailwind.config.ts   # Tailwind theme config
├── vite.config.ts       # Vite build config
├── tsconfig.json        # TypeScript config
└── README.md            # Project documentation


🚀 Getting Started
1. Clone the Repository
Shellgit clone https://github.com/YOUR-USERNAME/manifestdublin.gitcd manifestdublinShow more lines
2. Install Dependencies
Shellnpm installShow more lines
3. Run Development Server
Shellnpm run devShow more lines
Visit http://localhost:5173.
4. Build for Production
Shellnpm run buildShow more lines
The build output will be in the dist/ folder.
