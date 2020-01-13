<template>
  <q-page class="q-pa-lg">
    <h3 class="text-h5">Favorites</h3>
    <div class="row">
      <game-component
        v-for="(game, index) in favoriteGames"
        :key="index"
        :game="game"
        :index="index"
        @like="unlikeGame(index, game.title, 'top')"
      />
    </div>
    <empty-page :elements="favoriteGames" />
  </q-page>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  name: "Favorites",
  computed: {
    ...mapGetters(["favoriteGames", "favoriteGamesList"]),
    ...mapState(["favorites"])
  },
  methods: {
    unlikeGame(index, title, position) {
      this.$q
        .dialog({
          title: "Confirm",
          message: "The game will be removed from favorits",
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          const i = this.favoriteGamesList.indexOf(
            this.favoriteGames[index].id
          );
          this.favoriteGamesList.splice(i, 1);
          this.favoriteGames[index].like = false;

          this.$q.notify({
            position,
            message: `${title} removed from favorites`,
            icon: "delete"
          });
        });
    }
  },
  components: {
    "game-component": require("components/GameComponent.vue").default,
    "empty-page": require("components/EmptyPage.vue").default
  }
};
</script>
