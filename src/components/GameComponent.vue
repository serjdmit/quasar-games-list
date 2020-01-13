<template>
  <div class="q-pa-md col-3 col-xs-12 col-sm-6 col-lg-4 col-xl-3">
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
        <q-btn-group
          spread
          class="q-pa-md q-mt-md col-12 col-md-3 column justify-between"
        >
          <q-btn
            outline
            :text-color="!game.like ? '' : 'red'"
            :icon="!game.like ? 'favorite_border' : 'favorite'"
            @click="$emit('like')"
          />
          <q-btn
            v-if="game.hasDemo == 'true'"
            outline
            label="demo"
            style="margin-top: 20px"
          />
        </q-btn-group>
      </div>
    </q-card>
  </div>
</template>

<script>
export default {
  props: ["game", "index"]
};
</script>
