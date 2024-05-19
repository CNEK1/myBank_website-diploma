import { configureStore } from "@reduxjs/toolkit";
import userSlice, {
  JWT_PERSISTENT_STATE,
  MSG_PERSISTENT_STATE,
  TRANSACTIONS_RECEIVE_BY_USER,
  TRANSACTIONS_SEND_BY_USER,
  TRANSACTION_CHECK_MSG_PERSISTENT_STATE,
  TRANSACTION_MSG_PERSISTENT_STATE,
} from "./user.slice";
import { saveState } from "./storage";

export const store = configureStore({
  reducer: {
    user: userSlice,
  },
});

store.subscribe(() => {
  saveState({ jwt: store.getState().user.jwt }, JWT_PERSISTENT_STATE);
  saveState({ msg: store.getState().user.msg }, MSG_PERSISTENT_STATE);
  saveState(
    { transactionsCheck: store.getState().user.transactionsCheck },
    TRANSACTION_CHECK_MSG_PERSISTENT_STATE
  );
  saveState(
    { transactionsMake: store.getState().user.transactionsMake },
    TRANSACTION_MSG_PERSISTENT_STATE
  );
  saveState(
    { transactionReceive: store.getState().user.transactionReceive },
    TRANSACTIONS_RECEIVE_BY_USER
  );
  saveState(
    { transactionSend: store.getState().user.transactionSend },
    TRANSACTIONS_SEND_BY_USER
  );
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
