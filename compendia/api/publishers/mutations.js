import Publishers from "./publishers";

export const publishersMutations = {
    Mutation: {
        async addPublisher(_, { publisher }) {
            try {
                const newPublisher = await Publishers.create({
                    ...publisher,
                });
                return newPublisher;
            } catch (e) {
                console.log(e);
            }
        },
    },
};
