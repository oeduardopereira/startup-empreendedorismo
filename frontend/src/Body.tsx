//Deve renderizar o corpo de todas as páginas dinamicamente.
import Home from "./components/Home/Home.tsx"
import Finances from "./components/Finances/Finances.tsx"
import type { Account } from "./types/requests.ts";
import { useEffect, useState } from "react";
import { bodyContext, type BodyContext } from "./context.ts";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import Planner from "./components/Planner/Planner.tsx"


function Body(props: {currentPage:number, account: Account}) {

    const [account, setAccount] = useState<Account>(props.account);

    const BodyContextValue: BodyContext = {
        updateAccount: (acc: Account) => {
            setAccount(acc);
            localStorage.setItem("AccountData", JSON.stringify(acc));
        }
    }

    useEffect(() => {
        toast.success("Login efetuado com sucesso!");
    }, [])

    return(
        <>
            <bodyContext.Provider value={BodyContextValue}>
            {
                (props.currentPage == 0 ? <Home account={account}/> : <Finances account={account}/>)
            }
            </bodyContext.Provider>
            <ToastContainer
                position="top-right"
                autoClose={3500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={true}
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover={false}
                theme="colored"
                transition={Bounce}
            />
        </>
    );
}

export default Body;