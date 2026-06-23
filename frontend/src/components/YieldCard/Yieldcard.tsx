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
                <div className="text-dark-blue  w-[60px] h-[60px] flex items-center justify-center bg-blue-100 rounded-[30px]">
                    <div className="scale-[170%]">
                        <RiWallet2Fill />
                    </div>
                </div>
                <p className="text-dark-green font-light text-[24px]">
                    Retorno recebido
                </p>
            </div>
            <div className="flex items-center justify-center mt-4">
                <p className="font-bold text-dark-green text-[32px]">
                    {brlFormatter.format(current)}
                </p>
            </div>
            <div className="flex items-center justify-center mt-1">
                <p className="font-extralight text-dark-green text-[20px]">
                    Meta: {brlFormatter.format(goal)}
                </p>
            </div>
            <div className="flex items-center justify-center mt-4">
                <div className="w-[80%] h-[10px] rounded-[16px] flex">
                    <div className={`bg-light-blue h-full rounded-l-[16px]`} style={{width: `${percentage}%`}}/>
                    <div className={` bg-gray-300 h-full rounded-r-[16px]`} style={{width: `${100 - percentage}%`}}/>
                </div>
            </div>

        </div>
    );

}

export default Yieldcard;