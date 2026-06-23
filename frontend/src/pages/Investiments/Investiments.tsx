import Goalcard from "../../components/GoalsCard/Goalcard";
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
            </div>
        </>
    );

}

export default Investiments;