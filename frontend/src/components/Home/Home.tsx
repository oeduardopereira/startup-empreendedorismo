import styles from "./Home.module.css"
import DGraphPanel from "../Panels/DGraphPanel.tsx";
import PGraphPanel from "../Panels/PGraphPanel.tsx";
import LGraphPanel from "../Panels/LGraphPanel.tsx";
import Table from "../Panels/Table.tsx";
import { type Family, type Account, type CategoricBalance } from "../../types/requests.ts";
import { useEffect, useState } from "react";
import * as familyAPI from "../../api/endpoints/family.ts"
import * as accountAPI from "../../api/endpoints/account.ts"
import type { ChartData } from "chart.js";
import { type despesa, type GraphColor, type MonthlySpent } from "../../types/types.ts";
import generateRandomGraphColor from "../../utils.ts";
import MoneyPanel from "../Panels/MoneyPanel.tsx";
import { Bounce, ToastContainer } from "react-toastify";
import { expenseContext, tableContext, type ExpenseContext, type TableContext } from "../../context.ts";
import ExpenseView from "../Modals/ExpenseVierw.tsx";

function Home(props: {account: Account}) {
    const [family, setFamily] = useState<Family>({family_balance:0, id:"", name:"",relatives: []})
    const [DGraphColor, setDGraphColor] = useState<GraphColor[]>([{background:"", border:""}]);
    const [PGraphColor, setPGraphColor] = useState<GraphColor[]>([{background:"", border:""}]);
    const [spents, setSpents] = useState<CategoricBalance>({delivery:0,essential:0,hobby:0,occasional:0,streaming:0});
    const [gains, setGains] = useState(0);
    const [despesas, setDespesas] = useState<despesa[]>([{id:"", autor:"",descricao:"",freq:"",tipo:"",valor:0}]);
    const [spentMonth, setMonthlySpents] = useState<MonthlySpent[]>([]);
    const [seeExpense, setSeeExpense] = useState<{view:boolean, expense: despesa}>({view:false, expense: {id:"",autor:"",descricao:"",freq:"",tipo:"",valor:0}})

    useEffect(() => {
        const fetchFamilyData = async () => {
            if (props.account.familyId == "") {
                return;
            }
            const familyInfo: Family = await familyAPI.getFamily(props.account.familyId);
            if (familyInfo) {
                setFamily(familyInfo);
                const colors = familyInfo.relatives.map(() => {
                    const color = generateRandomGraphColor()
                    return color
                })
                setDGraphColor(colors);
                const relatives = [...familyInfo.relatives];
                const bruteDespesas: despesa[] = [];
                relatives.map((relative) => {
                    const author = relative.username;
                    relative.budgets.map((budget) => {
                        const despesa: despesa = {
                            id: budget.budget_id,
                            autor: author,
                            descricao: budget.description,
                            freq: "",
                            tipo: "",
                            valor: budget.value * -1
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
                            return
                        }

                        bruteDespesas.push(despesa);
                    })
                })
                setDespesas(bruteDespesas)
                
                const monthlySpents: MonthlySpent[] = await familyAPI.getFamilyMonthlySpents(familyInfo.id);
                if (monthlySpents) {
                    console.log(`monthlyFamilySpents => ${JSON.stringify(monthlySpents)}`)
                    setMonthlySpents(monthlySpents);
                }
                
            }
        }
        fetchFamilyData();

        const getPGraphColors = () => {
            const pcolor = [];
            for (let i = 0; i < 5; i++) {
                const color = generateRandomGraphColor();
                pcolor.push(color);
            }
            setPGraphColor(pcolor);
        }   

        getPGraphColors();
    }, [])

    useEffect(() => {
        const fetchSpents = async () => {
            const spentsInfo: CategoricBalance = await accountAPI.getSpents(props.account.id);
            if (spentsInfo) {
                setSpents(spentsInfo);
            }
        }

        const fetchGains = async () => {
            const gainsInfo = await accountAPI.getGains(props.account.id);
            if (gainsInfo) {
                setGains(gainsInfo.gains);
            }
        }

        fetchSpents();
        fetchGains();
    }, [props.account])

    const DGraphData: ChartData<"doughnut", number[], string> = {
        labels: family.relatives.map((relative) => (relative.username)),
        datasets: [
            {
                label: "R$",
                data: family.relatives.map((relatives) => (relatives.balance)),
                borderWidth: 1,
                backgroundColor: DGraphColor.map((element) => (element.background)),
                borderColor: DGraphColor.map((element) => (element.border)),
            }
        ]
    }

    const PGraphData: ChartData<"polarArea", number[], string> = {
        labels: ["Lazer", "Essencial", "Assinatura", "Delivery", "Ocasional"],
        datasets: [
            {
                label: "R$",
                data: [spents.hobby, spents.essential, spents.streaming, spents.delivery, spents.occasional],
                backgroundColor: PGraphColor.map((color) => color.background),
                borderColor: PGraphColor.map((color) => color.border),
                borderWidth: 1
            }
        ]
    }

    const LGraphData: ChartData<"line", number[], string> = {
        labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
        datasets: family.relatives.map((relative, i) => {
            let relSpent = spentMonth.find(monthSpent => monthSpent.accountId === relative.id)?.monthlySpents
            if (!relSpent) {
                relSpent = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            }
            return {
                label: relative.username,
                data: relSpent,
                backgroundColor: DGraphColor[i].background,
                borderColor: DGraphColor[i].border
            }
        })
    }

    const TableContextValue: TableContext = {
        viewExpense: (expense: despesa) => {
            const data = {view: true, expense: expense}
            setSeeExpense(data);
        }
    }

    const ExpenseContextValue: ExpenseContext = {
        close: () => {
            setSeeExpense(d => d = {...d, view:false});
        },
        expire: () => {},
        deleteBudget: () => {}
    }

    return(
        <>
        <div className={styles.container}>
            <div className={styles.row}>
                <div className="w-[550px] h-[500px] max-sm:w-[300px] max-sm:h-[400px]">
                    <DGraphPanel title="Saldo por Parente" data={DGraphData}/>
                </div>
                <div className="w-[800px] h-[500px] max-sm:w-[350px] max-sm:h-[300px]">
                    <LGraphPanel data={LGraphData} title="Gastos mensais por membro da família"/>
                </div>
                <div className="w-[550px] h-[500px] max-sm:w-[300px] max-sm:h-[400px]">
                    <PGraphPanel title="Gastos por Categoria" data={PGraphData}/>
                </div>

            </div>
            <div className="flex justify-center space-x-[50px] max-sm:space-x-2">
                <MoneyPanel title="Gastos" amount={spents.delivery + spents.essential + spents.hobby + spents.occasional + spents.streaming}/>
                <MoneyPanel title="Saldo" amount={props.account.balance}/>
                <MoneyPanel title="Ganhos" amount={gains}/>
            </div>
            <div className="flex flex-col justify-center items-center">
                <h1 className="text-txt font-bold text-[24px] max-sm:text-[18px] mb-5">Tabela de Gastos</h1>
                <tableContext.Provider value={TableContextValue}>
                <Table data={despesas}/>
                </tableContext.Provider>

            </div>
            
        </div>

        {seeExpense.view && (
            <div className="fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
                <expenseContext.Provider value={ExpenseContextValue}>
                <ExpenseView data={seeExpense.expense}/>
                </expenseContext.Provider>
            </div>
        )}
        </>
    );
}
                


export default Home;