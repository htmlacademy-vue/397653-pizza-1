<template>
  <ul class="cart-list sheet">
    <li class="cart-list__item" v-for="pizza in pizzas" :key="pizza.id">
      <div class="product cart-list__product">
        <img
          src="@/assets/img/product.svg"
          class="product__img"
          width="56"
          height="56"
          alt="Любимая пицца"
        />
        <div class="product__text">
          <h2>{{ pizza.name }}</h2>
          <ul>
            <li>{{ pizza.size.name }}, {{ dough(pizza.dough.value) }}</li>
            <li>Соус: {{ pizza.sauce.name.toLowerCase() }}</li>
            <li>Начинка: {{ ingredientsJoin(pizza.ingredients) }}</li>
          </ul>
        </div>
      </div>

      <ItemCounter
        :count="pizza.count"
        @change="changeCountPizza($event, pizza)"
        class="cart-list__counter"
        :styleButtonPlus="'counter__button--orange'"
      ></ItemCounter>

      <div class="cart-list__price">
        <b>{{ pizza.price * pizza.count }} ₽</b>
      </div>

      <div class="cart-list__button">
        <button
          type="button"
          @click="changePizza(pizza)"
          class="cart-list__edit"
        >
          Изменить
        </button>
      </div>
    </li>
  </ul>
</template>

<script>
import ItemCounter from "@/common/components/ItemCounter.vue";

export default {
  components: {
    ItemCounter,
  },
  props: {
    pizzas: {
      type: Array,
      requred: true,
    },
  },
  methods: {
    ingredientsJoin(ingredients) {
      return ingredients
        .filter((ingredient) => ingredient.count > 0)
        .map((ingredient) => ingredient.name.toLowerCase())
        .join(", ");
    },
    dough(dough) {
      return dough === "light" ? "на тонком тесте" : "на толстом тесте";
    },
    changeCountPizza(count, pizza) {
      this.$emit("onChangeCountPizza", { count, pizza });
    },
    changePizza(pizza) {
      this.$emit("onChangePizza", pizza);
      this.$router.push("/");
    },
  },
};
</script>
