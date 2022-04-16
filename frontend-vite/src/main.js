import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  split,
} from "@apollo/client/core";
import { getMainDefinition } from "@apollo/client/utilities";
import { createClient } from "graphql-ws";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createApp, h, provide } from "vue";
import { DefaultApolloClient } from "@vue/apollo-composable";
import typeDefs from "./graphql/typedefs.gql";
import FAVORITE_BOOKS_QUERY from "./graphql/favoriteBooks.query.gql";
import App from "./App.vue";

// Todo: used for subscriptions, this is not working
const wsLink = new GraphQLWsLink(
  createClient({
    url: "ws://localhost:4000/graphql",
    connectionParams: () => {
      const session = getSession();
      if (!session) {
        return {};
      }
      return {
        Authorization: `Bearer ${session.token}`,
      };
    },
  })
);

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const cache = new InMemoryCache();

// create initial favourites (can be an empty array)
cache.writeQuery({
  query: FAVORITE_BOOKS_QUERY,
  data: {
    favoriteBooks: [
      {
        __typename: "Book",
        title: "My Book",
        id: 123,
        rating: 5,
      },
    ],
  },
});

// add favourites to local state
const resolvers = {
  Mutation: {
    addBookToFavorites: (_, { book }, { cache }) => {
      // get current data
      const data = cache.readQuery({ query: FAVORITE_BOOKS_QUERY });
      // construct new data
      const newData = {
        favoriteBooks: [...data.favoriteBooks, book],
      };
      // write to cache
      cache.writeQuery({ query: FAVORITE_BOOKS_QUERY, data: newData });
      return newData.favoriteBooks;
    },
  },
};

const apolloClient = new ApolloClient({
  // link, // todo: use this link once the getSession issue is resolved
  link: httpLink,
  cache,
  typeDefs,
  resolvers,
});

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },
  render: () => h(App),
});

app.mount("#app");
