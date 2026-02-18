
# Deployment Guide - Ben10 AI

This project is built with React and Vite, making it extremely easy to deploy to modern cloud platforms. Follow these steps to take your project live.

## 1. Prepare for Deployment
Ensure your code is pushed to a GitHub, GitLab, or Bitbucket repository.

## 2. Recommended: Vercel (Fastest)
Vercel is the creator of Next.js and has excellent support for Vite projects.

1.  **Sign up/Login** at [vercel.com](https://vercel.com).
2.  Click **"New Project"**.
3.  **Import** your GitHub repository.
4.  **Configure Project**:
    *   **Framework Preset**: Vite (detected automatically).
    *   **Root Directory**: `./`.
    *   **Build Command**: `npm run build`.
    *   **Output Directory**: `dist`.
5.  **Environment Variables**:
    *   Add a variable named `API_KEY`.
    *   Paste your Google Gemini API key as the value.
6.  Click **"Deploy"**.

## 3. Netlify
1.  **Sign up/Login** at [netlify.com](https://netlify.com).
2.  Click **"Add new site"** > **"Import an existing project"**.
3.  Connect your Git provider and select the repo.
4.  **Site Settings**:
    *   **Build command**: `npm run build`.
    *   **Publish directory**: `dist`.
5.  Click **"Site configuration"** > **"Environment variables"**.
6.  Add `API_KEY` with your Gemini key.
7.  Trigger a new deploy.

## 4. GitHub Pages
*Note: GitHub Pages is for static sites. Since this app requires an API key, you should be careful about exposing keys in the client-side code unless the platform (like this environment) handles injection securely.*

1.  Install the gh-pages package: `npm install gh-pages --save-dev`.
2.  Add `"homepage": "https://yourusername.github.io/your-repo-name"` to `package.json`.
3.  Add deployment scripts to `package.json`:
    ```json
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
    ```
4.  Run `npm run deploy`.

## 5. Security Note
In a production environment, the `API_KEY` is bundled into the frontend code by Vite. For high-security applications, it is recommended to build a small Node.js proxy server (Backend) to make the API calls, so the key is never sent to the user's browser.

**Disclaimer:** Ben10 AI is a tool for legal documentation assistance and does not replace professional legal advice.
