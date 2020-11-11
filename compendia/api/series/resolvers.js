import Series from "./series";
import Publishers from "../publishers/publishers";

export const seriesResolvers = {
    Query: {
        async series() {
            try {
                const series = await Series.find();
                series.publisher = await Publishers.find(series.publisher);
                return series;
            } catch (e) {
                console.log("e", e);
            }
        },
    },
};
