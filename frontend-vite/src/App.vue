<template>
  <div>
    <div>
      <button v-if="!showNewBookForm" @click="showNewBookForm = true">
        Add a new book
      </button>
      <AddBook
        v-if="showNewBookForm"
        :search="searchTerm"
        @closeForm="showNewBookForm = false"
      />
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
        <section class="list-wrapper">
          <div class="list">
            <h3>All Books</h3>
            <p v-for="book in books" :key="book.id">
              {{ book.title }} - {{ book.rating }}
              <button @click="activeBook = book">Edit rating</button>
            </p>
          </div>
          <div class="list">
            <h3>Favorite Books</h3>
            <p v-for="book in favBooksResult.favoriteBooks" :key="book.id">
              {{ book.title }}
            </p>
          </div>
        </section>
      </template>
    </template>
  </div>
</template>

<script>
import { useQuery, useResult } from "@vue/apollo-composable";
import { ref } from "vue";

import AddBook from "./components/AddBook.vue";
import EditRating from "./components/EditRating.vue";

import ALL_BOOKS_QUERY from "./graphql/allBooks.query.gql";
import BOOK_SUBSCRIPTION from "./graphql/newBook.subscription.gql";
import FAVORITE_BOOKS_QUERY from "./graphql/favoriteBooks.query.gql";

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
    const { result, loading, error, subscribeToMore } = useQuery(
      ALL_BOOKS_QUERY,
      () => ({
        search: searchTerm.value,
      }),
      // only start query when user stopped typing for 0.5 seconds and the search term > 2 characters
      () => ({
        debounce: 500,
        // enabled: searchTerm.value.length > 2,
      })
    );

    // Todo: uncomment this when the getSession issue is resolved
    // subscribeToMore(() => ({
    //   document: BOOK_SUBSCRIPTION,
    //   updateQuery(previousResult, newResult) {
    //     console.log({ previousResult, newResult });
    //     const res = {
    //       allBooks: [
    //         ...previousResult.allBooks,
    //         newResult.subscriptionData.data.bookSub,
    //       ],
    //     };
    //     return res;
    //   },
    // }));
    const books = useResult(result, [], (data) => data.allBooks);

    const { result: favBooksResult } = useQuery(FAVORITE_BOOKS_QUERY);
    console.log(favBooksResult.value);
    return {
      books,
      searchTerm,
      loading,
      error,
      activeBook,
      showNewBookForm,
      favBooksResult,
    };
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
.list-wrapper {
  display: flex;
  margin: 0 auto;
  max-width: 960px;
}

.list {
  width: 50%;
}
</style>
