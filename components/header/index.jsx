/* eslint-disable @next/next/no-img-element */
import { baseUrl } from "../../config/var";
import Link from "next/link";
import styles from "./header.module.scss";

export default function Header() {
    return (
        <div className={styles.header}>
            <div className={styles.contents}>
                <Link href={baseUrl + "/"}>
                    <a><img src="logo.png" alt="logo" /></a>
                </Link>

                <ul>
                    <li><Link href="#"><a>Home</a></Link></li>
                    <li><Link href="#"><a>Cek Pesanan</a></Link></li>
                    <li><Link href="#"><a>Masuk</a></Link></li>
                </ul>
            </div>
        </div>
    )
}
