<template>
  <div class="popup">
    <router-link to="/" class="close">
      <span @click="$emit('close')" class="visually-hidden">Закрыть попап</span>
    </router-link>
    <div class="popup__title">
      <h2 class="title">Спасибо за заказ</h2>
    </div>
    <p>Мы начали готовить Ваш заказ, скоро привезём его вам ;)</p>
    <div class="popup__button">
      <router-link to="/" class="button"
        ><span @click="$emit('close')">Отлично, я жду!</span></router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "CartPopup",
};
</script>
