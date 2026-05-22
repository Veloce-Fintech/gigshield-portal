export interface Milestone {
  id: string;
  escrowId: string;
  projectName: string;
  clientName: string;
  description: string;
  amount: string;
  token: string;
  deadline: string;
  status: "active" | "completed" | "approved" | "disputed";
  completedAt?: string;
}

export interface EscrowSummary {
  id: string;
  projectName: string;
  client: string;
  freelancer: string;
  totalAmount: string;
  releasedAmount: string;
  token: string;
  status: "active" | "disputed" | "completed";
  createdAt: string;
  milestones: number;
  completedMilestones: number;
}

export interface AnchorWithdrawOption {
  anchor: string;
  name: string;
  regions: string[];
  fee: string;
  estimatedTime: string;
}

export interface InvoiceItem {
  id: string;
  freelancerAddress: string;
  freelancerName: string;
  milestoneDescription: string;
  amount: string;
  token: string;
  deadline: string;
}

export const freelancerMilestones: Milestone[] = [
  { id: "ms-1", escrowId: "esc-001", projectName: "DeFi Dashboard UI", clientName: "Alpha Corp", description: "Design and implement the main dashboard layout with real-time charts", amount: "500", token: "USDC", deadline: new Date(Date.now() + 172800000).toISOString(), status: "active" },
  { id: "ms-2", escrowId: "esc-001", projectName: "DeFi Dashboard UI", clientName: "Alpha Corp", description: "Integrate wallet connection and transaction history", amount: "750", token: "USDC", deadline: new Date(Date.now() + 345600000).toISOString(), status: "active" },
  { id: "ms-3", escrowId: "esc-002", projectName: "Smart Contract Audit", clientName: "Beta Labs", description: "Audit escrow vault contract — milestone 1 of 3", amount: "1200", token: "USDC", deadline: new Date(Date.now() + 604800000).toISOString(), status: "completed" },
  { id: "ms-4", escrowId: "esc-002", projectName: "Smart Contract Audit", clientName: "Beta Labs", description: "Write audit report with findings", amount: "800", token: "USDC", deadline: new Date(Date.now() + 864000000).toISOString(), status: "active" },
  { id: "ms-5", escrowId: "esc-003", projectName: "Mobile App Backend", clientName: "Gamma Inc", description: "Set up Node.js API server with authentication", amount: "2000", token: "PYUSD", deadline: new Date(Date.now() - 86400000).toISOString(), status: "disputed" },
];

export const escrows: EscrowSummary[] = [
  { id: "esc-001", projectName: "DeFi Dashboard UI", client: "GB1234...ABCD", freelancer: "GABCD...WXYZ", totalAmount: "2500", releasedAmount: "500", token: "USDC", status: "active", createdAt: new Date(Date.now() - 604800000).toISOString(), milestones: 4, completedMilestones: 1 },
  { id: "esc-002", projectName: "Smart Contract Audit", client: "GB5678...EFGH", freelancer: "GABCD...WXYZ", totalAmount: "3000", releasedAmount: "1200", token: "USDC", status: "active", createdAt: new Date(Date.now() - 1209600000).toISOString(), milestones: 3, completedMilestones: 1 },
  { id: "esc-003", projectName: "Mobile App Backend", client: "GB9012...IJKL", freelancer: "GABCD...WXYZ", totalAmount: "5000", releasedAmount: "0", token: "PYUSD", status: "disputed", createdAt: new Date(Date.now() - 1814400000).toISOString(), milestones: 3, completedMilestones: 0 },
];

export const withdrawOptions: AnchorWithdrawOption[] = [
  { anchor: "yellowcard", name: "Yellow Card", regions: ["NG", "GH", "KE", "ZA", "UG"], fee: "1.0%", estimatedTime: "5-30 min" },
  { anchor: "anclap", name: "Anclap", regions: ["AR", "BR", "CL", "CO", "MX"], fee: "1.5%", estimatedTime: "10-60 min" },
];
