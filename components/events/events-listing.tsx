"use client"

import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  MapPin,
  Calendar,
  Users,
  ExternalLink,
  Plus,
  Video,
  Coffee,
  Briefcase,
  GraduationCap,
} from "lucide-react"

// Mock events data
const mockEvents = [
  {
    id: 1,
    title: "Tech Alumni Networking Mixer",
    description:
      "Join fellow tech alumni for an evening of networking, sharing experiences, and exploring new opportunities in the Bay Area tech scene.",
    date: "2024-01-15",
    time: "18:00",
    endTime: "21:00",
    location: "WeWork SOMA, San Francisco, CA",
    type: "Networking",
    format: "In-Person",
    organizer: {
      name: "Sarah Chen",
      avatar: "/professional-woman-diverse.png",
      title: "Senior Software Engineer at Google",
    },
    attendees: 45,
    maxAttendees: 60,
    price: "Free",
    tags: ["Technology", "Networking", "Career"],
    rsvpStatus: "going",
    image: "/tech-networking-event.jpg",
  },
  {
    id: 2,
    title: "Alumni Career Panel: Breaking into Consulting",
    description:
      "Learn from successful alumni who made the transition into top-tier consulting firms. Q&A session and networking to follow.",
    date: "2024-01-20",
    time: "19:00",
    endTime: "21:00",
    location: "Virtual Event",
    type: "Career",
    format: "Virtual",
    organizer: {
      name: "Michael Rodriguez",
      avatar: "/professional-man.png",
      title: "Principal Consultant at McKinsey",
    },
    attendees: 127,
    maxAttendees: 200,
    price: "Free",
    tags: ["Consulting", "Career", "Panel"],
    rsvpStatus: "interested",
    image: "/career-panel-event.jpg",
  },
  {
    id: 3,
    title: "Class of 2019 Reunion Dinner",
    description:
      "Celebrate 5 years since graduation! Join your classmates for dinner, drinks, and reminiscing about our college days.",
    date: "2024-02-10",
    time: "19:30",
    endTime: "23:00",
    location: "The Ritz-Carlton, New York",
    type: "Reunion",
    format: "In-Person",
    organizer: {
      name: "Alumni Relations Office",
      avatar: "/university-logo.jpg",
      title: "Official University Event",
    },
    attendees: 89,
    maxAttendees: 120,
    price: "$75",
    tags: ["Reunion", "Class of 2019", "Social"],
    rsvpStatus: null,
    image: "/reunion-dinner.jpg",
  },
  {
    id: 4,
    title: "Startup Founders Coffee Chat",
    description:
      "Informal coffee meetup for alumni who are founders or interested in entrepreneurship. Share experiences and build connections.",
    date: "2024-01-25",
    time: "10:00",
    endTime: "12:00",
    location: "Blue Bottle Coffee, Palo Alto",
    type: "Social",
    format: "In-Person",
    organizer: {
      name: "Emily Johnson",
      avatar: "/professional-woman-marketing.png",
      title: "Product Marketing Manager at Spotify",
    },
    attendees: 12,
    maxAttendees: 15,
    price: "Free",
    tags: ["Entrepreneurship", "Startups", "Coffee"],
    rsvpStatus: "going",
    image: "/coffee-chat.jpg",
  },
  {
    id: 5,
    title: "Finance Alumni Investment Workshop",
    description:
      "Deep dive into current market trends and investment strategies. Led by alumni working in top investment firms.",
    date: "2024-02-05",
    time: "14:00",
    endTime: "17:00",
    location: "Goldman Sachs Office, London",
    type: "Professional",
    format: "In-Person",
    organizer: {
      name: "David Kim",
      avatar: "/professional-man-finance.png",
      title: "Vice President at Goldman Sachs",
    },
    attendees: 28,
    maxAttendees: 40,
    price: "$50",
    tags: ["Finance", "Investment", "Workshop"],
    rsvpStatus: null,
    image: "/finance-workshop.jpg",
  },
  {
    id: 6,
    title: "Women in STEM Mentorship Circle",
    description:
      "Monthly gathering for women alumni in STEM fields. Share experiences, provide support, and build lasting professional relationships.",
    date: "2024-01-30",
    time: "18:30",
    endTime: "20:30",
    location: "Virtual Event",
    type: "Mentorship",
    format: "Virtual",
    organizer: {
      name: "Lisa Wang",
      avatar: "/professional-woman-scientist.png",
      title: "Research Scientist at Moderna",
    },
    attendees: 34,
    maxAttendees: 50,
    price: "Free",
    tags: ["STEM", "Women", "Mentorship"],
    rsvpStatus: "interested",
    image: "/women-stem.jpg",
  },
]

