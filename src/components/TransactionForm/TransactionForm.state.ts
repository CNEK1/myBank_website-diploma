import { FormAction, FormState } from "./TransactionForm.state.interface";

export const INITIAL_STATE: FormState = {
  isValid: {
    ReceiverID: true,
    TransactionAmount: true,
  },
  values: {
    id: 0,
    ReceiverID: 0,
    TransactionAmount: 0,
  },
  isFormReadyToSubmit: false,
};

export function formReducer(state: FormState, action: FormAction): FormState {
  const { type, payload } = action;
  switch (type) {
    case "SET_VALUES":
      return { ...state, values: { ...state.values, ...payload } };
    case "CLEAR":
      return {
        ...state,
        values: INITIAL_STATE.values,
        isFormReadyToSubmit: false,
      };
    case "RESET_VALIDITY":
      return { ...state, isValid: INITIAL_STATE.isValid };
    case "SUBMIT": {
      const ReceiverIDValidity = Boolean(state.values.ReceiverID);
      const TransactionAmountValidity = Boolean(state.values.TransactionAmount);

      return {
        ...state,
        isValid: {
          ReceiverID: ReceiverIDValidity,
          TransactionAmount: TransactionAmountValidity,
        },
        isFormReadyToSubmit: ReceiverIDValidity && TransactionAmountValidity,
      };
    }
    default:
      return state;
  }
}
