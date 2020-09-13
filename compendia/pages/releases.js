import styles from "../styles/releases.module.scss";
import Head from "next/head";
import AppHeader from "../components/AppHeader";
import BottomNav from "../components/BottomNav";

export default function Releases() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Compendia</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <AppHeader />
            <BottomNav />
        </div>
    );
}
