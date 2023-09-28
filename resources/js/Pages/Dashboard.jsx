import React from "react";
import UserLayout from "./Layout/UserLayout";


export default function Dashboard() {

const data = 0;

  return (
    <UserLayout>
      <div className="bg-white text-black">
        <div>
          <h1>Total Earned</h1>
          <p>{data}</p>
        </div>
        <div>
          <h1>Total Spent</h1>
          <p>{data}</p>
        </div>
      </div>
    </UserLayout>
  );
}
