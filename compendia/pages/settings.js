import { useContext } from "react";
import ScreenHeader from "../components/ScreenHeader";
import styles from "../styles/Settings.module.scss";
import { UserContext } from "./index";

export default function Settings() {
    const user = useContext(UserContext);

    return (
        <>
            <ScreenHeader screenTitle={"Settings"} />
            <div className={styles.screenContent}>
                <h2>Account Settings</h2>
                <ul className={styles.accountSettingsList}>
                    <li>Username: {user.username}</li>
                    <li>Email: {user.email}</li>
                    <li>
                        <button className={styles.signOutButton} onClick={user.signOut}>
                            Sign Out
                        </button>
                    </li>
                </ul>
            </div>
        </>
    );
}
