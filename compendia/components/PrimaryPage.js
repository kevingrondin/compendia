/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import PrimaryHeader from "./PrimaryHeader";
import BottomNav from "./BottomNav";

const container = css`
    width: 90%;
    margin: 0 auto;
`;

export default function PrimaryPage(props) {
    return (
        <>
            <PrimaryHeader pageTitle={props.pageTitle} />
            <div css={container}>{props.children}</div>
            <BottomNav />
        </>
    );
}
