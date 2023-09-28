import React, { useState }from 'react'
import UserLayout from './Layout/UserLayout'
import TransactionForm from './Components/TransactionForm'


export default function Inflow() {

  const [transactionform, setTransactionForm] = useState(false);

  return (
    <UserLayout>
      <div className="bg-white text-black">
        <div>
          <button className='btn btn-primary'>
            Add Transaction
          </button>
        </div>
        { transactionform && (
          <Transactionform/>
        )
        }
      </div>
    </UserLayout>
  )
}

