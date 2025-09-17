"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  MapPin,
  Briefcase,
  Clock,
  Star,
  MessageCircle,
  Calendar,
  Users,
  Globe,
  Award,
  CheckCircle,
  ArrowLeft,
} from "lucide-react"
import Link from "next/link"

interface MentorProfileProps {
  mentorId: string
}

export function MentorProfile({ mentorId }: MentorProfileProps) {
  // Mock mentor data - in real app, this would be fetched based on mentorId
  const mentor = {
    id: 1,
    name: "Sarah Chen",
    title: "Senior Software Engineer",
    company: "Google",
    location: "San Francisco, CA",
    industry: "Technology",
    expertise: [
      "Software Engineering",
      "AI/ML",
      "Career Transition",
      "Leadership",
      "System Design",
      "Coding Interviews",
    ],
    bio: "I'm a Senior Software Engineer at Google with over 10 years of experience in the tech industry. I'm passionate about helping new graduates and career changers navigate their journey in software engineering and AI. I've mentored 45+ professionals and helped many land roles at top tech companies.",
    avatar: "/professional-woman-diverse.png",
    rating: 4.9,
    sessionsCompleted: 45,
    responseTime: "< 24 hours",
    availability: "Weekends",
    languages: ["English", "Mandarin"],
    menteeLevel: ["Entry Level", "Mid Level"],
    sessionTypes: ["1-on-1 Video", "Coffee Chat", "Resume Review", "Mock Interview", "Career Planning"],
    price: "Free",
    education: "MS Computer Science, Stanford University",
    experience: "10+ years",
    testimonials: [
      {
        name: "Alex Johnson",
        role: "Software Engineer at Meta",
        text: "Sarah's guidance was instrumental in helping me transition from academia to industry. Her insights on system design and interview preparation were invaluable.",
        rating: 5,
      },
      {
        name: "Maria Garcia",
        role: "ML Engineer at OpenAI",
        text: "Amazing mentor! Sarah helped me understand the AI/ML landscape and provided practical advice for breaking into the field.",
        rating: 5,
      },
    ],
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/mentors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Mentors
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Profile */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-8">
              <div className="flex items-start space-x-6 mb-6">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={mentor.avatar || "/placeholder.svg"} alt={mentor.name} />
                  <AvatarFallback className="text-2xl">
                    {mentor.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h1 className="font-heading font-bold text-3xl mb-2">{mentor.name}</h1>
                  <p className="text-xl text-muted-foreground mb-1">{mentor.title}</p>
                  <p className="text-lg font-medium text-accent mb-4">{mentor.company}</p>

                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex items-center space-x-1">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{mentor.rating}</span>
                      <span className="text-muted-foreground">({mentor.sessionsCompleted} sessions)</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Verified Mentor
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center text-muted-foreground">
                      <MapPin className="w-4 h-4 mr-2" />
                      {mentor.location}
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Clock className="w-4 h-4 mr-2" />
                      {mentor.responseTime}
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Globe className="w-4 h-4 mr-2" />
                      {mentor.languages.join(", ")}
                    </div>
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="space-y-6">
                <div>
                  <h3 className="font-heading font-semibold text-lg mb-3">About</h3>
                  <p className="text-muted-foreground leading-relaxed">{mentor.bio}</p>
                </div>

                <div>
                  <h3 className="font-heading font-semibold text-lg mb-3">Expertise</h3>
                  <div className="flex flex-wrap gap-2">
                    {mentor.expertise.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-heading font-semibold text-lg mb-3">Session Types</h3>
                  <div className="flex flex-wrap gap-2">
                    {mentor.sessionTypes.map((type) => (
                      <Badge key={type} variant="outline">
                        {type}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Testimonials */}
          <Card>
            <CardHeader>
              <CardTitle>What mentees say</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {mentor.testimonials.map((testimonial, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground italic">"{testimonial.text}"</p>
                  <p className="text-sm font-medium">
                    {testimonial.name} • {testimonial.role}
                  </p>
                  {index < mentor.testimonials.length - 1 && <Separator className="mt-4" />}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Book a Session</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <span className="text-3xl font-bold text-accent">{mentor.price}</span>
                <p className="text-sm text-muted-foreground">per session</p>
              </div>

              <div className="space-y-3">
                <Button className="w-full" size="lg">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Session
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </div>

              <Separator />

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Availability:</span>
                  <span>{mentor.availability}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Response time:</span>
                  <span>{mentor.responseTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Experience:</span>
                  <span>{mentor.experience}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Background</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Briefcase className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium">Industry</span>
                </div>
                <p className="text-muted-foreground">{mentor.industry}</p>
              </div>

              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Award className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium">Education</span>
                </div>
                <p className="text-muted-foreground">{mentor.education}</p>
              </div>

              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium">Mentee Level</span>
                </div>
                <p className="text-muted-foreground">{mentor.menteeLevel.join(", ")}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
