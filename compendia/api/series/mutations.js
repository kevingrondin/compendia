import Series from "./series";

export const seriesMutations = {
    Mutation: {
        async addSeries(_, { series }) {
            try {
                const newSeries = await Series.create({
                    ...series,
                });
                return newSeries;
            } catch (e) {
                console.log(e);
            }
        },
    },
};
