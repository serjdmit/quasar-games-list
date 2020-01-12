<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <div class="q-px-lg q-pt-lg header">
        <div class="text-h2">Games</div>
        <div class="text-subtitle">All Games</div>
      </div>
      <q-img src="statics/game.jpg" class="header-image absolute-top" />
    </q-header>

    <q-page-container>
      <keep-alive>
        <router-view />
      </keep-alive>
    </q-page-container>

    <q-btn-group spread class="fixed-bottom">
      <q-btn to="/" exact color="dark" label="All Games" icon="games" />
      <q-btn
        to="/favorites"
        exact
        color="dark"
        :label="favoritesCount !== 0 ? `Favorites (${favoritesCount})` : 'Favorites'"
        icon="favorites"
      />
    </q-btn-group>
  </q-layout>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "MyLayout",
  computed: mapGetters(["favoritesCount"]),
  methods: mapActions(["fetchGames"]),
  async mounted() {
    this.fetchGames();
  }
};
</script>

<style lang="scss" scoped>
.header {
  height: 200px;
}
.header-image {
  height: 200px;
  z-index: -1;
  opacity: 0.4;
}
</style>
