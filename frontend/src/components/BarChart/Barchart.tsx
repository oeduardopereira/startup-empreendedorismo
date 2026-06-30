import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  type ChartOptions,
  type ChartData,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { brlFormatter } from '../../types/types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type Transaction = {
    category: string;
    icon: React.ReactElement;
    merchant: string;
    date: string;
    status: "VERIFICADO" | "PENDENTE";
    amount: number;
};

interface BarchartProps {
    transactions: Transaction[];
}

const Barchart: React.FC<BarchartProps> = ({ transactions }) => {
    const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
    const monthNamesMap: { [key: string]: number } = {
        "jan": 0, "fev": 1, "mar": 2, "abr": 3, "mai": 4, "jun": 5,
        "jul": 6, "ago": 7, "set": 8, "out": 9, "nov": 10, "dez": 11
    };

    const receitas = new Array(12).fill(0);
    const despesas = new Array(12).fill(0);

    transactions.forEach(transaction => {
        if (!transaction.date) return;
        
        const dateParts = transaction.date.split(" ");
        const monthStr = dateParts[1]?.toLowerCase();
        
        if (monthStr && monthNamesMap[monthStr] !== undefined) {
            const monthIndex = monthNamesMap[monthStr];
            
            if (transaction.amount > 0) {
                receitas[monthIndex] += transaction.amount;
            } else {
                despesas[monthIndex] += Math.abs(transaction.amount);
            }
        }
    });

    const data: ChartData<"bar", number[], string> = {
        labels: months,
        datasets: [
            {
                label: "Receitas",
                data: receitas,
                backgroundColor: '#53A252',
                borderRadius: 6,
            },
            {
                label: "Despesas",
                data: despesas,
                backgroundColor: '#EF0000',
                borderRadius: 6,
            },
        ],
    };

    const options: ChartOptions<'bar'> = {
        responsive: true,
        animation: {},
        scales: {
            x: {
                grid: {
                    color: '#BFFCFF'
                }
            },
            y: {
                grid: {
                    color: '#BFFCFF',
                },
                ticks: {
                    color: '#003739',
                    callback: function(value) {
                        if (typeof value === "string") return value;
                        return brlFormatter.format(value as number);
                    }
                }
            },
        },
        plugins: {
            legend: {
                labels: { color: '#003739' }
            }
        }
    };

    return (
        <div className='h-full w-full'>
            <Bar data={data} options={options} />
        </div>
    );
};

export default Barchart;
