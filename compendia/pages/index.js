import Head from "next/head";
import styles from "../styles/Home.module.css";
import Header from "../components/Header";
import BottomNav from "../components/BottomNav";
import { useState } from "react";
import Login from "./login";

export default function Home() {
    const [isAuthed, setIsAuthed] = useState(false);

    return (
        <div className={styles.container}>
            <Head>
                <title>Compendia</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />

            {!isAuthed && <Login />}

            <BottomNav />
        </div>
    );
}
