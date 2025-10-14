# 🚀 Deployment Instructions for Vercel

## Prerequisites Checklist

- [ ] Git installed on your computer
- [ ] GitHub account created
- [ ] Vercel account created (free at https://vercel.com)
- [ ] Application tested locally

## Step 1: Install Git (if needed)

Download and install Git from: https://git-scm.com/download/win

Verify installation:

```bash
git --version
```

## Step 2: Initialize Git Repository

Open terminal in the project folder and run:

```bash
# Initialize git repository
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit - VendorHub Application"
```

## Step 3: Create GitHub Repository

1. Go to https://github.com
2. Click the '+' icon → 'New repository'
3. Repository name: `vendorhub-app` (or your preferred name)
4. Description: "Professional vendor and product management system"
5. Make it Public or Private
6. Don't initialize with README (we already have one)
7. Click 'Create repository'

## Step 4: Push Code to GitHub

Copy the commands from GitHub (they look like this):

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

## Step 5: Deploy to Vercel

### Important: Remove Database Secret Reference

⚠️ Before deploying, ensure your `vercel.json` does NOT reference secrets like `@database_url`.
The correct `vercel.json` should look like this:

```json
{
  "framework": "nextjs",
  "buildCommand": "prisma generate && next build",
  "installCommand": "npm install"
}
```

### Option A: Vercel Dashboard (Easier)

1. Go to https://vercel.com and sign in
2. Click "Add New Project"
3. Click "Import Git Repository"
4. Select your GitHub repository
5. Configure:
   - Framework Preset: Next.js (auto-detected)
   - Root Directory: `./`
   - Build Command: `prisma generate && next build --turbopack`
   - Output Directory: `.next` (auto-filled)
   - Install Command: `npm install`
6. **IMPORTANT:** Before clicking Deploy, go to "Environment Variables" and add:
   - Skip this step for now if using Vercel Postgres (configured in Step 6)
7. Click "Deploy"
8. Wait for deployment to complete (2-3 minutes)
9. Your app is live! 🎉

### Option B: Vercel CLI (Advanced)

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

## Step 6: Configure Production Database

⚠️ Important: SQLite doesn't work on Vercel. Use PostgreSQL for production.

### Option 1: Vercel Postgres (Recommended)

1. In your Vercel project dashboard:

   - Go to "Storage" tab
   - Click "Create Database"
   - Select "Postgres"
   - Choose a name (e.g., "vendorhub-db")
   - Select region (closest to your users)
   - Click "Create"

2. Vercel automatically adds environment variables:

   - `POSTGRES_URL`
   - `POSTGRES_PRISMA_URL`
   - `POSTGRES_URL_NON_POOLING`

3. Update your code:

Edit `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("POSTGRES_PRISMA_URL")
}
```

4. Commit and push:

```bash
git add prisma/schema.prisma
git commit -m "Switch to PostgreSQL for production"
git push origin main
```

5. Vercel will auto-deploy with the new database!

### Option 2: Supabase (Free Tier)

1. Create account at https://supabase.com
2. Create new project
3. Go to Settings → Database
4. Copy the "Connection string" (URI format)
5. In Vercel:
   - Go to Settings → Environment Variables
   - Add: `DATABASE_URL` with your Supabase connection string
6. Update schema to use PostgreSQL
7. Redeploy

### Option 3: Railway (Free Tier)

1. Create account at https://railway.app
2. Create new project → PostgreSQL
3. Copy the connection string
4. Add to Vercel environment variables
5. Update schema and redeploy

## Step 7: Initialize Production Database

After setting up PostgreSQL, you need to create the tables:

### Method 1: Using Vercel CLI

```bash
# Set production database URL locally
export DATABASE_URL="your-production-database-url"

# Push schema to production database
npx prisma db push

# Optional: Seed production data
npm run seed
```

### Method 2: Update Build Command

In Vercel project settings:

1. Go to Settings → Build & Development Settings
2. Change Build Command to:
   ```
   prisma generate && prisma db push --accept-data-loss && next build --turbopack
   ```
3. Redeploy

⚠️ Note: `--accept-data-loss` flag is needed because it's the first deployment.

## Step 8: Verify Deployment

1. Visit your Vercel app URL (e.g., https://your-app.vercel.app)
2. Test all features:
   - [ ] Dashboard loads
   - [ ] Can create vendors
   - [ ] Can create products
   - [ ] Reports work
   - [ ] Dark/Light theme works
   - [ ] Search and filters work

## Step 9: Optional - Custom Domain

1. In Vercel project dashboard:
   - Go to Settings → Domains
   - Add your domain
   - Follow DNS configuration instructions

## Troubleshooting

### Build Fails

**Error: "Cannot find module @prisma/client"**

```bash
# Solution: Ensure postinstall script in package.json
"postinstall": "prisma generate"
```

**Error: "Database connection failed"**

- Check DATABASE_URL environment variable is set
- Verify connection string is correct
- Ensure database is accessible from internet

### Runtime Errors

**Error: "PrismaClient is unable to run in this browser environment"**

- Make sure you're using server components for database queries
- API routes should handle all database operations

**Error: "ECONNREFUSED"**

- Database URL is incorrect
- Database service is down
- Firewall blocking connection

### Environment Variables Not Working

1. Verify variables are set in Vercel dashboard
2. Check variable names match your code
3. Redeploy after adding variables

## Post-Deployment Checklist

- [ ] Application is accessible
- [ ] All pages load correctly
- [ ] Database operations work
- [ ] Theme switching works
- [ ] Mobile responsive works
- [ ] Charts render properly
- [ ] No console errors

## Continuous Deployment

Now, every time you push to GitHub, Vercel will automatically deploy!

```bash
# Make changes to your code
git add .
git commit -m "Add new feature"
git push origin main

# Vercel deploys automatically!
```

## Monitoring

1. **Vercel Analytics**:

   - Go to your project → Analytics
   - Enable Web Analytics
   - View traffic and performance

2. **Function Logs**:

   - Go to Deployments → Latest deployment
   - Click "View Function Logs"
   - Debug API issues

3. **Speed Insights**:
   - Enable in project settings
   - Monitor page load times

## Cost Estimate

**Free Tier Limits (Hobby Plan):**

- Bandwidth: 100 GB/month
- Serverless Function Execution: 100 GB-Hrs/month
- Builds: 100 hours/month
- Edge Middleware Invocations: 1,000,000/month

**Database Options:**

- Vercel Postgres: Free tier (256 MB storage)
- Supabase: Free tier (500 MB database, 2 GB bandwidth)
- Railway: Free tier (512 MB RAM, $5 credit/month)

## Getting Help

- **Vercel Discord**: https://vercel.com/discord
- **Vercel Docs**: https://vercel.com/docs
- **GitHub Issues**: Create issues in your repository
- **Community**: Next.js Discord, Reddit r/nextjs

---

## Quick Reference Commands

```bash
# Git commands
git add .
git commit -m "message"
git push origin main

# Vercel CLI
vercel                  # Deploy
vercel --prod          # Deploy to production
vercel env pull        # Pull environment variables
vercel logs            # View logs

# Database
npx prisma db push     # Push schema changes
npx prisma studio      # Open database GUI
npm run seed           # Seed database
```

## Security Best Practices

1. **Environment Variables**:

   - Never commit `.env` file
   - Use Vercel environment variables for secrets
   - Different credentials for dev/prod

2. **Database**:

   - Use connection pooling
   - Regular backups
   - Restrict access to specific IPs (if possible)

3. **API**:
   - Add rate limiting
   - Validate all inputs
   - Use HTTPS only (Vercel provides this)

---

**You're ready to deploy! 🚀**

Follow these steps carefully, and your application will be live in minutes!

Need help? Check the troubleshooting section or consult the documentation links above.

Good luck! 🎉
