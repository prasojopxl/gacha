/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import { Fragment } from "react";
import { Header, Box } from "../components";
import { useRouter } from 'next/router'
import styles from "./layout.module.scss"

export default function Layout(props) {
    function BoxLeft() {
        return (
            <div className={styles.left}>
                <Box Height="100%">
                    <img src="sidebaner.png" srcSet="sidebaner.png 1x, sidebar@2x.jpg 2x" alt="sidebar image" />
                    <h4>Undian Berhadiah</h4>
                    <h5>Periode October 2021</h5>
                    <ul className={styles.rewards}>
                        <li><span>1</span>Hadiah  Utama</li>
                        <li><span>2</span>Hadiah  Utama</li>
                        <li><span>3</span>Hadiah  Utama</li>
                        <li><span>4</span>Hadiah  Utama</li>
                    </ul>
                    <h6>**Syarat dan ketentuan berlaku</h6>
                </Box>
            </div>
        )
    }
    const router = useRouter();
    return (
        <Fragment>
            <Head>
                <title>onetopud.id | Gacha</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Header />
            <div className={styles.bodyweb}>
                <div className={styles.contents}>
                    {router.pathname === "/page" && <BoxLeft />}
                    <div className={styles.right}>
                        {props.children}
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
