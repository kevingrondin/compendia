/** @jsx jsx */
import { css } from "@emotion/core";

export const bottomNav = css`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 0;
    width: 100%;
    background-image: white;
    box-shadow: 0px 2px 7px -1px rgba(0, 0, 0, 0.75);
`;

export const bottomNavList = css`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
`;

export const bottomNavListItem = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    list-style: none;
    padding: 0.5rem 1.7rem;
    font-size: 0.8rem;

    button {
        background: transparent;
        border: none;
    }

    img {
        width: 2rem;
    }
`;
