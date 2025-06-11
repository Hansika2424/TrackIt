import { useState } from "react";
import { useAddTransaction } from "../../hooks/useAddTransaction";  
import { useGetTransactions } from "../../hooks/useGetTransactions";
import "./styles.css";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { useDeleteTransaction } from "../../hooks/useDeleteTransaction";



export const ExpenseTracker = () => {
    const { addTransaction } = useAddTransaction();
    const { transactions } = useGetTransactions();
    const {name} = useGetUserInfo()
    const auth = getAuth();             // ✅ Fix here
    const navigate = useNavigate();  
    const { deleteTransaction } = useDeleteTransaction();


    const income = transactions
    .filter((t) => t.transactionType === "income")
    .reduce((acc, t) => acc + Number(t.transactionAmount), 0);

    const expenses = transactions
    .filter((t) => t.transactionType === "expense")
    .reduce((acc, t) => acc + Number(t.transactionAmount), 0);

    const balance = income - expenses;


    const [ description, setDescription] = useState("");
    const [transactionAmount, setTransactionAmount] = useState(0);
    const [transactionType, setTransactionType] = useState("expense");

    const onSubmit = async (e) => {

        e.preventDefault()
        addTransaction({
            description,
            transactionAmount,
            transactionType

        });

    };

    const signUserOut = async () => {
        try {
            await signOut(auth);
            localStorage.clear(); //because now we dont have the user signed in
            navigate("/") //navigate to previous page 
        } catch(err){
            console.error(err);
        }
    }
    return (
        <>
            <div className="expense-tracker">
                

                <div className="container">
                    <div>
                        <button className="sign-out-button" onClick={signUserOut}>
                            Sign Out
                        </button>
                    </div>
                    <h1 className="title"> {name}'s Expense Tracker</h1>

                <div className="balance-card">
                <h3>Your Available Balance</h3>
                <h2>Rs. {balance.toFixed(2)}</h2>
                </div>

                <div className="summary-cards">
                <div className="summary-card income-card">
                    <h4>Income</h4>
                    <h3>Rs. {income.toFixed(2)}</h3>
                </div>

                <div className="summary-card expense-card">
                    <h4>Expenses</h4>
                    <h3>Rs. {expenses.toFixed(2)}</h3>
                </div>
                </div>

                <form className="add-transaction-form" onSubmit={onSubmit}>
                <input
                    type="text"
                    placeholder="Description"
                    required
                    onChange={(e) => setDescription(e.target.value)}
                />

                <input
                    type="number"
                    placeholder="Amount"
                    required
                    onChange={(e) => setTransactionAmount(e.target.value)}
                />

                <div className="radio-group">
                    <input
                    type="radio"
                    id="expense"
                    value="expense"
                    checked={transactionType === "expense"}
                    onChange={(e) => setTransactionType(e.target.value)}
                    />
                    <label htmlFor="expense">Expense</label>

                    <input
                    type="radio"
                    id="income"
                    value="income"
                    checked={transactionType === "income"}
                    onChange={(e) => setTransactionType(e.target.value)}
                    />
                    <label htmlFor="income">Income</label>
                </div>

                <button type="submit">Add Transaction</button>
                </form>




                </div>
            </div>

            <div className="transactions">
                <h3>Transactions</h3>
                <ol>
                {transactions.map((transaction) => {
                    const {
                    id,
                    description,
                    transactionAmount,
                    transactionType,
                    createdAt
                    } = transaction;

                    const formattedDate = createdAt?.toDate?.().toLocaleString();

                    return (
                    <li key={id}>
                        <span className="transaction-description">{description}</span>
                        <span className="transaction-amount">Rs {transactionAmount}</span>
                        <span
                        className="transaction-type"
                        style={{ color: transactionType === "expense" ? "red" : "green" }}
                        >
                        {transactionType}
                        </span>
                        <span className="transaction-date">
                        {formattedDate || "Just now"}
                        </span>
                        <button className="delete-button" onClick={() => deleteTransaction(id)}>
                        🗑 Delete
                        </button>
                    </li>
                    );
                })}
                </ol>

            </div>

        </>
    );
};
