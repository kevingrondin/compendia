import AuthHeader from "./AuthHeader";
import Head from "next/head";
import styles from "../styles/components/auth/auth-page/AuthPage.module.scss";

export default function AuthPage(props) {
    return (
        <>
            <Head>
                <title>Compendia - {props.pageTitle}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={styles.authBackground}>
                <div className={styles.authLayout}>
                    <AuthHeader />
                    <div className={styles.authContainer}>
                        <h1 className={styles.authHeading}>{props.pageTitle}</h1>
                        {props.children}
                    </div>
                </div>
            </div>
        </>
    );
}
