import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  type ChartOptions,
  type ChartData,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { brlFormatter } from '../../types/types';



ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Linechart() {

    const data: ChartData<"line", number[], string> = {
            labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
            datasets: [
                {label: "Investimentos", data: [150, 200, 50, 0, 500, 150], fill: false, tension: 0.2, borderColor: '#14696D'},
                {label: "Gastos", data: [2000, 1800, 2100, 2150, 1500, 2000], fill: false, tension: 0.2, borderColor: '#EF0000'}
            ]
        }

    const options: ChartOptions<'line'> = {
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
            
        }
    }


    return(
        <>
            <div className='h-full w-full'>
                <Line data={data} options={options}/>
            </div>
            
        </>
    );
}

export default Linechart;