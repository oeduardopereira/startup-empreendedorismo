import { useContext } from "react";
import { brlFormatter, type despesa } from "../../types/types";
import styles from "./Panel.module.css"
import { tableContext } from "../../context";

function Table(props: {data: despesa[]}) {

    const context = useContext(tableContext);

    const {viewExpense} = context;

    return(
        <div className={styles.table}>
            <ul>
            <li className={styles.itemrow}>
                <p className={styles.header}>Tipo</p>
                <p className={styles.header}>Descrição</p>
                <p className={styles.header}>Autor</p>
                <p className={styles.header}>Frequência</p>
                <p className={styles.header}>Valor</p>
            </li>
            {
                props.data.map((gasto: despesa) => (
                    <>
                    <hr className="border-bg-light"/>
                    <li className={styles.itemrow} onClick={() => viewExpense(gasto)}>
                        <div className={styles.item}>
                            <img src={`/${gasto.tipo.toLowerCase()}.svg`} className={styles.icons} alt={gasto.tipo}/>
                        </div>
                        <p className={styles.item}>{gasto.descricao}</p>
                        <p className={styles.item}>{gasto.autor}</p>
                        <p className={styles.item}>{gasto.freq}</p>
                        <p className={styles.item}>{brlFormatter.format(gasto.valor)}</p>
                    </li>
                    </>
                ))
            }
            </ul>
        </div>
    );
}

export default Table;