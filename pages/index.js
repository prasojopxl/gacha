import { Box } from "../components";
import Layout from "../layout";
import styles from "../styles/home.module.scss";
import Link from "next/link";
import { apiUrl, baseUrl } from "../config/var";

export default function Home(props) {
    return (
        <Layout listBanner={props.dataBaner} listHadiah={props.dataHadiah}>
            <Box>
                <div className={styles.titleNumber}>
                    <span>1</span>Masukan Code Tiket
                </div>
                <input type="text" placeholder="Masukan Code" />
            </Box>
            <Box>
                <div className={styles.titleNumber}>
                    <span>2</span>Masukan Nomor Whatsapp
                </div>
                <input type="text" placeholder="Masukan Nomor" />
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
    const resDataBaner = await fetch(`${apiUrl}Banner/read_banner`);
    const dataBaner = await resDataBaner.json();
    return {
        props: { dataHadiah, dataBaner },
        revalidate: 1,
    };
}
