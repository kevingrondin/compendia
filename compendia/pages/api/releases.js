const sortByPublisher = JSON.stringify([
    {
        id: 1,
        name: "Image Comics",
        releases: [
            {
                id: 1,
                title: "#1",
                cover: "/GideonFalls1.jpg",
                series: "Gideon Falls",
            },
            {
                id: 2,
                title: "#1",
                cover: "/IceCreamMan1.jpg",
                series: "Ice Cream Man",
            },
            {
                id: 3,
                title: "#163",
                cover: "/TheWalkingDead163.png",
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
                series: "Flashpoint",
            },
            {
                id: 33,
                title: "#768",
                cover: "/WonderWoman768.jpg",
                series: "Wonder Woman",
            },
            {
                id: 34,
                title: "#1032",
                cover: "/DetectiveComics1032.jpg",
                series: "Detective Comics",
            },
            {
                id: 35,
                title: "#767",
                cover: "/TheFlash767.jpg",
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
                series: "The Avengers: Earth's Mightiest Heroes",
            },
            {
                id: 21,
                title: "#9",
                cover: "/StarWars9.jpg",
                series: "Star Wars - Operation Starlight: The Ancient Relic",
            },
            {
                id: 23,
                title: "#31",
                cover: "/Venom31.jpg",
                series: "Venom: King in Black",
            },
            {
                id: 24,
                title: "#24",
                cover: "/CaptainMarvel24.jpg",
                series: "Captain Marvel",
            },
            {
                id: 26,
                title: "#16",
                cover: "/Marauders16.jpg",
                series: "Marauders",
            },
        ],
    },
])

export default function handler(req, res) {
    res.statusCode = 200
    res.setHeader("Content-Type", "application/json")
    res.end(sortByPublisher)
}
