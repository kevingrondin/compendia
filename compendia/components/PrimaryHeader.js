import styles from "../styles/components/primary-header/PrimaryHeader.module.scss";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function PrimaryHeader(props) {
    const router = useRouter();

    useEffect(() => {
        router.prefetch("/settings");
    });

    return (
        <header className={styles.header}>
            <img src="/CompendiaLogo.svg" alt="Compendia Logo" className={styles.logo} />
            <Link href="/settings" signOut={props.signOut}>
                <img src="/Settings.svg" alt="Settings" className={styles.settings} />
            </Link>
        </header>
    );
}
