"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { withdrawOptions } from "@/lib/mock-data";
import { Banknote, Landmark, Loader2, ExternalLink } from "lucide-react";
import { AnchorWithdrawOption } from "@/lib/mock-data";

export function WithdrawDialog() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<"select" | "confirm" | "processing" | "done">("select");
  const [selectedAnchor, setSelectedAnchor] = useState<AnchorWithdrawOption | null>(null);
  const [amount, setAmount] = useState("");
  const [token, setToken] = useState("USDC");

  function handleContinue() {
    if (!selectedAnchor || !amount) return;
    setStep("confirm");
  }

  function handleConfirm() {
    setStep("processing");
    setTimeout(() => setStep("done"), 2500);
  }

  function handleReset() {
    setStep("select");
    setSelectedAnchor(null);
    setAmount("");
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) handleReset(); setOpen(v); }}>
      <DialogTrigger render={<Button className="w-full gap-2" />}>
        <Banknote className="h-4 w-4" />
        Withdraw to Local Bank
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        {step === "select" && (
          <>
            <DialogHeader>
              <DialogTitle>Withdraw Funds</DialogTitle>
              <DialogDescription>Select an anchor provider and amount to cash out.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Token</label>
                <Select value={token} onValueChange={(v) => { if (v) setToken(v); }}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USDC">USDC</SelectItem>
                    <SelectItem value="PYUSD">PYUSD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Amount</label>
                <Input type="number" placeholder="0.00" value={amount} onChange={(e) => setAmount(e.target.value)} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Anchor Provider</label>
                <div className="space-y-2">
                  {withdrawOptions.map((a) => (
                    <div
                      key={a.anchor}
                      className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${selectedAnchor?.anchor === a.anchor ? "border-primary bg-primary/5" : "hover:bg-muted/50"}`}
                      onClick={() => setSelectedAnchor(a)}
                    >
                      <div>
                        <div className="text-sm font-medium">{a.name}</div>
                        <div className="text-xs text-muted-foreground">{a.regions.join(", ")}</div>
                      </div>
                      <div className="text-right text-xs text-muted-foreground">
                        <div>Fee: {a.fee}</div>
                        <div>{a.estimatedTime}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={handleContinue} disabled={!selectedAnchor || !amount}>Continue</Button>
            </DialogFooter>
          </>
        )}
        {step === "confirm" && selectedAnchor && (
          <>
            <DialogHeader>
              <DialogTitle>Confirm Withdrawal</DialogTitle>
              <DialogDescription>Review the details before submitting.</DialogDescription>
            </DialogHeader>
            <div className="space-y-3 py-2">
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Amount</span><span className="font-medium">{amount} {token}</span></div>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Anchor</span><span className="font-medium">{selectedAnchor.name}</span></div>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Fee</span><span className="font-medium">{selectedAnchor.fee}</span></div>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">You receive</span><span className="font-medium">≈ {(parseFloat(amount) * (selectedAnchor.anchor === "yellowcard" ? 0.99 : 0.985)).toFixed(2)} {token}</span></div>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Est. time</span><span className="font-medium">{selectedAnchor.estimatedTime}</span></div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setStep("select")}>Back</Button>
              <Button onClick={handleConfirm}>Confirm & Submit</Button>
            </DialogFooter>
          </>
        )}
        {step === "processing" && (
          <div className="flex flex-col items-center py-8 gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm font-medium">Processing withdrawal...</p>
            <p className="text-xs text-muted-foreground">Submitting SEP-24 request to {selectedAnchor?.name}</p>
          </div>
        )}
        {step === "done" && (
          <div className="flex flex-col items-center py-8 gap-3">
            <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
              <Landmark className="h-5 w-5 text-green-600" />
            </div>
            <p className="text-sm font-medium">Withdrawal submitted!</p>
            <p className="text-xs text-muted-foreground text-center">Funds will arrive in your local account within {selectedAnchor?.estimatedTime}.</p>
            <DialogFooter className="w-full pt-2">
              <Button className="w-full" onClick={handleReset}>Done</Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
