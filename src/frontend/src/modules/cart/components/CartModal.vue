<template>
  <div class="popup">
    <a href="#" class="close" @click="closeModal()">
      <span class="visually-hidden">Закрыть попап</span>
    </a>
    <div class="popup__title">
      <h2 class="title">Спасибо за заказ</h2>
    </div>
    <p>Мы начали готовить Ваш заказ, скоро привезём его вам ;)</p>
    <div class="popup__button">
      <a href="#" class="button" @click="closeModal()"> Отлично, я жду! </a>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "CartModal",
  computed: {
    ...mapState("auth", ["user"]),
  },
  methods: {
    ...mapActions("cart", ["resetCartState"]),
    async closeModal() {
      this.resetCartState()
      if (this.user !== null) {
        await this.$router.push({ name: "Orders" });
      } else {
        await this.$router.push({ name: "IndexHome" });
      }
    },
  },
};
</script>
<style lang="scss"></style>
