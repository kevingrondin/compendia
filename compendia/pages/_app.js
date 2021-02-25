import "tailwindcss/tailwind.css"
import { ReactQueryDevtools } from "react-query/devtools"
import { QueryClient, QueryClientProvider } from "react-query"

const queryClient = new QueryClient()

export default function App({ Component, pageProps }) {
    return (
        <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
            <ReactQueryDevtools initialIsOpen />
        </QueryClientProvider>
    )
}
