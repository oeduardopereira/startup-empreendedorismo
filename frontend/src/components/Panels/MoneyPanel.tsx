import { brlFormatter } from "../../types/types";
import styles from "./Panel.module.css"

function MoneyPanel(props: {title: string, amount: number}) {
    return (
        <div className={styles.panel}>
            <p className="font-semibold text-[28px] max-sm:text-[20px] text-center">{props.title}</p>
            <hr className="border-[0.5px] border-bg-mid"></hr>
            <div className="w-full h-[80%] flex justify-center items-center">
                <p className="text-center text-[24px] max-sm:text-[16px]">{brlFormatter.format(props.amount)}</p>
            </div>
            
            
        </div>
    );
}

export default MoneyPanel;