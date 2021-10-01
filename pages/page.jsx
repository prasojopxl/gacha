/* eslint-disable @next/next/no-img-element */
import { Box, BoxTitle } from "../components";
import Layout from "../layout";
import styles from "../styles/page.module.scss";
import Link from "next/link";

export default function Page() {
    return (
        <Layout>
            <Box Height="100%">
                <div className={styles.title}>
                    <h4>Collect your prize</h4>
                    <h5>You have <span>1 Tickets</span></h5>
                </div>

                <div className={styles.boxGame}>
                    <BoxTitle>Gacha Undian Berhadiah</BoxTitle>
                    <div className={styles.containerGacha}>
                        <img src="gacha.svg" alt="gacha" />
                    </div>
                    <Link href="#"><a className={styles.btn}>Play</a></Link>
                </div>
            </Box>
        </Layout>
    )
}
