import { useState } from "react";
import styles from "../styles/UserAuth.module.scss";
import AuthHeader from "../components/AuthHeader";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import { authTypes } from "../util/auth";

export default function UserAuth(props) {
    const [authType, setAuthType] = useState(authTypes.LOGIN);

    return (
        <div className={styles.authBackground}>
            <div className={styles.authLayout}>
                <AuthHeader />
                <div className={styles.authContainer}>
                    {authType === authTypes.LOGIN && (
                        <Login setAuthToken={props.setAuthToken} setAuthType={setAuthType} />
                    )}

                    {authType === authTypes.SIGNUP && (
                        <SignUp setAuthToken={props.setAuthToken} setAuthType={setAuthType} />
                    )}

                    {authType === authTypes.FORGOT_PASS && (
                        <h1></h1>
                        //TODO Forgot Password
                    )}
                </div>
            </div>
        </div>
    );
}
