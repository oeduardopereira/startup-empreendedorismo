import { brlFormatter } from "../../types/types";
import styles from "./Panel.module.css"

function RankingPanel(props: {title: string, data:{label: string, value: number}[]}) {

    return(
        <div className={styles.panel}>
            <p className="font-semibold text-[28px] max-sm:text-[22px] text-center">{props.title}</p>
            <hr className="border-[0.5px] border-bg-mid"></hr>
            <ol className="w-full h-[80%] flex flex-col justify-center items-center">
                {props.data.sort((a, b) => b.value - a.value).map((d) => (
                    <li className="text-center text-[18px] max-sm:text-[14px] mb-2 max-sm:mb-1">
                        {d.label} - {brlFormatter.format(d.value)}
                    </li>
                ))}
            </ol>

        </div>
    );
}

export default RankingPanel;