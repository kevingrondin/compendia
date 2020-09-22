/** @jsx jsx */
import { jsx } from "@emotion/core";
import * as styles from "../styles/pages/Releases.js";
import { useState } from "react";
import PrimaryPage from "../components/PrimaryPage";
import useVerifyAuth from "../util/useVerifyAuth";
import Head from "next/head";
import Link from "next/link";
import { withApollo } from "../lib/apollo";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import ComicCover from "../components/ComicCover.js";
import { useMutation } from "@apollo/react-hooks";

const GET_COMICS = gql`
    query getComics {
        comics {
            _id
            title
        }
    }
`;

const ADD_COMIC = gql`
    mutation addComic($comic: ComicInput) {
        addComic(comic: $comic) {
            _id
            title
        }
    }
`;

const tabType = {
    PULL_LIST: 0,
    ALL_RELEASES: 1,
};

function Releases() {
    useVerifyAuth();

    // Get Comics from DB
    const { data, loading } = useQuery(GET_COMICS);

    // Add comic to DB
    const [addComic] = useMutation(ADD_COMIC, {
        refetchQueries: ["getComics"],
    });

    // Set active releases tab
    const [activeTab, setActiveTab] = useState(0);
    const pullListTabStyle =
        activeTab === tabType.PULL_LIST ? [styles.activeTab, styles.tab] : styles.tab;
    const allReleasesTabStyle =
        activeTab === tabType.ALL_RELEASES ? [styles.activeTab, styles.tab] : styles.tab;

    if (loading) return <PrimaryPage></PrimaryPage>;

    const { comics } = data;

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
            <Link href="/testGQL">link me</Link>
            <div css={styles.tabs}>
                <h3 css={pullListTabStyle} onClick={() => setActiveTab(tabType.PULL_LIST)}>
                    My Pull List
                </h3>
                <h3 css={allReleasesTabStyle} onClick={() => setActiveTab(tabType.ALL_RELEASES)}>
                    All Releases
                </h3>
            </div>
            <section css={styles.releasesContainer}>
                {activeTab === tabType.ALL_RELEASES && (
                    <div css={styles.releasesContent}>
                        {comics.map((comic, index) => (
                            <ComicCover key={comic._id} comic={comic} index={index} />
                        ))}
                        <button
                            onClick={() => {
                                addComic({
                                    variables: {
                                        comic: {
                                            title: "First Next Comic",
                                        },
                                    },
                                });
                            }}
                        >
                            Add comic
                        </button>
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

export default withApollo(Releases);
