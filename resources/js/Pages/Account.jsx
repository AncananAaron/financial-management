import React, { useState } from "react";
import { usePage } from "@inertiajs/inertia-react";
import route from "ziggy-js";
import UserLayout from "./Layout/UserLayout";
import DeleteModal from "./Components/DeleteModal";
import EditAccountForm from "./Components/EditAccountForm";
import AccountForm from "./Components/AccountForm";

export default function Account({ accounts, dashboard_data }) {
  const { errors } = usePage().props;
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isAccountFormVisible, setIsAccountFormVisible] = useState(false);
  const [isEditAccountFormVisible, setIsEditAccountFormVisible] =
    useState(false);
  const [currentAccount, setCurrentAccount] = useState(null);

  const handleDelete = (account) => {
    setCurrentAccount(account);
    setIsDeleteModalVisible(true);
  };

  const handleDeleteExit = () => {
    setIsDeleteModalVisible(false);
  };

  const handleAccountForm = (e) => {
    e.preventDefault();
    setIsAccountFormVisible(true);
  };

  const handleAccountFormExit = () => {
    setIsAccountFormVisible(false);
  };

  const handleEditAccountForm = (account) => {
    setCurrentAccount(account);
    console.log(currentAccount)
    setIsEditAccountFormVisible(true);
  };

  const handleEditAccountFormExit = () => {
    setIsEditAccountFormVisible(false);
  };

  return (
    <UserLayout dashboard_data={dashboard_data}>
      <div className="h-full bg-white w-full flex flex-col text-black">
        <div className="flex items-center place-content-center">
          <h1 className="p-4 text-3xl font-bold">Accounts</h1>
        </div>
        <div>
          <button className="btn btn-primary" onClick={handleAccountForm}>
            Add Account
          </button>
        </div>
        <div>
          {isAccountFormVisible && (
            <div className="fixed inset-0 z-50 overflow-x-hidden overflow-y-auto flex bg-black bg-opacity-50 justify-center items-center outline-none focus:outline-none">
              <AccountForm exit={handleAccountFormExit} />
            </div>
          )}
          {isDeleteModalVisible && (
            <div className="fixed inset-0 z-50 overflow-x-hidden overflow-y-auto flex bg-black bg-opacity-50 justify-center items-center outline-none focus:outline-none">
              <DeleteModal
                data={currentAccount}
                route={route("account:delete")}
                exit={handleDeleteExit}
              />
            </div>
          )}

          {isEditAccountFormVisible && (
            <div className="fixed inset-0 z-50 overflow-x-hidden overflow-y-auto flex bg-black bg-opacity-50 justify-center items-center outline-none focus:outline-none">
              <EditAccountForm
                account={currentAccount}
                exit={handleEditAccountFormExit}
              />
            </div>
          )}
        </div>
        <div>
          <table className="table">
            <thead className="text-black">
              <tr>
                <th>Account Name</th>
                <th>Type of Account</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((account) => {
                return (
                  <tr key={account.id}>
                    <td>{account.name}</td>
                    <td>{account.type_of_account}</td>
                    <td className="space-x-2">
                      <button
                        className="btn btn-primary"
                        onClick={() => handleEditAccountForm(account)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-error btn-outline"
                        onClick={() => handleDelete(account)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </UserLayout>
  );
}
