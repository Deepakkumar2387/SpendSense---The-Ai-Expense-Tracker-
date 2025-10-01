# 💸 ProjectSpendSense – AI Expense Tracker  

> An intelligent **personal finance management** web app powered by **Next.js, React, Clerk, and ArcJet**.  
Track expenses, manage accounts, and gain AI-driven insights — all in one place.  

---

## ✨ Features  

- 🤖 **AI-Powered Insights** – Predict spending patterns & auto-categorize expenses.  
- 🔐 **Secure Authentication** – Powered by **Clerk** for user login & registration.  
- 💳 **Expense Tracking** – Add, edit, and view transactions across multiple accounts.  
- 🏦 **Account Management** – Create and manage multiple accounts.  
- 📊 **Real-Time Reports** – Visual summaries with charts and graphs.  
- 🛡 **Bot Protection** – **ArcJet** guards against malicious bots.  
- 📱 **Responsive Design** – Works seamlessly on desktop & mobile.  
- 📧 **Email Notifications** – Powered by **Resend** for reports & alerts.  

---

## 🛠 Tech Stack  

| Layer        | Tools / Libraries |
|--------------|------------------|
| **Frontend** | React 19, Next.js 15.5.2, Tailwind CSS |
| **Backend / DB** | Prisma, PostgreSQL |
| **Authentication** | Clerk |
| **Bot Protection** | ArcJet |
| **Charts & UI** | Recharts, Radix UI, Lucide React |
| **Emails** | React Email, Resend |

---

## 🚀 Getting Started  

### ✅ Prerequisites
- Node.js **>= 20**  
- npm or yarn  
- Vercel account (optional, for deployment)  
- ArcJet API key  
- Clerk API keys  

### ⚡ Installation  

```bash
# Clone the repository
git clone https://github.com/<your-username>/spendsense.git
cd spendsense

# Install dependencies
npm install
# or
yarn install

▶ Run the Dev Server
npm run dev
# or
yarn dev


Now open 👉 http://localhost:3000

📂 Project Structure
SpendSense/
│
├─ app/                # Next.js App directory
│   ├─ (main)/         # Main pages
│   ├─ middleware.js   # ArcJet + Clerk middleware
│   └─ _components/    # Reusable components
│
├─ lib/                # Helper functions
├─ prisma/             # Prisma schema & migrations
├─ public/             # Static assets
├─ components/         # React components
├─ package.json
└─ README.md
