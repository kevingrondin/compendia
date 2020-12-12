const sortByNone = JSON.stringify([
    {
        id: 1,
        title: "#1",
        cover: "/GideonFalls1.jpg",
        releaseDate: "12/09/2020",
        coverPrice: "$3.99",
        description: "",
        series: "Gideon Falls",
        publisher: "Image Comics",
    },
    {
        id: 2,
        title: "#1",
        cover: "/IceCreamMan1.jpg",
        releaseDate: "12/09/2020",
        coverPrice: "$3.99",
        description: "",
        series: "Ice Cream Man",
        publisher: "Image Comics",
    },
    {
        id: 3,
        title: "#163",
        cover: "/TheWalkingDead163.png",
        releaseDate: "12/09/2020",
        coverPrice: "$3.99",
        description: "",
        series: "The Walking Dead",
        publisher: "Image Comics",
    },
])

const sortByPublisher = JSON.stringify([
    {
        id: 1,
        name: "Image Comics",
        releases: [
            {
                id: 1,
                title: "#1",
                cover: "/GideonFalls1.jpg",
                releaseDate: "12/09/2020",
                coverPrice: "$3.99",
                description: "",
                series: "Gideon Falls",
            },
            {
                id: 2,
                title: "#1",
                cover: "/IceCreamMan1.jpg",
                releaseDate: "12/09/2020",
                coverPrice: "$3.99",
                description: "",
                series: "Ice Cream Man",
            },
            {
                id: 3,
                title: "#163",
                cover: "/TheWalkingDead163.png",
                releaseDate: "12/09/2020",
                coverPrice: "$3.99",
                description: "",
                series: "The Walking Dead",
            },
        ],
    },
    {
        id: 2,
        name: "DC Comics",
        releases: [
            {
                id: 32,
                title: "#1",
                cover: "/Flashpoint1.jpg",
                releaseDate: "12/09/2020",
                coverPrice: "$3.99",
                description: "",
                series: "Flashpoint",
            },
            {
                id: 33,
                title: "#768",
                cover: "/WonderWoman768.jpg",
                releaseDate: "12/09/2020",
                coverPrice: "$3.99",
                description: "",
                series: "Wonder Woman",
            },
            {
                id: 34,
                title: "#1032",
                cover: "/DetectiveComics1032.jpg",
                releaseDate: "12/09/2020",
                coverPrice: "$3.99",
                description: "",
                series: "Detective Comics",
            },
            {
                id: 35,
                title: "#767",
                cover: "/TheFlash767.jpg",
                releaseDate: "12/09/2020",
                coverPrice: "$3.99",
                description: "",
                series: "The Flash",
            },
        ],
    },
    {
        id: 3,
        name: "Marvel Comics",
        releases: [
            {
                id: 20,
                title: "#39",
                cover: "/TheAvengers39.jpg",
                releaseDate: "12/09/2020",
                coverPrice: "$3.99",
                description: "",
                series: "The Avengers: Earth's Mightiest Heroes",
            },
            {
                id: 21,
                title: "#9",
                cover: "/StarWars9.jpg",
                releaseDate: "12/09/2020",
                coverPrice: "$3.99",
                description: "",
                series: "Star Wars - Operation Starlight: The Ancient Relic",
            },
            {
                id: 23,
                title: "#31",
                cover: "/Venom31.jpg",
                releaseDate: "12/09/2020",
                coverPrice: "$3.99",
                description: "",
                series: "Venom: King in Black",
            },
            {
                id: 24,
                title: "#24",
                cover: "/CaptainMarvel24.jpg",
                releaseDate: "12/09/2020",
                coverPrice: "$3.99",
                description: "",
                series: "Captain Marvel",
            },
            {
                id: 26,
                title: "#16",
                cover: "/Marauders16.jpg",
                releaseDate: "12/09/2020",
                coverPrice: "$3.99",
                description: "",
                series: "Marauders",
            },
        ],
    },
])

export default function handler(req, res) {
    res.statusCode = 200
    res.setHeader("Content-Type", "application/json")
    if (req.query.sortBy === "publisher") {
        res.end(sortByPublisher)
    } else {
        res.end(sortByNone)
    }
}
