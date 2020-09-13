import styles from "../styles/AppHeader.module.scss";
import Link from "next/link";

export default function AppHeader(props) {
    return (
        <header className={styles.header}>
            <img src="/CompendiaLogo.svg" alt="Compendia Logo" className={styles.logo} />
            <Link href="/settings" signOut={props.signOut}>
                <img src="/Settings.svg" alt="Settings" className={styles.settings} />
            </Link>
        </header>
    );
}
