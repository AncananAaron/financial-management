import React, { useState } from "react";
import { Link } from "@inertiajs/inertia-react";
import TransactionForm from "./Components/TransactionForm";
import Dashboard from "./Components/Dashboard";
import UserLayout from "./Layout/UserLayout";
import EditForm from "./Components/EditForm";
import DeleteModal from "./Components/DeleteModal";

export default function Transactions({
  accounts,
  transactions,
  dashboard_data,
}) {
  const [transactionform, setTransactionForm] = useState(false);
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const handleAdd = (e) => {
    e.preventDefault();
    setTransactionForm(!transactionform);
  };

  const handleEdit = (transaction) => {
    setCurrentTransaction(transaction);
    setIsEditFormVisible(true);
  };

  const handleEditExit = () => {
    setIsEditFormVisible(false);
  };

  const handleDelete = (transaction) => {
    setCurrentTransaction(transaction);
    setIsDeleteModalVisible(true);
  }

  const handleDeleteExit = () => {
    setIsDeleteModalVisible(false);
  }

  console.log(accounts);

  return (
    <UserLayout dashboard_data={dashboard_data}>
      <div className="bg-white text-black">
        <div>
          <button className="btn btn-primary" onClick={handleAdd}>
            Add Transaction
          </button>
        </div>
        {transactionform && (
          <div className="fixed inset-0 z-50 overflow-x-hidden overflow-y-auto flex bg-black bg-opacity-50 justify-center items-center outline-none focus:outline-none">
            <TransactionForm accounts={accounts} exit={handleAdd} />
          </div>
        )}

        {isEditFormVisible && (
          <div className="fixed inset-0 z-50 overflow-x-hidden overflow-y-auto flex bg-black bg-opacity-50 justify-center items-center outline-none focus:outline-none">
            <EditForm
              transaction={currentTransaction}
              accounts={accounts}
              exit={handleEditExit}
            />
          </div>
        )}
        {isDeleteModalVisible && (
          <div className="fixed inset-0 z-50 overflow-x-hidden overflow-y-auto flex bg-black bg-opacity-50 justify-center items-center outline-none focus:outline-none">
            <DeleteModal
              transaction={currentTransaction}
              exit={handleDeleteExit}
            />
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="table">
            <thead className="text-black">
              <tr>
                <th>Account</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Remarks</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactions.data.map((transaction) => {
                return (
                  <tr key={transaction.id}>
                    <td>{transaction.name}</td>
                    <td>{transaction.type_of_account}</td>
                    <td>{transaction.amount}</td>
                    <td>{transaction.date}</td>
                    <td>{transaction.remarks}</td>
                    <td className="space-x-3">
                      <button
                        className="btn btn-primary"
                        onClick={() => handleEdit(transaction)}
                      >
                        Edit
                      </button>

                      <button className="btn btn-error btn-outline" onClick={() => handleDelete(transaction)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <div className="flex flex-row text-3xl">
              <div>
                <Link href={transactions.prev_page_url}>
                  <i className="ri-arrow-left-s-line"></i>
                </Link>
              </div>
              <div>
                <Link href={transactions.next_page_url}>
                  <i className="ri-arrow-right-s-line"></i>
                </Link>
              </div>
            </div>
          </table>
        </div>
      </div>
    </UserLayout>
  );
}
