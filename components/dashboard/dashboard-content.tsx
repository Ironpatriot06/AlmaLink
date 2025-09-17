// src/components/DashboardContent.tsx
"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Users, Calendar, Heart, MessageCircle, TrendingUp, Bell } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

export function DashboardContent() {
  const { user, profile, loading } = useAuth();

  // get a friendly display name:
  // 1. prefer profile.full_name (your DB)
  // 2. then user.user_metadata?.full_name (provided by OAuth)
  // 3. then fallback to the email local-part
  const getDisplayName = () => {
    if (profile?.full_name) return profile.full_name;
    const metaName = (user as any)?.user_metadata?.full_name;
    if (metaName) return metaName;
    if (user?.email) return user.email.split("@")[0];
    return "Alumni";
  };

  const displayName = getDisplayName();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="font-heading font-bold text-3xl mb-2">
          {/* show loading skeleton while auth state initializing */}
          {loading ? "Welcome back," : `Welcome back, ${displayName}!`}
        </h1>
        <p className="text-muted-foreground">Here's what's happening in your alumni network today.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Network Connections</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">127</div>
            <p className="text-xs text-muted-foreground">+12 this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Next: Tech Meetup</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mentoring Sessions</CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">2 this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Donated</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2,450</div>
            <p className="text-xs text-muted-foreground">+$200 this year</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* ... keep the rest of your static content or wire it to real data */}
              <div className="flex items-start space-x-4">
                <Avatar className="w-10 h-10">
                  <AvatarImage src="/professional-man.png" />
                  <AvatarFallback>MR</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm">
                    <span className="font-medium">Michael Rodriguez</span> accepted your mentoring request
                  </p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>

              {/* other items... */}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions & Notifications */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" asChild>
                <Link href="/directory">
                  <Users className="w-4 h-4 mr-2" />
                  Browse Alumni
                </Link>
              </Button>
              <Button className="w-full justify-start bg-transparent" variant="outline" asChild>
                <Link href="/mentors">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Find Mentors
                </Link>
              </Button>
              <Button className="w-full justify-start bg-transparent" variant="outline" asChild>
                <Link href="/events">
                  <Calendar className="w-4 h-4 mr-2" />
                  View Events
                </Link>
              </Button>
              <Button className="w-full justify-start bg-transparent" variant="outline" asChild>
                <Link href="/donate">
                  <Heart className="w-4 h-4 mr-2" />
                  Make Donation
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="w-5 h-5 mr-2" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-accent/10 rounded-lg">
                <p className="text-sm font-medium">Mentoring Session Reminder</p>
                <p className="text-xs text-muted-foreground">Your session with Michael Rodriguez is tomorrow at 2 PM</p>
                <Badge className="mt-2 text-xs">Tomorrow</Badge>
              </div>

              {/* more notifications... */}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
