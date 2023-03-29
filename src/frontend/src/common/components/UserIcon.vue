<template>
  <div>
    <picture>
      <source
        type="image/webp"
        :srcset="getWebPSrc" />
      <img
        :src="user.avatar"
        :srcset="getSrc"
        :alt="user.name"
        width="72"
        height="72"
      />
    </picture>
    <span>{{ user.name }}</span>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState("auth", ["user"]),

    getWebPSrc: function () {
      return `${this.user.avatar.replace(
        ".jpg",
        "@2x.webp"
      )} 1x, ${this.user.avatar.replace(".jpg", "@4x.webp")} 2x`;
    },
    getSrc: function () {
      return `${this.user.avatar.replace(".jpg", "@4x")}.jpg`;
    },
  },
}
</script>
