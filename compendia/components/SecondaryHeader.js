import styles from "../styles/components/secondary-header/SecondaryHeader.module.scss";
import { useRouter } from "next/router";

export default function SecondaryHeader(props) {
    const router = useRouter();
    return (
        <header className={styles.header}>
            <img
                src="/arrowLeft.svg"
                className={styles.pageNavBack}
                alt="Go back"
                onClick={() => router.back()}
            />
            <h1 className={styles.pageTitle}>{props.pageTitle}</h1>
        </header>
    );
}
