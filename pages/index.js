import { Box, BoxTitle } from "../components";
import Layout from "../layout";
import styles from "../styles/page.module.scss";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { apiUrl, apiUrl2 } from "../config/var";
import Lottie from "react-lottie";
import animationData from "./animation.json";
import axios from "axios";

export default function Home(props) {
    const token = localStorage.getItem("jwtGacha");
    // const [numberReward, setNumberReward] = useState([]);
    const [idHadiah, setIdHadiah] = useState([]);
    const [user, setUser] = useState([]);
    const [stopAnimate, setStopAnimate] = useState(true);
    const [sisaKesempatan, setSisaKesempatan] = useState("");
    const blankRewards = [
        {
            id: "001",
            nama: "Anda Kurang Beruntung",
            image: "noreward.svg",
            jumlah: "1000",
            status: "1",
        },
        {
            id: "002",
            nama: "Anda Kurang Beruntung",
            image: "noreward.svg",
            jumlah: "1000",
            status: "1",
        },
        {
            id: "003",
            nama: "Anda Kurang Beruntung",
            image: "noreward.svg",
            jumlah: "1000",
            status: "1",
        },
    ];
    const dataVoucher = props.dataHadiah.data.concat(blankRewards);
    // const dataVoucher = props.dataHadiah.data;
    const [superGacha, setSuperGacha] = useState(true);
    const [playBtn, setPlayBtn] = useState(true);
    const [reloadBtn, setReloadBtn] = useState(false);
    function randomVoucher(dataVoucher) {
        return dataVoucher[Math.floor(Math.random() * dataVoucher.length)].id;
    }

    const randomHadiah = () => {};
    const getRandomHadiah = () => {
        localStorage.setItem("nextReward", idHadiah);
    };
    const timeAnimate = 6000;
    const handleClick = () => {
        setIdHadiah(randomVoucher(dataVoucher));
        randomHadiah();
        getRandomHadiah();
        setTimeout(() => {
            setSuperGacha(false);
            setReloadBtn(true);
            // setNumberReward(randomVoucher(dataVoucher));
        }, timeAnimate);
        setStopAnimate(false);
        setPlayBtn(false);
        axios.post(
            `${apiUrl2}user_edit?action=${localStorage.getItem("idVoucher")}`
        );
    };
    const handleReload = () => {
        var sisaKesempatan = user[0].sisa_kesempatan;
        setSuperGacha(true);
        setReloadBtn(false);
        if (sisaKesempatan === "0") {
            setPlayBtn(false);
            alert("sisa vouche habis");
        } else {
            setPlayBtn(true);
        }
    };
    const defaultOptions = {
        loop: false,
        autoplay: false,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };
    const getUser = () => {
        axios
            .get(
                `${apiUrl2}user_data?action=${localStorage.getItem(
                    "idVoucher"
                )}`
            )
            .then((res) => {
                setUser(res.data.data);
                setSisaKesempatan(res.data.data[0].sisa_kesempatan);
            });
    };
    const exitApp = () => {
        localStorage.removeItem("jwtGacha");
        window.location.href = "/";
    };

    useEffect(() => {
        token === "error" && localStorage.removeItem("jwtGacha");
        getUser();
        setIdHadiah(randomVoucher(dataVoucher));
    }, []);

    return (
        <Layout listHadiah={props.dataHadiah}>
            <Box Height="100%">
                <div className={styles.title}>
                    <h4 className={styles.hideXs}>Kumpulkan Hadiahmu</h4>
                    <div className={styles.titleSisa}>
                        <h5>
                            Sisa Voucher <span>{sisaKesempatan} | </span>
                        </h5>
                        <div
                            onClick={exitApp}
                            style={{
                                color: "red",
                                display: "inline-block",
                                marginLeft: "5px",
                                cursor: "pointer",
                            }}
                        >
                            Keluar
                        </div>
                    </div>
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
                                hadiahnya: {idHadiah}
                            </div>
                        )}
                    </div>
                    {user.map((item) => {
                        return (
                            <div key={item.id}>
                                {item.sisa_kesempatan !== "0" && playBtn && (
                                    <a
                                        className={styles.btn}
                                        onClick={handleClick}
                                    >
                                        Play
                                    </a>
                                )}
                                {reloadBtn && (
                                    <a
                                        className={styles.btn}
                                        onClick={handleReload}
                                    >
                                        Reload
                                    </a>
                                )}
                            </div>
                        );
                    })}
                </div>
            </Box>
        </Layout>
    );
}

export async function getStaticProps() {
    const resDataHadiah = await fetch(
        `${apiUrl2}rest_server?action=hadiah_data`
    );
    const dataHadiah = await resDataHadiah.json();
    return {
        props: { dataHadiah },
        revalidate: 1,
    };
}
