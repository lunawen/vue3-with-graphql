<script>
import { useQuery } from "@vue/apollo-composable";
import ALL_BOOKS_QUERY from "./graphql/allBooks.query.gql";
import { ref } from "vue";

export default {
  name: "App",
  setup() {
    const searchTerm = ref("");
    const { result, loading, error } = useQuery(ALL_BOOKS_QUERY, () => ({
      search: searchTerm.value,
    }));
    return { result, searchTerm, loading, error };
  },
};
</script>

<template>
  <div>
    <input type="text" v-model="searchTerm" />
    <p v-if="loading">Loading...</p>
    <p v-else-if="error">Something went wrong...</p>
    <template v-else>
      <p v-for="book in result?.allBooks" :key="book.id">
        {{ book.title }}
      </p>
    </template>
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
