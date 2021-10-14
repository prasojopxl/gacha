/* eslint-disable @next/next/no-img-element */
import { Box, BoxTitle } from "../components";
import Layout from "../layout";
import styles from "../styles/page.module.scss";
import Link from "next/link";
import { useState } from "react";
import { apiUrl } from "../config/var";


export default function Page(props) {
    const [number, setNumber] = useState([])
    const dataVoucher = [
        {
            id: 0,
            code: "ABC000",
            hadiah: "Smartphone",
            status: "active"
        },
        {
            id: 1,
            code: "ABC111",
            hadiah: "Pulsa 20rb",
            status: "active"
        },
        {
            id: 2,
            code: "ABC222",
            hadiah: "Smart TV",
            status: "active"
        },
        {
            id: 3,
            code: "ABC333",
            hadiah: "Kurang Beruntung",
            status: "active"
        },
    ];
    const [superGacha, setSuperGacha] = useState(true)
    const [showElement, setShowElement] = useState(true)
    const [hideMe, setHideMe] = useState(true)
    function randomVoucher(dataVoucher) {
        return dataVoucher[Math.floor(Math.random() * dataVoucher.length)].hadiah;
    }
    const timeAnimate = 6000;
    const handleClick = () => {
        setNumber(randomVoucher(dataVoucher))
        setShowElement(false)
        setTimeout(() => {
            setShowElement(true)
        }, timeAnimate)
        setTimeout(() => {
            setSuperGacha(false)
        }, timeAnimate)
        setHideMe(false)
    };
    const handleReload = () => {
        setShowElement(true)
        setSuperGacha(true)
        setTimeout(() => {
            setHideMe(true)
        }, timeAnimate)
    }

    return (
        <Layout listHadiah={props.dataHadiah}>
            <Box Height="100%">
                <div className={styles.title}>
                    <h4 className={styles.hideXs}>Collect your prize</h4>
                    <h5>You have <span>1 Tickets</span></h5>
                </div>
                <div className={styles.boxGame}>
                    <BoxTitle>Gacha Undian Berhadiah</BoxTitle>
                    <div className={styles.containerGacha}>
                        {
                            superGacha ?
                                showElement ? <img src="static-gacha.svg" alt="gacha" width={134} style={{ position: "relative", top: 14 }} /> : <img src="onetopup.gif" alt="gacha" />
                                : <div className={styles.resultHadiah}>{number}</div>
                        }


                    </div>
                    {
                        hideMe ? <a className={styles.btn} onClick={handleClick}>Play</a> : <a className={styles.btn} onClick={handleReload}>Reload</a>
                    }


                </div>
            </Box>
        </Layout>
    )
}

export async function getStaticProps() {
    const resDataHadiah = await fetch(`${apiUrl}Hadiah`);
    const dataHadiah = await resDataHadiah.json();
    return {
        props: { dataHadiah },
        revalidate: 1,
    };
}
