<template>
  <main class="content">
    <form action="#" method="post">
        <div class="content__wrapper">
          <h1 class="title title--big">Конструктор пиццы</h1>
          <BuilderDoughSelector/>
          <BuilderSizeSelector/>
          <BuilderIngredientsSelector/>
          <BuilderPizzaView
            @drop="changeIngredient"
          />
        </div>
    </form>
  </main>
</template>

<script>
import BuilderDoughSelector from '@/modules/builder/components/BuilderDoughSelector'
import BuilderSizeSelector from '@/modules/builder/components/BuilderSizeSelector'
import BuilderIngredientsSelector from '@/modules/builder/components/BuilderIngredientsSelector'
import BuilderPizzaView from '@/modules/builder/components/BuilderPizzaView'
import { mapActions } from 'vuex'

export default {
  name: 'Index',
  components: {
    BuilderDoughSelector,
    BuilderSizeSelector,
    BuilderIngredientsSelector,
    BuilderPizzaView
  },
  created() {
    this.getIngredientsData();
    this.getDoughData();
    this.getSaucesData();
    this.getMiscData();
  },
  methods: {
    ...mapActions("builder", ["getIngredientsData"]),
    ...mapActions("builder", ["getDoughData"]),
    ...mapActions("builder", ["getSaucesData"]),
    ...mapActions("cart", ["getMiscData"]),
    dropIngredients(drop) {
      this.$store.state.builder.ingredientsItems.forEach((el) => {
        if (el.label == drop) {
          el.count++;
        }
      });
    },
  }
}
</script>

<style>

</style>
