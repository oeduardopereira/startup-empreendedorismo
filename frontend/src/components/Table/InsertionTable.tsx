import { useContext } from "react";
import type { despesa } from "../../types/types";
import styles from "./InsertionTable.module.css"
import { insertionTableContext } from "../../context";

function InsertionTable(props: {gainTable: boolean, data: despesa[]}) {

    const context = useContext(insertionTableContext);
    const {openForm, viewExpense} = context;

    return(
        <>
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
                                <img src={!props.gainTable ? `/${gasto.tipo.toLowerCase()}.svg` : `/cashin.svg`} className={styles.icons} alt={gasto.tipo}/>
                            </div>
                            <p className={styles.item}>{gasto.descricao}</p>
                            <p className={styles.item}>{gasto.autor}</p>
                            <p className={styles.item}>{gasto.freq}</p>
                            <p className={styles.item}>R${gasto.valor.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
                        </li>
                        </>
                    ))
                }
                <li className="flex justify-center mt-5">
                    <button className={styles.addButton} onClick={() => openForm(true, !props.gainTable)}>
                    <img src="/add.svg" className={styles.addIcon}></img>
                    </button> 
                </li>
                </ul>
            </div>
        </>
        
    );
}

export default InsertionTable;