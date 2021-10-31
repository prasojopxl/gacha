import React from 'react'
import { Box } from '../../components';
import Layout from '../../layout'
import styles from "../../styles/home.module.scss";
import { useRouter } from "next/router";
import { apiUrl, apiUrl2, baseUrl } from "../../config/var";
import { useState } from "react";

import axios from "axios";

export default function Login(props) {
    const router = useRouter();
    const [voucher, setVoucher] = useState("");
    const [whatsapp, setWhatsapp] = useState("");
    const [errorLogin, setErrorLogin] = useState(false);
    const login = () => {
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
            .then(data => {
                if (data.isAuthenticated) {
                    props.ls.setItem('isLoggedIn', true)
                    window.location.href = '/'
                } else {
                    alert("Invalid username or password")
                }
            })
            .catch((err) => {
                console.log("gagal222");
            });
    };
    return (
        <Layout>
            <Box>
                {errorLogin && <div className={styles.error}>Gagal Login</div>}
                <div className={styles.titleNumber}>
                    <span>1</span>Masukan Code Tiket
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
                <div className={styles.titleNumber}>
                    <span>2</span>Masukan Nomor Whatsapp
                </div>
                <input
                    type="text"
                    placeholder="Masukan Nomor"
                    value={whatsapp}
                    onChange={(e) => {
                        setWhatsapp(e.target.value);
                    }}
                />
            </Box>
            <a className={styles.btn} onClick={() => login()}>
                Get Started
            </a>
        </Layout>
    )
}
