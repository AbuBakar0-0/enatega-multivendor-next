import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  link: new HttpLink({
    uri: process.env.NEXT_PUBLIC_APOLLO_URL,
  }),
  cache: new InMemoryCache(),
});
