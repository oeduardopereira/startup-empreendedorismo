import styles from "./Panel.module.css"
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



ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function LGraphPanel(props: {data:ChartData<"line", number[], string>, title:string}) {

    

    const options: ChartOptions<'line'> = {
        responsive: true,
        animation: {},
        scales: {
            x: {
                grid: {
                    color: '#3d3d3d'
                }
            },
            y: {
                grid: {
                    color: '#3d3d3d'
                }
            }
        }
    };

    return(
        <div className={styles.lgraph}>
            <p className="font-semibold text-[28px] max-sm:text-[20px] text-center">{props.title}</p>
            <hr className="border-[0.5px] border-bg-mid"></hr>
            <div className="flex w-full h-[80%] items-center justify-center">
            <Line data={props.data} options={options}/>
            </div>
        </div>
    );
}

export default LGraphPanel;