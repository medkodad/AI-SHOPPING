"use client";

import { motion } from "framer-motion";
import { Bell, Globe, Lock, Palette, Save, Shield, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "../_components/page-header";

const settingsSections = [
  {
    title: "General",
    description: "Store name, URL, and basic configuration",
    icon: Globe,
    fields: [
      { label: "Store Name", value: "ShopAI", type: "text" },
      { label: "Store URL", value: "https://shopai.com", type: "text" },
      { label: "Support Email", value: "support@shopai.com", type: "email" },
    ],
  },
  {
    title: "Security",
    description: "Authentication and access control settings",
    icon: Shield,
    fields: [
      { label: "Two-Factor Auth", value: "Enabled", type: "text" },
      { label: "Session Timeout", value: "30 minutes", type: "text" },
      { label: "IP Allowlist", value: "Disabled", type: "text" },
    ],
  },
  {
    title: "Notifications",
    description: "Email and push notification preferences",
    icon: Bell,
    toggles: [
      { label: "Order notifications", enabled: true },
      { label: "Low stock alerts", enabled: true },
      { label: "AI agent alerts", enabled: true },
      { label: "Weekly reports", enabled: false },
    ],
  },
  {
    title: "AI Configuration",
    description: "AI agent behavior and model settings",
    icon: Zap,
    fields: [
      { label: "Default Model", value: "GPT-4o", type: "text" },
      { label: "Max Tokens", value: "4096", type: "text" },
      { label: "Temperature", value: "0.7", type: "text" },
    ],
  },
];

export default function SettingsPage() {
  return (
    <div>
      <PageHeader
        title="Settings"
        description="Configure your store, security, notifications, and AI preferences."
        action={
          <Button size="sm">
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        }
      />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {settingsSections.map((section, i) => {
          const Icon = section.icon;
          return (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-violet-500/10 p-2.5">
                      <Icon className="h-5 w-5 text-violet-400" />
                    </div>
                    <div>
                      <CardTitle className="text-base">{section.title}</CardTitle>
                      <CardDescription>{section.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {"fields" in section && section.fields && (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {section.fields.map((field) => (
                        <div key={field.label}>
                          <label className="mb-2 block text-sm font-medium text-muted-foreground">
                            {field.label}
                          </label>
                          <Input type={field.type} defaultValue={field.value} />
                        </div>
                      ))}
                    </div>
                  )}

                  {"toggles" in section && section.toggles && (
                    <div className="space-y-3">
                      {section.toggles.map((toggle, j) => (
                        <div key={toggle.label}>
                          <div className="flex items-center justify-between py-2">
                            <span className="text-sm text-white">{toggle.label}</span>
                            <Badge variant={toggle.enabled ? "success" : "secondary"}>
                              {toggle.enabled ? "Enabled" : "Disabled"}
                            </Badge>
                          </div>
                          {j < section.toggles!.length - 1 && <Separator />}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          );
        })}

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-violet-500/10 p-2.5">
                <Palette className="h-5 w-5 text-violet-400" />
              </div>
              <div>
                <CardTitle className="text-base">Appearance</CardTitle>
                <CardDescription>Theme and display preferences</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {["Dark", "Light", "System"].map((theme) => (
                <Button
                  key={theme}
                  variant={theme === "Dark" ? "default" : "secondary"}
                  size="sm"
                >
                  {theme}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-red-500/20">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-red-500/10 p-2.5">
                <Lock className="h-5 w-5 text-red-400" />
              </div>
              <div>
                <CardTitle className="text-base text-red-400">Danger Zone</CardTitle>
                <CardDescription>Irreversible actions for your store</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Button variant="destructive" size="sm">
              Reset All Settings
            </Button>
            <Button variant="outline" size="sm" className="border-red-500/30 text-red-400 hover:bg-red-500/10">
              Delete Store Data
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
