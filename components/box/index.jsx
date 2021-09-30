import styles from "./box.module.scss";

export default function Box(props) {
    return (
        <div className={styles.box}>
            {props.children}
        </div>
    )
}
