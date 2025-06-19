# Deployment Guide

This project uses GitHub Actions to automatically deploy to Vercel when changes are merged to the main branch.

## Setup Instructions

### 1. Vercel Setup

First, you need to set up your project on Vercel and get the required credentials:

1. **Install Vercel CLI** (if you haven't already):
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Link your project** (run this in your project directory):
   ```bash
   vercel link
   ```

4. **Get your credentials**:
   ```bash
   # Get your project settings
   cat .vercel/project.json
   ```

### 2. GitHub Secrets Setup

Add these secrets to your GitHub repository:

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Add the following repository secrets:

#### Required Secrets:

- **`VERCEL_TOKEN`**: 
  - Get from: https://vercel.com/account/tokens
  - Create a new token with appropriate scope

- **`ORG_ID`**: 
  - Found in `.vercel/project.json` as `"orgId"`
  - Or get from Vercel dashboard → Settings → General

- **`PROJECT_ID`**: 
  - Found in `.vercel/project.json` as `"projectId"`
  - Or get from Vercel dashboard → Settings → General

### 3. Workflow Features

The GitHub Action workflow includes:

#### For Pull Requests:
- ✅ Runs tests and linting
- 🚀 Creates preview deployment
- 💬 Comments on PR with preview URL

#### For Main Branch (Production):
- ✅ Runs tests and linting
- 🚀 Deploys to production
- 🔄 Only runs after successful tests

### 4. Manual Deployment

You can also deploy manually using Vercel CLI:

```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

### 5. Environment Variables

If your app needs environment variables:

1. Add them to Vercel dashboard → Settings → Environment Variables
2. Or add them to your workflow file as needed:

```yaml
- name: Deploy to Vercel
  env:
    REACT_APP_API_URL: ${{ secrets.API_URL }}
  uses: amondnet/vercel-action@v25
```

### 6. Custom Domain

To set up a custom domain:

1. Go to Vercel dashboard → Settings → Domains
2. Add your domain
3. Update your DNS records as instructed

## Troubleshooting

### Common Issues:

1. **Build fails**: Check that `npm run build` works locally
2. **Secrets not working**: Verify secret names match exactly
3. **Wrong deployment URL**: Check that PROJECT_ID and ORG_ID are correct

### Getting Help:

- Check GitHub Actions logs for detailed error messages
- Verify Vercel project settings
- Ensure all secrets are properly set

## Workflow Files

- `.github/workflows/deploy.yml` - Simple deployment workflow
- `.github/workflows/ci-cd.yml` - Full CI/CD pipeline with testing

Choose the workflow that best fits your needs! 