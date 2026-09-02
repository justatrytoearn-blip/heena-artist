# 🎨 Henna Artist Website - Backup & Restore Instructions

## Project Info
- **Website**: https://heena-artist.vercel.app
- **Admin Login**: https://heena-artist.vercel.app/admin/login
- **Admin Email**: bhoomiart@website.com
- **GitHub Repo**: https://github.com/justatrytoearn-blip/heena-artist

---

## 🔑 Credentials (KEEP THIS SAFE!)

### Supabase
- **Project URL**: https://tqxjagaiogzxhapyckgu.supabase.co
- **Anon Key**: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRxeGphZ2Fpb2d6eGhhcHlja2d1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgxMDgxNzIsImV4cCI6MjEwMzY4NDE3Mn0.J4kJuZVmkU-H2f4AfR9YMMaM-7F7YNAFg8wwkRRhwRA
- **Admin Email**: bhoomiart@website.com
- **Admin Password**: (set by you in Supabase Authentication)

### Vercel
- **Dashboard**: https://vercel.com/dashboard
- **Site URL**: https://heena-artist.vercel.app
- **Login**: via GitHub account

### GitHub
- **Repo**: https://github.com/justatrytoearn-blip/heena-artist
- **Username**: justatrytoearn@gmail.com

### Environment Variables (for Vercel)
```
NEXT_PUBLIC_SUPABASE_URL=https://tqxjagaiogzxhapyckgu.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRxeGphZ2Fpb2d6eGhhcHlja2d1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgxMDgxNzIsImV4cCI6MjEwMzY4NDE3Mn0.J4kJuZVmkU-H2f4AfR9YMMaM-7F7YNAFg8wwkRRhwRA
NEXT_PUBLIC_ADMIN_EMAIL=bhoomiart@website.com
NEXT_PUBLIC_WHATSAPP_NUMBER=919876543210
```

---

## 🚀 How to Restore (Step by Step)

### Step 1: Install Node.js
Download from https://nodejs.org (LTS version)

### Step 2: Extract Backup
```bash
# Windows (use 7-Zip or WinRAR)
# Right-click henna-artist-backup.tar.gz → Extract Here

# Mac/Linux
tar xzf henna-artist-backup.tar.gz
```

### Step 3: Install Dependencies
```bash
cd henna-fresh
npm install
```

### Step 4: Create .env.local
Create a file called `.env.local` in the project root:
```
NEXT_PUBLIC_SUPABASE_URL=https://tqxjagaiogzxhapyckgu.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRxeGphZ2Fpb2d6eGhhcHlja2d1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgxMDgxNzIsImV4cCI6MjEwMzY4NDE3Mn0.J4kJuZVmkU-H2f4AfR9YMMaM-7F7YNAFg8wwkRRhwRA
NEXT_PUBLIC_ADMIN_EMAIL=bhoomiart@website.com
NEXT_PUBLIC_WHATSAPP_NUMBER=919876543210
```

### Step 5: Run Locally
```bash
npm run dev
```
Open http://localhost:3000

---

## 🗄️ Supabase Database Schema

If you need to recreate the database, run this SQL in Supabase SQL Editor:

