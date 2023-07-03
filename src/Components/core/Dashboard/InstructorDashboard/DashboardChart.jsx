import React from 'react'
import { Pie,Doughnut } from 'react-chartjs-2';
import { useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

const DashboardChart = ({details,currentChart}) => {
    ChartJS.register(ArcElement, Tooltip, Legend);


    const randomColor = (num) => {
        const colors = []
        for(let i=0; i<num; i++) {
            colors.push(`rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`)
        }
        return colors;
    }

    const StudentsData = {
        labels: details?.map(course => course?.courseName),
        datasets: [
            {
                label: '# of Students',
                data: details?.map(course => course?.totalStudents),
                backgroundColor: randomColor(details?.length),
                borderColor: randomColor(),
                borderWidth: 1,
            },
        ],
    };

    const RevenueData = {
        labels: details?.map(course => course?.courseName),
        datasets: [
            {
                label: '# of ₹',
                data: details?.map(course => course?.totalRevenue),
                backgroundColor: randomColor(details?.length),
                borderColor: randomColor(),
                borderWidth: 1,
            },
        ],
    };


  return (
    <div>
            <div className='mt-8 '> 
            {/* change label position extreme right and increase gap and change chart size */}
                {currentChart === 'revenue' ? <Pie data={RevenueData}
                options={{
                    plugins: {
                        legend: {
                            position: 'right',
                            labels: {
                                boxWidth: 10,
                                boxHeight: 10,
                                padding: 20,
                                font: {
                                    size: 12,
                                },
                            },
                        },
                    },
                    aspectRatio: 2,
                }
            }

                 /> : <Pie data={StudentsData} />}
                </div>

    </div>
  )
}

export default DashboardChart