# VYTRION TECHNOLOGIES

A modern, full-featured e-commerce and technology solutions platform built with Next.js, featuring an admin panel, product management, blog system, and comprehensive business services showcase.

## 🚀 Features

### Public Features
- **Homepage** - Modern landing page with hero section, featured products, and services
- **Products** - Browse and view detailed product information
- **Shopping Cart** - Add products to cart and manage items
- **Orders** - Track and manage customer orders
- **Blog** - Read and explore technology articles and updates
- **Services** - View comprehensive service offerings
- **Projects** - Showcase completed projects and case studies
- **Offers** - Special promotions and deals
- **Contact** - Contact form and messaging system
- **About Us** - Company information and mission
- **Privacy Policy & Terms** - Legal pages

### Admin Panel
- **Dashboard** - Overview of business metrics
- **Product Management** - Add, edit, and manage products
- **Order Management** - View and process customer orders
- **Blog Management** - Create and manage blog posts
- **Contact Messages** - View and respond to customer inquiries
- **Projects Management** - Manage project showcases
- **Services Management** - Update service offerings

### Technical Features
- **Authentication** - User login and registration system
- **Responsive Design** - Mobile-first, fully responsive UI
- **Modern UI Components** - Built with Radix UI and Tailwind CSS
- **Animations** - Smooth transitions using Motion (Framer Motion)
- **Dark Mode Support** - Theme switching capability
- **Database Integration** - Supabase for backend services

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI
- **Animations**: Motion (Framer Motion)
- **Backend**: Supabase
- **Forms**: React Hook Form
- **Icons**: Lucide React
- **State Management**: React Context API

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd VYTRION-TECHNOLOGIES
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
VYTRION-TECHNOLOGIES/
├── app/                    # Next.js App Router pages
│   ├── admin/             # Admin panel pages
│   ├── blog/              # Blog pages
│   ├── products/          # Product pages
│   ├── cart/              # Shopping cart
│   ├── orders/            # Order management
│   └── ...                # Other public pages
├── components/            # React components
│   ├── admin/            # Admin-specific components
│   ├── ui/               # Reusable UI components
│   └── ...               # Other components
├── context/              # React Context providers
├── data/                 # Static data files
├── lib/                  # Utility functions
├── pages/                # Page components
├── public/               # Static assets
└── styles/               # Global styles
```

## 🚀 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🔐 Admin Access

To access the admin panel, navigate to `/admin` after logging in with admin credentials.

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Desktop (1920px+)
- Laptop (1024px - 1919px)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🌐 Deployment

### Deploy on Vercel (Recommended)

The easiest way to deploy this Next.js app is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import your repository on Vercel
3. Add your environment variables
4. Deploy!

### Other Platforms

This Next.js app can be deployed on any platform that supports Node.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## 📝 Environment Variables

Make sure to set up the following environment variables:

- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anonymous key

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

## 👥 Contact

For inquiries, please visit our [Contact Page](/contact) or reach out through the contact form.

---

**Built with ❤️ by VYTRION TECHNOLOGIES**
