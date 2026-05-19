import React, {useState, useContext, useRef, useEffect} from 'react'
import styles from "./NavBar.module.css"
import { navBarContext } from '../../context';
import type { Account, Family } from '../../types/requests';
import * as familyAPI from "../../api/endpoints/family";
import { brlFormatter, type infoPanel } from '../../types/types';

function NavBar(props: {account: Account}) {
    const [currentPage, setCurrentPage] = useState(0);
    const [showFamily, setShowFamily] = useState<infoPanel>({visible:false, x:0, y:0});
    const [showAccount, setShowAccount] = useState<infoPanel>({visible:false, x:0, y:0});
    const [showOptions, setShowOptions] = useState<infoPanel>({visible:false, x:0, y:0});
    const accountPanelRef = useRef<HTMLDivElement>(null);
    const accountTriggerRef = useRef<HTMLButtonElement>(null);
    const familyPanelRef = useRef<HTMLDivElement>(null);
    const familyTriggerRef = useRef<HTMLButtonElement>(null);
    const optionsPanelRef = useRef<HTMLDivElement>(null);
    const optionsTriggerRef = useRef<HTMLButtonElement>(null);

    const [family, setFamily] = useState<Family>({family_balance:0,id:"",name:"",relatives:[]});

    const NavBarContext = useContext(navBarContext);

    const {setPage, logout, deleteAccount} = NavBarContext;

    const handlePageSelection = (page:number) => {
        setCurrentPage(page);
        setPage(page);
    } 

    const handleShowFamily = async (e: React.MouseEvent) => {
        const familia: Family = await familyAPI.getFamily(props.account.familyId);
        if (familia) {
            setFamily(familia);
            handleFamilyPanelContext(e);
        }
    }

    const handleCloseAccountPanel = () => {
        setShowAccount(m => m = {...m, visible: false});
    }

    const handleAccountPanelContext = (e: React.MouseEvent) => {
        e.preventDefault();

        if (!accountTriggerRef.current) {
            return
        }
        const rect = accountTriggerRef.current.getBoundingClientRect();
        setShowAccount({visible: true, x:rect.left - 225, y:rect.bottom + 5});
    }

    const handleCloseFamilyPanel = () => {
        setShowFamily(m => m = {...m, visible: false});
    }

    const handleFamilyPanelContext = (e: React.MouseEvent) => {
        e.preventDefault();

        if (!familyTriggerRef.current) {
            return
        }
        const rect = familyTriggerRef.current.getBoundingClientRect();
        setShowFamily({visible: true, x:rect.left - 300, y:rect.bottom + 5});
    }

    const handleCloseOptionsPanel = () => {
        setShowOptions(m => m = {...m, visible: false});
    }

    const handleOptionsPanelContext = (e: React.MouseEvent) => {
        e.preventDefault();

        if (!optionsTriggerRef.current) {
            return
        }
        const rect = optionsTriggerRef.current.getBoundingClientRect();
        setShowOptions({visible: true, x:rect.left - 120, y:rect.bottom + 5});
    }

    useEffect(() => {
        if (!showAccount.visible && !showFamily.visible && !showOptions.visible) {
            return;
        }

        //setDropStyle(styles.dropdownlock);

        const handleClickOutside = (e: MouseEvent) => {
            if (accountPanelRef.current && !accountPanelRef.current.contains(e.target as Node)) {
                handleCloseAccountPanel();
            }

            if (familyPanelRef.current && !familyPanelRef.current.contains(e.target as Node)) {
                handleCloseFamilyPanel();
            }

            if (optionsPanelRef.current && !optionsPanelRef.current.contains(e.target as Node)) {
                handleCloseOptionsPanel();
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            //setDropStyle(styles.dropdown);
        }

    }, [showAccount.visible, showFamily.visible, showOptions.visible])
    
    return(
        <>
            <div className={styles.container}>
                <p className={styles.title}>MyBudget</p>
                <div className='flex space-x-6 max-sm:space-x-1'>
                    <button className={currentPage == 0 ? styles.lock : styles.button} onClick={() => handlePageSelection(0)}>Home</button>
                    <button className={currentPage == 1 ? styles.lock : styles.button} onClick={() => handlePageSelection(1)}>Finances</button>
                </div>
                <div className={styles.icons}>
                    <button onClick={handleAccountPanelContext} ref={accountTriggerRef}>
                        <img src="/account.svg" className={styles.account}></img>
                    </button>
                    <button onClick={(e) => handleShowFamily(e)} ref={familyTriggerRef}>
                        <img src="/family.svg" className={styles.family}></img>
                    </button>
                    <button onClick={handleOptionsPanelContext} ref={optionsTriggerRef}>
                        <img src="/utilities.svg" className={styles.utils}></img>
                    </button>
                </div>
            </div>

            {showAccount.visible && (
                <div ref={accountPanelRef} className={styles.accountPanel} style={{position: 'fixed', top:`${showAccount.y}px`, left: `${showAccount.x}px`, zIndex:1000}}>
                    <p className={styles.idParagraph}>Id: {props.account.id} </p>
                    <p className={styles.infoParagraph}>Nome: {props.account.username} </p>
                    <p className={styles.infoParagraph}>Email: {props.account.email} </p>
                    <p className={styles.infoParagraph}>Saldo: {brlFormatter.format(props.account.balance)} </p>
                    <p className={styles.infoParagraph}>Família: {props.account.family_name} </p>
                </div>
            )}

            {showFamily.visible && (
                <div ref={familyPanelRef} className={styles.familyPanel} style={{position: 'fixed', top:`${showFamily.y}px`, left: `${showFamily.x}px`, zIndex:1000}}>
                    <p className={styles.idParagraph}>Id: {family.id}</p>
                    <p className={styles.infoParagraph}>Família: {family.name}</p>
                    <p className={styles.infoParagraph}>Saldo Familiar: {brlFormatter.format(family.family_balance)}</p>
                    <p className={styles.infoParagraph}>Membros:</p>
                    {family.relatives.map((relative) => (
                        <p className={styles.relativesParagraph}>Nome: {relative.username} | saldo: {brlFormatter.format(relative.balance)}</p>
                    ))}
                </div>
            )}

            {showOptions.visible && (
                <div ref={optionsPanelRef} className={styles.optionsPanel} style={{position: 'fixed', top:`${showOptions.y}px`, left: `${showOptions.x}px`, zIndex:1000}}>
                    <button onClick={logout} className='w-full h-[60px] text-center text-txt hover:bg-bg active:opacity-70'>
                        Sair
                    </button>
                    <button onClick={deleteAccount} className='w-full h-[60px] text-center text-txt hover:bg-bg active:opacity-70'>
                        Deletar Conta
                    </button>
                </div>
            )}
        </>
        
    );
}

export default NavBar;