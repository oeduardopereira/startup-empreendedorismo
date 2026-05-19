import styles from "./Panel.module.css"
import { Chart as ChartJS, ArcElement, Tooltip, Legend, type ChartOptions, type ChartData
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';


ChartJS.register(ArcElement, Tooltip, Legend);

function DGraphPanel(props: {data:ChartData<"doughnut", number[], string>, title: string}) {


    const options: ChartOptions<'doughnut'> = {
        responsive: true,
        animation: {
            animateRotate: true,
            duration: 1500,
            loop: false,
            easing: "easeInOutCirc"
        }
    };

    return(
        <div className={styles.dgraph}>
            <p className="font-semibold text-[28px] max-sm:text-[20px] text-center">{props.title}</p>
            <hr className="border-[0.5px] border-bg-mid"></hr>
            <div className="flex w-full h-[80%] items-center justify-center">
            <Doughnut data={props.data} options={options}/>
            </div>
        </div>
    );
}

export default DGraphPanel;