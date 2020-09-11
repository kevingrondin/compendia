import styles from "../styles/AuthHeader.module.scss";

export default function AuthHeader() {
    return (
        <div className={styles.authHeader}>
            <img src="/CompendiaLogo.svg" />
        </div>
    );
}
