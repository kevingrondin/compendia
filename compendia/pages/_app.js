import "tailwindcss/tailwind.css"
<<<<<<< Updated upstream
import { ReactQueryDevtools } from "react-query-devtools"
import { QueryCache, ReactQueryCacheProvider } from "react-query"

const queryCache = new QueryCache()
=======
import { ReactQueryDevtools } from "react-query/devtools"
import { QueryClient, QueryClientProvider } from "react-query"

// Required imports to prevent errors in any API routes
// import Publisher from "../database/models/Publisher"
// import Series from "../database/models/Series"
// import Comic from "../database/models/Comic"
// import ComicList from "../database/models/ComicList"
// import User from "../database/models/User"

const queryClient = new QueryClient()
>>>>>>> Stashed changes

export default function App({ Component, pageProps }) {
    return (
        <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
            <ReactQueryDevtools initialIsOpen />
        </QueryClientProvider>
    )
}
