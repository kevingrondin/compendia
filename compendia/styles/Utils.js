/** @jsx jsx */
import { css } from "@emotion/core";

export const primaryColor = "#1f8ec1";
export const primaryColorDark = "#1b7fad";

export const button = css`
    text-align: center;
    padding: 0.5rem 1rem;
    border-radius: 18px;
    background-color: ${primaryColor};
    border: none;
    color: #ffffff;
    font-size: 1.2rem;
    cursor: pointer;
    box-shadow: 0 2px 8px 2px;

    &:hover {
        background-color: ${primaryColorDark};
    }
`;

export const header = css`
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 0.5rem;
    background-image: linear-gradient(103deg, #1a6bad 0%, #79c2d7 72%);
    box-shadow: 0px 2px 7px -1px rgba(0, 0, 0, 0.75);
`;
