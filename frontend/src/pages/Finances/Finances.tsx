import React from "react";
import { MdDataSaverOff } from "react-icons/md";
import { FiPlus } from "react-icons/fi";
import { FaShoppingCart, FaBolt, FaMoneyBillWave, FaHeartbeat, FaCar, FaHome } from "react-icons/fa";
import BudgetCard from "../../components/BudgetCard/BudgetCard";
import GoalProgressCard from "../../components/GoalProgressCard/GoalProgressCard";
import Barchart from "../../components/BarChart/Barchart";
import styles from "./Finances.module.css";


type Transaction = {
    category: string;
    icon: React.ReactElement;
    merchant: string;
    date: string;
    status: "VERIFICADO" | "PENDENTE";
    amount: number;
};

const transactions: Transaction[] = [
    { category: "Alimentação",  icon: <FaShoppingCart />,  merchant: "Mercado Extra",         date: "24 Out, 2024", status: "VERIFICADO", amount: -184.50  },
    { category: "Utilidades",   icon: <FaBolt />,           merchant: "Enel Energia",           date: "22 Out, 2024", status: "PENDENTE",   amount: -312.00  },
    { category: "Renda",        icon: <FaMoneyBillWave />,  merchant: "Tech Solutions Ltda.",   date: "20 Out, 2024", status: "VERIFICADO", amount: +5800.00 },
    { category: "Saúde",        icon: <FaHeartbeat />,      merchant: "Clínica Odonto",         date: "18 Out, 2024", status: "VERIFICADO", amount: -45.00   },
    { category: "Transporte",   icon: <FaCar />,            merchant: "Posto Shell",            date: "15 Out, 2024", status: "VERIFICADO", amount: -150.00  },
    { category: "Moradia",      icon: <FaHome />,           merchant: "Condomínio Residencial", date: "10 Out, 2024", status: "VERIFICADO", amount: -900.00  },
];

function Finances() {
    const brlFormatter = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

    return (
        <div className={styles.page}>
            <h1 className={styles.title}>Finanças Pessoais</h1>
            <h3 className={styles.subtitle}>Controle de orçamento, metas e fluxo de despesas.</h3>

            {/* Row 1 — Budget cards */}
            <div className="flex w-full py-4 h-fit space-x-5 items-center justify-center">
                <BudgetCard />
                <GoalProgressCard
                    label="Novo SUV Familiar"
                    icon="🚗"
                    target={45000}
                    current={32400}
                    deadline="Dez 2024"
                    status="No Prazo"
                    statusColor="bg-sec-light-green text-sec-dark-green"
                    barColor="bg-sec-main-green"
                />
                <GoalProgressCard
                    label="Verão na Itália"
                    icon="✈️"
                    target={12000}
                    current={5400}
                    deadline="Jul 2024"
                    status="Constante"
                    statusColor="bg-light-green text-dark-green"
                    barColor="bg-main-blue"
                />
            </div>

            {/* Row 2 — Chart + Metrics */}
            <div className="flex w-full py-2 h-fit space-x-5 items-center justify-center">

                {/* Bar chart */}
                <div className="bg-white w-[800px] h-[500px] shadow-md rounded-[16px] flex-col p-3 hover:-translate-y-2 transition-all duration-75">
                    <div className="flex items-center justify-between">
                        <h1 className="text-dark-green font-bold text-[32px]">Receitas x Despesas</h1>
                    </div>
                    <div className="flex w-full h-full items-center justify-between">
                        <Barchart />
                    </div>
                </div>

                {/* Metrics panel */}
                <div className="bg-white w-[450px] h-[500px] shadow-md rounded-[16px] flex-col p-3 space-y-2 overflow-auto scrollbar-none hover:-translate-y-2 transition-all duration-75">
                    <div className="flex items-center justify-between">
                        <div className="text-dark-green w-[60px] h-[60px] flex items-center justify-center bg-green-100 rounded-[30px]">
                            <div className="scale-[170%]">
                                <MdDataSaverOff />
                            </div>
                        </div>
                        <h1 className="text-dark-green font-bold text-[32px]">Métricas</h1>
                    </div>
                    <div className="text-dark-green font-light text-[18px] bg-light-green rounded-[16px] p-3">
                        Outubro foi o mês com maior receita! 🎉
                    </div>
                    <div className="text-dark-green font-light text-[18px] bg-light-red rounded-[16px] p-3">
                        Utilidades aumentaram 18% em relação ao mês anterior.
                    </div>
                    <div className="text-dark-green font-light text-[18px] bg-light-yellow rounded-[16px] p-3">
                        Você está 72% da meta do SUV Familiar. Continue assim!
                    </div>
                    <div className="text-dark-green font-light text-[18px] bg-blue-100 rounded-[16px] p-3">
                        Orçamento diário disponível: <strong>R$ 141,60/dia</strong>
                    </div>
                </div>
            </div>

            {/* Row 3 — Transaction table */}
            <div className="flex w-full py-2 justify-center mt-2">
                <div className="bg-white w-[1265px] shadow-md rounded-[16px] p-5 hover:-translate-y-2 transition-all duration-75">
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-dark-green font-bold text-[32px]">Fluxo Doméstico</h1>
                        <div className="flex space-x-3">
                            <button className="flex items-center space-x-1 bg-dark-green text-white font-medium px-4 py-2 rounded-[12px] hover:bg-main-green transition-all duration-100">
                                <FiPlus className="mr-1" /> Adicionar Despesa
                            </button>
                        </div>
                    </div>

                    {/* Table header */}
                    <div className="grid grid-cols-5 text-gray-400 text-[12px] font-semibold uppercase px-3 pb-2 border-b border-gray-100">
                        <span>Categoria</span>
                        <span>Estabelecimento / Fonte</span>
                        <span>Data</span>
                        <span>Status</span>
                        <span className="text-right">Valor</span>
                    </div>

                    {/* Rows */}
                    {transactions.map((t, i) => (
                        <div
                            key={i}
                            className="grid grid-cols-5 items-center px-3 py-4 border-b border-gray-50 hover:bg-bg-blue rounded-[12px] transition-all duration-75"
                        >
                            {/* Category */}
                            <div className="flex items-center space-x-3">
                                <div className="w-[38px] h-[38px] rounded-full bg-bg-mid flex items-center justify-center text-dark-green">
                                    {t.icon}
                                </div>
                                <span className="text-dark-green font-semibold text-[15px]">{t.category}</span>
                            </div>

                            {/* Merchant */}
                            <span className="text-gray-500 text-[14px]">{t.merchant}</span>

                            {/* Date */}
                            <span className="text-gray-500 text-[14px]">{t.date}</span>

                            {/* Status */}
                            <span>
                                <span
                                    className={`text-[12px] font-semibold px-3 py-1 rounded-full ${
                                        t.status === "VERIFICADO"
                                            ? "bg-sec-light-green text-sec-dark-green"
                                            : "bg-light-yellow text-dark-yellow"
                                    }`}
                                >
                                    {t.status}
                                </span>
                            </span>

                            {/* Amount */}
                            <span
                                className={`text-right font-bold text-[15px] ${
                                    t.amount >= 0 ? "text-sec-main-green" : "text-main-red"
                                }`}
                            >
                                {t.amount >= 0 ? "+" : ""}
                                {brlFormatter.format(t.amount)}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}

export default Finances;
