import styles from "../styles/ScreenHeader.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";

export default function ScreenHeader(props) {
    const router = useRouter();
    return (
        <header className={styles.header}>
            <img
                src="/arrowLeft.svg"
                className={styles.screenNavBack}
                alt="Go back to home screen"
                onClick={() => router.back()}
            />
            <h1 className={styles.screenTitle}>{props.screenTitle}</h1>
        </header>
    );
}
