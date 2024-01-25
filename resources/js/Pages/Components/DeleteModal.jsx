import React from 'react'
import { Inertia } from "@inertiajs/inertia";




export default function DeleteModal({data, route ,exit}) {

  const handleDelete = (e) => {
    e.preventDefault();
    Inertia.post(route, data);
  }

  return (
    <div className="card w-full max-w-sm drop-shadow bg-slate-100 border-1 border-black z-100">
      <div className="card-body">
        <h1 className="text-black text-2xl font-bold text-center">
          Deleting
        </h1>
        <div className="form-control">
          <label className="label">Are you sure you want to delete this?</label>
        </div>
        <div className="form-control">
          <button className="btn btn-primary" onClick={handleDelete}>Yes</button>
          <button className="btn btn-error btn-outline w-full max-w-xs" onClick={exit}>No</button>
        </div>
      </div>
    </div>
  )
}
