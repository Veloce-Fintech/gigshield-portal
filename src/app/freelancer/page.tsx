"use client";

import { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { WalletConnect } from "@/components/wallet-connect";
import { MilestoneSummary, MilestoneList } from "@/components/milestone-card";
import { WithdrawDialog } from "@/components/withdraw-dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { freelancerMilestones, escrows } from "@/lib/mock-data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2, Clock, AlertTriangle } from "lucide-react";

export default function FreelancerPage() {
  const [tab, setTab] = useState("all");

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-14 border-b flex items-center justify-between px-6 shrink-0">
          <h1 className="text-sm font-semibold">Freelancer Dashboard</h1>
          <WalletConnect />
        </header>
        <main className="flex-1 overflow-auto p-6 space-y-6">
          <MilestoneSummary milestones={freelancerMilestones} />

          <div className="grid grid-cols-3 gap-4">
            <Card className="col-span-2">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Milestones</CardTitle>
                <Tabs value={tab} onValueChange={setTab}>
                  <TabsList className="h-8">
                    <TabsTrigger value="all" className="text-xs px-3">All</TabsTrigger>
                    <TabsTrigger value="active" className="text-xs px-3">Active</TabsTrigger>
                    <TabsTrigger value="completed" className="text-xs px-3">Done</TabsTrigger>
                    <TabsTrigger value="disputed" className="text-xs px-3">Disputed</TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardHeader>
              <CardContent>
                {tab === "all" && <MilestoneList milestones={freelancerMilestones} />}
                {tab === "active" && <MilestoneList milestones={freelancerMilestones} filter="active" />}
                {tab === "completed" && <MilestoneList milestones={freelancerMilestones} filter="completed" />}
                {tab === "disputed" && <MilestoneList milestones={freelancerMilestones} filter="disputed" />}
              </CardContent>
            </Card>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Quick Withdraw</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Available Balance</span>
                    <span className="font-semibold">
                      {freelancerMilestones.filter((m) => m.status === "approved").reduce((s, m) => s + parseFloat(m.amount), 0).toFixed(2)} USDC
                    </span>
                  </div>
                  <WithdrawDialog />
                  <p className="text-xs text-muted-foreground text-center">
                    Powered by Stellar Anchor SEP-24
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Active Escrows</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {escrows.map((e) => (
                    <div key={e.id} className="flex items-center justify-between text-sm">
                      <div>
                        <div className="font-medium">{e.projectName}</div>
                        <div className="text-xs text-muted-foreground">{e.completedMilestones}/{e.milestones} milestones</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{e.totalAmount} {e.token}</div>
                        <div className="text-xs text-muted-foreground">{e.releasedAmount} released</div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
