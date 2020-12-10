/** @jsx jsx */
import { jsx } from "@emotion/core"
import * as styles from "../styles/pages/Releases.js"
import { useEffect, useReducer, useState } from "react"
import PrimaryPage from "../components/PrimaryPage"
import useVerifyAuth from "../util/useVerifyAuth"
import Head from "next/head"
import Link from "next/link"
import { withApollo } from "../lib/apollo"
import { useQuery } from "@apollo/react-hooks"
import ComicCover from "../components/ComicCover.js"
import { useMutation } from "@apollo/react-hooks"

const tabType = {
    PULL_LIST: 0,
    ALL_RELEASES: 1,
}

function newReleasesReducer(state, value) {
    if (value.action === "loading") {
        return {
            ...state,
            loading: true,
        }
    } else if (value.action === "success") {
        return {
            loading: false,
            newReleases: value.data,
            error: null,
        }
    } else if (value.action === "error") {
        return {
            ...state,
            loading: false,
            error: value.error,
        }
    } else {
        throw new Error("Unsupported action type")
    }
}

export default function Releases() {
    // Set active releases tab
    const [activeTab, setActiveTab] = useState(0)
    const pullListTabStyle =
        activeTab === tabType.PULL_LIST ? [styles.activeTab, styles.tab] : styles.tab
    const allReleasesTabStyle =
        activeTab === tabType.ALL_RELEASES ? [styles.activeTab, styles.tab] : styles.tab

    const [state, dispatch] = useReducer(newReleasesReducer, {
        newReleases: null,
        loading: true,
        error: null,
    })

    useEffect(() => {
        dispatch({ action: "loading" })

        fetch("/api/newReleases")
            .then((res) => res.json())
            .then((data) => dispatch({ action: "success", data }))
            .catch((e) => {
                console.warn(e)
                dispatch({
                    action: "error",
                    error: "Something went wrong retrieving the New Releases...",
                })
            })
    }, [])

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
                <h3 css={allReleasesTabStyle} onClick={() => setActiveTab(tabType.ALL_RELEASES)}>
                    All Releases
                </h3>
            </div>
            <section css={styles.releasesContainer}>
                {activeTab === tabType.ALL_RELEASES && (
                    <div css={styles.releasesContent}>
                        {state.newReleases.map((comic, index) => (
                            <ComicCover key={comic.id} comic={comic} index={index} />
                        ))}
                    </div>
                )}

                {activeTab === tabType.PULL_LIST && (
                    <div css={styles.releasesContent}>
                        <p>PULL LIST!</p>
                    </div>
                )}
            </section>
        </PrimaryPage>
    )
}
