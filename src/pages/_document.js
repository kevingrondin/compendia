import Document, { Html, Head, Main, NextScript } from "next/document"

export default class MyDocument extends Document {
    render() {
        return (
            <Html className="min-h-screen">
                <Head />
                <body>
                    <Main />
                    <div id="modal" />
                    <NextScript />
                    <style jsx global>{`
                        #__next {
                            min-height: 100vh;
                        }
                    `}</style>
                </body>
            </Html>
        )
    }
}
