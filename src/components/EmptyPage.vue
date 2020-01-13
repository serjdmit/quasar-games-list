<template>
  <div v-if="!elements.length" class="absolute-center" style="opacity: 0.3">
    <div class="text-h5 text-center">
      <q-icon name="favorite_border" size="100px" class="text-center q-pb-lg" />
      <p>No favorites yet</p>
    </div>
  </div>
</template>
<script>
export default {
  props: ["elements"]
};
</script>
