import { withApollo } from "../lib/apollo";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const HELLO_QUERY = gql`
    query HelloQuery {
        sayHello
    }
`;

function testGQL() {
    const { data, loading, error } = useQuery(HELLO_QUERY);

    if (loading) return <div />;

    return <h1>{data.sayHello}</h1>;
}

export default withApollo(testGQL);
