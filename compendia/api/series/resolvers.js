import Series from "./series";

export const seriesResolvers = {
    Query: {
        async series() {
            try {
                const series = await Series.find();
                return series;
            } catch (e) {
                console.log("e", e);
            }
        },
    },
};
