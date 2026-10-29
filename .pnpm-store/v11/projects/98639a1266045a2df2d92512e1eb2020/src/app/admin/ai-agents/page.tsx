"use client";

import { motion } from "framer-motion";
import { Activity, Bot, Power, RefreshCw, Zap } from "lucide-react";
import { aiAgents } from "@/data/mock";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { PageHeader } from "../_components/page-header";

function statusVariant(status: string) {
  switch (status) {
    case "Online":
      return "success" as const;
    case "Degraded":
      return "secondary" as const;
    case "Offline":
      return "destructive" as const;
    default:
      return "outline" as const;
  }
}

export default function AIAgentsPage() {
  const onlineCount = aiAgents.filter((a) => a.status === "Online").length;
  const totalRequests = aiAgents.reduce((sum, a) => sum + a.requests, 0);

  return (
    <div>
      <PageHeader
        title="AI Agents"
        description="Monitor, configure, and manage all AI agent services."
        action={
          <Button variant="secondary" size="sm">
            <RefreshCw className="h-4 w-4" />
            Refresh Status
          </Button>
        }
      />

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { label: "Agents Online", value: `${onlineCount}/${aiAgents.length}`, icon: Bot },
            { label: "Total Requests", value: totalRequests.toLocaleString(), icon: Activity },
            { label: "Avg Uptime", value: "99.4%", icon: Zap },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label}>
                <CardContent className="flex items-center gap-4 p-5">
                  <div className="rounded-xl bg-violet-500/10 p-3">
                    <Icon className="h-5 w-5 text-violet-400" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {aiAgents.map((agent, i) => (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <Card className="h-full">
                <CardHeader className="flex flex-row items-start justify-between pb-3">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-violet-500/10 p-2.5">
                      <Bot className="h-5 w-5 text-violet-400" />
                    </div>
                    <div>
                      <CardTitle className="text-base">{agent.name}</CardTitle>
                      <p className="text-xs text-muted-foreground">{agent.id}</p>
                    </div>
                  </div>
                  <Badge variant={statusVariant(agent.status)}>{agent.status}</Badge>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-xs text-muted-foreground">Uptime</p>
                      <p className="mt-1 text-sm font-semibold text-white">{agent.uptime}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Requests</p>
                      <p className="mt-1 text-sm font-semibold text-white">{agent.requests.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Latency</p>
                      <p className="mt-1 text-sm font-semibold text-white">{agent.latency}</p>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="mb-4">
                    <div className="mb-1.5 flex justify-between text-xs">
                      <span className="text-muted-foreground">Health</span>
                      <span className="text-white">{agent.uptime}</span>
                    </div>
                    <Progress value={parseFloat(agent.uptime) || 0} />
                  </div>

                  <div className="flex gap-2">
                    <Button variant="secondary" size="sm" className="flex-1" disabled={agent.status === "Offline"}>
                      <Power className="h-3.5 w-3.5" />
                      {agent.status === "Offline" ? "Start" : "Restart"}
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      Configure
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
