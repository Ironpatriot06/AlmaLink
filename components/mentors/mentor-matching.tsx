"use client"

import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Search, MapPin, Briefcase, Clock, Star, MessageCircle, Calendar, Users, Award, Filter } from "lucide-react"

// Mock mentor data
const mockMentors = [
  {
    id: 1,
    name: "Sarah Chen",
    title: "Senior Software Engineer",
    company: "Google",
    location: "San Francisco, CA",
    industry: "Technology",
    expertise: ["Software Engineering", "AI/ML", "Career Transition", "Leadership"],
    bio: "10+ years in tech, passionate about helping new graduates navigate their careers in software engineering and AI.",
    avatar: "/professional-woman-diverse.png",
    rating: 4.9,
    sessionsCompleted: 45,
    responseTime: "< 24 hours",
    availability: "Weekends",
    languages: ["English", "Mandarin"],
    menteeLevel: ["Entry Level", "Mid Level"],
    sessionTypes: ["1-on-1 Video", "Coffee Chat", "Resume Review"],
    price: "Free",
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    title: "Principal Consultant",
    company: "McKinsey & Company",
    location: "New York, NY",
    industry: "Consulting",
    expertise: ["Strategy Consulting", "Business Development", "MBA Prep", "Case Interview"],
    bio: "Former investment banker turned consultant. Helping professionals break into top-tier consulting firms.",
    avatar: "/professional-man.png",
    rating: 4.8,
    sessionsCompleted: 67,
    responseTime: "< 12 hours",
    availability: "Evenings",
    languages: ["English", "Spanish"],
    menteeLevel: ["Entry Level", "Mid Level", "Senior Level"],
    sessionTypes: ["1-on-1 Video", "Mock Interview", "Career Planning"],
    price: "$50/session",
  },
  {
    id: 3,
    name: "David Kim",
    title: "Vice President",
    company: "Goldman Sachs",
    location: "London, UK",
    industry: "Finance",
    expertise: ["Investment Banking", "Financial Modeling", "M&A", "Career Advancement"],
    bio: "15 years in investment banking. Specialized in helping finance professionals advance their careers.",
    avatar: "/professional-man-finance.png",
    rating: 4.7,
    sessionsCompleted: 32,
    responseTime: "< 48 hours",
    availability: "Flexible",
    languages: ["English", "Korean"],
    menteeLevel: ["Mid Level", "Senior Level"],
    sessionTypes: ["1-on-1 Video", "Technical Review", "Network Introduction"],
    price: "$75/session",
  },
  {
    id: 4,
    name: "Lisa Wang",
    title: "Research Scientist",
    company: "Moderna",
    location: "Cambridge, MA",
    industry: "Healthcare",
    expertise: ["Biotech Research", "PhD Guidance", "Scientific Writing", "Industry Transition"],
    bio: "PhD in Biomedical Engineering. Helping scientists transition from academia to industry.",
    avatar: "/professional-woman-scientist.png",
    rating: 4.9,
    sessionsCompleted: 28,
    responseTime: "< 24 hours",
    availability: "Weekdays",
    languages: ["English"],
    menteeLevel: ["Entry Level", "Mid Level"],
    sessionTypes: ["1-on-1 Video", "Research Review", "Career Planning"],
    price: "Free",
  },
  {
    id: 5,
    name: "Emily Johnson",
    title: "Product Marketing Manager",
    company: "Spotify",
    location: "Stockholm, Sweden",
    industry: "Technology",
    expertise: ["Product Marketing", "Growth Strategy", "International Markets", "Startup Advice"],
    bio: "Product marketing expert with experience in both startups and large tech companies.",
    avatar: "/professional-woman-marketing.png",
    rating: 4.8,
    sessionsCompleted: 41,
    responseTime: "< 24 hours",
    availability: "Mornings",
    languages: ["English", "Swedish"],
    menteeLevel: ["Entry Level", "Mid Level"],
    sessionTypes: ["1-on-1 Video", "Portfolio Review", "Strategy Session"],
    price: "$40/session",
  },
]

