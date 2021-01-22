import PropTypes from "prop-types"

const PageHeading = ({ children }) => (
    <div className="flex justify-around align-center pb-8 mb-6 sm:mb-8 border-b-4 border-blue-primary-200 border-solid">
        <h2 className="text-4xl text-center text-blue-primary-200 font-bold">{children}</h2>
    </div>
)

PageHeading.propTypes = {
    children: PropTypes.any.isRequired,
}

export default PageHeading
