<template>
  <div>
    <div>
      <button v-if="!showNewBookForm" @click="showNewBookForm = true">
        Add a new book
      </button>
      <AddBook v-if="showNewBookForm" @closeForm="showNewBookForm = false" />
    </div>
    <input type="text" v-model="searchTerm" />
    <p v-if="loading">Loading...</p>
    <p v-else-if="error">Something went wrong...</p>
    <template v-else>
      <p v-if="activeBook">
        Update "{{ activeBook.title }}" rating:
        <EditRating
          :initial-rating="activeBook.rating"
          :book-id="activeBook.id"
          @closeForm="activeBook = null"
        />
      </p>
      <template v-else>
        <p v-for="book in books" :key="book.id">
          {{ book.title }} - {{ book.rating }}
          <button @click="activeBook = book">Edit Rating</button>
        </p>
      </template>
    </template>
  </div>
</template>

<script>
import { useQuery, useResult } from "@vue/apollo-composable";
import ALL_BOOKS_QUERY from "./graphql/allBooks.query.gql";
import { ref } from "vue";
import EditRating from "./components/EditRating.vue";
import AddBook from "./components/AddBook.vue";

export default {
  name: "App",
  components: {
    EditRating,
    AddBook,
  },
  setup() {
    const searchTerm = ref("");
    const activeBook = ref(null);
    const showNewBookForm = ref(false);
    const { result, loading, error } = useQuery(
      ALL_BOOKS_QUERY,
      () => ({
        search: searchTerm.value,
      }),
      // only start query when user stopped typing for 0.5 seconds and the search term > 2 characters
      () => ({
        debounce: 500,
        enabled: searchTerm.value.length > 2,
      })
    );

    const books = useResult(result, [], (data) => data.allBooks);
    return { books, searchTerm, loading, error, activeBook, showNewBookForm };
  },
};
</script>

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
