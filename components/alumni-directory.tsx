"use client"

import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MapPin, Briefcase, Calendar, Mail, MessageCircle } from "lucide-react"

// Mock alumni data
const mockAlumni = [
  {
    id: 1,
    name: "Sarah Chen",
    graduationYear: 2018,
    degree: "Computer Science",
    company: "Google",
    position: "Senior Software Engineer",
    location: "San Francisco, CA",
    industry: "Technology",
    bio: "Passionate about AI and machine learning. Love mentoring new graduates.",
    avatar: "/professional-woman-diverse.png",
    skills: ["React", "Python", "Machine Learning"],
    isAvailableForMentoring: true,
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    graduationYear: 2015,
    degree: "Business Administration",
    company: "McKinsey & Company",
    position: "Principal Consultant",
    location: "New York, NY",
    industry: "Consulting",
    bio: "Strategy consultant helping Fortune 500 companies transform their operations.",
    avatar: "/professional-man.png",
    skills: ["Strategy", "Operations", "Leadership"],
    isAvailableForMentoring: true,
  },
  {
    id: 3,
    name: "Emily Johnson",
    graduationYear: 2020,
    degree: "Marketing",
    company: "Spotify",
    position: "Product Marketing Manager",
    location: "Stockholm, Sweden",
    industry: "Technology",
    bio: "Building products that connect people through music. Always excited to chat about product strategy.",
    avatar: "/professional-woman-marketing.png",
    skills: ["Product Marketing", "Analytics", "Growth"],
    isAvailableForMentoring: false,
  },
  {
    id: 4,
    name: "David Kim",
    graduationYear: 2012,
    degree: "Finance",
    company: "Goldman Sachs",
    position: "Vice President",
    location: "London, UK",
    industry: "Finance",
    bio: "Investment banking professional with expertise in M&A and capital markets.",
    avatar: "/professional-man-finance.png",
    skills: ["Investment Banking", "M&A", "Financial Modeling"],
    isAvailableForMentoring: true,
  },
  {
    id: 5,
    name: "Lisa Wang",
    graduationYear: 2019,
    degree: "Biomedical Engineering",
    company: "Moderna",
    position: "Research Scientist",
    location: "Cambridge, MA",
    industry: "Healthcare",
    bio: "Working on next-generation therapeutics. Passionate about biotech innovation.",
    avatar: "/professional-woman-scientist.png",
    skills: ["Bioengineering", "Research", "Drug Development"],
    isAvailableForMentoring: true,
  },
  {
    id: 6,
    name: "James Thompson",
    graduationYear: 2016,
    degree: "Environmental Science",
    company: "Tesla",
    position: "Sustainability Manager",
    location: "Austin, TX",
    industry: "Automotive",
    bio: "Leading sustainability initiatives in the automotive industry. Climate action advocate.",
    avatar: "/professional-man-environmental.jpg",
    skills: ["Sustainability", "Environmental Policy", "Project Management"],
    isAvailableForMentoring: false,
  },
]

export function AlumniDirectory() {
  const [searchTerm, setSearchTerm] = useState("")
  const [industryFilter, setIndustryFilter] = useState("all")
  const [yearFilter, setYearFilter] = useState("all")
  const [mentorFilter, setMentorFilter] = useState("all")

  const filteredAlumni = useMemo(() => {
    return mockAlumni.filter((alumni) => {
      const matchesSearch =
        alumni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alumni.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alumni.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alumni.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alumni.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesIndustry = industryFilter === "all" || alumni.industry === industryFilter
      const matchesYear = yearFilter === "all" || alumni.graduationYear.toString() === yearFilter
      const matchesMentor =
        mentorFilter === "all" ||
        (mentorFilter === "available" && alumni.isAvailableForMentoring) ||
        (mentorFilter === "unavailable" && !alumni.isAvailableForMentoring)

      return matchesSearch && matchesIndustry && matchesYear && matchesMentor
    })
  }, [searchTerm, industryFilter, yearFilter, mentorFilter])

  const industries = [...new Set(mockAlumni.map((alumni) => alumni.industry))]
  const graduationYears = [...new Set(mockAlumni.map((alumni) => alumni.graduationYear))].sort((a, b) => b - a)

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search alumni..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={industryFilter} onValueChange={setIndustryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Industry" />
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

            <Select value={yearFilter} onValueChange={setYearFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Graduation Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Years</SelectItem>
                {graduationYears.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    Class of {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={mentorFilter} onValueChange={setMentorFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Mentoring" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Alumni</SelectItem>
                <SelectItem value="available">Available for Mentoring</SelectItem>
                <SelectItem value="unavailable">Not Available</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">
          Showing {filteredAlumni.length} of {mockAlumni.length} alumni
        </p>
      </div>

      {/* Alumni Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAlumni.map((alumni) => (
          <Card key={alumni.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4 mb-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={alumni.avatar || "/placeholder.svg"} alt={alumni.name} />
                  <AvatarFallback>
                    {alumni.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h3 className="font-heading font-semibold text-lg truncate">{alumni.name}</h3>
                  <p className="text-muted-foreground text-sm">{alumni.position}</p>
                  <p className="text-muted-foreground text-sm font-medium">{alumni.company}</p>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 mr-2" />
                  {alumni.location}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4 mr-2" />
                  Class of {alumni.graduationYear} • {alumni.degree}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Briefcase className="w-4 h-4 mr-2" />
                  {alumni.industry}
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{alumni.bio}</p>

              <div className="flex flex-wrap gap-1 mb-4">
                {alumni.skills.slice(0, 3).map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
                {alumni.skills.length > 3 && (
                  <Badge variant="secondary" className="text-xs">
                    +{alumni.skills.length - 3} more
                  </Badge>
                )}
              </div>

              {alumni.isAvailableForMentoring && (
                <Badge className="mb-4 bg-green-100 text-green-800 hover:bg-green-100">Available for Mentoring</Badge>
              )}

              <div className="flex space-x-2">
                <Button size="sm" className="flex-1">
                  <Mail className="w-4 h-4 mr-2" />
                  Connect
                </Button>
                <Button size="sm" variant="outline">
                  <MessageCircle className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredAlumni.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg mb-2">No alumni found</p>
          <p className="text-muted-foreground">Try adjusting your search criteria</p>
        </div>
      )}
    </div>
  )
}
