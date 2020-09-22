import Comics from "./comics";

export const comicsResolvers = {
    Query: {
        async comics() {
            try {
                const comics = await Comics.find();
                return comics;
            } catch (e) {
                console.log("e", e);
            }
        },
    },
};
