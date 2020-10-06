import Comics from "./comics";
import Series from "../series/series";

export const comicsMutations = {
    Mutation: {
        async addComic(_, { comic }, { series }) {
            try {
                const newComic = await Comics.create({
                    ...comic,
                    series,
                });
                return newComic;
            } catch (e) {
                console.log(e);
            }
        },
    },
};
