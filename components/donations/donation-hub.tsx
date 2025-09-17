"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DonationForm } from "./donation-form"
import { Heart, GraduationCap, BookOpen, Users, Trophy, Building, Target, TrendingUp, DollarSign } from "lucide-react"

// Mock donation campaigns data
const campaigns = [
  {
    id: 1,
    title: "Student Scholarship Fund",
    description: "Help provide financial assistance to deserving students who need support to pursue their education.",
    goal: 100000,
    raised: 67500,
    donors: 234,
    daysLeft: 45,
    category: "Scholarships",
    icon: <GraduationCap className="w-6 h-6" />,
    image: "/scholarship-fund.jpg",
    impact: "67 students supported this year",
  },
  {
    id: 2,
    title: "New Library Construction",
    description:
      "Support the construction of a state-of-the-art library facility that will serve students for generations.",
    goal: 500000,
    raised: 342000,
    donors: 156,
    daysLeft: 120,
    category: "Infrastructure",
    icon: <BookOpen className="w-6 h-6" />,
    image: "/library-construction.jpg",
    impact: "Will serve 5,000+ students annually",
  },
  {
    id: 3,
    title: "Alumni Mentorship Program",
    description: "Fund our mentorship program that connects current students with successful alumni professionals.",
    goal: 25000,
    raised: 18750,
    donors: 89,
    daysLeft: 30,
    category: "Programs",
    icon: <Users className="w-6 h-6" />,
    image: "/mentorship-program.jpg",
    impact: "150 mentorship pairs created",
  },
  {
    id: 4,
    title: "Athletic Excellence Fund",
    description: "Support our student athletes with equipment, training facilities, and scholarship opportunities.",
    goal: 75000,
    raised: 45000,
    donors: 178,
    daysLeft: 60,
    category: "Athletics",
    icon: <Trophy className="w-6 h-6" />,
    image: "/athletic-fund.jpg",
    impact: "12 sports teams supported",
  },
]

// Mock donation history
const donationHistory = [
  {
    id: 1,
    campaign: "Student Scholarship Fund",
    amount: 250,
    date: "2024-01-10",
    recurring: true,
  },
  {
    id: 2,
    campaign: "Alumni Mentorship Program",
    amount: 100,
    date: "2023-12-15",
    recurring: false,
  },
  {
    id: 3,
    campaign: "General Fund",
    amount: 500,
    date: "2023-11-20",
    recurring: false,
  },
]

