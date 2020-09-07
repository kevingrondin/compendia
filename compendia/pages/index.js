import Head from "next/head";
import styles from "../styles/Home.module.css";
import Header from "../components/Header";
import BottomNav from "../components/BottomNav";

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Compendia</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header />
            <BottomNav />
        </div>
    );
}
