import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { offsetLimitPagination } from "@apollo/client/utilities";
import React from "react";

function BackendServiceContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const httpLink = createHttpLink({
    uri: import.meta.env.VITE_BACKEND_SERVER_URL,
  });

  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem(import.meta.env.VITE_TOKEN_KEY);

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            postFeeds: offsetLimitPagination(),
            postComments: offsetLimitPagination(["postId"])
          },
        },
      },
    }),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

export default BackendServiceContextProvider;
