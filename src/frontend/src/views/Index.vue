<template>
  <main class="content">
    <form
      action="#"
      method="post"
    >
        <div class="content__wrapper">
          <h1 class="title title--big">Конструктор пиццы</h1>
          <BuilderDoughSelector/>
          <BuilderSizeSelector/>
          <BuilderIngredientsSelector/>
          <BuilderPizzaView @drop="changeIngredient" />
        </div>
    </form>
  </main>
</template>

<script>
import { mapMutations } from 'vuex'
import BuilderDoughSelector from '@/modules/builder/components/BuilderDoughSelector'
import BuilderSizeSelector from '@/modules/builder/components/BuilderSizeSelector'
import BuilderIngredientsSelector from '@/modules/builder/components/BuilderIngredientsSelector'
import BuilderPizzaView from '@/modules/builder/components/BuilderPizzaView'

export default {
  name: 'IndexHome',

  components: {
    BuilderDoughSelector,
    BuilderSizeSelector,
    BuilderIngredientsSelector,
    BuilderPizzaView
  },

  methods: {
    ...mapMutations("builder", ["setCountIngredients"]),

    changeIngredient(drop) {
      this.$store.state.builder.ingredientsItems.forEach((el) => {
        if (el.label == drop.ingredient.label) {
          el.count++;
        }
      });
      let item = { label: drop.ingredient, count: drop.count };
      this.setCountIngredients(item);
    },
  }
}
</script>

<style>

</style>
