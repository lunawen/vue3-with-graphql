import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client/core";
import { createApp, h, provide } from "vue";
import gql from "graphql-tag";
import { DefaultApolloClient } from "@vue/apollo-composable";
import App from "./App.vue";

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});

const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
});

const ALL_BOOK_QUERY = gql`
  query AllBooks {
    allBooks {
      id
      title
      rating
    }
  }
`;

// Use Case: Keep local store in Vuex
// apolloClient
//   .query({
//     query: ALL_BOOK_QUERY,
//   })
//   .then(res);

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },
  render: () => h(App),
});

app.mount("#app");
