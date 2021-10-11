import { Box } from "../components";
import Layout from "../layout";
import styles from "../styles/home.module.scss";
import Link from "next/link";
import { baseUrl } from "../config/var";

export default function Home({ dataHadiah, dataBaner }) {
    return (
        <div>
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
        </div>
    );
}

// export async function getStaticProps() {
//     const dataHadiah = await fetchData(`Hadiah`);
//     const dataBaner = await fetchData(`Banner/read_banner`);
//     return {
//         props: { dataHadiah, dataBaner },
//         revalidate: 5,
//     };
// }
