import styles from "../styles/pages/releases/releases.module.scss";
import Head from "next/head";
import PrimaryPage from "../components/PrimaryPage";
import useVerifyAuth from "../util/useVerifyAuth";
import { useState } from "react";

const tabType = {
    PULL_LIST: 0,
    ALL_RELEASES: 1,
};

export default function Releases() {
    const [activeTab, setActiveTab] = useState(0);
    useVerifyAuth();

    return (
        <PrimaryPage>
            <Head>
                <title>Compendia</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={styles.comicsWeek}>
                <img
                    src="/arrowLeftBlue.svg"
                    className={styles.comicsWeekControl}
                    alt="previous comic week"
                />
                <h2 className={styles.comicsWeekHeading}>Here's this week's comics.</h2>
                <img
                    src="/arrowRightBlue.svg"
                    className={styles.comicsWeekControl}
                    alt="next comic week"
                />
            </div>

            <div className={styles.tabs}>
                <h3 className={styles.tab} onClick={() => setActiveTab(0)}>
                    My Pull List
                </h3>
                <h3 className={styles.tab} onClick={() => setActiveTab(1)}>
                    All Releases
                </h3>
            </div>
            <section className={styles.releasesContainer}>
                {activeTab === tabType.ALL_RELEASES && (
                    <div className={styles.releasesContent}>
                        <p>ALL RELEASES!</p>
                    </div>
                )}

                {activeTab === tabType.PULL_LIST && (
                    <div className={styles.releasesContent}>
                        <p>PULL LIST!</p>
                    </div>
                )}
            </section>
        </PrimaryPage>
    );
}
