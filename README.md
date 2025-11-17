# AI Innovation Hub

A modern web application showcasing user profiles, skill leaderboards, and a neural network visualization, built with React and Supabase. This project is configured for a "no-build" deployment, making it easy to host on static services like GitHub Pages.

## How It Works

This project uses an unconventional but effective setup for easy deployment:

-   **React & ReactDOM:** Loaded directly in `index.html` as UMD scripts from a CDN.
-   **Supabase Client:** Also loaded as a UMD script.
-   **In-Browser Transpilation:** The browser uses Babel Standalone (loaded from a CDN) to transpile TSX code into plain JavaScript on the fly. This avoids the need for a local build step (like `npm run build`).

## Deployment Guide

### 1. Supabase Backend Setup

Before deploying, you need to set up your own Supabase project.

1.  **Create a Project:** Go to [supabase.com](https://supabase.com) and create a new project.
2.  **Database Schema:** You will need to set up your database tables (`profiles`, `skills`, `user_skills`) and RPC functions (`get_top_skills`, `get_top_contributors`). You can use the SQL from your local development environment or define it in the Supabase SQL Editor.
3.  **Get API Keys:**
    -   In your Supabase project, go to `Project Settings` > `API`.
    -   Find your `Project URL` and your `anon` `public` key.
4.  **Update Client:**
    -   Open the `lib/supabaseClient.ts` file in this project.
    -   Replace the placeholder `supabaseUrl` and `supabaseAnonKey` with your own credentials.
5.  **Configure Auth Redirect URL (Crucial!):**
    -   For magic link authentication to work, Supabase must know where to redirect users after they click the link in their email.
    -   Go to `Authentication` > `URL Configuration` in your Supabase dashboard.
    -   Set the **Site URL** to your GitHub Pages URL (e.g., `https://your-username.github.io/your-repo-name/`). If you're using a custom domain, use that instead.
6.  **Enable Row Level Security (RLS):**
    -   For security, ensure RLS is enabled on all your public-facing tables.
    -   Define policies to control who can read or write data. For example, users should only be able to update their own profile.

### 2. GitHub Pages Deployment

1.  **Create a Repository:** Create a new repository on GitHub.
2.  **Push Files:** Add all the project files (`index.html`, `App.tsx`, etc.) to the repository and push them.
    ```bash
    git init
    git add .
    git commit -m "Initial commit"
    git branch -M main
    git remote add origin https://github.com/your-username/your-repo-name.git
    git push -u origin main
    ```
3.  **Enable GitHub Pages:**
    -   In your GitHub repository, go to `Settings` > `Pages`.
    -   Under `Build and deployment`, select the `Source` as `Deploy from a branch`.
    -   Choose the `main` branch and the `/ (root)` folder, then click `Save`.
4.  **Done!** Your site will be live at `https://your-username.github.io/your-repo-name/` in a few minutes.
