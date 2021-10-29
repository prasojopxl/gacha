import { Box, BoxTitle } from "../components";
import Layout from "../layout";
import styles from "../styles/page.module.scss";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { apiUrl } from "../config/var";
import Lottie from "react-lottie";
import animationData from "./animation.json";
import axios from "axios";

export default function Home(props) {
    const token = localStorage.getItem("jwtGacha");
    const [numberReward, setNumberReward] = useState([]);
    const [stopAnimate, setStopAnimate] = useState(true);
    const blankRewards = [
        {
            id: "001",
            nama: "Anda Kurang Beruntung",
            image: "blankreward.png",
            jumlah: "1000",
            status: "1",
        },
        {
            id: "002",
            nama: "Anda Kurang Beruntung",
            image: "blankreward.png",
            jumlah: "1000",
            status: "1",
        },
        {
            id: "003",
            nama: "Anda Kurang Beruntung",
            image: "blankreward.png",
            jumlah: "1000",
            status: "1",
        },
        {
            id: "004",
            nama: "Anda Kurang Beruntung",
            image: "blankreward.png",
            jumlah: "1000",
            status: "1",
        },
        {
            id: "005",
            nama: "Silahkan Coba Lagi",
            image: "blankreward.png",
            jumlah: "1000",
            status: "1",
        },
        {
            id: "006",
            nama: "Kurang Beruntung",
            image: "blankreward.png",
            jumlah: "1000",
            status: "1",
        },
    ];
    const dataVoucher = props.dataHadiah.concat(blankRewards);
    const [superGacha, setSuperGacha] = useState(true);
    const [playBtn, setPlayBtn] = useState(true);
    const [reloadBtn, setReloadBtn] = useState(false);
    function randomVoucher(dataVoucher) {
        return dataVoucher[Math.floor(Math.random() * dataVoucher.length)].nama;
    }
    const timeAnimate = 6000;
    const handleClick = () => {
        setNumberReward(randomVoucher(dataVoucher));
        setTimeout(() => {
            setSuperGacha(false);
            setReloadBtn(true);
        }, timeAnimate);
        setStopAnimate(false);
        setPlayBtn(false);
    };
    const handleReload = () => {
        setSuperGacha(true);
        setReloadBtn(false);
        setPlayBtn(true);
    };
    const defaultOptions = {
        loop: false,
        autoplay: false,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    useEffect(() => {
        token === "error" && localStorage.removeItem("jwtGacha");
    }, []);

    return (
        <Layout listHadiah={props.dataHadiah}>
            <Box Height="100%">
                <div className={styles.title}>
                    <h4 className={styles.hideXs}>Collect your prize</h4>
                    <h5>
                        You have <span>1 Tickets</span>
                    </h5>
                </div>
                <div className={styles.boxGame}>
                    <BoxTitle>Gacha Undian Berhadiah</BoxTitle>
                    <div className={styles.containerGacha}>
                        {superGacha === true && (
                            <Lottie
                                options={defaultOptions}
                                height={200}
                                width={200}
                                isStopped={stopAnimate}
                            />
                        )}
                        {superGacha === false && (
                            <div className={styles.resultHadiah}>
                                {numberReward}
                            </div>
                        )}
                    </div>
                    {playBtn && (
                        <a className={styles.btn} onClick={handleClick}>
                            Play
                        </a>
                    )}
                    {reloadBtn && (
                        <a className={styles.btn} onClick={handleReload}>
                            Reload
                        </a>
                    )}
                </div>
            </Box>
        </Layout>
    );
}

export async function getStaticProps() {
    const resDataHadiah = await fetch(`${apiUrl}Hadiah`);
    const dataHadiah = await resDataHadiah.json();
    return {
        props: { dataHadiah },
        revalidate: 1,
    };
}
