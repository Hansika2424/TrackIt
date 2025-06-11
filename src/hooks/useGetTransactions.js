import {useState, useEffect} from 'react'
import { onSnapshot, orderBy, query, collection, where } from 'firebase/firestore';
import { db } from "../config/firebase-config";
// useAddTransaction.js and useGetTransactions.js
import { useGetUserInfo } from "./useGetUserInfo";




export const useGetTransactions = () => {
    const [transactions, setTransactions] = useState([]);
    const transactionCollectionRef = collection(db, "transactions"); 
    const {userID} = useGetUserInfo();

    const getTransactions = async () => {
        let unsubscribe
        try {
            const queryTransactions = query(
                transactionCollectionRef, 
                where("userID", "==", userID ),
                orderBy("createdAt")
            );

            unsubscribe = onSnapshot(queryTransactions, (snapshot) => {
                let docs = []
                snapshot.forEach((doc) =>{
                    const data = doc.data();
                    const id = doc.id
                    docs.push({...data, id});
                });

                setTransactions(docs);

                return () => unsubscribe();
            });
        } catch (err){
            console.log(err);
        }
    }

    useEffect(() => {
        getTransactions()
    }, [])

    return { transactions };
}