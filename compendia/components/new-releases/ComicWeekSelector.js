export default function ComicWeekSelector() {
    return (
        <div className="flex justify-around align-center pt-1">
            <img
                src="/arrowLeftBlue.svg"
                className="flex justify-around align-center pt-1"
                alt="previous comic week"
            />
            <h2 className="text-4xl text-center text-blue-500">Here's this week's comics.</h2>
            <img
                src="/arrowRightBlue.svg"
                className="flex justify-around align-center pt-1"
                alt="next comic week"
            />
        </div>
    )
}
