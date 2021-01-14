import { useRef, useEffect, useState } from "react"
import { createPortal } from "react-dom"

import PropTypes from "prop-types"

export default function ClientOnlyPortal({ selector, children }) {
    const ref = useRef()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        ref.current = document.querySelector(selector)
        setMounted(true)
    }, [selector])

    return mounted ? createPortal(children, ref.current) : null
}

ClientOnlyPortal.propTypes = {
    selector: PropTypes.string.isREquired,
    children: PropTypes.node.isRequired,
}
