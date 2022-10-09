<template>
  <nav>
    <router-link to="/">Таблица</router-link> |
    <router-link to="/about">Информация</router-link>
  </nav>
  <router-view />
</template>

<script>
import { mapActions } from "vuex";

export default {
  methods: {
    ...mapActions(["GET_TABLE_DATA_FROM_API"]),
  },

  created() {
    this.GET_TABLE_DATA_FROM_API();
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: calc(4px + 22 * (100vw / 1280));
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
