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
          @onChangeCountPizza="changeCountPizza"
          @onChangePizza="changePizza"
        ></CartList>
        <CartAdditional
          :additionals="additionals"
          @onChangeAdditional="changeAdditional"
        ></CartAdditional>
        <CartForm :delivery="delivery"></CartForm>
      </div>
    </main>
    <CartPopup v-if="showModal" @close="closePopup"></CartPopup>
    <CartFooter
      :totalPrice="getTotalPrice"
      @createOrder="showModal = true"
      @createNewPizza="createNewPizza"
    ></CartFooter>
  </div>
</template>


<script>
import CartList from "@/modules/cart/components/CartList";
import CartAdditional from "@/modules/cart/components/CartAdditional";
import CartForm from "@/modules/cart/components/CartForm";
import CartFooter from "@/modules/cart/components/CartFooter";
import CartPopup from "@/modules/cart/components/CartPopup";

import {
  UPDATE_COUNT_ADDITIONAL,
  UPDATE_COUNT_PIZZA,
  CHANGE_PIZZA,
  SET_PIZZA,
  CLEAR_CART,
} from "@/store/mutation-types";

import { mapGetters, mapMutations, mapState } from "vuex";

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
    ...mapGetters("Cart", ["getPizzas", "getTotalPrice"]),
    ...mapState("Cart", ["additionals", "delivery"]),
  },
  methods: {
    ...mapMutations("Cart", {
      changeAdditional: UPDATE_COUNT_ADDITIONAL,
      changeCountPizza: UPDATE_COUNT_PIZZA,
      clearCart: CLEAR_CART,
    }),
    ...mapMutations("Builder", {
      changePizza: CHANGE_PIZZA,
      createNewPizza: SET_PIZZA,
    }),
    closePopup() {
      this.createNewPizza();
      this.clearCart();
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
