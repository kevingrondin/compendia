import PropTypes from "prop-types"

import CloseIcon from "../utils/icons/Close"
import ClientOnlyPortal from "../utils/ClientOnlyPortal"

const FullScreenModal = ({ onClick, children }) => (
    <ClientOnlyPortal selector="#modal">
        <button
            className={
                "z-10 absolute top-5 left-5 rounded-full border-none text-white text-xl cursor-pointer"
            }
            onClick={onClick}
        >
            <CloseIcon />
        </button>

        <div className="z-10 fixed top-1/2 left-1/2 transform -translate-x-2/4 -translate-y-2/4 flex justify-center items-center">
            {children}
        </div>

        <div
            id="overlay"
            onClick={onClick}
            className=" z-0 fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-80 cursor-pointer "
        ></div>
    </ClientOnlyPortal>
)

FullScreenModal.propTypes = {
    onClick: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
}

export default FullScreenModal
