/** @jsx jsx */
import { css } from "@emotion/core";
import { button, primaryColor, primaryColorDark } from "../Utils.js";

export const authBackground = css`
    background-image: linear-gradient(103deg, #1a6bad 0%, #79c2d7 72%);
    border: 1px solid #979797;
    width: 100vw;
    height: 100vh;
`;

export const authLayout = css`
    display: flex;
    flex-direction: column;
`;

export const authContainer = css`
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-content: center;
    height: 80vh;
    border-radius: 50px 0 0 0;
`;

export const authHeading = css`
    padding: 2rem;
    color: ${primaryColor};
`;

export const authForm = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const authPrimaryButton = css`
    ${button};
    width: 100%;
`;

export const authSecondary = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 2rem;
`;

export const authSecondaryPrompt = css`
    display: block;
    margin-bottom: 0.5rem;
`;

export const authSecondaryLink = css`
    color: ${primaryColor};
    text-decoration: underline;
    font-size: 1.2rem;
    text-align: center;
    cursor: pointer;

    &:hover {
        color: ${primaryColorDark};
    }
`;

export const forgotPassword = css`
    display: inline-block;
    margin: 1.5rem 0 0.2rem 1rem;
    color: gray;
    text-decoration: underline;

    &:hover {
        color: black;
    }
`;
