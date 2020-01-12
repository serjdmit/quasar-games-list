<template>
  <q-page class="q-pa-lg">
    <h5>Favorites</h5>
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
          <div class="q-pa-md col-12 col-md-8 row">
            <q-parallax
              :src="`https://i.picsum.photos/id/${game.id}/1700/1200.jpg`"
              :height="150"
              class="col-12 col-md-8"
            />
            <q-btn-group spread class="q-pa-md col-12 col-md-4 column justify-between">
              <q-btn
                outline
                :icon="!game.like ? 'favorite_border' : 'favorite'"
                @click="unlikeGame(index)"
              />
              <q-btn v-if="game.hasDemo == 'true'" outline label="demo" style="margin-top: 20px" />
            </q-btn-group>
          </div>
        </q-card>
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
    unlikeGame(index) {
      const i = this.favoriteGamesList.indexOf(this.favoriteGames[index].id);
      this.favoriteGamesList.splice(i, 1);
      this.favoriteGames[index].like = false;
    }
  }
};
</script>
