<template>
  <q-page class="q-pa-lg">
    <h3 class="text-h5">All Games</h3>

    <div class="row">
      <game-component
        v-for="(game, index) in allGames"
        :key="index"
        :game="game"
        :index="index"
        @like="likeGame(index, game.title, 'top')"
      />
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";
export default {
  computed: {
    ...mapGetters(["allGames", "favoriteGamesList"]),
    ...mapState(["games", "favorites"])
  },
  methods: {
    likeGame(index, title, position) {
      if (this.favoriteGamesList.indexOf(this.allGames[index].id) > -1) {
        this.unlikeGame(index, title, position);
      } else {
        this.allGames[index].like = true;
        this.favoriteGamesList.push(this.allGames[index].id);
        this.$q.notify({
          position,
          textColor: "red",
          color: "black",
          message: `${title} added to favorites`,
          icon: "favorite"
        });
      }
    },
    unlikeGame(index, title, position) {
      this.$q
        .dialog({
          title: "Confirm",
          message: "The game will be removed from favorits",
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          const i = this.favoriteGamesList.indexOf(this.allGames[index].id);
          this.favoriteGamesList.splice(i, 1);
          this.allGames[index].like = false;
          this.$q.notify({
            position,
            message: `${title} removed from favorites`,
            icon: "favorite_border"
          });
        });
    }
  },
  components: {
    "game-component": require("components/GameComponent.vue").default
  }
};
</script>
