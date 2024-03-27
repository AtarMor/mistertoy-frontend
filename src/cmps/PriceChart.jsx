import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { toyService } from '../services/toy.service';
import { useSelector } from 'react-redux';

ChartJS.register(ArcElement, Tooltip, Legend)

export function PriceChart() {
    const toys = useSelector(storeState => storeState.toyModule.toys)
    const labels = toyService.getLabels()

    if (!toys) return
    const pricePerLabelMap = toyService.calcAvgPricePerLabel(toys, labels)
    
    const data = {
        labels: Object.keys(pricePerLabelMap),
        datasets: [
            {
                label: 'Average Price',
                data: Object.values(pricePerLabelMap),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgb(139, 195, 74, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(156, 39, 176, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgb(139, 195, 74, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(156, 39, 176, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    }

    return <Pie data={data} />
}