export function DonationHub() {
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null)
  const [showDonationForm, setShowDonationForm] = useState(false)

  const totalRaised = campaigns.reduce((sum, campaign) => sum + campaign.raised, 0)
  const totalDonors = campaigns.reduce((sum, campaign) => sum + campaign.donors, 0)
  const userTotalDonated = donationHistory.reduce((sum, donation) => sum + donation.amount, 0)

  const handleDonate = (campaign: any) => {
    setSelectedCampaign(campaign)
    setShowDonationForm(true)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const getProgressPercentage = (raised: number, goal: number) => {
    return Math.min((raised / goal) * 100, 100)
  }

  if (showDonationForm) {
    return (
      <DonationForm
        campaign={selectedCampaign}
        onBack={() => setShowDonationForm(false)}
        onComplete={() => {
          setShowDonationForm(false)
          setSelectedCampaign(null)
        }}
      />
    )
  }

  return (
    <div className="space-y-8">
      {/* Impact Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Raised This Year</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">{formatCurrency(totalRaised)}</div>
            <p className="text-xs text-muted-foreground">+12% from last year</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Donors</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalDonors}</div>
            <p className="text-xs text-muted-foreground">Generous alumni supporters</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Your Total Contributions</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{formatCurrency(userTotalDonated)}</div>
            <p className="text-xs text-muted-foreground">Thank you for your support!</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="campaigns" className="space-y-6">
        <TabsList>
          <TabsTrigger value="campaigns">Active Campaigns</TabsTrigger>
          <TabsTrigger value="history">My Donations</TabsTrigger>
          <TabsTrigger value="impact">Impact Stories</TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {campaigns.map((campaign) => (
              <Card key={campaign.id} className="hover:shadow-lg transition-shadow overflow-hidden">
                <div className="aspect-video bg-muted relative">
                  <img
                    src={campaign.image || "/placeholder.svg?height=200&width=400"}
                    alt={campaign.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-white/90 text-foreground hover:bg-white/90">{campaign.category}</Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="bg-white/90 text-foreground hover:bg-white/90">
                      {campaign.daysLeft} days left
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="flex items-start space-x-3 mb-4">
                    <div className="p-2 bg-accent/10 rounded-lg">{campaign.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-heading font-semibold text-lg mb-2">{campaign.title}</h3>
                      <p className="text-muted-foreground text-sm line-clamp-2">{campaign.description}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">
                          {formatCurrency(campaign.raised)} raised of {formatCurrency(campaign.goal)}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {Math.round(getProgressPercentage(campaign.raised, campaign.goal))}%
                        </span>
                      </div>
                      <Progress value={getProgressPercentage(campaign.raised, campaign.goal)} className="h-2" />
                    </div>

                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{campaign.donors} donors</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Target className="w-4 h-4" />
                        <span>{campaign.impact}</span>
                      </div>
                    </div>

                    <div className="flex space-x-2 pt-2">
                      <Button className="flex-1" onClick={() => handleDonate(campaign)}>
                        <Heart className="w-4 h-4 mr-2" />
                        Donate Now
                      </Button>
                      <Button variant="outline" className="bg-transparent">
                        Learn More
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Donate Options */}
          <Card className="bg-accent/5 border-accent/20">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <Building className="w-12 h-12 text-accent mx-auto mb-4" />
                <h3 className="font-heading font-semibold text-xl mb-2">Support the General Fund</h3>
                <p className="text-muted-foreground">
                  Make a general donation to support the university's most pressing needs and opportunities.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                <Button
                  variant="outline"
                  className="bg-transparent"
                  onClick={() => handleDonate({ title: "General Fund", id: "general" })}
                >
                  $25
                </Button>
                <Button
                  variant="outline"
                  className="bg-transparent"
                  onClick={() => handleDonate({ title: "General Fund", id: "general" })}
                >
                  $50
                </Button>
                <Button
                  variant="outline"
                  className="bg-transparent"
                  onClick={() => handleDonate({ title: "General Fund", id: "general" })}
                >
                  $100
                </Button>
                <Button
                  variant="outline"
                  className="bg-transparent"
                  onClick={() => handleDonate({ title: "General Fund", id: "general" })}
                >
                  $250
                </Button>
                <Button onClick={() => handleDonate({ title: "General Fund", id: "general" })}>Custom Amount</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Donation History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {donationHistory.map((donation) => (
                  <div key={donation.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <Heart className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium">{donation.campaign}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(donation.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-600">{formatCurrency(donation.amount)}</p>
                      {donation.recurring && (
                        <Badge variant="secondary" className="text-xs">
                          Recurring
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="impact" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <GraduationCap className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-lg mb-2">Sarah's Success Story</h3>
                    <p className="text-muted-foreground text-sm mb-3">
                      "Thanks to the scholarship fund, I was able to complete my computer science degree and now work at
                      a top tech company. I'm forever grateful to the alumni who made this possible."
                    </p>
                    <p className="text-xs text-muted-foreground">- Sarah M., Class of 2023</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <BookOpen className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-lg mb-2">New Research Opportunities</h3>
                    <p className="text-muted-foreground text-sm mb-3">
                      Alumni donations have funded 3 new research labs this year, enabling groundbreaking work in AI,
                      renewable energy, and biotechnology.
                    </p>
                    <p className="text-xs text-muted-foreground">- Research Department</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-lg mb-2">Mentorship Impact</h3>
                    <p className="text-muted-foreground text-sm mb-3">
                      The alumni mentorship program has connected over 500 students with industry professionals,
                      resulting in a 95% job placement rate within 6 months of graduation.
                    </p>
                    <p className="text-xs text-muted-foreground">- Career Services</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-orange-100 rounded-lg">
                    <Trophy className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-lg mb-2">Athletic Excellence</h3>
                    <p className="text-muted-foreground text-sm mb-3">
                      Thanks to alumni support, our teams won 5 conference championships this year and 12 student
                      athletes received full scholarships.
                    </p>
                    <p className="text-xs text-muted-foreground">- Athletic Department</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
