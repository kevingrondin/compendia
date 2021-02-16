const bottomNav = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: "0",
    width: "100%",
    backgroundImage: "white",
    boxShadow: "0px 2px 7px -1px rgba(0, 0, 0, 0.75)",
}

const bottomNavList = {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
}

const bottomNavListItem = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    listStyle: "none",
    padding: "0.5rem 1.7rem",
    fontSize: "0.8rem",

    button: {
        background: "transparent",
        border: "none",
    },

    img: {
        width: "2rem",
    },
}

export function BottomNav() {
    return (
        <nav style={bottomNav}>
            <ul style={bottomNavList}>
                <li style={bottomNavListItem}>
                    <button>
                        <img src="/releases.svg" alt="Go to releases" />
                    </button>
                    Releases
                </li>
                <li style={bottomNavListItem}>
                    <button>
                        <img src="/search.svg" alt="Go to search" />
                    </button>
                    Search
                </li>
                <li style={bottomNavListItem}>
                    <button>
                        <img src="/collection.svg" alt="Go to collection" />
                    </button>
                    Collection
                </li>
            </ul>
        </nav>
    )
}
