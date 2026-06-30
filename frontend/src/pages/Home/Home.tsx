import { MdAttachMoney, MdTrendingUp, MdGolfCourse, MdDataSaverOff } from "react-icons/md";
import styles from "./Home.module.css";

function Home() {
    return(
        <>
            <div className={styles.page}>
                <h1 className={styles.title}>Início</h1>
                <h3 className={styles.subtitle}>Visão geral do seu controle financeiro e metas de investimento.</h3>

                {/* Cards de resumo */}
                <div className="flex w-full py-4 h-fit space-x-5 items-center justify-center">

                    <div className="bg-white w-[350px] h-fit shadow-md rounded-[16px] flex-col p-5 hover:-translate-y-2 transition-all duration-75">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="text-dark-green w-[50px] h-[50px] flex items-center justify-center bg-green-100 rounded-[25px]">
                                <div className="scale-[160%]"><MdAttachMoney /></div>
                            </div>
                            <span className="text-dark-green text-[16px] font-medium">Total investido</span>
                        </div>
                        <h2 className="text-dark-green font-bold text-[28px] mb-3">R$ 20.000,00</h2>
                        <div className="w-full h-[4px] bg-gray-100 rounded-full">
                            <div className="w-[70%] h-full bg-[#3DD9AC] rounded-full" />
                        </div>
                    </div>

                    <div className="bg-white w-[350px] h-fit shadow-md rounded-[16px] flex-col p-5 hover:-translate-y-2 transition-all duration-75">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="text-dark-green w-[50px] h-[50px] flex items-center justify-center bg-blue-100 rounded-[25px]">
                                <div className="scale-[160%]"><MdTrendingUp /></div>
                            </div>
                            <span className="text-dark-green text-[16px] font-medium">Retorno recebido</span>
                        </div>
                        <h2 className="text-dark-green font-bold text-[28px] mb-3">R$ 8.400,00</h2>
                        <div className="w-full h-[4px] bg-gray-100 rounded-full">
                            <div className="w-[42%] h-full bg-[#7B8FF7] rounded-full" />
                        </div>
                    </div>

                    <div className="bg-white w-[350px] h-fit shadow-md rounded-[16px] flex-col p-5 hover:-translate-y-2 transition-all duration-75">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="text-dark-green w-[50px] h-[50px] flex items-center justify-center bg-red-100 rounded-[25px]">
                                <div className="scale-[160%]"><MdGolfCourse /></div>
                            </div>
                            <span className="text-dark-green text-[16px] font-medium">Metas batidas</span>
                        </div>
                        <h2 className="text-dark-green font-bold text-[28px] mb-3">8</h2>
                        <div className="w-full h-[4px] bg-gray-100 rounded-full">
                            <div className="w-[80%] h-full bg-[#FF8C8C] rounded-full" />
                        </div>
                    </div>

                </div>

                {/* Segunda linha */}
                <div className="flex w-full py-2 h-fit space-x-5 items-center justify-center">

                    <div className="bg-white w-[580px] h-fit shadow-md rounded-[16px] flex-col p-5 hover:-translate-y-2 transition-all duration-75">
                        <div className="flex items-center justify-between mb-4">
                            <div className="text-dark-green w-[60px] h-[60px] flex items-center justify-center bg-green-100 rounded-[30px]">
                                <div className="scale-[170%]"><MdDataSaverOff /></div>
                            </div>
                            <h1 className="text-dark-green font-bold text-[32px]">Acesso Rápido</h1>
                        </div>
                        <div className="flex flex-col space-y-3">
                            <div className="text-dark-green font-light text-[18px] bg-light-green rounded-[16px] p-4 flex items-center space-x-3">
                                <span className="text-[22px]">🗂️</span>
                                <span>Gerenciar suas Finanças</span>
                            </div>
                            <div className="text-dark-green font-light text-[18px] bg-light-yellow rounded-[16px] p-4 flex items-center space-x-3">
                                <span className="text-[22px]">📊</span>
                                <span>Ver Dashboard de Investimentos</span>
                            </div>
                            <div className="text-dark-green font-light text-[18px] bg-light-red rounded-[16px] p-4 flex items-center space-x-3">
                                <span className="text-[22px]">🎯</span>
                                <span>Acompanhar suas Metas</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white w-[580px] h-fit shadow-md rounded-[16px] flex-col p-5 hover:-translate-y-2 transition-all duration-75">
                        <div className="flex items-center justify-between mb-4">
                            <div className="text-dark-green w-[60px] h-[60px] flex items-center justify-center bg-green-100 rounded-[30px]">
                                <div className="scale-[170%]"><MdTrendingUp /></div>
                            </div>
                            <h1 className="text-dark-green font-bold text-[32px]">Dicas do Dia</h1>
                        </div>
                        <div className="flex flex-col space-y-3">
                            <div className="text-dark-green font-light text-[18px] bg-light-green rounded-[16px] p-3">
                                💡 Invista pelo menos 20% da sua renda mensalmente.
                            </div>
                            <div className="text-dark-green font-light text-[18px] bg-light-yellow rounded-[16px] p-3">
                                📅 Revise suas metas financeiras a cada trimestre.
                            </div>
                            <div className="text-dark-green font-light text-[18px] bg-light-red rounded-[16px] p-3">
                                🔒 Mantenha uma reserva de emergência de 6 meses.
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}

export default Home;
