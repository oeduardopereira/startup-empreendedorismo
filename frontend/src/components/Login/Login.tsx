import { useContext, useState } from "react";
import styles from "./Login.module.css"
import { loginContext } from "../../context";

function Login() {

    const [PwdVisibility, setPwdVisibility] = useState("password");
    const [eye, setEye] = useState("closedeye");
    const [bgColor, setBgColor] = useState(styles.closed);

    const login_context = useContext(loginContext);
    const {login, register} = login_context;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const toggleVisibility = () => {
        if (PwdVisibility === "password") {
            setPwdVisibility("text");
            setEye("openeye");
            setBgColor(styles.open);
        } else {
            setPwdVisibility("password");
            setEye("closedeye")
            setBgColor(styles.closed);
        }
    }

    return(
        <>
        <div className="h-[100vh] flex justify-center items-center">
            <div className="flex flex-col bg-bg-mid max-sm:w-[350px] w-[600px] h-[400px] rounded-[12px] py-[2px]">
                <div className="flex justify-center items-center">
                    <p className="font-bold text-txt max-sm:text-[32px] text-[48px]">Login - MyBudget</p>
                </div>
                <div className="flex justify-center items-center mt-10">
                    <input className={styles.input} placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)} required/>
                </div>
                <div className="flex justify-center items-center mt-10">
                    <input className={styles.passInput} placeholder="Senha" type={PwdVisibility}
                    onChange={(e) => setPassword(e.target.value)} required/>
                    <button className={bgColor} onClick={toggleVisibility}>
                        <img src={`/${eye}.svg`}></img>
                    </button>
                </div>
                <div className="flex justify-center items-center mt-10">
                    <button className={styles.button} onClick={() => login(email, password)}>Login</button>
                </div>
                <div className="flex justify-center mt-5">
                    <p className="text-txt font-bold text-[10px] hover:underline hover:cursor-pointer"
                    onClick={() => register(false)}>Não possui conta? Clique aqui para se registrar!</p>
                </div>
            </div>
        </div>

    </>
    );
}

export default Login;