"use client";

import { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { WalletConnect } from "@/components/wallet-connect";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Trash2, Plus, Send, Loader2, Wallet, ExternalLink, CheckCircle2 } from "lucide-react";

interface InvoiceRow {
  id: string;
  freelancerAddress: string;
  freelancerName: string;
  description: string;
  amount: string;
  token: string;
  deadline: string;
}

function emptyRow(): InvoiceRow {
  return {
    id: crypto.randomUUID(),
    freelancerAddress: "",
    freelancerName: "",
    description: "",
    amount: "",
    token: "USDC",
    deadline: "",
  };
}

export default function EnterprisePage() {
  const [rows, setRows] = useState<InvoiceRow[]>([emptyRow()]);
  const [funding, setFunding] = useState<"idle" | "signing" | "submitting" | "done">("idle");
  const [txHash, setTxHash] = useState("");

  function addRow() {
    setRows((prev) => [...prev, emptyRow()]);
  }

  function removeRow(id: string) {
    setRows((prev) => prev.filter((r) => r.id !== id));
  }

  function updateRow(id: string, field: keyof InvoiceRow, value: string) {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, [field]: value } : r)));
  }

  const total = rows.reduce((s, r) => s + (parseFloat(r.amount) || 0), 0);
  const validRows = rows.filter((r) => r.freelancerAddress && r.description && r.amount && r.deadline);
  const canSubmit = validRows.length > 0 && funding === "idle";

  async function handleFundAll() {
    setFunding("signing");
    setTimeout(() => {
      setFunding("submitting");
      setTimeout(() => {
        setTxHash("a1b2c3d4e5f6...7890");
        setFunding("done");
      }, 2000);
    }, 1500);
  }

  function handleReset() {
    setRows([emptyRow()]);
    setFunding("idle");
    setTxHash("");
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-14 border-b flex items-center justify-between px-6 shrink-0">
          <h1 className="text-sm font-semibold">Enterprise — Invoice Builder</h1>
          <WalletConnect />
        </header>
        <main className="flex-1 overflow-auto p-6 space-y-6">
          <div className="grid grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-medium text-muted-foreground">Contractors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold">{rows.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-medium text-muted-foreground">Milestones</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold">{rows.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-medium text-muted-foreground">Total Amount</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold">{total.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground">USDC</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-medium text-muted-foreground">Network</CardTitle>
              </CardHeader>
              <CardContent>
                <Badge variant="secondary">Stellar Testnet</Badge>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium">Invoice Items</CardTitle>
              <Button variant="outline" size="sm" onClick={addRow} disabled={funding !== "idle"}>
                <Plus className="h-4 w-4 mr-1" /> Add Contractor
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50 border-y">
                    <tr className="text-muted-foreground text-xs">
                      <th className="text-left px-4 py-3 font-medium w-[180px]">Freelancer Address</th>
                      <th className="text-left px-4 py-3 font-medium w-[140px]">Name</th>
                      <th className="text-left px-4 py-3 font-medium">Description</th>
                      <th className="text-right px-4 py-3 font-medium w-[100px]">Amount</th>
                      <th className="text-left px-4 py-3 font-medium w-[80px]">Token</th>
                      <th className="text-left px-4 py-3 font-medium w-[120px]">Deadline</th>
                      <th className="w-[40px]"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, i) => (
                      <tr key={row.id} className="border-b border-border/50">
                        <td className="px-4 py-2">
                          <Input
                            placeholder="G..."
                            className="h-8 text-xs font-mono"
                            value={row.freelancerAddress}
                            onChange={(e) => updateRow(row.id, "freelancerAddress", e.target.value)}
                          />
                        </td>
                        <td className="px-4 py-2">
                          <Input
                            placeholder="Name"
                            className="h-8 text-xs"
                            value={row.freelancerName}
                            onChange={(e) => updateRow(row.id, "freelancerName", e.target.value)}
                          />
                        </td>
                        <td className="px-4 py-2">
                          <Input
                            placeholder="Milestone description"
                            className="h-8 text-xs"
                            value={row.description}
                            onChange={(e) => updateRow(row.id, "description", e.target.value)}
                          />
                        </td>
                        <td className="px-4 py-2">
                          <Input
                            type="number"
                            placeholder="0.00"
                            className="h-8 text-xs text-right"
                            value={row.amount}
                            onChange={(e) => updateRow(row.id, "amount", e.target.value)}
                          />
                        </td>
                        <td className="px-4 py-2">
                          <select
                            className="h-8 text-xs bg-transparent border rounded px-2"
                            value={row.token}
                            onChange={(e) => updateRow(row.id, "token", e.target.value)}
                          >
                            <option>USDC</option>
                            <option>PYUSD</option>
                          </select>
                        </td>
                        <td className="px-4 py-2">
                          <Input
                            type="date"
                            className="h-8 text-xs"
                            value={row.deadline}
                            onChange={(e) => updateRow(row.id, "deadline", e.target.value)}
                          />
                        </td>
                        <td className="px-4 py-2">
                          {rows.length > 1 && (
                            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => removeRow(row.id)}>
                              <Trash2 className="h-3.5 w-3.5 text-muted-foreground" />
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Total:</span>
              <span className="text-lg font-bold">{total.toFixed(2)} USDC</span>
              <span className="text-xs text-muted-foreground">across {validRows.length} valid milestone{validRows.length !== 1 ? "s" : ""}</span>
            </div>
            <div className="flex gap-2">
              {funding === "done" ? (
                <Button onClick={handleReset} variant="outline">New Invoice</Button>
              ) : funding === "signing" || funding === "submitting" ? (
                <Button disabled>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  {funding === "signing" ? "Sign in Freighter..." : "Submitting..."}
                </Button>
              ) : (
                <Button onClick={handleFundAll} disabled={!canSubmit}>
                  <Wallet className="h-4 w-4 mr-2" />
                  Fund All via Freighter
                </Button>
              )}
            </div>
          </div>

          {funding === "done" && txHash && (
            <Card className="border-green-500/30 bg-green-50 dark:bg-green-950/20">
              <CardContent className="flex items-center gap-3 py-4">
                <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0" />
                <div className="text-sm">
                  <span className="font-medium">Funding submitted!</span>
                  <span className="text-muted-foreground ml-2">
                    Transaction: <code className="text-xs font-mono bg-muted px-1 py-0.5 rounded">{txHash}</code>
                  </span>
                </div>
                <a
                  href={`https://stellar.expert/explorer/testnet/tx/${txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 rounded-md border border-input bg-background px-3 py-1.5 text-xs font-medium hover:bg-accent hover:text-accent-foreground ml-auto"
                >
                  View <ExternalLink className="h-3 w-3" />
                </a>
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </div>
  );
}
