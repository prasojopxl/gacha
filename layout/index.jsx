/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import { Fragment } from "react";
import { Header, Box } from "../components";
import { useRouter } from 'next/router'
import { apiUrl, apiUrl2 } from "../config/var";
import styles from "./layout.module.scss"
import { useState, useEffect } from "react";

import axios from "axios";

export default function Layout(props) {
    const [listHadiah, setListHadiah] = useState([]);;
    const router = useRouter();
    const getHadiah = () => {
        axios.get(`${apiUrl2}rest_server?action=hadiah_data`)
            .then((res) => {
                setListHadiah(res.data.data)
            })
    }
    useEffect(() => {
        getHadiah();
    }, [])
    const BoxLeft = () => {
        return (
            <div className={styles.left}>
                <Box Height="100%">
                    <img src="fotoempat1.jpg" alt="banner" />
                    <h4>Undian Berhadiah</h4>
                    {/* <h5>Periode Oktober 2021</h5> */}
                    <ul className={styles.rewards}>
                        {
                            listHadiah.map((item, i) => {
                                return (
                                    <li key={item.id}><span>{i + 1}</span><label>{item.nama}</label></li>
                                )
                            })
                        }
                    </ul>
                    <h6>**Syarat dan ketentuan berlaku</h6>
                </Box>
            </div>
        )
    }

    return (
        <Fragment>
            <Head>
                <title>onetopud.id | Gacha</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Header />
            <div className={styles.bodyweb}>
                <div className={styles.contents}>
                    {router.pathname === "/" ? <div className={styles.hideXs}><BoxLeft /></div> : <BoxLeft />}
                    <div className={styles.right}>
                        {props.children}
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
