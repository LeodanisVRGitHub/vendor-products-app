# VendorHub - Vendor & Product Management System

A professional full-stack application built with Next.js for managing vendors and products with comprehensive reporting capabilities.

## Features

- 🏢 **Vendor Management**: Complete CRUD operations for vendors
- 📦 **Product Management**: Comprehensive product inventory system
- 📊 **Advanced Reports**: Dynamic charts and analytics
- 📄 **PDF Export**: High-quality PDF report generation with professional formatting
- 🌓 **Dark Mode**: Professional dark theme with modern color palette
- 🎨 **Professional UI**: Modern design with Tailwind CSS
- ✨ **Smooth Animations**: Framer Motion powered transitions
- 📱 **Fully Responsive**: Mobile-first design approach
- 🔍 **Advanced Filtering**: Multi-criteria search and filtering
- 📈 **Data Visualization**: Interactive charts using Recharts

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Database**: PostgreSQL (production) / SQLite (development) with Prisma ORM
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Charts**: Recharts
- **PDF Generation**: jsPDF + jspdf-autotable
- **Icons**: Lucide React
- **TypeScript**: Full type safety

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd vendor-products-app
```

2. Install dependencies:

```bash
npm install
```

3. Set up the database:

```bash
npx prisma generate
npx prisma db push
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── api/               # API routes
│   │   ├── vendors/       # Vendor endpoints
│   │   ├── products/      # Product endpoints
│   │   └── reports/       # Reports endpoint
│   ├── vendors/           # Vendors page
│   ├── products/          # Products page
│   └── page.tsx           # Dashboard
├── components/            # Reusable components
├── contexts/              # React contexts (Theme)
├── lib/                   # Utilities and database
└── types/                 # TypeScript types
```

## Features Overview

### Dashboard

- Real-time statistics
- Product distribution charts
- Vendor performance analytics
- Recent products overview
- Advanced filtering options

### Vendor Management

- Create, read, update, delete vendors
- Search and filter capabilities
- Status management (active/inactive)
- Product count tracking

### Product Management

- Complete inventory management
- Multi-vendor support
- Category organization
- Stock tracking
- SKU management
- Status tracking (available, out of stock, discontinued)

### Reports

- Products by category analysis
- Products by vendor breakdown
- Status distribution
- Inventory value calculations
- Date range filtering
- **PDF Export**: Download professional reports with one click
  - Multi-page support
  - Color-coded tables
  - Applied filters summary
  - High-quality formatting

## Deployment

### Deploy to Render (Recommended)

Render is a modern cloud platform perfect for Next.js applications. Follow our detailed guides:

- **[Quick Start Guide](./QUICK_DEPLOY_RENDER.md)** - Get deployed in 5 minutes
- **[Complete Deployment Guide](./RENDER_DEPLOY.md)** - Detailed step-by-step instructions
- **[Deployment Checklist](./RENDER_CHECKLIST.md)** - Make sure you don't miss anything
- **[Useful Commands](./RENDER_COMMANDS.md)** - CLI commands and tips

#### Quick Deployment Steps:

1. Create PostgreSQL database on Render
2. Create Web Service and connect your GitHub repo
3. Set environment variables (DATABASE_URL, NODE_ENV)
4. Deploy and run migrations
5. Your app is live! 🚀

**Features on Render:**

- ✅ Free tier available
- ✅ Automatic deployments from Git
- ✅ Built-in PostgreSQL database
- ✅ Free SSL certificates
- ✅ Easy scaling

### Deploy to Vercel

1. Push your code to GitHub
2. Import project in Vercel
3. Configure environment variables:
   - `DATABASE_URL`: Your database connection string
4. Deploy!

The [Vercel Platform](https://vercel.com) is also a great option for Next.js apps.

## Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="file:./dev.db"
```

For production, use a proper database URL (PostgreSQL, MySQL, etc.)

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npx prisma studio` - Open Prisma Studio (Database GUI)
- `npx prisma generate` - Generate Prisma Client
- `npx prisma db push` - Push schema changes to database

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for your own purposes.

## Author

Built with ❤️ using Next.js and modern web technologies.
