import { FiInfo, FiShoppingBag, FiTrendingUp } from "react-icons/fi";
import styles from "./Navbar.module.css"

type pages = {
    name: string,
    path: string,
    icon: string
}

function Navbar() {

    const PAGES: pages[] = [
        {name: "Home", path: "../../pages/Home/Home.tsx", icon: "FiInfo"},
        {name: "Finâncias", path: "../../pages/Finances/Finances.tsx", icon: "FiShoppingBag"},
        {name: "Investimentos", path: "../../pages/Investiments/Investiments.tsx", icon: "FiTrendingUp"},
    ]

    return(
        <>
        
            <div className={styles.navbar}>
                <div className={styles.title}>
                    [NOME]
                </div>
                <div className="mt-10">
                    <ul className={styles.pagelist}>
                        {PAGES.map((page) => (
                            <li className="flex items-center justify-center">
                                <button className={styles.pagebutton}>
                                    {page.icon === "FiInfo" ? (
                                        <FiInfo />
                                    ) : page.icon === "FiShoppingBag" ? (
                                        <FiShoppingBag />
                                    ) : (
                                        <FiTrendingUp />
                                    )}
                                    <p>{page.name}</p>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        
        </>
    );

}

export default Navbar;