/** @jsx jsx */
import { css } from "@emotion/core";
import { primaryColor } from "../Utils";

export const comicsWeek = css`
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding-top: 1rem;
`;

export const comicsWeekHeading = css`
    font-size: 2.2rem;
    text-align: center;
    color: ${primaryColor};
`;

export const comicsWeekControl = css`
    width: 2.5rem;
    padding: 0 0.2rem;
`;

export const releasesContainer = css`
    padding-top: 0 2rem;
`;

export const tabs = css`
    display: flex;
    justify-content: space-evenly;
    border-bottom: 1px solid black;
    padding-top: 1rem;
`;

export const tab = css`
    background-color: white;
    padding: 0.8rem;

    &:hover,
    &:active {
        color: ${primaryColor};
    }
`;

export const activeTab = css`
    background-color: yellow;
`;

export const releasesContent = css`
    padding: 1rem;
`;
