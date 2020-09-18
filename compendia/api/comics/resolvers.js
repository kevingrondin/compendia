export const comicsResolvers = {
    Query: {
        async comics() {
            console.log("comics");
            return [
                {
                    _id: "awdawd",
                    title: "SWEET Title dog",
                    spec: "SWEET spec dog",
                },
            ];
        },
    },
};
