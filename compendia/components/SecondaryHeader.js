/** @jsx jsx */
import { jsx } from "@emotion/core";
import { header } from "../styles/Utils.js";
import * as styles from "../styles/components/SecondaryHeader.js";
import { useRouter } from "next/router";

export default function SecondaryHeader(props) {
    const router = useRouter();
    return (
        <header css={header}>
            <img
                src="/arrowLeft.svg"
                css={styles.pageNavBack}
                alt="Go back"
                onClick={() => router.back()}
            />
            <h1 css={styles.pageTitle}>{props.pageTitle}</h1>
        </header>
    );
}
