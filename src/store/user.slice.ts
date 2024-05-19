import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loadState } from "./storage";
import axios, { AxiosError } from "axios";
import { PREFIXFORAUTH } from "../helpers/API";
import {
  LoginResponse,
  RegisterReponse,
} from "../interfaces/authLogin.intefrace";
import { Profile } from "../interfaces/user.interface";
import { RootState } from "./store";
//import { TransactionCheckResponse } from "../interfaces/transactionCheck.interface";

export const JWT_PERSISTENT_STATE = "userData";
export const MSG_PERSISTENT_STATE = "fsdfsfs";
export const TRANSACTION_MSG_PERSISTENT_STATE = "transactions";
export const TRANSACTION_CHECK_MSG_PERSISTENT_STATE = "transactionsCheck";
export const TRANSACTIONS_RECEIVE_BY_USER = "transactionsReceiveByUser";
export const TRANSACTIONS_SEND_BY_USER = "transactionsSendByUser";

export interface UserState {
  jwt: string | null;
  msg: string | null;
  transactionsCheck: string | null;
  transactionsCheckError?: string;
  transactionsMake: string | null;
  transactionsMakeError?: string;
  transactionReceive: string | null;
  transactionReceiveError?: string;
  transactionSend: string | null;
  transactionSendError?: string;
  loginErrorMassage?: string;
  profile?: Profile;
  registerErrorMassage?: string;
}

export interface UserPersistentState {
  jwt: string | null;
  msg: string | null;
  transactionsMake: string | null;
  transactionsCheck: string | null;
  transactionSend: string | null;
  transactionReceive: string | null;
}

const initialState: UserState = {
  jwt: loadState<UserPersistentState>(JWT_PERSISTENT_STATE)?.jwt ?? null,
  msg: loadState<UserPersistentState>(MSG_PERSISTENT_STATE)?.msg ?? null,
  transactionsCheck:
    loadState<UserPersistentState>(TRANSACTION_CHECK_MSG_PERSISTENT_STATE)
      ?.transactionsCheck ?? null,
  transactionsCheckError: undefined,
  transactionsMake:
    loadState<UserPersistentState>(TRANSACTION_MSG_PERSISTENT_STATE)
      ?.transactionsMake ?? null,
  transactionsMakeError: undefined,

  transactionSend:
    loadState<UserPersistentState>(TRANSACTIONS_SEND_BY_USER)
      ?.transactionSend ?? null,
  transactionSendError: undefined,

  transactionReceive:
    loadState<UserPersistentState>(TRANSACTIONS_RECEIVE_BY_USER)
      ?.transactionReceive ?? null,
  transactionReceiveError: undefined,

  loginErrorMassage: undefined,
  registerErrorMassage: undefined,
};

export const login = createAsyncThunk(
  "user/login",
  async (params: { email: string; password: string }) => {
    try {
      const { data } = await axios.post<LoginResponse>(
        `${PREFIXFORAUTH}/login`,
        {
          email: params.email,
          password: params.password,
        }
      );
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error("Incorrect login data");
      }
    }
  }
);

export const transactionCheck = createAsyncThunk(
  "user/transactionsCheck",
  async (params: {
    type: number;
    amount: number;
    oldbalanceOrg: number;
    newbalanceOrig: number;
  }) => {
    try {
      const { data } = await axios.post(`http://127.0.0.1:8000/fraud/`, [
        {
          type: params.type,
          amount: params.amount,
          oldbalanceOrg: params.oldbalanceOrg,
          newbalanceOrig: params.newbalanceOrig,
        },
      ]);
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error("Incorrect Transaction Check Data");
      }
    }
  }
);

export const transactionsSend = createAsyncThunk(
  "user/transactionsSend",
  async (params: { userId: number }) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8002/transactions/getTransactionsByUserSend/${params.userId}`
      );
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error("Incorrect Transaction Check Data");
      }
    }
  }
);

export const transactionsReceive = createAsyncThunk(
  "user/transactionsSend",
  async (params: { receiverId: number }) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8002/transactions/getTransactionsByUserReceive/${params.receiverId}`
      );
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error("Incorrect Transaction Check Data");
      }
    }
  }
);

export const transactionMake = createAsyncThunk(
  "user/transactionsMake",
  async (params: { senderId: number; receiverId: number; amount: number }) => {
    try {
      const { data } = await axios.post(
        `${PREFIXFORAUTH}/transactions/createTransaction`,
        {
          senderId: params.senderId,
          receiverId: params.receiverId,
          amount: params.amount,
        }
      );
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(Object.values(error.response?.data).toString());
      }
    }
  }
);

export const register = createAsyncThunk(
  "user/register",
  async (params: {
    email: string;
    password: string;
    firstName: string;
    secondName: string;
    number: string;
  }) => {
    try {
      const { data } = await axios.post<RegisterReponse>(
        `${PREFIXFORAUTH}/registerByUser`,
        {
          email: params.email,
          password: params.password,
          firstName: params.firstName,
          secondName: params.secondName,
          number: params.number,
          roles: "User",
        }
      );
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(
          Object.values(error.response?.data[0].constraints).toString()
        );
      }
    }
  }
);

export const profile = createAsyncThunk<Profile, void, { state: RootState }>(
  "user/profile",
  async (_, thunkApi) => {
    const jwt = thunkApi.getState().user.jwt;
    const { data } = await axios.get<Profile>(
      `${PREFIXFORAUTH}/jwtFullUserInfo`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    return data;
  }
);
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.jwt = null;
    },
    clearLoginError: (state) => {
      state.loginErrorMassage = undefined;
    },
    clearRegisterError: (state) => {
      state.registerErrorMassage = undefined;
    },
    clearTransactionError: (state) => {
      state.transactionsMakeError = undefined;
    },
    clearTransactionSendError: (state) => {
      state.transactionSendError = undefined;
    },
    clearTransactionReceiveError: (state) => {
      state.transactionReceiveError = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      if (!action.payload) {
        return;
      }
      state.jwt = action.payload.accessToken;
      state.msg = action.payload.msg;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loginErrorMassage = action.error.message;
    });
    builder.addCase(profile.fulfilled, (state, action) => {
      state.profile = action.payload;
    });
    builder.addCase(transactionCheck.rejected, (state, action) => {
      state.transactionsCheckError = action.error.message;
    });
    builder.addCase(transactionCheck.fulfilled, (state, action) => {
      state.transactionsCheck = action.payload;
    });
    builder.addCase(transactionMake.rejected, (state, action) => {
      state.transactionsMakeError = action.error.message;
    });
    builder.addCase(transactionMake.fulfilled, (state, action) => {
      state.transactionsMake = action.payload.msg;
    });

    builder.addCase(transactionsReceive.rejected, (state, action) => {
      state.transactionReceiveError = action.error.message;
    });
    builder.addCase(transactionsReceive.fulfilled, (state, action) => {
      state.transactionReceive = action.payload.msg;
    });

    // builder.addCase(transactionsSend.rejected, (state, action) => {
    //   state.transactionSendError = action.error.message;
    // });
    // builder.addCase(transactionsSend.fulfilled, (state, action) => {
    //   state.transactionSend = action.payload.msg;
    // });

    builder.addCase(register.rejected, (state, action) => {
      state.registerErrorMassage = action.error.message;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      if (!action.payload) {
        return;
      }
      state.jwt = action.payload.accessToken;
      state.msg = action.payload.msg;
    });
  },
});

export default userSlice.reducer;
export const userActions = userSlice.actions;
