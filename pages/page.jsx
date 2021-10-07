/* eslint-disable @next/next/no-img-element */
import { Box, BoxTitle } from "../components";
import Layout from "../layout";
import styles from "../styles/page.module.scss";
import Link from "next/link";
import { useState } from "react";

export default function Page() {
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
    function randomVoucher(dataVoucher) {
        return dataVoucher[Math.floor(Math.random() * dataVoucher.length)].hadiah;
    }

    const handleClick = () => {
        setNumber(randomVoucher(dataVoucher))
    };

    return (
        <Layout>
            <Box Height="100%">
                <div className={styles.title}>
                    <h4 className={styles.hideXs}>11Collect your prize</h4>
                    <h5>You have <span>1 Tickets</span></h5>
                </div>

                <div className={styles.boxGame}>
                    <BoxTitle>Gacha Undian Berhadiah</BoxTitle>
                    <div className={styles.containerGacha}>
                        <img src="gacha.svg" alt="gacha" />
                        <p>{number}</p>
                    </div>
                    <a className={styles.btn} onClick={handleClick}>Play</a>
                </div>
            </Box>
        </Layout>
    )
}
