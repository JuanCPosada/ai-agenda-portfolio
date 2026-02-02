# 🚀 Deployment Guide (Vercel)

This application is built with Next.js, which makes deploying to **Vercel** the best option.

## ⚠️ Important Database Note
Currently, the app uses **SQLite** (`dev.db`). SQLite files **do not persist** on serverless platforms like Vercel (your data will vanish every time the app restarts).

For production, you must switch to a cloud database like **Vercel Postgres**, **Neon**, or **Supabase**.

---

## Step 1: Push to GitHub
Make sure your latest code is on GitHub (we already did this!).
Repo: `https://github.com/JuanCPosada/ai-agenda-portfolio`

## Step 2: Create Vercel Project
1. Go to [Vercel.com](https://vercel.com) and log in.
2. Click **"Add New..."** -> **"Project"**.
3. Import your `ai-agenda-portfolio` repository.

## Step 3: Configure Database (Vercel Postgres)
1. On the Vercel project deployment screen, before clicking "Deploy", look for a **Storage** tab or finish the deploy first and then add storage.
2. It's easier to:
    - Click **Deploy** (The first build might fail or work but not save data, that's fine).
    - Go to the **Storage** tab in your Vercel Project Dashboard.
    - Click **"Connect Store"** -> **"Create New"** -> **"Postgres"**.
    - Accept the terms and create the database.
    - **Crucial:** Vercel will ask to "Pull environment variables". This automatically adds `POSTGRES_URL` etc. to your project settings.

## Step 4: Update Code for Postgres
You need to change `prisma/schema.prisma` to use Postgres instead of SQLite.

**Modify `prisma/schema.prisma`:**
```prisma
datasource db {
  provider = "postgresql" // ⬅️ Change this from "sqlite"
  url = env("POSTGRES_PRISMA_URL") // ⬅️ Vercel provides this
  directUrl = env("POSTGRES_URL_NON_POOLING") // ⬅️ Optional but recommended for Prisma
}
```

**Run Migration:**
Locally, you will need the connection string to run migrations, or you can run them during the build command.
The easiest way for a portfolio is to change the Build Command in Vercel Settings to:
`npx prisma migrate deploy && next build`

## Step 5: Environment Variables
Go to **Settings** -> **Environment Variables** in Vercel and add:
- `GOOGLE_GENERATIVE_AI_API_KEY`: Your Gemini API Key from Google AI Studio.

## Step 6: Redeploy
Push your changes (the `schema.prisma` update) to GitHub. Vercel will automatically redeploy.

---

## 🏃‍♂️ Quick "SQLite-only" Deployment (Not recommended for persistent data)
If you just want to show the UI and don't care if data disappears after a few minutes:
1. Deploy to Vercel as is.
2. It will work, but events might disappear when the server goes to sleep.
