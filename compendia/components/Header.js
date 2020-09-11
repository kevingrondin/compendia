import styles from "../styles/Header.module.scss";

export default function Header() {
    return (
        <header className={styles.brand}>
            <h1>Compendia</h1>
            <img alt="Settings" />
        </header>
    );
}
