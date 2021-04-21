import { useState } from "react"
import PropTypes from "prop-types"
import { SearchIcon } from "@components/icons/Search"

export function SearchBar({ onSubmit }) {
    const [search, setSearch] = useState("")

    return (
        <div className="flex items-center justify-center">
            <input
                type="text"
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value)
                }}
                onKeyDown={(e) => {
                    if (e.key === "Enter") onSubmit(search)
                }}
                className="rounded-full h-10 w-60 sm:w-96 border-2 my-2 bg-white border-blue-primary-200"
            />
            <button onClick={() => onSubmit(search)}>
                <SearchIcon
                    color="text-blue-primary-200 hover:text-blue-primary-300"
                    width="w-8"
                    className="ml-2"
                />
            </button>
        </div>
    )
}
SearchBar.propTypes = { onSubmit: PropTypes.func.isRequired }
