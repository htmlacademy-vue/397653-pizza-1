<template>
  <div class="cart__form">
    <div class="cart-form">
      <label class="cart-form__select">
        <span class="cart-form__label">Получение заказа:</span>

        <select name="test" v-model="delivery.type" class="select">
          <option value="1">Заберу сам</option>
          <option value="2">Новый адрес</option>
          <option value="3">Дом</option>
        </select>
      </label>

      <label class="input input--big-label">
        <span>Контактный телефон:</span>
        <input
          type="text"
          name="tel"
          v-model="delivery.phone"
          placeholder="+7 999-999-99-99"
        />
      </label>

      <div class="cart-form__address">
        <template v-if="delivery.type > 1">
          <span class="cart-form__label">Новый адрес:</span>

          <div class="cart-form__input">
            <label class="input">
              <span>Улица*</span>
              <input
                type="text"
                name="street"
                v-model="delivery.street"
                :disabled="delivery.type === 3"
              />
            </label>
          </div>

          <div class="cart-form__input cart-form__input--small">
            <label class="input">
              <span>Дом*</span>
              <input
                type="text"
                name="house"
                v-model="delivery.house"
                :disabled="delivery.type === 3"
              />
            </label>
          </div>

          <div class="cart-form__input cart-form__input--small">
            <label class="input">
              <span>Квартира</span>
              <input
                type="text"
                name="apartment"
                v-model="delivery.apartament"
                :disabled="delivery.type === 3"
              />
            </label>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CartForm",
  props: {
    delivery: {
      type: Object,
      default: () => {},
    },
  },
};
</script>
