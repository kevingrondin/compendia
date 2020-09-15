/** @jsx jsx */
import { jsx } from "@emotion/core";
import AuthHeader from "./AuthHeader";
import Head from "next/head";
import * as styles from "../styles/components/AuthPage.js";

export default function AuthPage(props) {
    return (
        <>
            <Head>
                <title>Compendia - {props.pageTitle}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div css={styles.authBackground}>
                <div css={styles.authLayout}>
                    <AuthHeader />
                    <div css={styles.authContainer}>
                        <h1 css={styles.authHeading}>{props.pageTitle}</h1>
                        {props.children}
                    </div>
                </div>
            </div>
        </>
    );
}
