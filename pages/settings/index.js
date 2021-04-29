import { useEffect } from "react"
import { useRouter } from "next/router"
import { useUser } from "@hooks/magic"
import { Category } from "@components/common/Category"
import { Page } from "@components/common/Page"
import { Button } from "@components/common/buttons/Button"
import Link from "next/link"

export default function Settings() {
    const router = useRouter()
    const user = useUser({ redirectTo: "/auth/login" })

    useEffect(() => {
        router.prefetch("/")
    })

    return (
        <Page title="Settings">
            <div className="w-6/12">
                <Category size="MD" className="mb-4">
                    Account
                </Category>
                <p>
                    <span className="text-blue-primary-300 font-bold">Email:</span>{" "}
                    {user?.email ?? "no email found..."}
                </p>
                <Button className="w-32 mt-4">
                    <Link href="/api/auth/logout">Log Out</Link>
                </Button>

                <Category size="MD" className="mt-12 mb-4">
                    Privacy Policy
                </Category>
                <p>
                    Compendia is an app that will always respect the rights, privacy, and data of
                    its users. We store the absolute <b>bare minimum</b> when it comes to data that
                    pertains to you; we store your email address (for login purposes only), and the
                    comic collecting data that you define on Compendia such as your collected
                    comics, subscribed series, etc.
                </p>

                <Category size="MD" className="mt-12 mb-4">
                    Suggestion, Concern, or Issue?
                </Category>
                <p>
                    Please open an issue on{" "}
                    <a
                        className="text-blue-primary-200"
                        href="https://github.com/gchartier/Compendia/issues"
                        target="_blank"
                    >
                        GitHub
                    </a>
                    . <br />
                    <br />
                    Compendia is open source, check out the source code{" "}
                    <a
                        className="text-blue-primary-200"
                        href="https://github.com/gchartier/Compendia"
                        target="_blank"
                    >
                        here
                    </a>
                    .
                </p>

                <Category size="MD" className="mt-12 mb-4">
                    Donate
                </Category>
                <p>
                    Compendia was created and is maintained by me,{" "}
                    <a
                        className="text-blue-primary-200"
                        href="https://gabrielchartier.dev/"
                        target="_blank"
                    >
                        Gabriel Chartier
                    </a>
                    . If you use Compendia and enjoy it, you can support me by{" "}
                    <a
                        className="text-blue-primary-200"
                        href="https://www.buymeacoffee.com/gabrielchartier"
                        target="_blank"
                    >
                        buying me a coffee
                    </a>
                    !
                </p>
            </div>
        </Page>
    )
}
