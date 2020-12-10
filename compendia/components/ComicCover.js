export default function ComicCover({
    comic: {
        id,
        title,
        cover,
        series: { name: seriesName },
    },
}) {
    return (
        <article key={id}>
            <p>{`${seriesName} ${title}`}</p>
            <img className="h-72" src={cover} alt={`Comic cover for ${title}`} />
        </article>
    )
}
