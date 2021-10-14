import { Box } from "../components";
import Layout from "../layout";
import styles from "../styles/home.module.scss";
import Link from "next/link";
import { apiUrl, baseUrl } from "../config/var";
import { useState } from "react";

export default function Home(props) {
    const [voucher, setVoucher] = useState("");
    const [whatsapp, setWhatsapp] = useState("");

    return (
        <Layout listHadiah={props.dataHadiah}>
            <Box>
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
            <Link href={baseUrl + "page"}>
                <a className={styles.btn}>Get Started</a>
            </Link>
        </Layout>
    );
}

export async function getStaticProps() {
    const resDataHadiah = await fetch(`${apiUrl}Hadiah`);
    const dataHadiah = await resDataHadiah.json();

    // const resLogin = await fetch(
    //     `https://abiyyu-dev.com/allApi/rest_ci/index.php/AuthController/login`
    // );
    // const dataLogin = await resLogin.json();

    return {
        props: { dataHadiah },
        revalidate: 1,
    };
}
