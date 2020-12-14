import "tailwindcss/tailwind.css"
import { ReactQueryDevtools } from "react-query-devtools"
import { QueryCache, ReactQueryCacheProvider } from "react-query"

const queryCache = new QueryCache()

export default function App({ Component, pageProps }) {
    return (
        <ReactQueryCacheProvider queryCache={queryCache}>
            <Component {...pageProps} />
            <ReactQueryDevtools initialIsOpen />
        </ReactQueryCacheProvider>
    )
}
