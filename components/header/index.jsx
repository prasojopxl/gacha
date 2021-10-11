/* eslint-disable @next/next/no-img-element */
import { baseUrl } from "../../config/var";
import Link from "next/link";
import styles from "./header.module.scss";
import { useState } from "react";

function HeaderMenu() {
    return (
        <ul>
            <li><Link href="https://onetopup.id/"><a>Home</a></Link></li>
            <li><Link href="https://onetopup.id/status"><a>Cek Pesanan</a></Link></li>
            <li><Link href="https://onetopup.id/user/login"><a>Masuk</a></Link></li>
        </ul>
    )
}


export default function Header() {
    const [displayMenu, setDisplayMenu] = useState(false)
    const showMenu = () => displayMenu === false ? setDisplayMenu(true) : setDisplayMenu(false)


    return (
        <div className={styles.header}>
            <div className={styles.contents}>
                <Link href={baseUrl}>
                    <a><img src="logo.png" alt="logo" /></a>
                </Link>
                <HeaderMenu />

                <div className={styles.navMobile} onClick={showMenu}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
            {
                displayMenu === true && <div className={styles.mobileMenu}><HeaderMenu /></div>
            }

        </div>
    )
}
