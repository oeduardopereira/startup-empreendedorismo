import { brlFormatter } from "../../types/types";
import styles from "./GoalProgressCard.module.css";

type GoalProgressCardProps = {
    label: string;
    icon: string;
    target: number;
    current: number;
    deadline: string;
    status: string;
    statusColor: string; // tailwind classes e.g. "bg-sec-light-green text-sec-dark-green"
    barColor: string;    // tailwind class e.g. "bg-sec-main-green"
};

function GoalProgressCard({ label, icon, target, current, deadline, status, statusColor, barColor }: GoalProgressCardProps) {
    const percentage = Math.min((current / target) * 100, 100);

    return (
        <div className={styles.card}>
            <div className="flex justify-between items-center">
                <div className="text-[28px]">{icon}</div>
                <span className={`text-[12px] font-semibold px-3 py-1 rounded-full ${statusColor}`}>
                    {status}
                </span>
            </div>

            <p className="text-dark-green font-bold text-[20px] mt-3">{label}</p>
            <p className="text-gray-400 text-[13px]">Meta: {brlFormatter.format(target)} • {deadline}</p>

            <div className="flex items-center justify-between mt-4">
                <p className="text-dark-green font-semibold text-[15px]">{brlFormatter.format(current)} poupados</p>
                <p className="text-dark-green font-bold text-[15px]">{Math.round(percentage)}%</p>
            </div>

            {/* Progress bar */}
            <div className="w-full h-[8px] rounded-[16px] flex mt-2">
                <div className={`${barColor} h-full rounded-l-[16px]`} style={{ width: `${percentage}%` }} />
                <div className="bg-gray-200 h-full rounded-r-[16px]" style={{ width: `${100 - percentage}%` }} />
            </div>
        </div>
    );
}

export default GoalProgressCard;
