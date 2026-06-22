import { FiSearch, FiUser } from "react-icons/fi";
import styles from "./Topbar.module.css";


function Topbar() {


    return(

        <div  className={styles.topbar}>
            <div className="flex pl-[70px] w-[80%] space-x-[10px]">
                <input className={styles.searchbar} placeholder="Global search for budgets, goals, clients" />
                <button className={styles.searchbutton}>
                    <FiSearch />
                </button>
            </div>
            <div className="flex items-center justify-end">
                <button className={styles.accountbutton}>
                    <FiUser />
                </button>
            </div>
        </div>

    );

}

export default Topbar;