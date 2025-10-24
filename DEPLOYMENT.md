# Deployment Guide

This guide covers how to deploy the 1v1 Hero Picker to GitHub Pages.

## Prerequisites

- GitHub account
- Git repository initialized
- Node.js 18+ installed

## Method 1: Manual Deployment

### Step 1: Configure Base Path

Edit `vite.config.ts` and ensure the `base` matches your repository name:

```typescript
export default defineConfig({
  plugins: [react()],
  base: '/your-repo-name/', // Replace with your actual repo name
})
```

### Step 2: Build and Deploy

```bash
# Install dependencies (if not already done)
npm install

# Build the production bundle
npm run build

# Deploy to GitHub Pages
npm run deploy
```

This will:
1. Create a production build in the `dist` folder
2. Push the contents to the `gh-pages` branch
3. Make it available at `https://your-username.github.io/your-repo-name/`

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under **Source**, select `gh-pages` branch
4. Click **Save**

Your site should be live in a few minutes!

## Method 2: Automated Deployment (GitHub Actions)

The project includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that automatically deploys on every push to the `main` branch.

### Setup

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**
4. Push your code to the `main` branch

The workflow will:
- Run on every push to `main`
- Install dependencies
- Build the project
- Deploy to GitHub Pages automatically

### Monitoring Deployments

- Check the **Actions** tab in your GitHub repository
- Each push will trigger a new deployment
- Green checkmark = successful deployment
- Red X = failed deployment (check logs)

## Troubleshooting

### 404 Error After Deployment

**Problem**: Page shows 404 error  
**Solution**: Ensure the `base` path in `vite.config.ts` matches your repository name exactly (case-sensitive)

### Assets Not Loading

**Problem**: CSS, JS, or images not loading  
**Solution**: Check that all asset paths are relative and the `base` path is configured correctly

### Build Fails

**Problem**: `npm run build` fails  
**Solution**: 
- Check TypeScript errors: `npx tsc --noEmit`
- Ensure all dependencies are installed: `npm install`
- Check Node version: `node --version` (should be 18+)

### Deployment Branch Issues

**Problem**: `gh-pages` branch not created  
**Solution**: 
- Ensure `gh-pages` package is installed: `npm install gh-pages --save-dev`
- Try manually: `npm run build && npx gh-pages -d dist`

## Custom Domain

To use a custom domain:

1. Add a `CNAME` file to the `public` folder with your domain:
   ```
   yourdomain.com
   ```

2. Configure DNS records with your domain provider:
   - Add an A record pointing to GitHub's IPs
   - Or add a CNAME record pointing to `your-username.github.io`

3. Update GitHub Pages settings to use your custom domain

## Performance Tips

- The build is optimized for production with code splitting
- Images are lazy-loaded
- All assets are minified and compressed
- Consider enabling CDN caching for better performance

## Rollback

To rollback to a previous version:

```bash
# View deployment history
git log gh-pages

# Reset to a specific commit
git checkout gh-pages
git reset --hard <commit-hash>
git push origin gh-pages --force
```

⚠️ **Warning**: Force pushing will overwrite the current deployment

## Monitoring

After deployment, verify:
- ✅ Site loads without errors (check browser console)
- ✅ Search functionality works
- ✅ Selection and random picker work
- ✅ Data loads from `characters.json`
- ✅ Mobile responsive layout
- ✅ Keyboard navigation works

## Support

If you encounter issues:
1. Check the [GitHub Pages documentation](https://docs.github.com/en/pages)
2. Review [Vite deployment guide](https://vitejs.dev/guide/static-deploy.html)
3. Open an issue in the repository

