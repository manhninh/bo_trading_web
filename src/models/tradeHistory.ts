export type TradeHistory = {
  order_uuid?: string;
  user_id: string;
  buy_amount_order: number;
  sell_amount_order: number;
  open_result: number;
  close_result: number;
  amount_result: number;
  type?: number;
  expert_id?: string;
  createdAt: string;
  updatedAt: string;
}