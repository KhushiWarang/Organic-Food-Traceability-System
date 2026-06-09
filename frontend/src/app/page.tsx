"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Leaf, Shield, Users, TrendingUp } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="container mx-auto p-6 space-y-12">
      <div className="text-center space-y-4 py-12">
        <div className="flex justify-center mb-4">
          <Leaf className="h-16 w-16 text-green-600" />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold">
          Organic Food Traceability System
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Track the complete journey of organic food products through the supply chain with blockchain transparency
        </p>
        <div className="pt-4">
          <Button asChild size="lg">
            <Link href="/dashboard">Enter the App</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <Shield className="h-10 w-10 text-blue-600 mb-2" />
            <CardTitle>Transparency</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Complete visibility into every step of the supply chain from farm to consumer
            </CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Users className="h-10 w-10 text-purple-600 mb-2" />
            <CardTitle>Role-Based Access</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Secure access control for Farmers, Manufacturers, Distributors, Retailers, and Consumers
            </CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <TrendingUp className="h-10 w-10 text-green-600 mb-2" />
            <CardTitle>Traceability</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Track products through their entire lifecycle with immutable blockchain records
            </CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Leaf className="h-10 w-10 text-emerald-600 mb-2" />
            <CardTitle>Organic Certified</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Verify the authenticity and organic certification of products at every stage
            </CardDescription>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>How It Works</CardTitle>
          <CardDescription>Follow these simple steps to get started</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
              1
            </div>
            <div>
              <h3 className="font-semibold">Connect Your Wallet</h3>
              <p className="text-sm text-muted-foreground">
                Use MetaMask to connect and access the system
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
              2
            </div>
            <div>
              <h3 className="font-semibold">Deploy or Connect Contract</h3>
              <p className="text-sm text-muted-foreground">
                Deploy a new contract or connect to an existing one
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
              3
            </div>
            <div>
              <h3 className="font-semibold">Get Your Role Assigned</h3>
              <p className="text-sm text-muted-foreground">
                Admin assigns your role based on your position in the supply chain
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
              4
            </div>
            <div>
              <h3 className="font-semibold">Start Tracking</h3>
              <p className="text-sm text-muted-foreground">
                Add products, transfer ownership, and track the complete journey
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
