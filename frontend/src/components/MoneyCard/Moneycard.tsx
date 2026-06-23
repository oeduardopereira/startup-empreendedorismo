import { PiMoneyWavyBold } from "react-icons/pi";
import styles from "./Moneycard.module.css"
import { brlFormatter } from "../../types/types";
function Moneycard() {

    const goal = 20000;
    const current = 20000;

    const percentage = (current / goal) * 100;

    console.log(`Percentage: ${percentage}`)

    return(
        <div className={styles.card}>
            <div className="flex justify-between items-center">
                <div className="text-dark-green  w-[40px] h-[40px] flex items-center justify-center bg-green-100 rounded-[20px]">
                    <PiMoneyWavyBold /> 
                </div>
                <p className="text-dark-green font-light">
                    Total investido
                </p>
            </div>
            <div className="flex items-center justify-center mt-4">
                <p className="font-bold text-dark-green text-[24px]">
                    {brlFormatter.format(current)}
                </p>
            </div>
            <div className="flex items-center justify-center mt-2">
                <div className="w-[80%] h-[5px] rounded-[16px] flex">
                    <div className={`bg-light-green h-full rounded-l-[16px]`} style={{width: `${percentage}%`}}/>
                    <div className={` bg-gray-300 h-full rounded-r-[16px]`} style={{width: `${100 - percentage}%`}}/>
                </div>
            </div>

        </div>
    );

}

export default Moneycard;