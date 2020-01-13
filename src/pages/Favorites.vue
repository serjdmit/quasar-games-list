<template>
  <q-page class="q-pa-lg">
    <h5 class="text-h5">Favorites</h5>
    <div class="row">
      <div
        class="q-pa-md col-3 col-xs-12 col-sm-6 col-lg-4 col-xl-3"
        v-for="(game, index) in favoriteGames"
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
                @click="unlikeGame(index, game.title)"
              />
              <q-btn v-if="game.hasDemo == 'true'" outline label="demo" style="margin-top: 20px" />
            </q-btn-group>
          </div>
        </q-card>
      </div>
    </div>
    <div v-if="!favoriteGames.length" class="no-favotites absolute-center">
      <div class="text-h5 text-center">
        <q-icon name="favorite_border" size="100px" class="text-center q-pb-lg" />
        <p>No favorites yet</p>
      </div>
    </div>
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
    unlikeGame(index, title) {
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

          this.$q.notify(`${title} removed from favorites`);
        });
    }
  }
};
</script>
