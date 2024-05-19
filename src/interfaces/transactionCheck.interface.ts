export interface TransactionCheck {
  type: number;
  amount: string;
  oldbalanceOrg: number;
  newbalanceOrig: number;
  oldbalanceDest: number;
  newbalanceDest: number;
}
export interface TransactionCheckResponse {
  prediction: string;
}
