/** @jsx jsx */
import { css } from "@emotion/core"

/* FORM STYLING */
/* Taken and edited from codepen. Credits to chrisoncode. */

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
        color: "#1f8ec1";
    }

    &:focus ~ span:nth-of-type(2):before,
    &:focus ~ span:nth-of-type(2):after {
        width: 50%;
    }
`

export const label = css`
    color: #999;
    font-size: 18px;
    font-weight: normal;
    position: absolute;
    pointer-events: none;
    left: 5px;
    top: 10px;
    transition: 0.2s ease all;
`

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
        background: "#1f8ec1";
        transition: 0.2s ease all;
    }

    &:before {
        left: 50%;
    }
    &:after {
        right: 50%;
    }
`

export const highlight = css`
    position: absolute;
    height: 60%;
    width: 100px;
    top: 25%;
    left: 0;
    pointer-events: none;
    opacity: 0.5;
`
