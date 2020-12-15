/** @jsx jsx */
import { css } from "@emotion/core"

export const primaryColor = "#1f8ec1"
export const primaryColorDark = "#1b7fad"

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
`
