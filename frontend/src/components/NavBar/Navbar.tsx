import { FiInfo, FiShoppingBag, FiTrendingUp } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./Navbar.module.css"

type pages = {
    name: string,
    path: string,
    icon: string
}

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();

    const PAGES: pages[] = [
        {name: "Home", path: "/home", icon: "FiInfo"},
        {name: "Finâncias", path: "/financas", icon: "FiShoppingBag"},
        {name: "Investimentos", path: "/investimentos", icon: "FiTrendingUp"},
    ]

    return(
        <>
            <div className={styles.navbar}>
                <div className={styles.title}>
                    FinDuo
                </div>
                <div className="mt-10">
                    <ul className={styles.pagelist}>
                        {PAGES.map((page) => (
                            <li key={page.path} className="flex items-center justify-center">
                                <button
                                    className={styles.pagebutton}
                                    onClick={() => navigate(page.path)}
                                    style={location.pathname === page.path
                                        ? { opacity: 1, fontWeight: "bold" }
                                        : { opacity: 0.6 }
                                    }
                                >
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
