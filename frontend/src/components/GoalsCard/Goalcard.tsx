import styles from "./Goalcard.module.css"
import { brlFormatter } from "../../types/types";
import { LuGoal } from "react-icons/lu";
function Goalcard() {

    const goal = 24;
    const current = 8;

    const percentage = (current / goal) * 100;

    console.log(`Percentage: ${percentage}`)

    return(
        <div className={styles.card}>
            <div className="flex justify-between items-center">
                <div className="text-dark-red  w-[40px] h-[40px] flex items-center justify-center bg-red-100 rounded-[20px]">
                    <LuGoal /> 
                </div>
                <p className="text-dark-green font-light">
                    Metas batidas
                </p>
            </div>
            <div className="flex items-center justify-center mt-4">
                <p className="font-bold text-dark-green text-[24px]">
                    {current}
                </p>
            </div>
            <div className="flex items-center justify-center mt-2">
                <div className="w-[80%] h-[5px] rounded-[16px] flex">
                    <div className={`bg-light-red h-full rounded-l-[16px]`} style={{width: `${percentage}%`}}/>
                    <div className={` bg-gray-300 h-full rounded-r-[16px]`} style={{width: `${100 - percentage}%`}}/>
                </div>
            </div>

        </div>
    );

}

export default Goalcard;