<template>
  <div>
    <header class="header">
      <div class="header__logo">
        <router-link
          to="/"
          class="logo">
          <img
            src="@/assets/img/logo.svg"
            alt="V!U!E! Pizza logo"
            width="90"
            height="40"
          />
        </router-link>
      </div>

      <div class="header__cart">
        <router-link to="/cart" data-test="cart-link">{{ totalPrice }} ₽</router-link>
      </div>
      <div class="header__user" style="display: flex">
        <router-link
          v-if="user"
          to="/profile"
        >
          <UserIcon />
        </router-link>

        <a
          v-if="user"
          key="logout-link"
          href="#"
          class="header__logout"
          @click="$logout"
        >
          <span>Выйти</span>
        </a>

        <router-link
          v-else
          to="/login"
          class="header__login"
          data-test="login-link">
          <span>Войти</span></router-link
        >
      </div>
    </header>
    <slot />
  </div>
</template>

<script>
import { mapState } from "vuex";
import logout from "@/common/mixins/logout";
import UserIcon from "@/common/components/UserIcon";

export default {
  name: "AppLayoutHeader",
  mixins: [logout],
  components: {
    UserIcon,
  },
  computed: {
    ...mapState("cart", ["totalPrice"]),
    ...mapState("auth", ["user"]),
  },
};
</script>
