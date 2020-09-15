/** @jsx jsx */
import { jsx } from "@emotion/core";
import * as styles from "../styles/components/BottomNav.js";

export default function BottomNav() {
    return (
        <nav css={styles.bottomNav}>
            <ul css={styles.bottomNavList}>
                <li css={styles.bottomNavListItem}>
                    <button>
                        <img src="/releases.svg" alt="Go to releases" />
                    </button>
                    Releases
                </li>
                <li css={styles.bottomNavListItem}>
                    <button>
                        <img src="/search.svg" alt="Go to search" />
                    </button>
                    Search
                </li>
                <li css={styles.bottomNavListItem}>
                    <button>
                        <img src="/collection.svg" alt="Go to collection" />
                    </button>
                    Collection
                </li>
            </ul>
        </nav>
    );
}
