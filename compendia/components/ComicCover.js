export default function ComicCover(props) {
    let cover = props.comic.cover;

    if (props.comic.cover === "") cover = "/NoCover.svg";

    return (
        <article>
            <p>{props.comic.title}</p>
            <img src={cover} />
        </article>
    );
}
