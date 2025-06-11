import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase-config";
// useAddTransaction.js and useGetTransactions.js
import { useGetUserInfo } from "./useGetUserInfo";

export const useAddTransaction = () => {
  const { userID } = useGetUserInfo(); // ✅ get the real userID
  const transactionCollectionRef = collection(db, "transactions");

  const addTransaction = async ({
    description,
    transactionAmount,
    transactionType,
  }) => {
    await addDoc(transactionCollectionRef, {
      userID, // ✅ use the actual ID from localStorage
      description,
      transactionAmount,
      transactionType,
      createdAt: serverTimestamp(),
    });
  };

  return { addTransaction };
};
