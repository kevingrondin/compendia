import Series from "./series";

export const seriesResolvers = {
    Query: {
        async series() {
            try {
                return await Series.find().populate("publisher").exec();;
            } catch (e) {
                console.log("e", e);
            }
        },
    },
};
