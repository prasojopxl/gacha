import { Box } from "../components";
import Layout from "../layout";
import styles from "../styles/home.module.scss";

export default function Home() {
    return (
        <Layout>
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
            <a href="#" className={styles.btn}>
                Get Started
            </a>
        </Layout>
    );
}
