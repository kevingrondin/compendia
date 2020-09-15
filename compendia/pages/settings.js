/** @jsx jsx */
import { jsx } from "@emotion/core";
import * as styles from "../styles/pages/Settings.js";
import { useContext, useEffect } from "react";
import { UserContext } from "./_app";
import { useRouter } from "next/router";
import SecondaryPage from "../components/SecondaryPage";
import useVerifyAuth from "../util/useVerifyAuth";

export default function Settings() {
    useVerifyAuth();
    const router = useRouter();
    const user = useContext(UserContext);

    useEffect(() => {
        router.prefetch("/");
    });

    return (
        <SecondaryPage pageTitle="Settings">
            <div css={styles.screenContent}>
                <h2>Account</h2>
                <div css={styles.accountSettingsList}>
                    <p>Username: {user.username}</p>
                    <p>Email: {user.email}</p>
                    <div css={styles.signOut}>
                        <button onClick={user.signOut}>Sign Out</button>
                    </div>
                </div>
            </div>
        </SecondaryPage>
    );
}
