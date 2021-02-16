import PropTypes from "prop-types"
import { useState, useEffect } from "react"
import { Button } from "@components/common/buttons/Button"

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

export function FilterOptions({ filterTypes, setFilterTypes, setShowFilterOptions }) {
    const [showApplyButton, setShowApplyButton] = useState(false)
    const [includeWriter, setIncludeWriter] = useState(true)
    const [includeArtist, setIncludeArtist] = useState(true)
    const [includeCoverArtist, setIncludeCoverArtist] = useState(true)

    const filterOptions = [
        {
            label: "Writer",
            value: includeWriter,
            onChange: (e) => handleOptionChecked(e.target.checked, setIncludeWriter),
        },
        {
            label: "Artist",
            value: includeArtist,
            onChange: (e) => handleOptionChecked(e.target.checked, setIncludeArtist),
        },
        {
            label: "Cover Artist",
            value: includeCoverArtist,
            onChange: (e) => handleOptionChecked(e.target.checked, setIncludeCoverArtist),
        },
    ]

    function handleOptionChecked(isChecked, setter) {
        setter(isChecked)
        setShowApplyButton(true)
    }

    function handleApplyFilterOptions() {
        const types = []
        if (includeWriter) types.push("W")
        if (includeArtist) types.push("A")
        if (includeCoverArtist) types.push("CA")
        setFilterTypes(types)
        setShowApplyButton(false)
        setShowFilterOptions(false)
    }

    useEffect(() => {
        setIncludeWriter(filterTypes.includes("W"))
        setIncludeArtist(filterTypes.includes("A"))
        setIncludeCoverArtist(filterTypes.includes("CA"))
    }, [filterTypes])

    return (
        <div className="flex flex-col">
            <h3 className="font-semibold text-gray-50 m-2 mb-1 mt-3 border-b-2 border-gray-300">
                Include
            </h3>

            <ul>
                {filterOptions.map((option) => (
                    <li key={option.label}>
                        <FilterOptionsItem
                            label={option.label}
                            value={option.value}
                            onChange={option.onChange}
                        />
                    </li>
                ))}
            </ul>

            {showApplyButton && (
                <Button
                    roundedClass="rounded-lg"
                    className="m-3 ml-auto self-end"
                    onClick={handleApplyFilterOptions}
                >
                    Apply
                </Button>
            )}
        </div>
    )
}
FilterOptions.propTypes = {
    filterTypes: PropTypes.array.isRequired,
    setFilterTypes: PropTypes.func.isRequired,
    setShowFilterOptions: PropTypes.func.isRequired,
}
