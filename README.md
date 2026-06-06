# 🚀 Portfolio Template

A modern, animated portfolio website built with **React + Vite + GSAP** with a persistent backend powered by **Vercel Serverless Functions** and **Neon PostgreSQL**.

Features a built-in **Edit Mode** — update your portfolio content directly from the browser without touching code.

![Portfolio Preview](/public/opengraph.jpg)

---

## ✨ Features

- 🎨 **Stunning Animations** — GSAP-powered scroll animations, typewriter effects, particle backgrounds
- ✏️ **Live Edit Mode** — Password-protected inline editing, saved to database
- 💾 **Persistent Backend** — Edits saved to Neon PostgreSQL via Vercel Serverless Functions
- 📱 **Fully Responsive** — Looks great on desktop, tablet, and mobile
- ⚡ **Fast** — Vite build, optimized assets, deployed on Vercel Edge
- 🔒 **Secure** — Edit password validated server-side, never exposed in frontend

## 📋 Sections

- Hero with typewriter animation
- About / Summary
- Skills (categorized tags)
- Experience timeline
- Projects showcase
- Education & Certifications
- Awards
- Contact links

---

## 🛠️ Quick Setup (5 minutes)

### Prerequisites

- [Node.js](https://nodejs.org/) v20+
- A [GitHub](https://github.com/) account
- A [Vercel](https://vercel.com/) account (free)
- A [Neon](https://neon.tech/) account (free)

### Step 1: Fork & Clone

```bash
# Fork this repo on GitHub, then clone your fork
git clone https://github.com/YOUR_USERNAME/Portfolio-best.git
cd Portfolio-best
npm install
```

### Step 2: Set Up Neon Database

1. Go to [console.neon.tech](https://console.neon.tech) and create a free project
2. Copy your **connection string** from the dashboard
3. Open the **SQL Editor** and run this:

```sql
CREATE TABLE IF NOT EXISTS portfolio_data (
  id INTEGER PRIMARY KEY DEFAULT 1,
  data JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT single_row CHECK (id = 1)
);
```

### Step 3: Configure Environment

```bash
# Copy the example env file
cp .env.example .env.local
```

Edit `.env.local` with your values:

```env
DATABASE_URL=postgresql://user:password@your-host.neon.tech/neondb?sslmode=require
EDIT_PASSWORD=choose_a_strong_password
```

### Step 4: Customize Your Data

Edit **`src/data/portfolio.js`** — replace all the placeholder content with your own:

- Personal info (name, email, links)
- Experience
- Projects
- Skills
- Education
- Awards

Also update **`index.html`** — change the `<title>` and meta description to your name.

### Step 5: Run Locally

```bash
npm run dev
```

Visit `http://localhost:5173` to see your portfolio.

### Step 6: Deploy to Vercel

1. Push your repo to GitHub
2. Go to [vercel.com](https://vercel.com/) → **New Project** → Import your GitHub repo
3. Add environment variables in **Settings → Environment Variables**:
   - `DATABASE_URL` = your Neon connection string
   - `EDIT_PASSWORD` = your chosen password
4. Deploy! 🎉

---

## ✏️ Using Edit Mode

1. Click the **"Edit Portfolio"** button (bottom-right corner)
2. Enter your password
3. Edit any text inline — name, title, experience, projects, etc.
4. Click **"Save & Done"** — changes are saved to your database
5. Next time anyone visits, they see your updated content

---

## 📁 Project Structure

```
portfolio/
├── api/
│   └── portfolio.js      # Vercel Serverless Function (GET/PUT)
├── public/
│   ├── favicon.svg
│   └── opengraph.jpg
├── src/
│   ├── components/        # React components (Hero, About, Skills, etc.)
│   ├── data/
│   │   └── portfolio.js   # ⭐ YOUR DATA — customize this!
│   ├── hooks/
│   │   └── useEditMode.js # Edit mode logic + API integration
│   ├── lib/
│   ├── pages/
│   ├── App.jsx            # Main app component
│   ├── index.css          # All styles
│   └── main.tsx           # Entry point
├── .env.example           # Template for environment variables
├── index.html             # HTML entry (update title here)
├── schema.sql             # Database schema
├── vercel.json            # Vercel deployment config
├── vite.config.ts         # Vite build config
└── package.json
```

---

## 🔧 Tech Stack

| Technology | Purpose |
|-----------|---------|
| React 19 | UI framework |
| Vite 6 | Build tool & dev server |
| GSAP | Scroll & entrance animations |
| tsParticles | Animated particle background |
| Tailwind CSS 4 | Utility-first styling |
| Vercel Serverless Functions | Backend API |
| Neon PostgreSQL | Database (JSONB storage) |
| Framer Motion | Additional animations |

---

## 📄 License

Free to use for personal portfolios. Give a ⭐ if you find it useful!
