import styles from "./Panel.module.css"

function Panel(props: {title: string, text: string}) {
    return (
        <div className={styles.panel}>
            <p className="font-semibold text-[28px] text-center">{props.title}</p>
            <hr className="border-[0.5px] border-bg-mid"></hr>
            <p className="text-left">{props.text}</p>
            
        </div>
    );
}

export default Panel;