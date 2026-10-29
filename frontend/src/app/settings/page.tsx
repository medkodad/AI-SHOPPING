"use client";

import { useState, type ElementType } from "react";
import { motion } from "framer-motion";
import {
  Bell,
  Globe,
  Lock,
  Moon,
  Shield,
  Trash2,
} from "lucide-react";
import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/theme-toggle";

export default function SettingsPage() {
  const [language, setLanguage] = useState("en");
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [pushNotifs, setPushNotifs] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [profilePublic, setProfilePublic] = useState(false);
  const [dataSharing, setDataSharing] = useState(true);

  const Toggle = ({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) => (
    <button
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-11 shrink-0 rounded-full transition ${checked ? "bg-violet-500" : "bg-white/10"}`}
    >
      <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition ${checked ? "left-[22px]" : "left-0.5"}`} />
    </button>
  );

  const SettingRow = ({
    icon: Icon,
    title,
    description,
    children,
  }: {
    icon: ElementType;
    title: string;
    description: string;
    children: React.ReactNode;
  }) => (
    <div className="flex items-center justify-between gap-4 py-4">
      <div className="flex items-start gap-3">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-violet-500/10">
          <Icon className="h-5 w-5 text-violet-400" />
        </div>
        <div>
          <p className="font-medium">{title}</p>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      {children}
    </div>
  );

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-black">Settings</h1>
        <p className="mt-1 text-muted-foreground">Customize your ShopAI experience</p>
      </div>

      <div className="mx-auto max-w-2xl space-y-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6">
          <h2 className="text-lg font-bold">Appearance</h2>
          <Separator className="my-4" />
          <SettingRow icon={Moon} title="Theme" description="Switch between dark and light mode">
            <ThemeToggle />
          </SettingRow>
          <Separator />
          <SettingRow icon={Globe} title="Language" description="Choose your preferred language">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="h-9 rounded-xl border border-white/10 bg-white/5 px-3 text-sm outline-none"
            >
              <option value="en" className="bg-[#111827]">English</option>
              <option value="es" className="bg-[#111827]">Español</option>
              <option value="fr" className="bg-[#111827]">Français</option>
              <option value="de" className="bg-[#111827]">Deutsch</option>
            </select>
          </SettingRow>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-6">
          <h2 className="text-lg font-bold">Notifications</h2>
          <Separator className="my-4" />
          <SettingRow icon={Bell} title="Email Notifications" description="Receive order updates via email">
            <Toggle checked={emailNotifs} onChange={setEmailNotifs} />
          </SettingRow>
          <Separator />
          <SettingRow icon={Bell} title="Push Notifications" description="Browser push notifications for alerts">
            <Toggle checked={pushNotifs} onChange={setPushNotifs} />
          </SettingRow>
          <Separator />
          <SettingRow icon={Bell} title="Marketing Emails" description="Promotional offers and newsletters">
            <Toggle checked={marketingEmails} onChange={setMarketingEmails} />
          </SettingRow>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-6">
          <h2 className="text-lg font-bold">Privacy</h2>
          <Separator className="my-4" />
          <SettingRow icon={Shield} title="Public Profile" description="Allow others to see your profile">
            <Toggle checked={profilePublic} onChange={setProfilePublic} />
          </SettingRow>
          <Separator />
          <SettingRow icon={Shield} title="Data Sharing" description="Share anonymized data to improve AI recommendations">
            <Toggle checked={dataSharing} onChange={setDataSharing} />
          </SettingRow>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-6">
          <h2 className="text-lg font-bold">Security</h2>
          <Separator className="my-4" />
          <SettingRow icon={Lock} title="Change Password" description="Update your account password">
            <Button variant="secondary" size="sm">Update</Button>
          </SettingRow>
          <Separator />
          <SettingRow icon={Lock} title="Active Sessions" description="Manage devices logged into your account">
            <Button variant="secondary" size="sm">Manage</Button>
          </SettingRow>
          <Separator />
          <SettingRow icon={Trash2} title="Delete Account" description="Permanently delete your account and data">
            <Button variant="destructive" size="sm">Delete</Button>
          </SettingRow>
        </motion.div>
      </div>
    </MainLayout>
  );
}
