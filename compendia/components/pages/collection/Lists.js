import { PageLink } from "@components/common/PageLink"
import { useLists } from "@hooks/queries/collection"

export function Lists() {
    const { isLoading, isError, error, data: lists } = useLists()

    if (isLoading) return <div>Loading...</div>
    else if (isError) return <div>Error: {`${error && error.message}`}</div>
    else {
        return (
            <div className="flex">
                {lists && lists.length > 0 ? (
                    lists.map((list) => (
                        <li key={list.id} className="list-none">
                            <div className="text-blue-primary-200 text-md flex mr-4">
                                <PageLink
                                    href={`/collection/lists/${list.id}`}
                                    linkText={list.name}
                                    hasArrow={true}
                                />
                            </div>
                        </li>
                    ))
                ) : (
                    <p className="text-center text-xl mt-12 mb-20">No lists...</p>
                )}
            </div>
        )
    }
}
