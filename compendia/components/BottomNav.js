import styles from "../styles/components/bottom-nav/BottomNav.module.scss";

export default function BottomNav() {
    return (
        <nav className={styles.bottomNav}>
            <ul className={styles.bottomNavList}>
                <li className={styles.bottomNavListItem}>
                    <button>
                        <img src="/releases.svg" alt="Go to releases" />
                    </button>
                    Releases
                </li>
                <li className={styles.bottomNavListItem}>
                    <button>
                        <img src="/search.svg" alt="Go to search" />
                    </button>
                    Search
                </li>
                <li className={styles.bottomNavListItem}>
                    <button>
                        <img src="/collection.svg" alt="Go to collection" />
                    </button>
                    Collection
                </li>
            </ul>
        </nav>
    );
}
