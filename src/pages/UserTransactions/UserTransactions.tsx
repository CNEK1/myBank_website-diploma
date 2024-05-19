import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { transactionsReceive, transactionsSend } from "../../store/user.slice";
import { Transaction, columns } from "./tableDef";
import { DataTable } from "./DataTable";
import Heading from "@/components/Heading/Heading";

export function UserTransactions() {
  const dispatch = useDispatch<AppDispatch>();
  const userProfile = useSelector((state: RootState) => state.user.profile);

  const [receivedTransactions, setReceivedTransactions] = useState<
    Transaction[]
  >([]);
  const [sendTransaction, setSendTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();

  const receiveByUser = async (receiverId: number) => {
    try {
      const response = await dispatch(transactionsReceive({ receiverId }));
      return response.payload;
    } catch (err) {
      console.error("Error in receiveByUser:", err);
      setError("Failed to receive transactions");
    }
  };

  const sendByUser = async (userId: number) => {
    try {
      const response = await dispatch(transactionsSend({ userId }));
      return response.payload;
    } catch (err) {
      console.error("Error in receiveByUser:", err);
      setError("Failed to receive transactions");
    }
  };

  const getReceived = async () => {
    if (!userProfile) return;

    setIsLoading(true);
    try {
      const data = await receiveByUser(userProfile.id);
      setReceivedTransactions(data || []);
    } catch (err) {
      console.error("Error in getReceived:", err);
      setError("Failed to load received transactions");
    } finally {
      setIsLoading(false);
    }
  };

  const getSend = async () => {
    if (!userProfile) return;

    setIsLoading(true);
    try {
      const data = await sendByUser(userProfile.id);
      setSendTransactions(data || []);
    } catch (err) {
      console.error("Error in getReceived:", err);
      setError("Failed to load received transactions");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userProfile) {
      getReceived();
      getSend();
    }
  }, [userProfile]);
  return (
    <div className="container mx-auto py-10">
      {error && <p>{error}</p>}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Heading>Received</Heading>
          <DataTable columns={columns} data={receivedTransactions} />
          <Heading>Send</Heading>
          <DataTable columns={columns} data={sendTransaction} />
        </>
      )}
    </div>
  );
}
export default UserTransactions;
