import React from 'react'
import { Box } from '../../components';
import Layout from '../../layout'
import styles from "../../styles/home.module.scss";
import { useRouter } from "next/router";
import { apiUrl, apiUrl2, baseUrl } from "../../config/var";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Login(props) {
    const router = useRouter();
    const [voucher, setVoucher] = useState("");
    const [whatsapp, setWhatsapp] = useState("");
    const [dataUser, setDataUser] = useState([])
    const [errorLogin, setErrorLogin] = useState(false);
    const [errorWa, setErrorWa] = useState(false);
    const [listVoucher, setListVoucher] = useState([])

    const getAllUser = () => {
        axios.get(`${apiUrl2}rest_server?action=all_user_data`)
            .then((res) => {
                setDataUser(res.data.data)
            })
    }
    const dataVoucher = () => {
        dataUser.map((item, i) => {
            console.log(item.id)
        })
    }
    const login = () => {
        // whatsapp == "" && alert("Masukan nomer whatsapp")

        const user = dataUser.filter((user) =>
            user.kode_vocher === voucher
        )

        if (user.length === 1) {
            setErrorLogin(false)
            if (whatsapp === "") {
                setErrorWa(true)
                localStorage.removeItem("jwtGacha")
            }
            else {
                axios
                    .post(`${apiUrl2}rest_server?action=login`, {
                        kode_vocher: voucher,
                        no_wa: whatsapp
                    })
                    .then((res) => {
                        window.location.href = "/";
                        // voucher == ""
                        //     ? setErrorLogin(true)
                        //     : setErrorLogin(false);
                        voucher == "" ? localStorage.removeItem("jwtGacha") : localStorage.setItem("jwtGacha", res.data)
                        localStorage.setItem("idVoucher", voucher);

                    })
                    .catch((err) => {
                        console.log("gagal222");
                    });

            }
        }
        else {
            setErrorLogin(true)
            setErrorLogin(true)
        }




    };
    useEffect(() => {
        getAllUser();
        dataVoucher();
    }, [])
    return (
        <Layout>
            <Box>
                {errorLogin && <div className={styles.error}>Kode Voucher Anda Salah</div>}
                <div className={styles.titleNumber}>
                    <span>1</span>Masukan Kode Voucher
                </div>
                <input
                    type="text"
                    placeholder="Masukan Code"
                    value={voucher}
                    onChange={(e) => {
                        setVoucher(e.target.value);
                    }}
                />
            </Box>
            <Box>
                {errorWa && <div className={styles.error}>Masukan Nomor Whatsapp</div>}
                <div className={styles.titleNumber}>
                    <span>2</span>Masukan Nomor Whatsapp
                </div>
                <input
                    type="number"
                    placeholder="Masukan Nomor"
                    value={whatsapp}
                    onChange={(e) => {
                        setWhatsapp(e.target.value);
                    }}
                />
                <p>*Pastikan nomor Whatsapp aktif, untuk proses klaim hadiah</p>
            </Box>
            <a className={styles.btn} onClick={() => login()}>
                GACHA!
            </a>
        </Layout>
    )
}
