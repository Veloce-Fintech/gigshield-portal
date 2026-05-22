"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, CheckCircle2, AlertTriangle } from "lucide-react";
import { Milestone } from "@/lib/mock-data";

function Countdown({ deadline }: { deadline: string }) {
  const [remaining, setRemaining] = useState("");

  useEffect(() => {
    function tick() {
      const diff = new Date(deadline).getTime() - Date.now();
      if (diff <= 0) { setRemaining("Overdue"); return; }
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      setRemaining(`${d}d ${h}h`);
    }
    tick();
    const id = setInterval(tick, 60000);
    return () => clearInterval(id);
  }, [deadline]);

  const isOverdue = new Date(deadline).getTime() < Date.now();

  return (
    <span className={`flex items-center gap-1 text-xs ${isOverdue ? "text-destructive" : "text-muted-foreground"}`}>
      <Clock className="h-3 w-3" />
      {isOverdue ? "Overdue" : remaining}
    </span>
  );
}

const statusConfig = {
  active: { label: "In Progress", variant: "secondary" as const },
  completed: { label: "Completed", variant: "outline" as const },
  approved: { label: "Approved", variant: "default" as const },
  disputed: { label: "Disputed", variant: "destructive" as const },
};

export function MilestoneCard({ milestone }: { milestone: Milestone }) {
  const cfg = statusConfig[milestone.status];

  return (
    <div className="border rounded-lg p-4 space-y-2 hover:bg-muted/30 transition-colors">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">{milestone.projectName}</span>
            <Badge variant={cfg.variant} className="text-[10px]">{cfg.label}</Badge>
          </div>
          <p className="text-xs text-muted-foreground">{milestone.description}</p>
        </div>
        <div className="text-right">
          <div className="text-sm font-semibold">{milestone.amount} {milestone.token}</div>
          <Countdown deadline={milestone.deadline} />
        </div>
      </div>
    </div>
  );
}

export function MilestoneList({ milestones, filter }: { milestones: Milestone[]; filter?: string }) {
  const filtered = filter ? milestones.filter((m) => m.status === filter) : milestones;

  return (
    <div className="space-y-2">
      {filtered.length === 0 ? (
        <p className="text-sm text-muted-foreground py-4 text-center">No milestones found</p>
      ) : (
        filtered.map((ms) => <MilestoneCard key={ms.id} milestone={ms} />)
      )}
    </div>
  );
}

export function MilestoneSummary({ milestones }: { milestones: Milestone[] }) {
  const total = milestones.length;
  const completed = milestones.filter((m) => m.status === "approved").length;
  const disputed = milestones.filter((m) => m.status === "disputed").length;
  const totalAmount = milestones.reduce((s, m) => s + parseFloat(m.amount), 0);
  const releasedAmount = milestones.filter((m) => m.status === "approved").reduce((s, m) => s + parseFloat(m.amount), 0);

  return (
    <div className="grid grid-cols-4 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xs font-medium text-muted-foreground">Active Milestones</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xl font-bold">{total - completed - disputed}</div>
          <p className="text-xs text-muted-foreground">across {new Set(milestones.map((m) => m.escrowId)).size} escrows</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xs font-medium text-muted-foreground">Completed</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xl font-bold">{completed}</div>
          <div className="mt-2">
            <Progress value={(completed / total) * 100} className="h-1.5" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xs font-medium text-muted-foreground">Total Value</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xl font-bold">{totalAmount.toFixed(0)} USDC</div>
          <p className="text-xs text-green-500">{releasedAmount.toFixed(0)} released</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <CardTitle className="text-xs font-medium text-muted-foreground">Disputes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <AlertTriangle className={`h-4 w-4 ${disputed > 0 ? "text-destructive" : "text-muted-foreground"}`} />
            <span className="text-xl font-bold">{disputed}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
