import Publishers from "./publishers";

export const publishersResolvers = {
    Query: {
        async publishers() {
            try {
                const publishers = await Publishers.find();
                return publishers;
            } catch (e) {
                console.log("e", e);
            }
        },
    },
};
