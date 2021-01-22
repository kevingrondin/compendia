import { useQuery, useQueryClient } from "react-query"
import { useRouter } from "next/router"
import { useEffect } from "react"
import axios from "axios"

import Page from "../../components/pages/Page"
import ComicCover from "../../components/pages/comic/ComicCover"
import PageHeading from "../../components/pages/PageHeading"
import Category from "../../components/pages/Category"

const useCreatorDetail = (creatorID) =>
    useQuery(
        ["creator-detail", creatorID],
        async () => {
            const { data } = await axios.get(`/api/creators/${creatorID}?sortBy=releaseDate`)
            return data
        },
        { enabled: false, staleTime: Infinity }
    )

export default function CreatorDetail() {
    const queryClient = useQueryClient()
    const router = useRouter()
    const { creatorID } = router.query
    const { isLoading, isError, error, data: creator } = useCreatorDetail(parseInt(creatorID))

    useEffect(() => {
        if (creatorID) queryClient.refetchQueries(["creator-detail", parseInt(creatorID)])
    }, [creatorID])

    if (isLoading) return <div>Loading...</div>
    else if (isError) return <div>Error: {error.message}</div>
    else if (!creatorID || creator === undefined) return <></>
    else {
        return (
            <Page title={`Creator - ${creator.name}`}>
                <div>
                    <PageHeading>
                        <div className="flex flex-col">
                            <span className="text-2xl">Comics by</span>
                            {creator.name}
                        </div>
                    </PageHeading>
                    <div className="flex flex-wrap">
                        <ul>
                            {creator.comics.map((comic) => (
                                <li key={comic.id}>
                                    <ComicCover
                                        comicID={comic.id}
                                        cover={comic.cover}
                                        title={comic.title}
                                        footer={
                                            <ul className="flex flex-wrap">
                                                {comic.creatorTypes.map((type, index) => (
                                                    <li
                                                        key={`${creatorID}-${comic.id}-${type}`}
                                                        className="flex"
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
                </div>
            </Page>
        )
    }
}
