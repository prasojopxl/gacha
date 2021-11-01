import { Box, BoxTitle } from "../components";
import Layout from "../layout";
import styles from "../styles/page.module.scss";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { apiUrl, apiUrl2, imageUrl } from "../config/var";
import Lottie from "react-lottie";
import animationData from "./animation.json";
import axios from "axios";

export default function Home(props) {
    const token = localStorage.getItem("jwtGacha");
    // const [numberReward, setNumberReward] = useState([]);
    const [idHadiah, setIdHadiah] = useState([]);
    const [detailHadiah, setDetailHadiah] = useState([]);
    const [user, setUser] = useState([]);
    const [stopAnimate, setStopAnimate] = useState(true);
    const [sisaKesempatan, setSisaKesempatan] = useState("");
    const [oldUser, setOldUser] = useState(false);

    const blankRewards = [
        {
            id: "100001",
            nama: "Anda Kurang Beruntung",
            image: "noreward.svg",
            jumlah: "1000",
            status: "1",
        },
        {
            id: "100002",
            nama: "Anda Kurang Beruntung",
            image: "noreward.svg",
            jumlah: "1000",
            status: "1",
        },
        {
            id: "100003",
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

    const randomHadiah = () => {
        axios.get(`${apiUrl2}get_hadiah?action=${idHadiah}`).then((res) => {
            setDetailHadiah(res.data.data);
        });
    };
    const getRandomHadiah = () => {
        localStorage.setItem("nextReward", idHadiah);
    };
    const timeAnimate = 6000;
    const handleClick = () => {
        randomHadiah();
        getRandomHadiah();
        setTimeout(() => {
            setSuperGacha(false);
            setReloadBtn(true);
            // setNumberReward(randomVoucher(dataVoucher));
        }, timeAnimate);
        setStopAnimate(false);
        setPlayBtn(false);
        axios
            .post(
                `${apiUrl2}user_edit?action=${localStorage.getItem(
                    "idVoucher"
                )}`
            )
            .then((res) => {});
        axios
            .post(`${apiUrl2}hadiah_edit?action=${idHadiah}`)
            .then((res) => {});
    };
    const handleReload = () => {
        setIdHadiah(randomVoucher(dataVoucher));
        var sisaKesempatan = user[0].sisa_kesempatan;
        setSuperGacha(true);
        setReloadBtn(false);
        if (sisaKesempatan === "0") {
            setPlayBtn(false);
            alert("sisa vouche habis");
        } else {
            setPlayBtn(true);
        }

        // submit data
        console.log("Vouchernya: " + localStorage.getItem("idVoucher"));
        console.log("Hadiahnya : " + idHadiah);
        axios
            .post(
                `${apiUrl2}get_item?action=${localStorage.getItem(
                    "idVoucher"
                )}&hadiah=${idHadiah}`
            )
            .then((res) => {
                console.log(res);
            })
            .catch((error) => {
                console.log(error);
            });
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
                res.data.data[0].sisa_kesempatan == 0 && setOldUser(true);
            })
            .catch((error) => {
                window.location.href = "/";
                localStorage.removeItem("jwtGacha");
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
            {setOldUser ? (
                <Box Height="100%">
                    <div className={styles.boxBlankPage}>
                        <h4 className={styles.blankWord}>
                            Voucher Sudah Habis :({" "}
                        </h4>
                    </div>
                </Box>
            ) : (
                <Box Height="100%">
                    <div className={styles.title}>
                        <h4 className={styles.hideXs}>&nbsp;</h4>
                        <div className={styles.titleSisa}>
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
                        <BoxTitle>Uji keberuntunganmu!</BoxTitle>
                        <div className={styles.containerGacha}>
                            {superGacha === true && (
                                <Lottie
                                    options={defaultOptions}
                                    height={200}
                                    width={200}
                                    isStopped={stopAnimate}
                                />
                            )}

                            {}

                            {superGacha === false && (
                                <div className={styles.resultHadiah}>
                                    {idHadiah === "100001" ||
                                    idHadiah === "100002" ||
                                    idHadiah === "100003" ? (
                                        <div>
                                            <img
                                                className={styles.imageReward}
                                                src="https://admin07.onenetwork.id/assets/uploads/hadiah/noreward.svg"
                                                alt=""
                                            />
                                        </div>
                                    ) : null}

                                    {detailHadiah.map((item) => {
                                        return (
                                            <div
                                                key={item.id}
                                                className={styles.boxRewards}
                                            >
                                                <img
                                                    className={
                                                        styles.imageReward
                                                    }
                                                    src={imageUrl + item.image}
                                                    alt=""
                                                />
                                                <h3>{item.nama}</h3>
                                            </div>
                                        );
                                    })}
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
                                            OK
                                        </a>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </Box>
            )}
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
