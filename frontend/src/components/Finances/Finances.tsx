import { useContext, useEffect, useState } from "react";
import FinanceForm from "../Modals/FinanceForm";
import InsertionTable from "../Table/InsertionTable";
import styles from "./Finances.module.css"
import { type Budget, type Account, type addBudget, type Family} from "../../types/requests";
import { type despesa } from "../../types/types";
import * as budgetAPI from "../../api/endpoints/budget.ts"
import * as familyAPI from "../../api/endpoints/family.ts"
import { insertionTableContext, formContext, type FormContext, type InsertionTableContext, 
    bodyContext, type ExpenseContext, expenseContext } from "../../context";
import Expense from "../Modals/Expense.tsx";
import DGraphPanel from "../Panels/DGraphPanel.tsx";
import type { ChartData } from "chart.js";
import RankingPanel from "../Panels/RankingPanel.tsx";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Finances(props: {account: Account}) {

    const [openForm, setOpenForm] = useState<{view:boolean, isGasto:boolean}>({view:false, isGasto:false});
    const [gastos, setGastos] = useState<despesa[]>([]);
    const [ganhos, setGanhos] = useState<despesa[]>([]);
    const [totalExpenses, setTotalExpenses] = useState<{gasto: number, ganho: number}>({gasto:0, ganho:0});
    const [seeExpense, setSeeExpense] = useState<{expense: despesa, view: boolean}>({view: false, expense: {id:"",autor:"",descricao:"",freq:"",tipo:"",valor:0}});
    const [familyEarnings, setFamilyEarnings] = useState<{label: string, value: number}[]>([{label:"", value:0}]);
    const [familySpents, setFamilySpents] = useState<{label: string, value: number}[]>([{label:"", value:0}]);

    const context = useContext(bodyContext);
    const {updateAccount} = context;

    const graphData: ChartData<"doughnut", number[], string> = {
        labels: ["Gasto", "Ganho"],
        datasets: [
            {
                label: "R$",
                data: [totalExpenses.gasto, totalExpenses.ganho],
                backgroundColor: ["rgba(255, 0, 0, 0.2)", "rgba(0, 255, 0, 0.2)"],
                borderColor: ["rgba(255, 0, 0, 1)", "rgba(0, 255, 0, 1)"],
                borderWidth: 1
            }
        ]
    } 

    

    useEffect(() => {
        
        const getTablesData = () => {
            const author = props.account.username;
            const bruteDespesas: despesa[] = [];
            const bruteGanhos: despesa[] = [];
            let gastoValue = 0;
            let ganhoValue = 0;
            props.account.budgets.map((budget) => {
                const despesa: despesa = {
                    id: budget.budget_id,
                    autor: author,
                    descricao: budget.description,
                    freq: "",
                    tipo: "",
                    valor: (budget.value < 0 ? budget.value * -1 : budget.value) 
                }

                if (budget.frequency == "ONCE") {
                    despesa.freq = "Pontual"
                } else if (budget.frequency == "OFTEN") {
                    despesa.freq = "Mensal"
                } else {
                    despesa.freq = "Erro"
                }

                if (budget.type == "ESSENTIAL") {
                    despesa.tipo = "Essencial";
                } else if (budget.type == "OCCASIONAL") {
                    despesa.tipo = "Ocasional";
                } else if (budget.type == "HOBBY") {
                    despesa.tipo = "Lazer";
                } else if (budget.type == "STREAMING") {
                    despesa.tipo = "Assinatura";
                } else if (budget.type == "DELIVERY") {
                    despesa.tipo = "Delivery";
                } else {
                    despesa.tipo = "Ganho";
                    bruteGanhos.push(despesa);
                    ganhoValue = ganhoValue + despesa.valor;
                    return
                }

                gastoValue = gastoValue + despesa.valor;
                bruteDespesas.push(despesa);
            })

            setGanhos(bruteGanhos);
            setGastos(bruteDespesas);
            setTotalExpenses({gasto: gastoValue, ganho: ganhoValue})
        }

        getTablesData();

    }, [props.account])

    useEffect(() => {
        const fetchFamilyData = async () => {
            const response: Family = await familyAPI.getFamily(props.account.familyId);
            if (response) {
                const fSpents: {label:string, value:number}[] = [];
                const fEranings: {label:string, value:number}[] = [];

                response.relatives.forEach((rel) => {
                    let relspent = 0;
                    let relgains = 0;
                    rel.budgets.forEach((b) => {
                        if (b.value > 0) {
                            relgains = relgains + b.value;
                        } else {
                            relspent = relspent + (b.value * -1);
                        }
                    })
                    fSpents.push({label:rel.username, value:relspent});
                    fEranings.push({label:rel.username, value:relgains}); 
                })
                
                setFamilyEarnings(fEranings);
                setFamilySpents(fSpents);
            }
        }

        fetchFamilyData();
    }, [])

    const InsertionTableContextValue: InsertionTableContext = {
        openForm: (value: boolean, isGasto:boolean) => setOpenForm(m => m = {...m, view:value, isGasto}),
        viewExpense: (expense: despesa) => {
            const view = {view: true, expense: expense}
            setSeeExpense(view);
        }
    }

    const FormContextValue: FormContext = {
        closeForm: (value: boolean) => setOpenForm(m => m = {...m, view:!value}),
        sendInfo: async (info: addBudget | null) => {
            if (info) {
                console.log(`info => ${JSON.stringify(info)}`)
                const budgetId = await budgetAPI.createBudget(info);
                if (budgetId) {
                    const budget: Budget = await budgetAPI.getBudget(budgetId.budgetId);
                    if (budget) {
                        const updatedAcc: Account = {...props.account, budgets: [...props.account.budgets, budget], balance: props.account.balance + budget.value};
                        updateAccount(updatedAcc);
                        toast.success("Orçamento criado com sucesso!");
                    } else {
                        toast.error("Um erro interno aconteceu. Tente novamente mais tarde.")
                    }
                } else {
                    toast.error("Erro ao criar orçamento.")
                }
            } else {
                toast.error("Todos os campos devem ser preenchidos!");
            }
        }
    }

    const ExpenseContextValue: ExpenseContext = {
        close: () => setSeeExpense(m => m = {...m, view:false}),
        expire: async (id: string) => {
            const response_code = await budgetAPI.expire(id);
            if (response_code && response_code == 200) {
                const updatedBudgets = [...props.account.budgets].filter((b) => b.budget_id != id);
                updateAccount({...props.account, budgets:updatedBudgets});
                setSeeExpense(m => m = {...m, view:false});
                toast.info("Orçamento expirado com sucesso!");
            } else {
                toast.error("Erro ao expirar orçamento!");
            }
        },

        deleteBudget: async (id: string) => {
            const response_code = await budgetAPI.deleteBudget(id);
            if (response_code && response_code == 200) {
                const updatedBudgets = [...props.account.budgets].filter((b) => b.budget_id != id);
                updateAccount({...props.account, budgets:updatedBudgets, balance:props.account.balance - (props.account.budgets.filter((b) => b.budget_id == id))[0].value});
                setSeeExpense(m => m = {...m, view:false});
                toast.info("Orçamento deletado com sucesso!");
            } else {
                toast.error("Erro ao deletar orçamento!");
            }
        }
    }

    const rankingSpents: {label:string, value:number}[] = props.account.budgets.filter((e) => e.value < 0).sort((a, b) => b.value - a.value).map((b) => (
        {label: b.description, value: b.value * -1}
    ))

    const rankingEarns: {label:string, value:number}[] = props.account.budgets.filter((e) => e.value > 0).sort((a, b) => b.value - a.value).map((b) => (
        {label: b.description, value: b.value}
    ))

    return(

        <>
            <div className={styles.container}>
                <div className="flex max-sm:flex-col max-sm:items-center justify-center sm:space-x-[60px] max-sm:space-y-[10px]">
                    <div className="flex flex-col justify-center items-center space-y-[20px]">
                        <img src="/loss.png" className="w-[100px]"></img>
                        <insertionTableContext.Provider value={InsertionTableContextValue}>
                        <InsertionTable gainTable={false} data={gastos}/>
                        </insertionTableContext.Provider>
                    </div>
                    <div className="flex flex-col justify-center items-center space-y-[20px]">
                        <img src="/gain.svg" className="w-[100px]"></img>
                        <insertionTableContext.Provider value={InsertionTableContextValue}>
                        <InsertionTable gainTable={true} data={ganhos}/>
                        </insertionTableContext.Provider>
                    </div>
                </div>
                
                <div className="flex max-sm:flex-col max-sm:items-center max-sm:space-y-5 justify-center sm:space-x-5">
                    <RankingPanel title="Gastos por Parente" data={familySpents}/>
                    <RankingPanel title="Gastos" data={rankingSpents.filter((_, i) => i < 5)}/>
                    <div className="w-[500px] h-[350px] max-sm:w-[300px]">
                        <DGraphPanel data={graphData} title="Gasto x Ganho"/>
                    </div>
                    <RankingPanel title="Ganhos" data={rankingEarns.filter((_, i) => i < 5)}/>
                    <RankingPanel title="Ganhos por Parente" data={familyEarnings}/>
                </div>
                
            </div>

            {openForm.view && (
                <div className="fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
                    <formContext.Provider value={FormContextValue}>
                    <FinanceForm account={props.account} isGasto={openForm.isGasto}/>
                    </formContext.Provider>
                </div>
            )}

            {seeExpense.view && (
                <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
                    <expenseContext.Provider value={ExpenseContextValue}>
                    <Expense data={seeExpense.expense}/>
                    </expenseContext.Provider>
                </div>
            )}
        </>
        
    );
}

export default Finances;