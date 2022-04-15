<script>
import { useQuery } from "@vue/apollo-composable";
import ALL_BOOKS_QUERY from "./graphql/allBooks.query.gql";

export default {
  name: "App",
  setup() {
    const { result } = useQuery(ALL_BOOKS_QUERY);
    return { result };
  },
};
</script>

<template>
  <div>
    <p v-for="book in result?.allBooks" :key="book.id">
      {{ book.title }}
    </p>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
