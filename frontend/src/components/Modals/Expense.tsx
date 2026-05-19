import { useContext } from 'react';
import { expenseContext } from '../../context';
import type { despesa } from '../../types/types';
import styles from './Modal.module.css'

function Expense(props: {data: despesa}) {

    const context = useContext(expenseContext);
    const {close, expire, deleteBudget} = context;

    return(
        <div className={styles.expense}>
            <div className='flex w-full justify-end'>
                <button onClick={() => close()}>
                    <img src="/close.svg" className='w-[30px] duration-100 acrive:opacity-90'></img>
                </button>
            </div>
            <div className="flex w-full h-fit items-center justify-center">
                <img src={props.data.tipo == "Ganho" ? "/cashin.svg" : `/${props.data.tipo.toLowerCase()}.svg`} className={styles.icone}></img>
            </div>
            <div className="flex items-center space-x-5 max-sm:flex-col max-sm:space-y-2 max-sm:space-x-0">
                <div className='w-[50%] h-full space-y-2'>
                    <div className={styles.row}>
                        <p className={styles.header}>Descrição:</p>
                        <p className={styles.text}>{props.data.descricao}</p>
                    </div>
                    <div className={styles.row}>
                        <p className={styles.header}>Autor:</p>
                        <p className={styles.text}>{props.data.autor}</p>
                    </div>
                </div>
                <div className='w-[50%] h-full space-y-2'>
                    <div className={styles.row}>
                        <p className={styles.header}>Frequência:</p>
                        <p className={styles.text}>{props.data.freq}</p>
                    </div>
                    <div className={styles.row}>
                        <p className={styles.header}>Tipo:</p>
                        <p className={styles.text}>{props.data.tipo}</p>
                    </div>
                    <div className={styles.row}>
                        <p className={styles.header}>Valor:</p>
                        <p className={styles.text}>R${props.data.valor.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
                    </div>
                </div>
            </div>
            <div className={styles.row}>
                <div className='w-full h-fit items-center justify-center space-x-10 flex mt-5'>
                    <button className={styles.confirmButton} onClick={() => expire(props.data.id)}>
                        <img className="w-[30px] max-sm:w-[20px]" src="/pay.svg"></img>
                        {props.data.tipo == "Ganho" ? "Expirar" : "Pagar"}
                    </button>
                    <button className={styles.editButton}>
                        <img className="w-[24px] max-sm:w-[14px]" src="/edit.svg"></img>
                        Editar
                    </button>
                    <button className={styles.denyButton} onClick={() => deleteBudget(props.data.id)}>
                        <img className="w-[30px] max-sm:w-[20px]" src="/delete.svg"></img>
                        Deletar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Expense;