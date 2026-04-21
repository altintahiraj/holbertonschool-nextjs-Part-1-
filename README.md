# Holberton School — Full Stack React Part 1

A full stack **Q&A application** built with **Next.js 15**, **MySQL (Workbench 8.0)**, and **NextAuth v5**.

Users can register, log in, create topics, ask questions, and vote on the best content.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Database | MySQL 8.0 (local via Workbench) |
| Auth | NextAuth v5 (Credentials) |
| Styling | Tailwind CSS v4 + shadcn/ui |
| Language | TypeScript |

---

## Getting Started

### 1. Clone and install

```bash
git clone https://github.com/YOUR_USERNAME/holbertonschool-nextjs.git
cd holbertonschool-nextjs
npm install
```

### 2. Set up MySQL database in Workbench

Open **MySQL Workbench 8.0** and run:

```sql
CREATE DATABASE qa_app CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 3. Configure environment variables

Create a `.env.local` file in the project root:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your MySQL credentials:

```env
# MySQL
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=your_mysql_password
MYSQL_DATABASE=qa_app

# NextAuth — generate with: openssl rand -base64 32
AUTH_SECRET=your_generated_secret_here
NEXTAUTH_URL=http://localhost:3000
```

> ⚠️ Never commit `.env.local` to git — it is already in `.gitignore`.

### 4. Start the dev server

```bash
npm run dev
```

### 5. Seed the database

With the server running, visit:

```
http://localhost:3000/seed
```

This will automatically:
- Create the `users`, `topics`, and `questions` tables
- Insert a default user and sample data

### 6. Log in

| Email | Password |
|---|---|
| user@atlasmail.com | 123456 |

Or register a new account at `/sign-up`.

---

## Routes

| Route | Auth Required | Description |
|---|---|---|
| `/` | No | Landing page |
| `/about` | No | About page |
| `/sign-in` | No | Login form |
| `/sign-up` | No | Registration form |
| `/ui` | **Yes** | Dashboard — all topics |
| `/ui/topics/new` | **Yes** | Create a new topic |
| `/ui/topics/:id` | **Yes** | Questions for a topic |

All `/ui/*` routes are protected — unauthenticated users are redirected to `/sign-in`.

---

## Project Structure

```
holbertonschool-nextjs/
├── app/
│   ├── about/page.tsx          # Public about page
│   ├── api/auth/[...nextauth]/ # NextAuth handler
│   ├── seed/route.ts           # DB setup endpoint
│   ├── sign-in/page.tsx        # Login page
│   ├── sign-up/page.tsx        # Registration page
│   ├── ui/
│   │   ├── layout.tsx          # Sidebar layout (auth-protected)
│   │   ├── loading.tsx         # Skeleton loader
│   │   ├── page.tsx            # Topics dashboard
│   │   └── topics/
│   │       ├── new/page.tsx    # Create topic form
│   │       └── [id]/page.tsx   # Topic questions + voting
│   ├── globals.css
│   └── layout.tsx              # Root layout + Navbar
├── components/
│   ├── navbar.tsx
│   └── ui/                     # shadcn/ui components
├── lib/
│   ├── actions.ts              # Server Actions (create/vote)
│   ├── auth/                   # Auth re-exports
│   ├── data.ts                 # Data fetching helpers
│   ├── db.ts                   # MySQL connection pool
│   └── utils.ts
├── auth.ts                     # NextAuth v5 config
└── middleware.ts               # Route protection
```

---

## Resetting the Database

To drop all data and re-seed, hit `/seed` again:

```
http://localhost:3000/seed
```

Or manually in MySQL Workbench:

```sql
DROP DATABASE qa_app;
CREATE DATABASE qa_app CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Then visit `/seed` again.
