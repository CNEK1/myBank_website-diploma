export interface FormState {
  isValid: {
    ReceiverID: boolean;
    TransactionAmount: boolean;
  };
  values: {
    id: number;
    ReceiverID: number;
    TransactionAmount: number;
  };
  isFormReadyToSubmit: boolean;
}
export enum FormActionKind {
  SET_VALUES = "SET_VALUES",
  CLEAR = "CLEAR",
  RESET_VALIDITY = "RESET_VALIDITY",
  SUBMIT = "SUBMIT",
}
export interface FormAction {
  type: FormActionKind;
  payload?: {
    id: number;
    ReceiverID: number;
    TransactionAmount: number;
  };
}
