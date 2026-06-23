import { FiSearch, FiUser } from "react-icons/fi";
import styles from "./Topbar.module.css";


function Topbar() {


    return(

        <div  className={styles.topbar}>
            <div className="flex pl-[70px] w-[80wh] space-x-[10px]">
                <input className={styles.searchbar} placeholder="Pesquisa global de finâncias, clientes e metas" />
                <button className={styles.searchbutton}>
                    <FiSearch />
                </button>
            </div>
            <div className="flex w-[20wh] items-center justify-end">
                <button className={styles.accountbutton}>
                    <FiUser />
                </button>
            </div>
        </div>

    );

}

export default Topbar;