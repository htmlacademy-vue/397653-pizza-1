<template>
  <div>
    <main class="content cart">
      <div class="container">
        <div class="cart__title">
          <h1 class="title title--big">Корзина</h1>
        </div>

        <div v-show="getPizzas.length === 0" class="sheet cart__empty">
          <p>В корзине нет ни одного товара</p>
        </div>
        <CartList
          :pizzas="getPizzas"
        ></CartList>
        <CartAdditional
          :additionals="additionals"
        ></CartAdditional>
        <CartForm :delivery="delivery"></CartForm>
      </div>
    </main>
    <CartPopup v-if="showModal" @close="closePopup"></CartPopup>
    <CartFooter
      :totalPrice="getTotalPrice"
      @createOrder="showModal = true"
    ></CartFooter>
  </div>
</template>


<script>
import CartList from "@/modules/cart/components/CartList";
import CartAdditional from "@/modules/cart/components/CartAdditional";
import CartForm from "@/modules/cart/components/CartForm";
import CartFooter from "@/modules/cart/components/CartFooter";
import CartPopup from "@/modules/cart/components/CartPopup";

import { mapGetters, mapState } from "vuex";

export default {
  name: "Cart",
  components: {
    CartList,
    CartAdditional,
    CartForm,
    CartFooter,
    CartPopup,
  },
  data() {
    return {
      showModal: false,
    };
  },
  computed: {
    ...mapGetters("cart", ["getPizzas", "getTotalPrice"]),
    ...mapState("cart", ["additionals", "delivery"]),
    ...mapState("auth", ["user"]),
  },
  methods: {
    closePopup() {
      if (this.user !== null) {
        this.$router.push({ name: "Orders" });
      } else this.$router.push({ name: "IndexHome" });
    },
  },
};
</script>

<style>
.header + div {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100vh - 61px);
}
</style>
