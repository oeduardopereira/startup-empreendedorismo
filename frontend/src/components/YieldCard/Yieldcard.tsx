import styles from "./Yieldcard.module.css"
import { brlFormatter } from "../../types/types";
import { RiWallet2Fill } from "react-icons/ri";
function Yieldcard() {

    const goal = 20000;
    const current = 8400;

    const percentage = (current / goal) * 100;

    console.log(`Percentage: ${percentage}`)

    return(
        <div className={styles.card}>
            <div className="flex justify-between items-center">
                <div className="text-dark-blue  w-[40px] h-[40px] flex items-center justify-center bg-blue-100 rounded-[20px]">
                    <RiWallet2Fill /> 
                </div>
                <p className="text-dark-green font-light">
                    Retorno recebido
                </p>
            </div>
            <div className="flex items-center justify-center mt-4">
                <p className="font-bold text-dark-green text-[24px]">
                    {brlFormatter.format(current)}
                </p>
            </div>
            <div className="flex items-center justify-center mt-2">
                <div className="w-[80%] h-[5px] rounded-[16px] flex">
                    <div className={`bg-light-blue h-full rounded-l-[16px]`} style={{width: `${percentage}%`}}/>
                    <div className={` bg-gray-300 h-full rounded-r-[16px]`} style={{width: `${100 - percentage}%`}}/>
                </div>
            </div>

        </div>
    );

}

export default Yieldcard;