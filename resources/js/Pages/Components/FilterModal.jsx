import React, {useState} from 'react'
import { usePage } from '@inertiajs/inertia-react'
import route from 'ziggy-js'
import { Inertia } from '@inertiajs/inertia'


export default function FilterModal({ accounts, exit }) {

const { errors } = usePage().props

console.log(errors);

const [data, setData] = useState({
  type_of_account: '',
  account_id: '',
  date: '',
  greater_than_amount: '',
  less_than_amount: '',
})

const handleTypeChange = (value) => {
  setData({...data, type_of_account: value})
}

const handleAccountChange = (value) => {
  setData({...data, account_id: value})
}

const handleDateChange = (value) => {
  setData({...data, date: value})
}

const handleGreaterAmountChange = (value) => {
  setData({...data, greater_than_amount: value})
}

const handleLessAmountChange = (value) => {
  setData({...data, less_than_amount: value})
}

const onSubmit = (e) => {
  e.preventDefault()
  Inertia.get(route('transaction:index'), data)
  console.log(data)
}



  return (
    <div className="card w-full max-w-sm drop-shadow bg-slate-100 border-1 border-black z-100">
      <div className='card-body'>
        <h1 className='text-black text-2xl font-bold text-center'>Filter Transactions</h1>
        <div className='form-control'>
          <label className='label'>Select Type:</label>
          <div className='flex flex-row space-x-3'>
            <div className='flex flex-row'>
              <label className='label'>Inflow</label>
              <input
                type='radio'
                name='type_of_account'
                value='Inflow'
                className='radio radio-primary'
                onChange={(e) => handleTypeChange(e.target.value)}
              />
            </div>
            <div className='flex flex-row'>
              <label className='label'>Outflow</label>
              <input
                type='radio'
                name='type_of_account'
                value='Outflow'
                className='radio radio-primary'
                onChange={(e) => handleTypeChange(e.target.value)}
              />
            </div>
            <div className='flex flex-row'>
              <label className='label'>Payable</label>
              <input
                type='radio'
                name='type_of_account'
                value='Payable'
                className='radio radio-primary'
                onChange={(e) => handleTypeChange(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className='form-control'>
          <label className='label'>Select Account:</label>
          <select
            name='account_id'
            className='select select-bordered w-full max-w-xs'
            onChange={(e) => handleAccountChange(e.target.value)}
          >
            <option value=''>Select Account</option>
            <option value='All'>All</option>
            {
              accounts.map((account) => {
                return (
                  <option key={account.id} value={account.id}>
                    {account.name} ({account.type_of_account})
                  </option>
                )
              }
              )
            }
          </select>
        </div>
        <div className='form-control'>
          <label className='label'>Select Date:</label>
          <input
            type='date'
            name='date'
            className='input input-bordered w-full max-w-xs'
            onChange={(e) => handleDateChange(e.target.value)}
          />
        </div>
        <div className='form-control'>
          <label className='label'>Select Amount:</label>
          <div className='flex flex-row space-x-3'>
            <div className='flex flex-row'>
              <label className='label'>Greater Than</label>
              <input
                type='number'
                name='greater_than_amount'
                className='input input-bordered w-full max-w-xs'
                onChange={(e) => handleGreaterAmountChange(e.target.value)}
              />
            </div>
            <div className='flex flex-row'>
              <label className='label'>Less Than</label>
              <input
                type='number'
                name='less_than_amount'
                className='input input-bordered w-full max-w-xs'
                onChange={(e) => handleLessAmountChange(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className='form-control'>
          <button className='btn btn-primary' onClick={onSubmit}>Filter</button>
        </div>
        <div className='form-control'>
          <button className='btn btn-error' onClick={exit}>Close</button>
        </div>
      </div>
    </div>
  )
}
