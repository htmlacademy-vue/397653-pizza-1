<template>
  <section class="footer">
    <div class="footer__more">
      <router-link to="/" class="button button--border button--arrow">
        <span @click="$emit('createNewPizza')">Хочу еще одну</span>
      </router-link>
    </div>
    <p class="footer__text">
      Перейти к конструктору<br />чтоб собрать ещё одну пиццу
    </p>
    <div class="footer__price">
      <b>Итого: {{ totalPrice }} ₽</b>
    </div>

    <div class="footer__submit">
      <button type="submit" @click="$emit('createOrder')" class="button">
        Оформить заказ
      </button>
    </div>
  </section>
</template>

<script>
export default {
  name: "CartFooter",
  props: {
    totalPrice: {
      type: Number,
      default: 0,
    },
  },
};
</script>
