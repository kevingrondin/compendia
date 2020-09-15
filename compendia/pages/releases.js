/** @jsx jsx */
import { jsx } from "@emotion/core";
import * as styles from "../styles/pages/Releases.js";
import { useState } from "react";
import PrimaryPage from "../components/PrimaryPage";
import useVerifyAuth from "../util/useVerifyAuth";
import Head from "next/head";

const tabType = {
    PULL_LIST: 0,
    ALL_RELEASES: 1,
};

export default function Releases() {
    const [activeTab, setActiveTab] = useState(0);
    useVerifyAuth();

    const pullListTabStyle = activeTab === tabType.PULL_LIST ? styles.activeTab : styles.tab;

    return (
        <PrimaryPage>
            <Head>
                <title>Compendia</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div css={styles.comicsWeek}>
                <img
                    src="/arrowLeftBlue.svg"
                    css={styles.comicsWeekControl}
                    alt="previous comic week"
                />
                <h2 css={styles.comicsWeekHeading}>Here's this week's comics.</h2>
                <img
                    src="/arrowRightBlue.svg"
                    css={styles.comicsWeekControl}
                    alt="next comic week"
                />
            </div>

            <div css={styles.tabs}>
                <h3 css={pullListTabStyle} onClick={() => setActiveTab(tabType.PULL_LIST)}>
                    My Pull List
                </h3>
                <h3
                    css={activeTab === tabType.ALL_RELEASES ? styles.activeTab : styles.tab}
                    onClick={() => setActiveTab(tabType.ALL_RELEASES)}
                >
                    All Releases
                </h3>
            </div>
            <section css={styles.releasesContainer}>
                {activeTab === tabType.ALL_RELEASES && (
                    <div css={styles.releasesContent}>
                        <p>ALL RELEASES!</p>
                    </div>
                )}

                {activeTab === tabType.PULL_LIST && (
                    <div css={styles.releasesContent}>
                        <p>PULL LIST!</p>
                    </div>
                )}
            </section>
        </PrimaryPage>
    );
}
