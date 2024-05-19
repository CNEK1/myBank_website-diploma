import Button from "../../components/Button/Button";
import Heading from "../../components/Heading/Heading";
import Input from "../../components/Input/Input";
import styles from "./Transfer.module.css";
import { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import {
  transactionMake,
  transactionCheck,
  userActions,
} from "../../store/user.slice";
import { useNavigate } from "react-router-dom";
import TransactionForm from "../../components/TransactionForm/TransactionForm";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

export type TransactionForm = {
  receiverId: {
    value: string;
  };
  amount: {
    value: string;
  };
};

function Transaction() {
  const dispatch = useDispatch<AppDispatch>();
  const userProfile = useSelector((s: RootState) => s.user.profile);
  const { transactionsMake, transactionsMakeError } = useSelector(
    (s: RootState) => s.user
  );

  const navigate = useNavigate();

  const [receiverId, setReceiverId] = useState("");
  const [amount, setAmount] = useState("");
  const [prediction, setPrediction] = useState<null | number>(null);

  useEffect(() => {
    if (transactionsMake === "transaction Succeseful") {
      localStorage.removeItem("transactions");
      window.location.reload();
    }
  }, [transactionsMake, navigate]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(userActions.clearTransactionError());
    await sendTransaction(
      userProfile?.id as number,
      parseInt(receiverId) as number, // Use state value
      parseFloat(amount) as number
    );
  };
  const submitCheckTransaction = async (e: FormEvent) => {
    e.preventDefault();
    if ((parseFloat(amount) as number) > userProfile!.balance) {
      throw new Error("Insufficient balance");
    }
    const data = await checkTransaction(
      4,
      parseFloat(amount) as number,
      userProfile?.balance as number,
      ((userProfile?.balance as number) -
        parseFloat(amount)) as number as number
    );
    Object.values(data.payload).map((value) => setPrediction(value as number));
  };

  const sendTransaction = async (
    senderId: number,
    receiverId: number,
    amount: number
  ) => {
    dispatch(transactionMake({ senderId, receiverId, amount }));
  };
  const checkTransaction = async (
    type: number,
    amount: number,
    oldbalanceOrg: number,
    newbalanceOrig: number
  ) => {
    const data = dispatch(
      transactionCheck({
        type,
        amount,
        oldbalanceOrg,
        newbalanceOrig,
      })
    );
    return data;
  };

  return (
    <div className={styles["transaction"]}>
      <Heading>Make a Transaction</Heading>
      {transactionsMakeError && (
        <div className={styles["error"]}>{transactionsMakeError}</div>
      )}
      <form className={styles["form"]} onSubmit={submit}>
        <div className={styles["field"]}>
          <label htmlFor="receiverId">Receiver ID</label>
          <Input
            id="receiverId"
            name="receiverId"
            placeholder="Receiver ID"
            value={receiverId} // Set the input value to state
            onChange={(e) => setReceiverId(e.target.value)} // Update state on change
          />
        </div>
        <div className={styles["field"]}>
          <label htmlFor="amount">Amount</label>
          <Input
            id="amount"
            name="amount"
            type="number"
            placeholder="Transaction amount"
            value={amount} // Set the input value to state
            onChange={(e) => setAmount(e.target.value)} // Update state on change
          />
        </div>
        <AlertDialog>
          <Button
            onClick={submitCheckTransaction}
            type="submit"
            appereance="big"
          >
            <AlertDialogTrigger>Check Transaction with AI</AlertDialogTrigger>
          </Button>
          <AlertDialogContent>
            <AlertDialogHeader>
              {prediction == 1 ? (
                <>
                  <AlertDialogTitle>
                    Warning: Potential Fraud Detected!
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Please be careful, our system has detected a potentially
                    fraudulent transaction.
                  </AlertDialogDescription>
                </>
              ) : (
                <>
                  <AlertDialogTitle>Transaction Verified</AlertDialogTitle>
                  <AlertDialogDescription>
                    Everything looks fine with your transaction.
                  </AlertDialogDescription>
                </>
              )}
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={submit}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </form>
    </div>
  );
}

export default Transaction;
