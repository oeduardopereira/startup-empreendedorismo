import { FiCreditCard } from "react-icons/fi";
import { brlFormatter } from "../../types/types";
import styles from "./BudgetCard.module.css";

function BudgetCard() {
    const totalBudget = 5800;
    const spent = 1750;
    const remaining = totalBudget - spent;
    const dailySafe = (remaining / 20).toFixed(2); // ~20 days left in month
    const percentage = (remaining / totalBudget) * 100;

    // Circle ring math
    const radius = 70;
    const circumference = 2 * Math.PI * radius;
    const dashOffset = circumference - (percentage / 100) * circumference;

    return (
        <div className={styles.card}>
            <div className="flex justify-between items-center">
                <div className="text-dark-green w-[60px] h-[60px] flex items-center justify-center bg-green-100 rounded-[30px]">
                    <div className="scale-[170%]">
                        <FiCreditCard />
                    </div>
                </div>
                <p className="text-dark-green font-light text-[24px]">Orçamento Mensal</p>
            </div>

            {/* Ring */}
            <div className="flex items-center justify-center mt-4">
                <svg width="170" height="170" viewBox="0 0 170 170">
                    <circle cx="85" cy="85" r={radius} fill="none" stroke="#E5E7EB" strokeWidth="12" />
                    <circle
                        cx="85"
                        cy="85"
                        r={radius}
                        fill="none"
                        stroke="#003739"
                        strokeWidth="12"
                        strokeDasharray={circumference}
                        strokeDashoffset={dashOffset}
                        strokeLinecap="round"
                        transform="rotate(-90 85 85)"
                    />
                    <text x="85" y="80" textAnchor="middle" className="font-bold" style={{ fontSize: 20, fill: "#003739", fontWeight: 700 }}>
                        {brlFormatter.format(remaining)}
                    </text>
                    <text x="85" y="100" textAnchor="middle" style={{ fontSize: 12, fill: "#6B7280" }}>
                        restante
                    </text>
                </svg>
            </div>

            {/* Footer stats */}
            <div className="flex justify-between mt-2 px-2">
                <div className="flex-col">
                    <p className="text-gray-400 text-[11px] uppercase font-semibold">Orçamento Total</p>
                    <p className="text-dark-green font-bold text-[16px]">{brlFormatter.format(totalBudget)}</p>
                </div>
                <div className="flex-col text-right">
                    <p className="text-gray-400 text-[11px] uppercase font-semibold">Gasto Seguro</p>
                    <p className="text-dark-green font-bold text-[16px]">
                        R$ {dailySafe}<span className="text-gray-400 text-[11px] font-normal">/dia</span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default BudgetCard;