export function EventsListing() {
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [formatFilter, setFormatFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")
  const [activeTab, setActiveTab] = useState("all")

  const filteredEvents = useMemo(() => {
    let events = mockEvents

    // Filter by tab
    if (activeTab === "going") {
      events = events.filter((event) => event.rsvpStatus === "going")
    } else if (activeTab === "interested") {
      events = events.filter((event) => event.rsvpStatus === "interested")
    }

    // Apply other filters
    return events.filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesType = typeFilter === "all" || event.type === typeFilter
      const matchesFormat = formatFilter === "all" || event.format === formatFilter

      const eventDate = new Date(event.date)
      const today = new Date()
      const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
      const nextMonth = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000)

      let matchesDate = true
      if (dateFilter === "this-week") {
        matchesDate = eventDate >= today && eventDate <= nextWeek
      } else if (dateFilter === "this-month") {
        matchesDate = eventDate >= today && eventDate <= nextMonth
      } else if (dateFilter === "upcoming") {
        matchesDate = eventDate >= today
      }

      return matchesSearch && matchesType && matchesFormat && matchesDate
    })
  }, [searchTerm, typeFilter, formatFilter, dateFilter, activeTab])

  const eventTypes = [...new Set(mockEvents.map((event) => event.type))]

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    })
  }

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(":")
    const date = new Date()
    date.setHours(Number.parseInt(hours), Number.parseInt(minutes))
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  const getEventIcon = (type: string) => {
    switch (type) {
      case "Networking":
        return <Users className="w-4 h-4" />
      case "Career":
        return <Briefcase className="w-4 h-4" />
      case "Reunion":
        return <GraduationCap className="w-4 h-4" />
      case "Social":
        return <Coffee className="w-4 h-4" />
      case "Professional":
        return <Briefcase className="w-4 h-4" />
      case "Mentorship":
        return <Users className="w-4 h-4" />
      default:
        return <Calendar className="w-4 h-4" />
    }
  }

  const getRSVPButton = (event: any) => {
    if (event.rsvpStatus === "going") {
      return (
        <Button size="sm" variant="outline" className="bg-green-50 border-green-200 text-green-700 hover:bg-green-100">
          Going
        </Button>
      )
    } else if (event.rsvpStatus === "interested") {
      return (
        <Button size="sm" variant="outline" className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100">
          Interested
        </Button>
      )
    } else {
      return (
        <Button size="sm" variant="outline" className="bg-transparent">
          RSVP
        </Button>
      )
    }
  }

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <TabsList>
            <TabsTrigger value="all">All Events</TabsTrigger>
            <TabsTrigger value="going">Going</TabsTrigger>
            <TabsTrigger value="interested">Interested</TabsTrigger>
          </TabsList>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create Event
          </Button>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Event Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {eventTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={formatFilter} onValueChange={setFormatFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Formats</SelectItem>
                  <SelectItem value="In-Person">In-Person</SelectItem>
                  <SelectItem value="Virtual">Virtual</SelectItem>
                </SelectContent>
              </Select>

              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="When" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Dates</SelectItem>
                  <SelectItem value="this-week">This Week</SelectItem>
                  <SelectItem value="this-month">This Month</SelectItem>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <TabsContent value={activeTab} className="space-y-6">
          {/* Results Count */}
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">
              Showing {filteredEvents.length} of {mockEvents.length} events
            </p>
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredEvents.map((event) => (
              <Card key={event.id} className="hover:shadow-lg transition-shadow overflow-hidden">
                <div className="aspect-video bg-muted relative">
                  <img
                    src={event.image || "/placeholder.svg?height=200&width=400"}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-white/90 text-foreground hover:bg-white/90">
                      {event.format === "Virtual" ? (
                        <Video className="w-3 h-3 mr-1" />
                      ) : (
                        <MapPin className="w-3 h-3 mr-1" />
                      )}
                      {event.format}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="bg-white/90 text-foreground hover:bg-white/90">
                      {event.price}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <div className="p-1 bg-accent/10 rounded">{getEventIcon(event.type)}</div>
                      <Badge variant="outline">{event.type}</Badge>
                    </div>
                    <div className="text-right text-sm">
                      <div className="font-medium">{formatDate(event.date)}</div>
                      <div className="text-muted-foreground">
                        {formatTime(event.time)} - {formatTime(event.endTime)}
                      </div>
                    </div>
                  </div>

                  <h3 className="font-heading font-semibold text-lg mb-2 line-clamp-1">{event.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{event.description}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4 mr-2" />
                      {event.location}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="w-4 h-4 mr-2" />
                      {event.attendees} attending • {event.maxAttendees - event.attendees} spots left
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 mb-4">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={event.organizer.avatar || "/placeholder.svg"} alt={event.organizer.name} />
                      <AvatarFallback>
                        {event.organizer.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{event.organizer.name}</p>
                      <p className="text-xs text-muted-foreground">{event.organizer.title}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {event.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    {getRSVPButton(event)}
                    <Button size="sm" variant="ghost">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-12">
              <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground text-lg mb-2">No events found</p>
              <p className="text-muted-foreground">Try adjusting your search criteria or filters</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
