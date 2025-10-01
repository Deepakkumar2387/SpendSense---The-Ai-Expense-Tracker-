SpendSense – AI Expense Tracker

SpendSense is an intelligent personal finance management web app that helps users track expenses, manage accounts, and gain insights using AI. It combines Next.js, React, Clerk for authentication, and ArcJet for bot protection to provide a smooth, secure, and user-friendly experience.

Features

AI-Powered Insights – Predict spending patterns and categorize expenses automatically.

Secure Authentication – Powered by Clerk for user login and registration.

Expense Tracking – Add, edit, and view transactions across multiple accounts.

Account Management – Create and manage multiple accounts.

Real-Time Reports – Get visual summaries with charts and graphs.

Bot Protection – ArcJet protects against malicious bots.

Responsive Design – Works seamlessly on desktop and mobile devices.

Email Notifications – Powered by Resend for sending reports and alerts.

Tech Stack

Frontend: React 19, Next.js 15.5.2, Tailwind CSS

Backend / Database: Prisma, PostgreSQL (or your choice)

Authentication: Clerk

Bot Protection: ArcJet

Charts & UI Components: Recharts, Radix UI, Lucide React

Email: React Email, Resend

Getting Started
Prerequisites

Node.js >= 20

npm or yarn

Vercel account for deployment (optional)

ArcJet API key

Clerk API keys

Installation

Clone the repository:

git clone https://github.com/<your-username>/spendsense.git
cd spendsense


Install dependencies:

npm install
# or
yarn install


Environment variables:

Create a .env file in the root and add:

NEXT_PUBLIC_CLERK_FRONTEND_API=<your-clerk-frontend-api>
CLERK_API_KEY=<your-clerk-backend-api>
ARCJET_KEY=<your-arcjet-key>
DATABASE_URL=<your-database-url>


Run the development server:

npm run dev
# or
yarn dev


Open http://localhost:3000
 in your browser.

Project Structure
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

Usage

Register/login using Clerk authentication.

Add accounts and transactions.

View reports and summaries.

AI categorization automatically organizes your expenses.

Receive email notifications and alerts.

Deployment

Deploy on Vercel:

Push your project to GitHub.

Go to Vercel
 → Import project → Connect GitHub repo.

Set environment variables in Vercel dashboard.

Deploy!

Contributing

Fork the repository.

Create your feature branch: git checkout -b feature-name

Commit your changes: git commit -m "Add some feature"

Push to branch: git push origin feature-name

Open a Pull Request.
