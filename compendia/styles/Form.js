/** @jsx jsx */
import { css, keyframes } from "@emotion/core";
import { primaryColor } from "./Utils";

/* FORM STYLING */
/* Taken and edited from codepen. Credits to chrisoncode. */

export const group = css`
    position: relative;
    margin-bottom: 1.8rem;
`;

export const input = css`
    font-size: 18px;
    padding: 10px 10px 10px 5px;
    display: block;
    width: 300px;
    border: none;
    border-bottom: 1px solid #757575;
    &:focus {
        outline: none;
    }

    &:focus ~ label,
    &:valid ~ label {
        top: -20px;
        font-size: 14px;
        color: ${primaryColor};
    }

    &:focus ~ span:nth-of-type(2):before,
    &:focus ~ span:nth-of-type(2):after {
        width: 50%;
    }
`;

export const label = css`
    color: #999;
    font-size: 18px;
    font-weight: normal;
    position: absolute;
    pointer-events: none;
    left: 5px;
    top: 10px;
    transition: 0.2s ease all;
`;

export const bar = css`
    position: relative;
    display: block;
    width: 300px;
    &:before,
    &:after {
        content: "";
        height: 2px;
        width: 0;
        bottom: 1px;
        position: absolute;
        background: ${primaryColor};
        transition: 0.2s ease all;
    }

    &:before {
        left: 50%;
    }
    &:after {
        right: 50%;
    }
`;

export const highlight = css`
    position: absolute;
    height: 60%;
    width: 100px;
    top: 25%;
    left: 0;
    pointer-events: none;
    opacity: 0.5;
`;
