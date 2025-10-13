# VendorHub - Deployment Guide to Vercel

## Prerequisites

1. GitHub account
2. Vercel account (free tier available)
3. Your project code pushed to GitHub

## Step-by-Step Deployment

### Option 1: Deploy via Vercel Dashboard (Recommended for Beginners)

#### 1. Prepare Your Repository

```bash
# Initialize git repository (if not already done)
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit - VendorHub application"

# Create a new repository on GitHub
# Then push your code
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

#### 2. Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure project settings:
   - **Framework Preset**: Next.js (auto-detected)
   - **Build Command**: `prisma generate && next build --turbopack`
   - **Install Command**: `npm install`
   - **Root Directory**: `./`

#### 3. Configure Environment Variables

In the Vercel project settings, add these environment variables:

**For Development/Testing with SQLite (Not recommended for production):**

```
DATABASE_URL=file:./dev.db
```

**For Production with PostgreSQL (Recommended):**

1. Set up a PostgreSQL database (Options):

   - [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)
   - [Supabase](https://supabase.com)
   - [Railway](https://railway.app)
   - [Neon](https://neon.tech)

2. Add the connection string:

```
DATABASE_URL=postgresql://user:password@host:port/database?schema=public
```

#### 4. Deploy

1. Click "Deploy"
2. Wait for the build to complete
3. Your application will be live at `https://your-app-name.vercel.app`

### Option 2: Deploy via Vercel CLI

#### 1. Install Vercel CLI

```bash
npm install -g vercel
```

#### 2. Login to Vercel

```bash
vercel login
```

#### 3. Deploy

```bash
# From your project directory
cd vendor-products-app

# Deploy to production
vercel --prod
```

#### 4. Set Environment Variables

```bash
# Set database URL
vercel env add DATABASE_URL
```

## Post-Deployment Setup

### 1. Run Database Migrations

If using PostgreSQL, you need to push the Prisma schema:

```bash
# Set your production database URL
DATABASE_URL="your-production-database-url" npx prisma db push
```

Alternatively, in Vercel:

- Go to your project settings
- Navigate to "Settings" → "General" → "Build & Development Settings"
- Add a build command: `prisma generate && prisma db push && next build`

### 2. Verify Deployment

1. Visit your deployed URL
2. Test creating vendors
3. Test creating products
4. Check the dashboard reports
5. Test dark/light theme switching

## Recommended Production Database Setup

### Using Vercel Postgres

1. In your Vercel project dashboard:

   - Go to "Storage" tab
   - Click "Create Database"
   - Select "Postgres"
   - Create the database

2. Vercel will automatically add environment variables:

   - `POSTGRES_URL`
   - `POSTGRES_PRISMA_URL`
   - `POSTGRES_URL_NON_POOLING`

3. Update your environment variable:

   - Remove `DATABASE_URL`
   - Use `POSTGRES_PRISMA_URL` instead

4. Update `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("POSTGRES_PRISMA_URL")
}
```

5. Redeploy:

```bash
git add .
git commit -m "Update database to PostgreSQL"
git push origin main
```

### Using Supabase (Free Option)

1. Create account at [supabase.com](https://supabase.com)
2. Create new project
3. Get connection string from Settings → Database
4. Add to Vercel environment variables
5. Update schema to use PostgreSQL
6. Redeploy

## Troubleshooting

### Build Errors

**Error: Prisma Client not generated**

- Solution: Ensure `postinstall` script runs `prisma generate`
- Check: `package.json` has the correct build command

**Database Connection Issues**

- Verify `DATABASE_URL` is correctly set in environment variables
- Ensure database is accessible from Vercel's servers
- Check connection string format

### Runtime Errors

**API Routes Failing**

- Check Vercel function logs
- Verify environment variables are set
- Ensure database is properly configured

**Theme Not Persisting**

- This is expected on first load
- localStorage works after client hydration

## Continuous Deployment

Every push to your main branch will automatically trigger a new deployment!

```bash
# Make changes
git add .
git commit -m "Update feature X"
git push origin main

# Vercel automatically deploys!
```

## Custom Domain (Optional)

1. Go to your Vercel project
2. Navigate to "Settings" → "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

## Performance Tips

1. **Database Indexing**: Add indexes to frequently queried fields
2. **Caching**: Enable Vercel's edge caching
3. **Image Optimization**: Use Next.js Image component
4. **API Rate Limiting**: Add rate limiting to API routes

## Security Checklist

- [ ] Environment variables are set correctly
- [ ] Database credentials are secure
- [ ] CORS is configured properly
- [ ] Input validation is in place
- [ ] SQL injection prevention (Prisma handles this)
- [ ] XSS prevention (React handles this)

## Monitoring

1. **Vercel Analytics**: Enable in project settings
2. **Logs**: Check function logs in Vercel dashboard
3. **Speed Insights**: Monitor performance
4. **Error Tracking**: Consider Sentry integration

## Support

For issues with:

- **Vercel Deployment**: [Vercel Docs](https://vercel.com/docs)
- **Next.js**: [Next.js Docs](https://nextjs.org/docs)
- **Prisma**: [Prisma Docs](https://www.prisma.io/docs)

## Estimated Costs

- **Vercel (Hobby)**: Free

  - Bandwidth: 100GB/month
  - Serverless Function Execution: 100GB-Hrs
  - Builds: 100 hours/month

- **Database Options**:
  - Vercel Postgres: Free tier available
  - Supabase: Free tier (500MB database, 2GB bandwidth)
  - Neon: Free tier (3GB storage)

## Next Steps After Deployment

1. Add authentication (NextAuth.js)
2. Implement email notifications
3. Add PDF report generation
4. Set up automated backups
5. Add user roles and permissions

---

**Congratulations!** 🎉 Your VendorHub application is now live on Vercel!
