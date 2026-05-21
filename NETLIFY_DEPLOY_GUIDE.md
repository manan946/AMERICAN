# 🗂️ Netlify Deployment Guide

This project is fully ready for zero-config, high-performance static hosting on Netlify. You can deploy it using either **Netlify Drop** (drag-and-drop compiled build) or **Netlify Git Integration** (continuous deployment via GitHub).

---

## 🚀 Option 1: Drag-and-Drop Deployment via Netlify Drop

Netlify Drop serves pre-compiled static assets directly from your computer. Since it is a static hosting platform, it is extremely fast and free.

### Step-by-Step Instructions:
1. **Prepare the Build**: Run the build command in your terminal to compile all the typescript, React, and assets:
   ```bash
   npm run build
   ```
2. **Find the Build Folder**: This will generate a standard, highly-optimized production folder named `dist` at the root of your project directory.
3. **Upload to Netlify**:
   - Go to [Netlify Drop](https://app.netlify.com/drop) or [Netlify's main site](https://www.netlify.com/).
   - Drag and drop your **`dist`** folder directly into the designated upload area.
4. 🎉 **Done**: Your website is now live! Netlify will provide you with a secure, public URL immediately.

---

## 🛠️ Option 2: Continuous Deployment via GitHub (Recommended)

If you have exported your code to GitHub (via the settings icon in AI Studio), you can connect it directly to Netlify for automatic, hands-off rebuilds whenever you push updates.

Thanks to the bundled `netlify.toml` file automatically configured in this repository, Netlify will auto-detect all critical settings.

### Custom Build Settings:
- **Build Command**: `npm run build`
- **Publish Directory**: `dist`
- **Redirect Rule**: Set to automatically handle SPA fallback routing to `index.html`.

---

## 🔒 Firebase Integration & Server APIs

- **Firebase Config**: The Firebase Auth and Firestore configuration is embedded securely inside the client bundles (`/src/lib/firebase.ts`). No special environment configuration is required on Netlify to run the client-side database; everything connects out of the box.
- **Authorized Domains (CRITICAL for Google Sign-In)**: Since Firebase Authentication protects authentication requests, Google Sign-In will only work from domains that have been authorized in the Firebase backend database settings. 
  1. Once deployed, copy your Netlify site URL (e.g., `your-site-name.netlify.app`).
  2. Go to the [Firebase Console](https://console.firebase.google.com/).
  3. Select your project: `hypnagogic-airship-wcf5x`.
  4. Go to **Authentication** > **Settings** > **Authorized Domains**.
  5. Click **Add domain** and paste your Netlify custom domain.
- **Mock Services/Server APIs**: The mock backend services (like `/api/email-card`) have been successfully safeguarded. In static mode (such as when running on Netlify Drop without a Node.js process), the client logs any simulated actions safely in the console and handles all success indicators gracefully, permitting direct PDF downloading and local printing without stalling.
