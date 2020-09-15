/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { header } from "../styles/Utils.js";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const logo = css`
    width: 3rem;
`;

const settings = css`
    width: 2rem;
    cursor: pointer;
`;

export default function PrimaryHeader(props) {
    const router = useRouter();

    useEffect(() => {
        router.prefetch("/settings");
    });

    return (
        <header css={header}>
            <img src="/CompendiaLogo.svg" alt="Compendia Logo" css={logo} />
            <Link href="/settings" signOut={props.signOut}>
                <img src="/Settings.svg" alt="Settings" css={settings} />
            </Link>
        </header>
    );
}
