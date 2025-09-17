import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MentorProfile } from "@/components/mentors/mentor-profile"

interface MentorPageProps {
  params: {
    id: string
  }
}

export default function MentorPage({ params }: MentorPageProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-8">
        <MentorProfile mentorId={params.id} />
      </main>
      <Footer />
    </div>
  )
}
