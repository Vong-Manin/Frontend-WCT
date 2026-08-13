// app/sign-in/[[...sign-in]]/page.jsx
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 py-12 px-4">
      <SignIn
        appearance={{
          elements: {
            rootBox: "mx-auto w-full max-w-md",
            card: "bg-white dark:bg-slate-900 shadow-lg rounded-2xl border border-slate-200 dark:border-slate-800",
            headerTitle: "font-serif text-2xl text-slate-900 dark:text-white",
            headerSubtitle: "text-slate-500 dark:text-slate-400",
            formButtonPrimary:
              "bg-resortGreen hover:bg-resortGreen/90 text-white font-bold",
            footerActionLink: "text-resortGreen hover:text-resortGreen/80",
          },
        }}
        redirectUrl="/"
      />
    </div>
  );
}
