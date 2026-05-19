import styles from "./Modal.module.css"
import Dropdown from "../Dropdown/Dropdown";
import { formContext, dropContext, type DropContext } from "../../context";
import { useContext, useState } from "react";
import type { Account, addBudget } from "../../types/requests";

function FinanceForm(props: { account: Account, isGasto: boolean }) {

    const [freq, setFreq] = useState("");
    const [type, setType] = useState("");
    const [value, setValue] = useState(0);
    const [description, setDescription] = useState("");

    const context = useContext(formContext);
    const { closeForm, sendInfo } = context;

    const DropContextValue: DropContext = {
        sendFreq: (data: string) => setFreq(data),
        sendType: (data: string) => setType(data)
    }

    const handleValue = (v: number) => {
        if (props.isGasto) {
            setValue(v * -1);
        } else {
            setValue(v);
        }
    }

    const assembleInfo = () => {
        let frequency;
        let tipo;
        console.log(`freq = ${freq}`)
        if (freq == "Mensal") {
            frequency = "OFTEN";
        } else {
            frequency = "ONCE";
        }

        if (type == "Lazer") {
            tipo = "HOBBY";
        } else if (type == "Delivery") {
            tipo = type.toUpperCase();
        } else if (type == "Assinatura") {
            tipo = "STREAMING";
        } else if (type == "Essencial") {
            tipo = "ESSENTIAL";
        } else {
            tipo = "OCCASIONAL"
        }

        if (description != "" && value != 0) {
            const budget: addBudget = {
                authorId: props.account.id,
                description: description,
                frequency: frequency,
                type: tipo,
                value: value
            }

            closeForm(true);
            sendInfo(budget);
        } else {
            sendInfo(null);
        }

        
    }

    return (

        <div className={styles.form}>
            <div className='flex w-full justify-end'>
                <button onClick={() => closeForm(true)}>
                    <img src="/close.svg" className='w-[30px] duration-100 acrive:opacity-90'></img>
                </button>
            </div>
            <div className="flex justify-center">
                <p className="font-bold text-txt text-[32px] max-sm:text-[24px]">
                    Adicione seu {(props.isGasto) ? "gasto" : "ganho"}!
                </p>
            </div>
            <div className="flex items-center space-x-5 max-sm:flex-col max-sm:space-x-0">
                <div className="w-[50%] mb-[321px] max-sm:mb-0 max-sm:w-[100%] h-full items-start align-top flex flex-col">
                    <p className="font-bold text-txt text-[20px] max-sm:text-[16px]">Descrição: </p>
                    <input className={styles.input} placeholder="ex: Compras no Mercado"
                        onChange={(e) => setDescription(e.target.value)} />
                    <p className="font-bold text-txt text-[20px] max-sm:text-[16px]">Autor: </p>
                    <input className={styles.input} disabled value={props.account.username} />
                </div>
                <div className="w-[50%] max-sm:w-[100%] h-full items-start align-top flex flex-col">
                    <p className="font-bold text-txt text-[20px] max-sm:text-[16px]">Valor: </p>
                    <input className={styles.input} placeholder="ex: 1200.00"
                        onChange={(e) => handleValue(parseInt(e.target.value))} />
                    <p className="font-bold text-txt text-[20px] max-sm:text-[16px]">Frequência: </p>
                    <dropContext.Provider value={DropContextValue}>
                        <Dropdown options={["Pontual", "Mensal"]} FreqDrop={true} />
                    </dropContext.Provider>
                    <p className="font-bold text-txt text-[20px] max-sm:text-[16px]">Tipo: </p>
                    {props.isGasto ? (<dropContext.Provider value={DropContextValue}>
                        <Dropdown FreqDrop={false} options={["Essencial", "Ocasional", "Delivery", "Assinatura", "Lazer"]} />
                    </dropContext.Provider>) : (<input className={styles.input} disabled value={"Ganho"} />)}
                    <div className="w-[100%] flex justify-center items-center">
                        <button className={styles.send} onClick={() => assembleInfo()}>
                            Enviar
                        </button>
                    </div>

                </div>
            </div>
        </div>

    );

}

export default FinanceForm;