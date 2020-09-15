/** @jsx jsx */
import { css, jsx } from "@emotion/core";

const authHeaderStyles = css`
    display: flex;
    justify-content: center;
    height: 20vh;
`;

export default function AuthHeader() {
    return (
        <div css={authHeaderStyles}>
            <img src="/CompendiaLogo.svg" />
        </div>
    );
}
