import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { DonationHub } from "@/components/donations/donation-hub"

export default function DonatePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="font-heading font-bold text-3xl mb-2">Give Back to Your Alma Mater</h1>
            <p className="text-muted-foreground">
              Support the next generation of students and help strengthen our alumni community through your generous
              contributions.
            </p>
          </div>
          <DonationHub />
        </div>
      </main>
      <Footer />
    </div>
  )
}
