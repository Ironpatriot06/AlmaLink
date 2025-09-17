import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { LoginForm } from "@/components/auth/login-form"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center py-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="font-heading font-bold text-3xl mb-2">Welcome back</h1>
            <p className="text-muted-foreground">Sign in to your AlmaLink account to connect with fellow alumni</p>
          </div>
          <LoginForm />
          <div className="text-center">
            <p className="text-muted-foreground text-sm">
              {"Don't have an account? "}
              <Link href="/signup" className="text-accent hover:underline font-medium">
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
