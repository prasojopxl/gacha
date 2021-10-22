/* eslint-disable @next/next/no-img-element */
import { Box, BoxTitle } from "../components";
import Layout from "../layout";
import styles from "../styles/page.module.scss";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { apiUrl } from "../config/var";
import Lottie from 'react-lottie';
import animationData from './animation.json';

export default function Page(props) {
    const [number, setNumber] = useState([])
    const [stopAnimate, setStopAnimate] = useState(true)
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
    const [playBtn, setPlayBtn] = useState(true)
    const [reloadBtn, setReloadBtn] = useState(false)
    function randomVoucher(dataVoucher) {
        return dataVoucher[Math.floor(Math.random() * dataVoucher.length)].hadiah;
    }
    const timeAnimate = 6000;
    const handleClick = () => {
        setNumber(randomVoucher(dataVoucher))
        setTimeout(() => {
            setSuperGacha(false)
            setReloadBtn(true)
        }, timeAnimate)
        setStopAnimate(false)
        setPlayBtn(false)

    };
    const handleReload = () => {
        setSuperGacha(true)
        setReloadBtn(false)
        setPlayBtn(true)
    }
    const defaultOptions = {
        loop: false,
        autoplay: false,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

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
                            superGacha === true &&
                            <Lottie
                                options={defaultOptions}
                                height={200}
                                width={200}
                                isStopped={stopAnimate}
                            />
                        }
                        {
                            superGacha === false &&
                            <div className={styles.resultHadiah}>{number}</div>
                        }

                    </div>
                    {
                        playBtn && <a className={styles.btn} onClick={handleClick}>Play</a>
                    }
                    {
                        reloadBtn && <a className={styles.btn} onClick={handleReload}>Reload</a>
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
