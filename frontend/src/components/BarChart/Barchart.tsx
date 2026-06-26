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

function Barchart() {

    const data: ChartData<"bar", number[], string> = {
        labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
        datasets: [
            {
                label: "Receitas",
                data: [4800, 5200, 4900, 5100, 5800, 5300, 0, 0, 0, 5800, 0, 0],
                backgroundColor: '#53A252',
                borderRadius: 6,
            },
            {
                label: "Despesas",
                data: [2100, 1900, 2300, 2150, 1700, 2050, 0, 0, 0, 1491.5, 0, 0],
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
                        return brlFormatter.format(value);
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

    return(
        <>
            <div className='h-full w-full'>
                <Bar data={data} options={options} />
            </div>
        </>
    );
}

export default Barchart;
