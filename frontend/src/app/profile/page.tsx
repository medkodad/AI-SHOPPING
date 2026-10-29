"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Bell,
  CreditCard,
  Lock,
  MapPin,
  Shield,
  User,
} from "lucide-react";
import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

const addresses = [
  { id: 1, label: "Home", address: "123 Main Street, Apt 4B", city: "San Francisco, CA 94102", default: true },
  { id: 2, label: "Office", address: "456 Market Street, Suite 200", city: "San Francisco, CA 94105", default: false },
];

const paymentMethods = [
  { id: 1, type: "Visa", last4: "4242", expiry: "12/28", default: true },
  { id: 2, type: "Mastercard", last4: "8888", expiry: "06/27", default: false },
];

export default function ProfilePage() {
  const [twoFactor, setTwoFactor] = useState(true);

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-black">My Profile</h1>
        <p className="mt-1 text-muted-foreground">Manage your account settings and preferences</p>
      </div>

      <div className="glass-card p-6">
        <div className="flex items-center gap-5">
          <div className="grid h-20 w-20 place-items-center rounded-2xl gradient-primary text-3xl font-black text-white">
            JD
          </div>
          <div>
            <h2 className="text-xl font-bold">John Doe</h2>
            <p className="text-muted-foreground">john.doe@email.com</p>
            <Badge variant="new" className="mt-2">Premium Member</Badge>
          </div>
        </div>
      </div>

      <Tabs defaultValue="personal" className="mt-6">
        <TabsList className="flex-wrap">
          <TabsTrigger value="personal" className="gap-2"><User className="h-4 w-4" /> Personal Info</TabsTrigger>
          <TabsTrigger value="addresses" className="gap-2"><MapPin className="h-4 w-4" /> Addresses</TabsTrigger>
          <TabsTrigger value="payments" className="gap-2"><CreditCard className="h-4 w-4" /> Payments</TabsTrigger>
          <TabsTrigger value="security" className="gap-2"><Lock className="h-4 w-4" /> Security</TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2"><Bell className="h-4 w-4" /> Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="personal">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6">
            <h3 className="font-bold">Personal Information</h3>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium">First Name</label>
                <Input defaultValue="John" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">Last Name</label>
                <Input defaultValue="Doe" />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-medium">Email</label>
                <Input defaultValue="john.doe@email.com" type="email" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">Phone</label>
                <Input defaultValue="+1 (555) 123-4567" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">Date of Birth</label>
                <Input defaultValue="1990-05-15" type="date" />
              </div>
            </div>
            <Button className="mt-6">Save Changes</Button>
          </motion.div>
        </TabsContent>

        <TabsContent value="addresses">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            {addresses.map((addr) => (
              <div key={addr.id} className="glass-card p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold">{addr.label}</h4>
                      {addr.default && <Badge variant="success">Default</Badge>}
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{addr.address}</p>
                    <p className="text-sm text-muted-foreground">{addr.city}</p>
                  </div>
                  <Button variant="ghost" size="sm">Edit</Button>
                </div>
              </div>
            ))}
            <Button variant="secondary">+ Add New Address</Button>
          </motion.div>
        </TabsContent>

        <TabsContent value="payments">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            {paymentMethods.map((pm) => (
              <div key={pm.id} className="glass-card flex items-center justify-between p-5">
                <div className="flex items-center gap-4">
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-white/5">
                    <CreditCard className="h-6 w-6 text-violet-400" />
                  </div>
                  <div>
                    <p className="font-semibold">{pm.type} •••• {pm.last4}</p>
                    <p className="text-sm text-muted-foreground">Expires {pm.expiry}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {pm.default && <Badge variant="success">Default</Badge>}
                  <Button variant="ghost" size="sm">Edit</Button>
                </div>
              </div>
            ))}
            <Button variant="secondary">+ Add Payment Method</Button>
          </motion.div>
        </TabsContent>

        <TabsContent value="security">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6">
            <h3 className="font-bold">Security Settings</h3>
            <Separator className="my-4" />
            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium">Current Password</label>
                <Input type="password" placeholder="Enter current password" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">New Password</label>
                <Input type="password" placeholder="Enter new password" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">Confirm New Password</label>
                <Input type="password" placeholder="Confirm new password" />
              </div>
              <Button>Update Password</Button>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-violet-400" />
                  <div>
                    <p className="font-medium">Two-Factor Authentication</p>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                  </div>
                </div>
                <button
                  onClick={() => setTwoFactor(!twoFactor)}
                  className={`relative h-6 w-11 rounded-full transition ${twoFactor ? "bg-violet-500" : "bg-white/10"}`}
                >
                  <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition ${twoFactor ? "left-[22px]" : "left-0.5"}`} />
                </button>
              </div>
            </div>
          </motion.div>
        </TabsContent>

        <TabsContent value="notifications">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6">
            <h3 className="font-bold">Notification Preferences</h3>
            <div className="mt-5 space-y-4">
              {[
                { label: "Order Updates", desc: "Shipping and delivery notifications", default: true },
                { label: "Promotions & Deals", desc: "Flash sales and exclusive offers", default: true },
                { label: "AI Recommendations", desc: "Personalized product suggestions", default: true },
                { label: "Price Drop Alerts", desc: "When wishlist items go on sale", default: false },
                { label: "Newsletter", desc: "Weekly curated shopping digest", default: false },
              ].map((pref) => (
                <div key={pref.label} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{pref.label}</p>
                    <p className="text-sm text-muted-foreground">{pref.desc}</p>
                  </div>
                  <input type="checkbox" defaultChecked={pref.default} className="h-4 w-4 accent-violet-500" />
                </div>
              ))}
            </div>
            <Button className="mt-6">Save Preferences</Button>
          </motion.div>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
}
