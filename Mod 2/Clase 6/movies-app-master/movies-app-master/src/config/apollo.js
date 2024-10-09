import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://ddam-2022-react-api.onrender.com/movies/graphql",
  cache: new InMemoryCache(),
});

export function MovieApolloClient(props) {
  return <ApolloProvider client={client} {...props}></ApolloProvider>;
}
