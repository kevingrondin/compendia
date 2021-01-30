import PropTypes from "prop-types"
import { useEffect, useState } from "react"
import { useQueryClient } from "react-query"
import { useCreatorComics } from "../../../hooks/queries/creator"
import Button from "../../buttons/Button"

const FilterOptionsItem = ({ label, value, onChange, className }) => {
    return (
        <label className={`flex items-center m-2 whitespace-nowrap ${className}`}>
            <input
                type="checkbox"
                className={`form-checkbox h-5 w-5 mr-1 cursor-pointer text-blue-primary-200`}
                checked={value}
                onChange={onChange}
            />
            {label}
        </label>
    )
}

FilterOptionsItem.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    className: PropTypes.string,
}

export default function FilterOptions({ creatorID, filterTypes, setFilterTypes }) {
    const queryClient = useQueryClient()

    const [showApplyButton, setShowApplyButton] = useState(false)
    const [includeWriter, setIncludeWriter] = useState(true)
    const [includeArtist, setIncludeArtist] = useState(true)
    const [includeCoverArtist, setIncludeCoverArtist] = useState(true)

    // useEffect(() => {
    //     const filterHasWriter = filterTypes.includes("W")

    //     const updatedTypes = filterTypes

    //     if (includeWriter && !filterHasWriter) updatedTypes.push("W")
    //     else if (!includeWriter && filterHasWriter) updatedTypes.pop("W")

    //     setFilterTypes(updatedTypes)
    // }, [includeWriter])

    // useEffect(() => {
    //     const filterHasArtist = filterTypes.includes("A")

    //     const updatedTypes = filterTypes

    //     if (includeArtist && !filterHasArtist) updatedTypes.push("A")
    //     else if (!includeArtist && filterHasArtist) updatedTypes.pop("A")

    //     console.log(updatedTypes)

    //     setFilterTypes(updatedTypes)
    // }, [includeArtist])

    // useEffect(() => {
    //     const filterHasCoverArtist = filterTypes.includes("CA")

    //     const updatedTypes = filterTypes

    //     if (includeCoverArtist && !filterHasCoverArtist) updatedTypes.push("CA")
    //     else if (!includeCoverArtist && filterHasCoverArtist) updatedTypes.pop("CA")

    //     setFilterTypes(updatedTypes)
    // }, [includeCoverArtist])

    function handleOptionChecked(isChecked, setter) {
        setter(isChecked)
        setShowApplyButton(true)
    }

    return (
        <div className="flex flex-col">
            <h3 className="font-semibold text-gray-50 m-2 mb-1 mt-3 border-b-2 border-gray-300">
                Include
            </h3>
            <FilterOptionsItem
                label="Writer"
                value={includeWriter}
                onChange={(e) => handleOptionChecked(e.target.checked, setIncludeWriter)}
            />

            <FilterOptionsItem
                label="Artist"
                value={includeArtist}
                onChange={(e) => handleOptionChecked(e.target.checked, setIncludeArtist)}
            />

            <FilterOptionsItem
                label="Cover Artist"
                value={includeCoverArtist}
                onChange={(e) => handleOptionChecked(e.target.checked, setIncludeCoverArtist)}
            />

            {showApplyButton && (
                <Button
                    roundedClass="rounded-lg"
                    className="m-3 ml-auto self-end"
                    onClick={() => {
                        const types = []
                        if (includeWriter) types.push("W")
                        if (includeArtist) types.push("A")
                        if (includeCoverArtist) types.push("CA")
                        setFilterTypes(types)
                        setShowApplyButton(false)
                    }}
                >
                    Apply
                </Button>
            )}
        </div>
    )
}

FilterOptions.propTypes = {
    creatorID: PropTypes.string.isRequired,
    filterTypes: PropTypes.array.isRequired,
    setFilterTypes: PropTypes.func.isRequired,
}
