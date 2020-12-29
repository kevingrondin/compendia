const sortByNone = [
    {
        id: 1,
        title: "#1",
        cover: "/GideonFalls1.jpg",
        releaseDate: "12/09/2020",
        coverPrice: "$3.99",
        description:
            "“ORIGINAL SINS,” Part Four The past finally catches up to the present when Doc gives Father Fred a rather gruesome history of Gideon Falls. And if finding a needle in a haystack is impossible, what chance does Norton have of finding one in a giant garbage dump? Hollywood News: Picked up for TV by Hivemind after a multi-studio bidding war with long-time producing partners Sean Daniel and Jason Brown, Bad Robot veteran Kathy Lingg, and former Valiant Entertainment CEO & Chief Creative Officer Dinesh Shamdasani.",
        series: {
            name: "Gideon Falls",
            id: 24,
        },
        publisher: {
            id: 1,
            name: "Image Comics",
        },
        rating: "MA",
        format: "Comic",
        versions: 3,
        lists: [{}],
    },
    {
        id: 2,
        title: "#1",
        cover: "/IceCreamMan1.jpg",
        releaseDate: "12/09/2020",
        coverPrice: "$3.99",
        description: "",
        series: {
            name: "Ice Cream Man",
            id: 24,
        },
        publisher: {
            id: 1,
            name: "Image Comics",
        },
        rating: "MA",
        format: "Comic",
        versions: 1,
    },
    {
        id: 3,
        title: "#163",
        cover: "/TheWalkingDead163.png",
        releaseDate: "12/09/2020",
        coverPrice: "$3.99",
        description: "",
        series: {
            name: "The Walking Dead",
            id: 24,
        },
        publisher: {
            id: 1,
            name: "Image Comics",
        },
        rating: "MA",
        format: "Comic",
        versions: 6,
    },
]

export default function handler(req, res) {
    const {
        query: { id },
    } = req
    const comic = sortByNone.find((c) => c.id === parseInt(id))

    res.setHeader("Content-Type", "application/json")
    if (comic) {
        res.statusCode = 200
        res.end(JSON.stringify(comic))
    } else {
        res.statusCode = 404
        res.end(`Could not find a comic with ID of ${id}`)
    }
}
