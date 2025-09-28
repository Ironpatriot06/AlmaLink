# 🎓 AlmaLink — Reconnect. Mentor. Give Back.

AlmaLink is a modern alumni network platform built with **Next.js, TypeScript, TailwindCSS, and Supabase**. It provides a secure and interactive space for alumni to **connect, mentor, donate, and participate in events** — all in one place.

---

## ✨ Features

- 🔍 **Searchable Directory** — Easily find and connect with fellow alumni.  
- 👩‍🏫 **Mentorship Matching** — Request or offer mentoring sessions.  
- 📅 **Events** — Discover and register for upcoming alumni events.  
- ❤️ **Donations** — Support causes and track total contributions.  
- 🔔 **Notifications** — Stay updated with event reminders and mentoring alerts.  
- 🧠 **Personalized Dashboard** — Quick stats, recent activities, and actions.

---

## ⚙️ Tech Stack

- **Frontend:** Next.js (React, TypeScript, App Router)  
- **Styling:** TailwindCSS + shadcn/ui components  
- **Icons:** lucide-react  
- **Auth & Database:** Supabase (OAuth + Postgres)  
- **Deployment:** Vercel (recommended)

---

## 📂 Project Structure

```
almalink/
├── src/
│   ├── app/                # Next.js app directory
│   ├── components/         # Reusable UI components
│   │   ├── Header.tsx
│   │   └── DashboardContent.tsx
│   ├── contexts/
│   │   └── AuthContext.tsx
│   └── styles/
├── public/                 # Static assets (logos, images)
├── package.json
└── README.md
```

---

## 🚀 Setup Instructions

1. Clone the repository
```bash
git clone https://github.com/yourusername/almalink.git
cd almalink
```

2. Install dependencies
```bash
pnpm install
# or
yarn install
```

3. Create `.env.local` with your Supabase keys:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Run the dev server
```bash
pnpm run dev
# or
yarn dev
# or
npm run dev
```
Open http://localhost:3000

---

## 🧪 Notes & Tips

- For Google avatars: add `lh3.googleusercontent.com` to `next.config.js` `images.domains`.
- Ensure your OAuth scopes include `profile` and `email` to receive the `picture` field.
- Use `supabase.auth.onAuthStateChange` to persist profile info into your `profiles` table.

---

## 📌 Roadmap

- [ ] Alumni profile enhancements (grad year, company, bio).  
- [ ] Admin panel for events & donations.  
- [ ] Analytics dashboard for donations & mentoring impact.  
- [ ] Dark mode.

---

## 🤝 Contributing

Contributions are welcome — open an issue first for big changes. Please follow the standard PR workflow.

---

## 📜 License

MIT © 2025 RatishKapoor|Ironpatriot06
