import { useContext, useEffect, useRef, useState } from "react";
import styles from "./Dropdown.module.css"
import { type dropProperties } from "../../types/types";
import { dropContext } from "../../context";

function Dropdown(props: {options: string[], FreqDrop: boolean}) {

    const [dropdown, setDropdown] = useState<dropProperties>({visible:false, x:0, y:0});
    const dropRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const [currentOpt, setCurrentOpt] = useState(props.options[0]);

    const context = useContext(dropContext);
    const {sendFreq, sendType} = context;

    const handleCloseDropdown = () => {
        setDropdown(m => m = {...m, visible: false});
    }

    const handleContextDropdown = (e: React.MouseEvent) => {
        e.preventDefault();

        if (!triggerRef.current) {
            return
        }
        const rect = triggerRef.current.getBoundingClientRect();
        setDropdown({visible: true, x:rect.left - 215, y:rect.top + 5});
    }

    useEffect(() => {
        if (!dropdown.visible) {
            return;
        }

        //setDropStyle(styles.dropdownlock);

        const handleClickOutside = (e: MouseEvent) => {
            if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
                handleCloseDropdown();
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            //setDropStyle(styles.dropdown);
        }

    }, [dropdown.visible])


    const handleOptionClick = (option: string) => {
        setCurrentOpt(option);
        handleCloseDropdown();
        if (props.FreqDrop) {
            sendFreq(option);
        } else {
            sendType(option);
        }
    }

    return(
        <>
            <div ref={triggerRef} className={styles.drop} onClick={handleContextDropdown}>
                <div className="w-[10px] h-full flex justify-center items-center rotate-180">
                    <img src="/dropsinal.svg"></img>
                </div>
                <div className="px-[10px] text-txt font-semibold">
                    {currentOpt}
                </div>
            </div>
            {dropdown.visible && (<div ref={dropRef} style={{position: 'relative', top:`5px`}}
                className={styles.options}>
                <ul>
                    {props.options.map((value) => (
                        <li className={styles.listopt} onClick={() => (handleOptionClick(value))}>
                            {value}
                        </li>
                    ))}
                </ul>
            </div>)}
        </>
        
    );
}

export default Dropdown;