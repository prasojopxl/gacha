import styles from "./boxtitle.module.scss";

export default function BoxTitle(props) {
    return (
        <div className={styles.box}>
            <div className={styles.content}>
                <span>{props.children}</span>
            </div>
        </div>
    )
}
