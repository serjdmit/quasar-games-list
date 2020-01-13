<template>
  <q-page class="q-pa-lg">
    <h3 class="text-h5">All Games</h3>
    <div class="row">
      <!-- One game  -->

      <div
        class="q-pa-md col-3 col-xs-12 col-sm-6 col-lg-4 col-xl-3"
        v-for="(game, index) in allGames"
        :key="index"
      >
        <q-card class="my-card">
          <q-card-section>
            <div class="text-h6">{{ game.title }}</div>
          </q-card-section>
          <div class="q-pa-md col-12 col-md-8 row justify-between">
            <q-parallax
              :src="`https://i.picsum.photos/id/${game.id}/400/300.jpg`"
              :height="150"
              class="col-12 col-md-8"
            />
            <q-btn-group spread class="q-pa-md q-mt-md col-12 col-md-3 column justify-between">
              <q-btn
                outline
                :text-color="!game.like ? '' : 'red'"
                :icon="!game.like ? 'favorite_border' : 'favorite'"
                @click="likeGame(index, game.title, 'top-right')"
              />
              <q-btn v-if="game.hasDemo == 'true'" outline label="demo" style="margin-top: 20px" />
            </q-btn-group>
          </div>
        </q-card>
      </div>

      <!-- One game end  -->
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
  }
};
</script>
