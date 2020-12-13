const pullList = JSON.stringify([
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
    {
        id: 33,
        title: "#768",
        cover: "/WonderWoman768.jpg",
        releaseDate: "12/09/2020",
        coverPrice: "$3.99",
        description: "",
        series: "Wonder Woman",
        publisher: "DC Comics",
    },
    {
        id: 23,
        title: "#31",
        cover: "/Venom31.jpg",
        releaseDate: "12/09/2020",
        coverPrice: "$3.99",
        description: "",
        series: "Venom: King in Black",
        publisher: "Marvel Comics",
    },
    {
        id: 24,
        title: "#24",
        cover: "/CaptainMarvel24.jpg",
        releaseDate: "12/09/2020",
        coverPrice: "$3.99",
        description: "",
        series: "Captain Marvel",
        publisher: "Marvel Comics",
    },
])

export default function handler(req, res) {
    res.statusCode = 200
    res.setHeader("Content-Type", "application/json")
    res.end(pullList)
}
