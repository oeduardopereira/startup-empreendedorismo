import { MdDataSaverOff } from "react-icons/md";
import Goalcard from "../../components/GoalsCard/Goalcard";
import Linechart from "../../components/LineChart/Linechart";
import Moneycard from "../../components/MoneyCard/Moneycard";
import Yieldcard from "../../components/YieldCard/Yieldcard";
import styles from "./Investiments.module.css"


function Investiments() {

    return(
        <>
            <div className={styles.page}>
                <h1 className={styles.title}>Dashboard de Investimentos</h1>
                <h3 className={styles.subtitle}>Dashboard para visualização de metas e projeção de investimentos.</h3>
                <div className="flex w-full py-4 h-fit space-x-5 items-center justify-center">
                    <Moneycard />
                    <Yieldcard />
                    <Goalcard />
                </div>
                <div className="flex w-full py-2 h-fit space-x-5 items-center justify-center">
                    <div className="bg-white w-[400px] h-[300px] shadow-md rounded-[16px] flex-col p-3">
                        <div className="flex items-center justify-between">
                            <h1 className="text-dark-green font-bold text-[20px]">Investimentos x Despesas</h1>
                        </div>
                        <div className="flex w-full h-full items-center justify-between">
                            <Linechart />
                        </div>
                    </div>
                    <div className="bg-white w-[250px] h-[300px] shadow-md rounded-[16px] flex-col p-3 space-y-2 overflow-auto scrollbar-none">
                        <div className="flex items-center justify-between">
                            <div className="text-dark-green  w-[40px] h-[40px] flex items-center justify-center bg-green-100 rounded-[20px]">
                                <MdDataSaverOff />
                            </div>
                            <h1 className="text-dark-green font-bold text-[20px]">Métricas</h1>
                        </div>
                        <div className="text-dark-green font-light text-[18px] bg-light-green rounded-[16px] p-3">
                            Maio foi o mês com menor gasto!
                        </div>
                        <div className="text-dark-green font-light text-[18px] bg-light-red rounded-[16px] p-3">
                            Maio foi o mês com maior gasto!
                        </div>
                        <div className="text-dark-green font-light text-[18px] bg-light-yellow rounded-[16px] p-3">
                            Em abril, os investimentos cobriram todos os gastos.
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

}

export default Investiments;