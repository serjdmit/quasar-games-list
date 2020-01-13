<template>
  <q-layout view="lHh Lpr lFf" class="layout">
    <q-header :reveal-offset="500" class="header">
      <div class="q-px-lg q-pt-lg">
        <div class="text-h2">Games</div>
        <div class="text-subtitle">All Games</div>
        <q-img src="statics/game.jpg" class="header-image absolute-top" />
      </div>
    </q-header>

    <q-page-container>
      <keep-alive>
        <router-view />
      </keep-alive>
    </q-page-container>

    <q-btn-group spread class="fixed-bottom">
      <q-btn to="/" exact color="light-blue-10" label="All Games" icon="games" class="q-pa-lg" />
      <q-btn
        to="/favorites"
        exact
        color="dark"
        :text-color="favoritesCount !== 0 ? 'red' : ''"
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
  overflow: hidden;
}
.header-image {
  height: 200px;
  z-index: -1;
  opacity: 0.6;
}
.layout {
  padding-bottom: 90px;
}
</style>
