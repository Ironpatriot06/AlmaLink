import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MentorMatching } from "@/components/mentors/mentor-matching"

export default function MentorsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="font-heading font-bold text-3xl mb-2">Find Your Mentor</h1>
            <p className="text-muted-foreground">
              Connect with experienced alumni who can guide your career journey. Filter by expertise, industry, and
              availability.
            </p>
          </div>
          <MentorMatching />
        </div>
      </main>
      <Footer />
    </div>
  )
}