export function MentorMatching() {
  const [searchTerm, setSearchTerm] = useState("")
  const [industryFilter, setIndustryFilter] = useState("all")
  const [expertiseFilter, setExpertiseFilter] = useState("all")
  const [availabilityFilter, setAvailabilityFilter] = useState("all")
  const [priceFilter, setPriceFilter] = useState("all")
  const [showFilters, setShowFilters] = useState(false)

  const filteredMentors = useMemo(() => {
    return mockMentors.filter((mentor) => {
      const matchesSearch =
        mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mentor.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mentor.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mentor.expertise.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesIndustry = industryFilter === "all" || mentor.industry === industryFilter
      const matchesExpertise =
        expertiseFilter === "all" ||
        mentor.expertise.some((skill) => skill.toLowerCase().includes(expertiseFilter.toLowerCase()))
      const matchesAvailability = availabilityFilter === "all" || mentor.availability === availabilityFilter
      const matchesPrice =
        priceFilter === "all" ||
        (priceFilter === "free" && mentor.price === "Free") ||
        (priceFilter === "paid" && mentor.price !== "Free")

      return matchesSearch && matchesIndustry && matchesExpertise && matchesAvailability && matchesPrice
    })
  }, [searchTerm, industryFilter, expertiseFilter, availabilityFilter, priceFilter])

  const industries = [...new Set(mockMentors.map((mentor) => mentor.industry))]
  const allExpertise = [...new Set(mockMentors.flatMap((mentor) => mentor.expertise))]

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search mentors by name, company, or expertise..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="bg-transparent sm:w-auto"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>

            {showFilters && (
              <>
                <Separator />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Industry</label>
                    <Select value={industryFilter} onValueChange={setIndustryFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Industries" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Industries</SelectItem>
                        {industries.map((industry) => (
                          <SelectItem key={industry} value={industry}>
                            {industry}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Expertise</label>
                    <Select value={expertiseFilter} onValueChange={setExpertiseFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Expertise" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Expertise</SelectItem>
                        {allExpertise.map((expertise) => (
                          <SelectItem key={expertise} value={expertise}>
                            {expertise}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Availability</label>
                    <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Any Time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Any Time</SelectItem>
                        <SelectItem value="Weekdays">Weekdays</SelectItem>
                        <SelectItem value="Weekends">Weekends</SelectItem>
                        <SelectItem value="Evenings">Evenings</SelectItem>
                        <SelectItem value="Mornings">Mornings</SelectItem>
                        <SelectItem value="Flexible">Flexible</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Price</label>
                    <Select value={priceFilter} onValueChange={setPriceFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Any Price" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Any Price</SelectItem>
                        <SelectItem value="free">Free</SelectItem>
                        <SelectItem value="paid">Paid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">
          Showing {filteredMentors.length} of {mockMentors.length} mentors
        </p>
      </div>

      {/* Mentors Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredMentors.map((mentor) => (
          <Card key={mentor.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4 mb-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={mentor.avatar || "/placeholder.svg"} alt={mentor.name} />
                  <AvatarFallback>
                    {mentor.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-heading font-semibold text-lg">{mentor.name}</h3>
                      <p className="text-muted-foreground text-sm">{mentor.title}</p>
                      <p className="text-muted-foreground text-sm font-medium">{mentor.company}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{mentor.rating}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{mentor.sessionsCompleted} sessions</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 mr-2" />
                  {mentor.location}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Briefcase className="w-4 h-4 mr-2" />
                  {mentor.industry}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="w-4 h-4 mr-2" />
                  Available {mentor.availability} • Responds {mentor.responseTime}
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{mentor.bio}</p>

              <div className="space-y-3 mb-4">
                <div>
                  <p className="text-sm font-medium mb-2">Expertise</p>
                  <div className="flex flex-wrap gap-1">
                    {mentor.expertise.slice(0, 3).map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {mentor.expertise.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{mentor.expertise.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">Session Types</p>
                  <div className="flex flex-wrap gap-1">
                    {mentor.sessionTypes.map((type) => (
                      <Badge key={type} variant="outline" className="text-xs">
                        {type}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center space-x-4">
                  <span className="font-semibold text-lg text-accent">{mentor.price}</span>
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span>{mentor.menteeLevel.join(", ")}</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="bg-transparent">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Message
                  </Button>
                  <Button size="sm">
                    <Calendar className="w-4 h-4 mr-2" />
                    Book Session
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredMentors.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg mb-2">No mentors found</p>
          <p className="text-muted-foreground">Try adjusting your search criteria or filters</p>
        </div>
      )}

      {/* Become a Mentor CTA */}
      <Card className="bg-accent/5 border-accent/20">
        <CardContent className="p-8 text-center">
          <Award className="w-12 h-12 text-accent mx-auto mb-4" />
          <h3 className="font-heading font-semibold text-xl mb-2">Want to become a mentor?</h3>
          <p className="text-muted-foreground mb-4">
            Share your expertise and help fellow alumni advance their careers. Join our community of mentors today.
          </p>
          <Button className="bg-accent hover:bg-accent/90">Apply to be a Mentor</Button>
        </CardContent>
      </Card>
    </div>
  )
}
