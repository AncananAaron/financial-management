import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart({ total_spent, total_earned}) {
  return (
    <div className='h-1/3 w-1/3'>
      <Pie
        data={{
          labels: ["Total Spent", "Total Income"],
          datasets: [
            {
              label: "Amount",
              backgroundColor: ["#B21F00", "#C9DE00"],
              hoverBackgroundColor: ["#501800", "#4B5000"],
              data: [total_spent, total_earned],
            },
          ],

         }}
        options={{
          title:{
            display:true,
            text:'Amount',
            fontSize:20
          },
          legend:{
            display:true,
            position:'right'
          }
        }}
      />
    </div>
  )
}
