import PropTypes from "prop-types"
import { PageLink } from "@components/common/PageLink"

export function SearchResult({ type, children }) {
    return (
        <li className="flex flex-col items-start mb-6">
            <div>{children}</div>
            <div className="text-sm pl-1">{type}</div>
        </li>
    )
}
SearchResult.propTypes = {
    type: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired,
}

export function ComicSearchResult({ comic }) {
    return (
        <SearchResult type={`${comic.type} - ${comic.format}`}>
            <PageLink
                href={`/comics/${comic.id}`}
                linkText={`${comic.title}${comic.itemNumber ? ` ${comic?.itemNumber}` : ""}${
                    comic.coverLetter || comic.variantDescription
                        ? ` -${comic.coverLetter ? ` Cover ${comic.coverLetter}` : ""} ${
                              comic.variantDescription ? comic.variantDescription : ""
                          }`
                        : ``
                }`}
            />
        </SearchResult>
    )
}
ComicSearchResult.propTypes = {
    comic: PropTypes.object.isRequired,
}

export function SeriesSearchResult({ series }) {
    return (
        <SearchResult type={series.type}>
            <PageLink href={`/series/${series.id}`} linkText={`${series.name}`} />
        </SearchResult>
    )
}
SeriesSearchResult.propTypes = {
    series: PropTypes.object.isRequired,
}

export function CreatorSearchResult({ creator }) {
    return (
        <SearchResult type={creator.type}>
            <PageLink href={`/creators/${creator.id}`} linkText={`${creator.name}`} />
        </SearchResult>
    )
}
CreatorSearchResult.propTypes = {
    creator: PropTypes.object.isRequired,
}

export function ImprintSearchResult({ imprint }) {
    return (
        <SearchResult type={imprint.type}>
            <PageLink href={`/publishers/${imprint.id}`} linkText={`${imprint.name}`} />
        </SearchResult>
    )
}
ImprintSearchResult.propTypes = {
    imprint: PropTypes.object.isRequired,
}

export function PublisherSearchResult({ publisher }) {
    return (
        <SearchResult type={publisher.type}>
            <PageLink href={`/publishers/${publisher.id}`} linkText={`${publisher.name}`} />
        </SearchResult>
    )
}
PublisherSearchResult.propTypes = {
    publisher: PropTypes.object.isRequired,
}
