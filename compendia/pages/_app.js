import "tailwindcss/tailwind.css"
import { ReactQueryDevtools } from "react-query/devtools"
import { QueryClient, QueryClientProvider } from "react-query"
import { BottomNav } from "@components/app/BottomNav"

const queryClient = new QueryClient()

export default function App({ Component, pageProps }) {
    return (
        <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
            <BottomNav />
            {/* <ReactQueryDevtools initialIsOpen /> */}
        </QueryClientProvider>
    )
}
