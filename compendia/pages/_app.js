import "tailwindcss/tailwind.css"
import { ReactQueryDevtools } from "react-query-devtools"
import { QueryCache, ReactQueryCacheProvider } from "react-query"

// Required imports to prevent errors in any API routes
// import Publisher from "../database/models/Publisher"
// import Series from "../database/models/Series"
// import Comic from "../database/models/Comic"
// import ComicList from "../database/models/ComicList"
// import User from "../database/models/User"

const queryCache = new QueryCache()

export default function App({ Component, pageProps }) {
    return (
        <ReactQueryCacheProvider queryCache={queryCache}>
            <Component {...pageProps} />
            <ReactQueryDevtools initialIsOpen />
        </ReactQueryCacheProvider>
    )
}
