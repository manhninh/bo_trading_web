export interface TransationHistory {
  user_id: string;
  to_user_id: string;
  amount: number;
  fee: number;
  symbol: string;
  address: string;
  tx: string;
  status: number;
  type: number;
  noted: string;
  createdAt: string;
  updatedAt: string;
}