import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Users, Heart, Calendar, Search } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-balance mb-6">
            AlmaLink — Reconnect. Mentor. Give back.
          </h1>
          <p className="text-xl text-muted-foreground text-pretty mb-8 max-w-2xl mx-auto">
            Bring your alumni network into one secure place: searchable profiles, mentor matching, events, and donations
            — all in one click.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button size="lg" className="text-lg px-8" asChild>
              <Link href="/signup">Get started →</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent" asChild>
              <Link href="/directory">Explore Directory</Link>
            </Button>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Search className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-heading font-semibold text-lg mb-2">Searchable Profiles</h3>
              <p className="text-muted-foreground text-sm">
                Find alumni by industry, location, graduation year, and more
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-heading font-semibold text-lg mb-2">Mentor Matching</h3>
              <p className="text-muted-foreground text-sm">
                Connect with experienced alumni for career guidance and support
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-heading font-semibold text-lg mb-2">Events</h3>
              <p className="text-muted-foreground text-sm">
                Discover networking events, reunions, and professional meetups
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-heading font-semibold text-lg mb-2">Give Back</h3>
              <p className="text-muted-foreground text-sm">
                Support your alma mater and fellow alumni through donations
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
