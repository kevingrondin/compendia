export default function handler(req, res) {
    res.statusCode = 200
    res.setHeader("Content-Type", "application/json")
    res.end(
        JSON.stringify([
            {
                id: 1,
                title: "#1",
                cover:
                    "https://cdn.imagecomics.com/assets/i/releases/27803/gideon-falls-1_9f981b8583.jpg",
                series: {
                    name: "Gideon Falls",
                },
            },
        ])
    )
}
