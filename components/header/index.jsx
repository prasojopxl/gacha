/* eslint-disable @next/next/no-img-element */
import styles from "./header.module.scss";

export default function Header() {
    return (
        <div className={styles.header}>
            <div className={styles.contents}>
                <a href="#"><img src="/logo.png" alt="logo" /></a>
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Cek Pesanan</a></li>
                    <li><a href="#">Masuk</a></li>
                </ul>
            </div>
        </div>
    )
}
