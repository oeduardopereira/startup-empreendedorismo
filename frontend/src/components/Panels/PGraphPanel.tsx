import styles from "./Panel.module.css"
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
  type ChartOptions,
  type ChartData,
} from 'chart.js';
import { PolarArea } from 'react-chartjs-2';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

function PGraphPanel(props: {data:ChartData<"polarArea", number[], string>, title: string}) {

    const options: ChartOptions<'polarArea'> = {
        responsive: true,
        animation: {
          animateRotate: true,
          animateScale: true,
          duration: 1000,
          loop: false,
          easing: "easeInOutSine"
        },
        scales: {
          r: {
            ticks: {
              backdropColor: '#1f1f1f',
              color: '#1f1f1f'
            },
            grid: {
              color: '#3d3d3d'
            }
          }
        }
    };

    return(
        <div className={styles.pgraph}>
            <p className="font-semibold text-[28px] max-sm:text-[20px] text-center">{props.title}</p>
            <hr className="border-[0.5px] border-bg-mid"></hr>
            <div className="flex w-full h-[80%] items-center justify-center">
            <PolarArea data={props.data} options={options}/>
            </div>
        </div>
    );
}

export default PGraphPanel;