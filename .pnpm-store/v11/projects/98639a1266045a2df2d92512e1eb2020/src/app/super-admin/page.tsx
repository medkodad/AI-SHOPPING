import { ShieldCheck, Sparkles, Settings2, KeyRound, DatabaseZap, Users } from "lucide-react";
import { ShellHeader } from "@/components/ui-shell";

const blocks = [
  { label: "Create Admins", description: "Invite and activate new admins", icon: Users },
  { label: "Roles & Permissions", description: "Fine-tune access controls", icon: ShieldCheck },
  { label: "System Settings", description: "Global configuration and policies", icon: Settings2 },
  { label: "Logs", description: "Audit trail and activity logs", icon: Sparkles },
  { label: "API Keys", description: "Manage service tokens safely", icon: KeyRound },
  { label: "Backup & Restore", description: "Protect and recover platform data", icon: DatabaseZap },
];

export default function SuperAdminPage() {
  return (
    <main className="min-h-screen pb-10 text-white">
      <ShellHeader
        title="SUPER ADMIN"
        subtitle="Enterprise control room for admins, permissions, system logs, keys, and AI configuration."
      />
      <section className="mx-auto mt-6 max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {blocks.map((block) => {
            const Icon = block.icon;
            return (
              <div key={block.label} className="rounded-[28px] border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
                <div className="inline-flex rounded-2xl bg-violet-500/15 p-3 text-violet-200">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="mt-4 text-lg font-semibold text-white">{block.label}</h2>
                <p className="mt-2 text-sm text-slate-400">{block.description}</p>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