```sql
-- Settings table
CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL DEFAULT '{}',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Gallery table
CREATE TABLE IF NOT EXISTS gallery (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT DEFAULT '',
  description TEXT DEFAULT '',
  category TEXT DEFAULT 'Bridal Mehndi',
  imageUrl TEXT DEFAULT '',
  createdAt TIMESTAMPTZ DEFAULT NOW(),
  uploadedBy TEXT DEFAULT 'admin'
);

-- Services table
CREATE TABLE IF NOT EXISTS services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT DEFAULT '',
  description TEXT DEFAULT '',
  price TEXT DEFAULT '',
  icon TEXT DEFAULT 'heart'
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT DEFAULT '',
  description TEXT DEFAULT '',
  price TEXT DEFAULT '',
  imageurl TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customername TEXT DEFAULT '',
  type TEXT DEFAULT 'text',
  content TEXT DEFAULT '',
  imageurl TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Public read settings" ON settings FOR SELECT USING (true);
CREATE POLICY "Public read gallery" ON gallery FOR SELECT USING (true);
CREATE POLICY "Public read services" ON services FOR SELECT USING (true);
CREATE POLICY "Public read products" ON products FOR SELECT USING (true);
CREATE POLICY "Public read testimonials" ON testimonials FOR SELECT USING (true);

-- Auth write policies
CREATE POLICY "Auth write settings" ON settings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth insert gallery" ON gallery FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth update gallery" ON gallery FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Auth delete gallery" ON gallery FOR DELETE USING (auth.role() = 'authenticated');
CREATE POLICY "Auth write services" ON services FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth write products" ON products FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth write testimonials" ON testimonials FOR ALL USING (auth.role() = 'authenticated');

-- Storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES ('gallery', 'gallery', true) ON CONFLICT DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('products', 'products', true) ON CONFLICT DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('testimonials', 'testimonials', true) ON CONFLICT DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('artist', 'artist', true) ON CONFLICT DO NOTHING;

-- Storage policies
CREATE POLICY "Public read storage" ON storage.objects FOR SELECT USING (bucket_id IN ('gallery','products','testimonials','artist'));
CREATE POLICY "Auth upload storage" ON storage.objects FOR INSERT WITH CHECK (bucket_id IN ('gallery','products','testimonials','artist') AND auth.role() = 'authenticated');
CREATE POLICY "Auth delete storage" ON storage.objects FOR DELETE USING (bucket_id IN ('gallery','products','testimonials','artist') AND auth.role() = 'authenticated');
```

---

## 🌐 How to Deploy to Vercel (Fresh)

1. Go to https://github.com/new → Create repo `henna-artist`
2. Upload all files from this backup (drag & drop)
3. Go to https://vercel.com → Sign in with GitHub
4. Click "Add New" → "Project" → Import your repo
5. Add environment variables (see above)
6. Click Deploy
7. Done! Your site is live.

---

## 📁 Project Structure
```
src/
├── app/
│   ├── admin/
│   │   ├── dashboard/page.tsx   (Admin panel)
│   │   ├── login/page.tsx       (Login page)
│   │   └── page.tsx             (Redirect)
│   ├── layout.tsx               (Root layout)
│   ├── page.tsx                 (Homepage)
│   └── globals.css              (Styles)
├── components/
│   ├── Navbar.tsx               (Navigation)
│   ├── Hero.tsx                 (Hero section)
│   ├── About.tsx                (About section)
│   ├── Gallery.tsx              (Image gallery)
│   ├── Services.tsx             (Services section)
│   ├── Products.tsx             (Products/shop)
│   ├── Testimonials.tsx         (Reviews)
│   ├── Contact.tsx              (Contact section)
│   ├── Footer.tsx               (Footer)
│   ├── WhatsAppButton.tsx       (Floating WA button)
│   └── LayoutWrapper.tsx        (Smart layout)
├── context/
│   └── AuthContext.tsx           (Authentication)
├── lib/
│   ├── supabase.ts              (Supabase client)
│   ├── dataService.ts           (Database operations)
│   └── defaultData.ts           (Demo content)
└── types/
    └── index.ts                 (TypeScript types)
```

---

## ⚠️ Important Notes

1. **Products/Testimonials tables use snake_case columns**:
   - Products: `imageurl`, `created_at` (NOT `imageUrl`, `createdAt`)
   - Testimonials: `customername`, `imageurl`, `created_at` (NOT `customerName`, `imageUrl`)

2. **Email auth must be enabled** in Supabase:
   - Go to Authentication → Providers → Email → Toggle ON
   - Turn OFF "Confirm email"

3. **The `next.config.ts` has `ignoreBuildErrors: true`** — this prevents Vercel build failures from TypeScript errors.

4. **Always keep this backup file safe** — it contains all the code and credentials needed to restore your website.
