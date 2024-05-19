export interface TransactionMake {
  senderId: number;
  receiverId: number;
  amount: number;
}
export interface TransactionMakeResponse {
  msg: string;
}
