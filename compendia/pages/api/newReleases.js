export default function handler(req, res) {
    res.statusCode = 200
    res.setHeader("Content-Type", "application/json")
    res.end(
        JSON.stringify([
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
    )
}
