import Comics from "./comics";

export const comicsMutations = {
    Mutation: {
        async addComic(_, { comic }) {
            try {
                const newComic = await Comics.create({
                    ...comic,
                });
                return newComic;
            } catch (e) {
                console.log(e);
            }
        },
    },
};
