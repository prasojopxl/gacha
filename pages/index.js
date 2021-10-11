import { Box } from "../components";
import Layout from "../layout";
import styles from "../styles/home.module.scss";
import Link from "next/link";
import { baseUrl } from "../config/var";
import { fetchData } from "../config/data";

export default function Home(props) {
    return (
        <Layout listHadiah={props.dataHadiah} listBanner={props.dataBaner}>
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
    const dataHadiah = await fetchData(`Hadiah`);
    const dataBaner = await fetchData(`Banner/read_banner`);
    return {
        props: { dataHadiah, dataBaner },
        revalidate: 5,
    };
}
