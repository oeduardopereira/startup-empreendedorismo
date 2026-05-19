import NavBar from "./components/NavBar/NavBar.tsx"
import Body from "./Body.tsx"
import Login from "./components/Login/Login.tsx"
import Register from "./components/Register/Register.tsx";
import * as accountAPI from "./api/endpoints/account.ts";
import * as familyAPI from "./api/endpoints/family.ts"
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { 
    navBarContext, 
    type LoginContext, 
    loginContext,
    registerContext,
    type RegisterContext,
    type NavBarContext
 } from "./context.ts";
import { useEffect, useState } from "react";
import type { Account } from "./types/requests.ts";

function App() {

    //Control Variables -----------------------------------
    const [currentPage, setCurrentPage] = useState(0);
    const [loggedIn, setLogin] = useState(false);
    const [registered, setRegistration] = useState(true);
    const [familyExists, setFamilyExists] = useState(false);

    //Session variables -----------------------------------
    const [familyId, setFamilyId] = useState("");
    const [account, setAccount] = useState<Account>({id:"", balance: 0, budgets: [], email: "", family_name: "", familyId: "", username: ""});

    const NavBarContextValue: NavBarContext = {
        setPage: (page: number) => {
            setCurrentPage(page);
        },
        logout: () => {
            setLogin(false);
            setFamilyId("");
            setAccount({id:"", balance: 0, budgets: [], email: "", family_name: "", familyId: "", username: ""});
            setFamilyExists(false);
            localStorage.clear();
        },
        deleteAccount: async () => {
            const status = await accountAPI.deleteAccount(account.id);
            if (status == 200) {
                setLogin(false);
                setFamilyId("");
                setAccount({id:"", balance: 0, budgets: [], email: "", family_name: "", familyId: "", username: ""});
                setFamilyExists(false);
                localStorage.clear();
            }
        }
            

            
    }

    const LoginContextValue: LoginContext = {
        login: async (email: string, password: string) => {
            console.log(`email: ${email} | senha: ${password}`);
            if (email == "" || password == "") {
                toast.error("Email e a Senha devem estar preenchidos!");
                return;
            }
            const accountData = await accountAPI.login(email, password);
            console.log(JSON.stringify(accountData));
            if (accountData != -1) {
                const token = accountData.token;
                const account: Account = accountData.account;
                console.log(`logou?: ${account.id}`)
                if (account != null) {
                    toast.success("Você entrou com successo, " + account.username);
                    setLogin(true);
                    localStorage.setItem("AccountToken", token);
                    localStorage.setItem("AccountData", JSON.stringify(account))
                    setAccount(account);
                } else {
                    toast.error("Erro interno do servidor. Tente novamente.")
                }
            } else {
                toast.error("Email ou Senha inválido(s)!");
            }
            
        },
        register: (value:boolean) => setRegistration(value)
    }

    const RegisterContextValue: RegisterContext = {
        checkFamily: async (familyName:string) => {
            console.log(`family_name: ${familyName}`)
            if (familyName != "" && familyName != null) {
                const family_id = await familyAPI.checkFamily(familyName);
                if (family_id != null && family_id != "" && family_id != -1) {
                    console.log(`Resposta recebida! Id de família: ${family_id}`)
                    toast.success("Família criada/encontrada com sucesso!")
                    setFamilyExists(true);
                    setFamilyId(family_id)
                } else {
                    toast.error("Erro interno do servidor. Tente novamente.")
                }
            } else {
                toast.error("Você deve especificar uma família para se registrar!")
            }
        },

        register: async (name:string, email:string, password:string, family:string) => {
            console.log(`name: ${name} | email: ${email} | password: ${password} | family_name: ${family}`)
            if (name == "" || email == "" || password == "" || family == "") {
                toast.error("Todos os campos devem estar preenchidos!");
                return;
            }
            const accountData = await accountAPI.createAccount(name, email, password, family);
            if (accountData != null && accountData != -1) {
                console.log(`Resposta recebida ===> Id de conta: ${JSON.stringify(accountData)}`)
                toast.success("Conta criada com sucesso!");
                setLogin(true);
                setRegistration(true);
                const newAccount: Account = {
                    id: accountData.account_id,
                    username: name,
                    email: email,
                    balance: 0,
                    budgets: [],
                    family_name: family,
                    familyId: familyId
                }
                setAccount(newAccount);
                localStorage.setItem("AccountData", JSON.stringify(newAccount));
                localStorage.setItem("AccountToken", accountData.token);
            } else {
                toast.error("Um erro ocorreu ao criar sua conta... Tente novamente mais tarde.");
            }
        },
        familyAvaiability: familyExists

    }

    useEffect(() => {
        console.log(`account => ${JSON.stringify(account)}`)
    }, [account])

    useEffect(() => {
        const checkLogin = async () => {
            const userData = localStorage.getItem("AccountData");
            if (userData) {
                const acc: Account = JSON.parse(userData);
                const info = await accountAPI.getAccount(acc.id);
                console.log(JSON.stringify(info));
                if (info != -1 && info != null) {
                    setAccount(info);
                    setLogin(true);
                } else {
                    localStorage.clear();
                    setLogin(false);
                }
            }
        }
        
        checkLogin();
    }, [])

    if (loggedIn) {
        return (
            <>  
                <navBarContext.Provider value={NavBarContextValue}>
                <NavBar account={account}/>
                </navBarContext.Provider>
                <Body currentPage={currentPage} account={account}/>
            </>
        );
    } else if (registered) {
        return (
            <>  
                <loginContext.Provider value={LoginContextValue}>
                <Login />
                </loginContext.Provider>
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
    } else {
        return (
            <>
                <registerContext.Provider value={RegisterContextValue}>
                <Register />
                </registerContext.Provider>
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
    
}

export default App;