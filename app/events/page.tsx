import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { EventsListing } from "@/components/events/events-listing"

export default function EventsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="font-heading font-bold text-3xl mb-2">Alumni Events</h1>
            <p className="text-muted-foreground">
              Discover networking events, reunions, and professional meetups. Connect with fellow alumni in person and
              online.
            </p>
          </div>
          <EventsListing />
        </div>
      </main>
      <Footer />
    </div>
  )
}
