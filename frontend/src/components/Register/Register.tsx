import { useContext, useState } from "react";
import styles from "./Register.module.css"
import { registerContext } from "../../context";


function Register() {

    const [PwdVisibility, setPwdVisibility] = useState("password");
    const [eye, setEye] = useState("closedeye");
    const [bgColor, setBgColor] = useState(styles.closed);

    const [familyName, setFamilyName] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const register_context = useContext(registerContext);
    const {checkFamily, register, familyAvaiability} = register_context;

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
                <div className="flex max-sm:flex-col bg-bg-mid max-sm:w-[350px] w-[1200px] h-[700px] rounded-[12px] py-[2px] max-sm:py-6">
                    <div className="flex-col flex justify-center items-center w-[50%] max-sm:w-full">
                        <div className="flex justify-center items-center">
                            <p className="font-bold text-txt max-sm:text-[24px] text-[40px]">Family Register - MyBudget</p>
                        </div>
                        
                        <div className="flex justify-center items-center max-sm:mt-5 mt-10">
                            <input className={styles.input} placeholder="Nome da Família" onChange={(e) => setFamilyName(e.target.value)} required/>
                        </div>

                        <div className="flex justify-center items-center max-sm:mt-5 mt-10 px-[20px]">
                            <p className="text-txt font-bold text-[13px]">Atenção! Se você não tiver criado uma família ainda, digite o nome da família que deseja fazer parte e clique em enviar, isso criará automáticamente sua nova família.</p>
                        </div>

                        <div className="flex justify-center items-center max-sm:mt-5 mt-10">
                            <button className={styles.button} onClick={() => checkFamily(familyName)}>Enviar</button>
                        </div>
                    </div> 
                    <div className="flex-col flex justify-center items-center w-[50%] max-sm:w-full">
                        <div className="flex justify-center items-center">
                            <p className="font-bold text-txt max-sm:text-[32px] text-[48px]">Register - MyBudget</p>
                        </div>
                        <div className="flex justify-center items-center max-sm:mt-5 mt-10">
                            <input className={styles.input} placeholder="Nome de Usuário" onChange={(e) => setName(e.target.value)} required/>
                        </div>
                        <div className="flex justify-center items-center max-sm:mt-5 mt-10">
                            <input className={styles.input} placeholder="Email" onChange={(e) => setEmail(e.target.value)} required/>
                        </div>
                        <div className="flex justify-center items-center max-sm:mt-5 mt-10">
                            <input className={styles.passInput} placeholder="Senha" type={PwdVisibility} onChange={(e) => setPassword(e.target.value)} required/>
                            <button className={bgColor} onClick={toggleVisibility}>
                                <img src={`/${eye}.svg`}></img>
                            </button>
                        </div>

                        {familyAvaiability && 
                            (<div className="flex justify-center items-center mt-10">
                                <button className={styles.button} onClick={() => register(name, email, password, familyName)}>Register</button>
                            </div>)
                        }
                    </div>   
                    
                </div>
            </div>
        </>

    );
}

export default Register;