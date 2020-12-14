import { useRouter } from "next/router"
import SecondaryPage from "../../components/SecondaryPage"
import axios from "axios"
import { useQuery } from "react-query"
import Image from "next/image"

function useComicDetail(id) {
    return useQuery(`comic-detail-${id}`, async () => {
        const { data } = await axios.get(`/api/comics/${id}`)
        return data
    })
}

export default function Comic() {
    const router = useRouter()
    const { id } = router.query
    const { status, error, data: comic } = useComicDetail(id)

    return (
        <>
            {status === "loading" ? (
                <div>Loading...</div>
            ) : status === "error" ? (
                <div>Error: {error.message}</div>
            ) : (
                <SecondaryPage pageTitle={comic.series.name + " " + comic.title}>
                    <Image
                        src={comic.cover}
                        alt={`Cover art for ${comic.title}`}
                        width="200"
                        height="310"
                        className="h-full rounded"
                    />
                    <h2>{`${comic.series.name} ${comic.title}`}</h2>
                    <p>{comic.publisher.name}</p>
                    <p>
                        {comic.format} - {comic.releaseDate} - {comic.coverPrice}
                    </p>
                    <p>{comic.rating}</p>
                    <p>{comic.description}</p>
                </SecondaryPage>
            )}
        </>
    )
}
