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
  from_username: string;
  to_username: string;
  from_wallet: string;
  to_wallet: string;
  createdAt: string;
  updatedAt: string;
}