# Project overview
The Expense Tracker App frontend will serve as a user interface for managing personal finances effectively. It is designed to be intuitive, responsive, and accessible across various devices. The app will focus on simplifying the process of tracking income and expenses, generating insightful reports, and offering an overall seamless user experience.
The frontend will use modern web development technologies to ensure performance, scalability, and maintainability. It will integrate with backend APIs for data retrieval and submission while employing state-of-the-art design practices to deliver an engaging user experience.


# Feature requirements
- We will use NextJs, Supabase, Shadcn, lucide, clerk
1. Authentication
	•	Google Login: Enable users to log in using Clerk.
	•	Email Login: Allow email-based signup and login with password reset functionality.
	•	Home page should have a sign in button and a sign up button after the user is logged in the dashboard should be displayed

2. Dashboard
	•	Financial Overview:
	•	Display total income, total expenses, and net balance.
	•	Visual summary via graphs or charts.
	•	Quick Actions:
	•	Add new transactions directly from the dashboard.
	•	Shortcut links to key features like reports or transaction history.

3. Transaction Management
	•	Add Transaction:
	•	Form to input details such as type (income/expense), amount, category, tag, date, and notes.
	•	Input validation for mandatory fields.
	•	Edit/Delete Transaction:
	•	Provide functionality to modify or delete existing records.
	•	Filter Transactions:
	•	Allow filtering by date range, category, and tags.

4. Reports
	•	Daily/Weekly/Monthly/Yearly Reports:
	•	Graphical representation of transactions for selected periods.
	•	Tag and Category Analysis:
	•	Generate summaries based on user-defined tags and categories.
	•	Export Reports:
	•	Allow users to download reports as PDF or CSV.

5. Responsiveness
	•	Mobile-first Design:
	•	Optimize for mobile, tablet, and desktop views.
	•	Dynamic Layouts:
	•	Adjust content display based on screen size and orientation.

6. Notifications
	•	Provide alerts for successful transactions, errors, or session timeouts.
	•	Optional: Reminders for adding expenses or reviewing reports.

7. User Preferences
	•	Themes: Offer light and dark mode options.
	•	Settings: Let users customize currency, default categories, and report preferences.

8. Security
	•	Use HTTPS for data transmission.
	•	Sanitize user inputs to prevent cross-site scripting (XSS) or other vulnerabilities.

# Relevant docs
Install @clerk/nextjs
Clerk's Next.js SDK gives you access to prebuilt components, React hooks, and helpers to make user authentication easier.

Run the following command to install the SDK:

npm
yarn
pnpm
terminal

npm install @clerk/nextjs
Set your Clerk API keys
Add the following keys to your .env.local file. These keys can always be retrieved from the API keys page in the Clerk Dashboard.

.env.local

moneymind

moneymind


NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_dHJ1ZS1hbW9lYmEtNzMuY2xlcmsuYWNjb3VudHMuZGV2JA
CLERK_SECRET_KEY=sk_test_5wszJNBIu0AvEPekm7GmUz0meljYyyFAGD8FcBullS
Add clerkMiddleware() to your app
clerkMiddleware() grants you access to user authentication state throughout your app, on any route or page. It also allows you to protect specific routes from unauthenticated users. To add clerkMiddleware() to your app, follow these steps:

Create a middleware.ts file.

If you're using the /src directory, create middleware.ts in the /src directory.
If you're not using the /src directory, create middleware.ts in the root directory alongside .env.local.
In your middleware.ts file, export the clerkMiddleware() helper:

middleware.ts

import { clerkMiddleware } from '@clerk/nextjs/server'

export default clerkMiddleware()

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
By default, clerkMiddleware() will not protect any routes. All routes are public and you must opt-in to protection for routes. See the clerkMiddleware() reference to learn how to require authentication for specific routes.

Add <ClerkProvider> and Clerk components to your app
The <ClerkProvider> component provides session and user context to Clerk's hooks and components. It's recommended to wrap your entire app at the entry point with <ClerkProvider> to make authentication globally accessible. See the reference docs for other configuration options.

You can control which content signed-in and signed-out users can see with Clerk's prebuilt control components. Create a header using the following components:

<SignedIn>: Children of this component can only be seen while signed in.
<SignedOut>: Children of this component can only be seen while signed out.
<UserButton />: Shows the signed-in user's avatar. Selecting it opens a dropdown menu with account management options.
<SignInButton />: An unstyled component that links to the sign-in page. In this example, since no props or environment variables are set for the sign-in URL, this component links to the Account Portal sign-in page.
Select your preferred router to learn how to make this data available across your entire app:

App Router
Pages Router
app/layout.tsx

import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <header>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </header>
          <main>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  )
}


# Current file structure
📁 app/
├── 📁 (auth)/
│ ├── 📄 layout.tsx
│ ├── 📄 login/page.tsx
│ └── 📄 signup/page.tsx
├── 📁 dashboard/
│ ├── 📄 layout.tsx
│ ├── 📄 page.tsx
│ └── 📁 components/
│ ├── 📄 overview-cards.tsx
│ ├── 📄 recent-transactions.tsx
│ └── 📄 quick-actions.tsx
├── 📁 transactions/
│ ├── 📄 page.tsx
│ └── 📁 components/
│ ├── 📄 transaction-form.tsx
│ ├── 📄 transaction-list.tsx
│ └── 📄 transaction-filters.tsx
├── 📁 reports/
│ ├── 📄 page.tsx
│ └── 📁 components/
│ ├── 📄 date-range-picker.tsx
│ ├── 📄 charts/
│ │ ├── 📄 expense-chart.tsx
│ │ └── 📄 income-chart.tsx
│ └── 📄 export-options.tsx
├── 📁 settings/
│ ├── 📄 page.tsx
│ └── 📁 components/
│ ├── 📄 profile-settings.tsx
│ └── 📄 preferences.tsx
├── 📁 components/
│ ├── 📄 ui/
│ │ ├── 📄 button.tsx
│ │ ├── 📄 input.tsx
│ │ └── 📄 select.tsx
│ ├── 📄 layout/
│ │ ├── 📄 header.tsx
│ │ ├── 📄 sidebar.tsx
│ │ └── 📄 footer.tsx
│ └── 📄 shared/
│ ├── 📄 loading-spinner.tsx
│ └── 📄 error-boundary.tsx
├── 📁 lib/
│ ├── 📄 supabase.ts
│ ├── 📄 clerk.ts
│ └── 📄 utils.ts
├── 📁 styles/
│ └── 📄 globals.css
└── 📁 types/
└── 📄 index.ts

# Rules
- All new components should be added to the components folder
- All new pages should be added to the app folder
- All new styles should be added to the styles folder
- All new types should be added to the types folder
- All new utils should be added to the lib folder