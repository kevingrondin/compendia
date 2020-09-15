/** @jsx jsx */
import { css } from "@emotion/core";
import { button } from "../Utils.js";

export const screenContent = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
`;

export const accountSettingsList = css`
    > * {
        padding: 0.3rem;
    }

    p {
        text-align: left;
        list-style: none;
    }
`;

export const signOut = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    button {
        ${button};
        width: 8rem;
    }
`;
