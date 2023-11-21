import { React, useState } from "react";
import UserLayout from "./Layout/UserLayout";
import PieChart from "./Components/PieChart";
import BarChart from "./Components/BarChart";
import StackedBarChart from "./Components/StackedBarChart";
import Transactions from "./Components/Tabs/Transactions.jsx";
import Account from "./Components/Tabs/Account.jsx";

export default function Dashboard({
  accounts,
  transactions,
  total_spent,
  total_earned,
  total_spent_per_account,
  total_payable_per_account,
}) {
  const [transactionTab, setTransactionTab] = useState(true);

  const data = 0;

  const switchTab = (value) => {
    setTransactionTab(value);
  };
  return (
    <UserLayout>
      <div className="bg-white text-black flex flex-col">
        <div className="flex flex-row space-x-5">
          <div className="">
            <label className="text-3xl font-bold">Total Earn & Total Income</label>
            <PieChart total_spent={total_spent} total_earned={total_earned} />
          </div>

          <div className="">
            <label className="text-3xl font-bold">Total Spent Per Account</label>
            <BarChart total_spent_per_account={total_spent_per_account} />
          </div>

          <div className="">
            <label className="text-3xl font-bold">Credit Account</label>
            <StackedBarChart total_payable_per_account={total_payable_per_account} />
          </div>
        </div>

        <div>
          <button className="btn btn-accent" onClick={() => switchTab(true)}>
            Transactions
          </button>
          <button className="btn btn-accent" onClick={() => switchTab(false)}>
            Account
          </button>
        </div>
        <div>
          {transactionTab ? (
            <Transactions accounts={accounts} transactions={transactions} />
          ) : (
            <Account accounts={accounts} />
          )}
        </div>
      </div>
    </UserLayout>
  );
}
