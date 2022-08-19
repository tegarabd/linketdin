import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import React from "react";

function BackendServiceProvider({ children }: { children: React.ReactNode }) {
  const httpLink = createHttpLink({
    uri: import.meta.env.BACKEND_SERVER_URL,
  });

  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem(import.meta.env.TOKEN_KEY);

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  return (
    <>
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </>
  );
}

export default BackendServiceProvider;
