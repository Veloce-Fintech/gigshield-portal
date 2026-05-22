"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { checkConnection, connectWallet, truncateKey } from "@/lib/stellar";
import { Wallet } from "lucide-react";

export function WalletConnect() {
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkConnection().then((state) => {
      if (state.connected) setPublicKey(state.publicKey);
    });
  }, []);

  async function handleConnect() {
    setLoading(true);
    try {
      const state = await connectWallet();
      setPublicKey(state.publicKey);
    } finally {
      setLoading(false);
    }
  }

  if (publicKey) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Wallet className="h-4 w-4 text-green-500" />
        <span>{truncateKey(publicKey)}</span>
      </div>
    );
  }

  return (
    <Button variant="outline" size="sm" onClick={handleConnect} disabled={loading}>
      <Wallet className="mr-2 h-4 w-4" />
      {loading ? "Connecting..." : "Connect Freighter"}
    </Button>
  );
}
