<script>
import HelloWorld from "./components/HelloWorld.vue";
import { useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";

const ALL_BOOK_QUERY = gql`
  query AllBooks {
    allBooks {
      id
      title
      rating
    }
  }
`;
export default {
  name: "App",
  setup() {
    const { result } = useQuery(ALL_BOOK_QUERY);
    console.log(result);
  },
};
</script>

<template>
  <img alt="Vue logo" src="./assets/logo.png" />
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
