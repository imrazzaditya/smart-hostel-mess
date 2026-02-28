# Smart Hostel Mess - Mobile App Version

This project is a modern, mobile-first web app with premium aesthetics for managing a hostel mess.

## 🚀 Running Locally

Since this project consists of static files (`index.html`, `style.css`, `script.js`), no build step is needed.

### Using Node.js (npx)
Open a terminal in this directory and run:
```bash
npx serve -l 3000
```
Then open `http://localhost:3000` in your browser.

---

## 🛠 Pushing to GitHub

To store your code securely and prepare it for Vercel deployment, you should push it to GitHub.

1. **Initialize Git (if not already done)**
   Open your terminal in the project folder (`C:\Users\Aditya Raj\.gemini\antigravity\scratch\mobile-web-app`) and run:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Smart Hostel App"
   ```

2. **Create a new Repository on GitHub**
   - Go to [github.com/new](https://github.com/new) and log in.
   - Name your repository (e.g., `smart-hostel-mess`).
   - Do NOT initialize with a README, .gitignore, or license.
   - Click **Create repository**.

3. **Link Local Code to GitHub**
   Copy the commands under "…or push an existing repository from the command line" and run them in your terminal. It will look like this:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/smart-hostel-mess.git
   git branch -M main
   git push -u origin main
   ```

---

## 🌐 Deploying to Vercel (Detailed Guide)

Deploying via your GitHub repository allows Vercel to automatically update your live site whenever you push new changes to GitHub.

### Step 1: Import Project
1. Log in to your [Vercel Dashboard](https://vercel.com/dashboard).
2. Click the **Add New...** button and select **Project**.
3. On the left side, under "Import Git Repository", securely connect your GitHub account if you haven't already.
4. Find your `smart-hostel-mess` repository in the list and click **Import**.

### Step 2: Configure Project settings
1. **Framework Preset:** Vercel will automatically detect this as "Other" (since it's raw HTML/CSS/JS). Leave it as is.
2. **Root Directory:** Leave unchanged (defaults to root `./`).
3. **Build & Development Settings:** You do not need any build commands or output directories for this project.

### Step 3: Environment Variables (Important)
*Note: Currently, this static app uses `localStorage` and does not connect to an external database or API, meaning it **does not strictly require any environment variables** to run right now.*

However, if you plan to add a backend API (like Node.js/Express) or Firebase later, here is how you add exactly what your app needs:

1. In the Vercel deployment configuration screen, click the **Environment Variables** dropdown to expand it.
2. Add your key-value pairs. For example:
   - **Name:** `VITE_API_URL`
   - **Value:** `https://your-backend-api.onrender.com`
   - Click **Add**.
3. *(If you've already deployed the app and need to add variables later, go to your Project on Vercel > **Settings** > **Environment Variables**. Add them, then go to **Deployments** and click **Redeploy** to apply changes).*

### Step 4: Deploy
1. Click the **Deploy** button.
2. Vercel will process the files and assign a secure, live URL (e.g., `https://smart-hostel-mess.vercel.app`).
3. Whenever you make code changes locally, simply run:
   ```bash
   git commit -am "Updated feature"
   git push
   ```
   Vercel will listen to your GitHub repository and automatically deploy the new changes within seconds!
