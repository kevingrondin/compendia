import { useContext, useEffect } from "react";
import { UserContext } from "./_app";
import { useRouter } from "next/router";
import styles from "../styles/pages/settings/settings.module.scss";
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
            <div className={styles.screenContent}>
                <h2>Account</h2>
                <div className={styles.accountSettingsList}>
                    <p>Username: {user.username}</p>
                    <p>Email: {user.email}</p>
                    <div className={styles.signOut}>
                        <button onClick={user.signOut}>Sign Out</button>
                    </div>
                </div>
            </div>
        </SecondaryPage>
    );
}
