import {React, useState} from "react";
import UserLayout from "./Layout/UserLayout";
import PieChart from "./Components/PieChart";
import Transactions from "./Transactions.jsx";
import Account from "./Account.jsx";


export default function Dashboard({accounts, transactions, total_spent, total_earned}) {

  const [transactionTab, setTransactionTab] = useState(true);

const data = 0;

const switchTab = (value) => {
  setTransactionTab(value);

}
  return (
    <UserLayout>
      <div className="bg-white text-black">
        <PieChart total_spent={total_spent} total_earned={total_earned}/>
        <div>
          <button className="btn btn-accent" onClick={() => switchTab(true)}>Transactions</button>
          <button className="btn btn-accent" onClick={() => switchTab(false)}>Account</button>
        </div>
        <div>
          {transactionTab ? (
            <Transactions accounts={accounts} transactions={transactions}/>
          ) : (
            <Account accounts={accounts}/>
          )
          }
        </div>
      </div>
    </UserLayout>
  );
}
