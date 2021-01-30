import { useQueryClient } from "react-query"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

import Page from "../../components/pages/Page"
import ComicCover from "../../components/pages/comic/ComicCover"
import PageHeading from "../../components/pages/PageHeading"
import Category from "../../components/pages/Category"
import FilterIcon from "../../components/icons/Filter"
import { SVGOptionsButton } from "../../components/buttons/OptionsButton"
import FilterOptions from "../../components/pages/creator/FilterOptions"
import { useCreatorComics, useCreatorDetail } from "../../hooks/queries/creator"

export default function CreatorDetail() {
    const queryClient = useQueryClient()
    const router = useRouter()
    const { creatorID } = router.query

    const [filterTypes, setFilterTypes] = useState(["W", "A", "CA"])

    const {
        isLoading: creatorIsLoading,
        isError: creatorIsError,
        error: creatorError,
        data: creator,
    } = useCreatorDetail(parseInt(creatorID))

    const {
        isLoading: comicsIsLoading,
        isError: comicsIsError,
        error: comicsError,
        data: comicsData,
    } = useCreatorComics(parseInt(creatorID), filterTypes)

    const comics = comicsData && comicsData.comics ? comicsData.comics : []

    console.log(comicsData)

    useEffect(() => {
        if (creatorID) {
            queryClient.refetchQueries(["creator-detail", parseInt(creatorID)])
            queryClient.refetchQueries(["creator-comics", parseInt(creatorID)])
        }
    }, [creatorID])

    useEffect(() => {
        queryClient.refetchQueries(["creator-comics", parseInt(creatorID), filterTypes])
        console.log("Hello", filterTypes)
    }, [filterTypes])

    if (creatorIsLoading || comicsIsLoading) return <div>Loading...</div>
    else if (creatorIsError || comicsIsError)
        return (
            <div>
                Error:{" "}
                {`${comicsError && comicsError.message} ${creatorError && creatorError.message}`}
            </div>
        )
    else if (!creatorID || creator === undefined || comics === undefined) return <></>
    else {
        return (
            <Page title={`Creator - ${creator.name}`}>
                <PageHeading>
                    <div className="flex flex-col">
                        <span className="text-2xl">Comics by</span>
                        {creator.name}
                    </div>
                </PageHeading>
                <div className="flex justify-end mb-8 -mt-3">
                    <SVGOptionsButton
                        options={
                            <FilterOptions
                                creatorID={creatorID}
                                filterTypes={filterTypes}
                                setFilterTypes={setFilterTypes}
                            />
                        }
                    >
                        <FilterIcon />
                    </SVGOptionsButton>
                </div>
                {comics && comics.length > 0 ? (
                    <div className="flex flex-wrap">
                        <ul>
                            {comics.map((comic) => (
                                <li key={comic.id}>
                                    <ComicCover
                                        comicID={comic.id}
                                        cover={comic.cover}
                                        title={comic.title}
                                        footer={
                                            <ul className="flex flex-wrap justify-center">
                                                {comic.creatorTypes.map((type, index) => (
                                                    <li
                                                        key={`${creatorID}-${comic.id}-${type}`}
                                                        className="flex mt-2"
                                                    >
                                                        <Category size="SM">{type}</Category>
                                                        {index !==
                                                            comic.creatorTypes.length - 1 && (
                                                            <span className="text-2xl mx-1 text-blue-primary-200">
                                                                /
                                                            </span>
                                                        )}
                                                    </li>
                                                ))}
                                            </ul>
                                        }
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <p className="text-center text-xl mt-12 mb-20">No comics...</p>
                )}
            </Page>
        )
    }
}
