"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, CreditCard, Heart, Lock, Shield } from "lucide-react"

interface DonationFormProps {
  campaign: any
  onBack: () => void
  onComplete: () => void
}

export function DonationForm({ campaign, onBack, onComplete }: DonationFormProps) {
  const [amount, setAmount] = useState("")
  const [customAmount, setCustomAmount] = useState("")
  const [frequency, setFrequency] = useState("one-time")
  const [isRecurring, setIsRecurring] = useState(false)
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const predefinedAmounts = ["25", "50", "100", "250", "500", "1000"]

  const handleAmountSelect = (selectedAmount: string) => {
    setAmount(selectedAmount)
    setCustomAmount("")
  }

  const handleCustomAmount = (value: string) => {
    setCustomAmount(value)
    setAmount("")
  }

  const getFinalAmount = () => {
    return customAmount || amount
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      onComplete()
    }, 2000)
  }

  const formatCurrency = (amount: string) => {
    const num = Number.parseFloat(amount)
    return isNaN(num) ? "$0" : `$${num.toLocaleString()}`
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center space-x-4 mb-6">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Campaigns
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Heart className="w-5 h-5 text-accent" />
            <span>Make a Donation</span>
          </CardTitle>
          <p className="text-muted-foreground">
            {campaign?.title ? `Supporting: ${campaign.title}` : "Supporting the General Fund"}
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Amount Selection */}
            <div className="space-y-4">
              <Label className="text-base font-medium">Donation Amount</Label>
              <div className="grid grid-cols-3 gap-3">
                {predefinedAmounts.map((presetAmount) => (
                  <Button
                    key={presetAmount}
                    type="button"
                    variant={amount === presetAmount ? "default" : "outline"}
                    className={amount === presetAmount ? "" : "bg-transparent"}
                    onClick={() => handleAmountSelect(presetAmount)}
                  >
                    ${presetAmount}
                  </Button>
                ))}
              </div>
              <div className="space-y-2">
                <Label htmlFor="custom-amount">Custom Amount</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    id="custom-amount"
                    type="number"
                    placeholder="Enter amount"
                    value={customAmount}
                    onChange={(e) => handleCustomAmount(e.target.value)}
                    className="pl-8"
                    min="1"
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Frequency Selection */}
            <div className="space-y-4">
              <Label className="text-base font-medium">Donation Frequency</Label>
              <Select value={frequency} onValueChange={setFrequency}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="one-time">One-time donation</SelectItem>
                  <SelectItem value="monthly">Monthly recurring</SelectItem>
                  <SelectItem value="quarterly">Quarterly recurring</SelectItem>
                  <SelectItem value="annually">Annual recurring</SelectItem>
                </SelectContent>
              </Select>
              {frequency !== "one-time" && (
                <p className="text-sm text-muted-foreground">
                  You can cancel or modify your recurring donation at any time.
                </p>
              )}
            </div>

            <Separator />

            {/* Payment Information */}
            <div className="space-y-4">
              <Label className="text-base font-medium flex items-center space-x-2">
                <CreditCard className="w-4 h-4" />
                <span>Payment Information</span>
              </Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="card-number">Card Number</Label>
                  <Input id="card-number" placeholder="1234 5678 9012 3456" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input id="expiry" placeholder="MM/YY" required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input id="cvv" placeholder="123" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zip">ZIP Code</Label>
                  <Input id="zip" placeholder="12345" required />
                </div>
              </div>
            </div>

            <Separator />

            {/* Billing Information */}
            <div className="space-y-4">
              <Label className="text-base font-medium">Billing Information</Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input id="first-name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input id="last-name" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" required />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input id="state" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zip-billing">ZIP Code</Label>
                  <Input id="zip-billing" required />
                </div>
              </div>
            </div>

            <Separator />

            {/* Options */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="anonymous" checked={isAnonymous} onCheckedChange={setIsAnonymous} />
                <Label htmlFor="anonymous" className="text-sm">
                  Make this donation anonymous
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="updates" defaultChecked />
                <Label htmlFor="updates" className="text-sm">
                  Send me updates about how my donation is being used
                </Label>
              </div>
            </div>

            {/* Summary */}
            <Card className="bg-muted/50">
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Donation Amount:</span>
                    <span className="font-semibold text-lg">{formatCurrency(getFinalAmount())}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <span>Frequency:</span>
                    <span className="capitalize">{frequency.replace("-", " ")}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <span>Processing Fee:</span>
                    <span>$0 (covered by university)</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center font-semibold">
                    <span>Total:</span>
                    <span>{formatCurrency(getFinalAmount())}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security Notice */}
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Shield className="w-4 h-4" />
              <span>Your payment information is secure and encrypted</span>
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full" size="lg" disabled={!getFinalAmount() || isProcessing}>
              {isProcessing ? (
                "Processing..."
              ) : (
                <>
                  <Lock className="w-4 h-4 mr-2" />
                  Complete Donation of {formatCurrency(getFinalAmount())}
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
