<template>
  <div>
    <main class="layout">
      <div class="layout__content">
        <div class="layout__title">
          <h1 class="title title--big">Мои данные</h1>
        </div>

        <div class="user">
          <picture>
            <source
              type="image/webp"
              :srcset="getWebPSrc"
            />
            <img
              :src="user.avatar"
              :srcset="getSrc"
              :alt="user.name"
              width="72"
              height="72"
            />
          </picture>
          <div class="user__name">
            <span>{{ user.name }}</span>
          </div>

          <p
            class="user__phone"
            style="margin-left: 10px"
          >
            Контактный телефон: <span>{{ user.phone }}</span>
          </p>
        </div>

        <div
          v-for="address in addresses"
          :key="address.id"
          class="layout__address"
        >
          <ProfileAddressForm
            v-if="address.id === editableAddressId"
            :address="address"
            :user="user"
            data-test="address-form"
            @closeNewAddressForm="closeNewAddressForm"
          />

          <div
            v-else
            class="sheet address-form"
            data-test="address-card"
          >
            <div class="address-form__header">
              <b>Адрес №{{ address.id }}. {{ address.name }}</b>
              <div class="address-form__edit">
                <button
                  type="button"
                  class="icon"
                  data-test="edit-address-button"
                  @click="openFormToEdit(address.id)"
                >
                  <span class="visually-hidden">Изменить адрес</span>
                </button>
              </div>
            </div>
            <p>
              ул. {{ address.street }}, д. {{ address.building }}, кв.
              {{ address.flat }}
            </p>
            <small>{{ address.comment }}</small>
          </div>
        </div>

        <div v-if="newAddressForm">
          <ProfileAddressForm
            :address="newAddressData"
            :user="user"
            data-test="new-address-form"
            @closeNewAddressForm="closeNewAddressForm"
          />
        </div>
        <div class="layout__button">
          <button
            type="button"
            class="button button--border"
            data-test="add-address-button"
            @click="openNewAddressForm"
          >
            Добавить новый адрес
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { mapActions } from "vuex";
import ProfileAddressForm from "../modules/profile/ProfileAddressForm";

export default {
  name: "Profile",

  components: {
    ProfileAddressForm,
  },

  data() {
    return {
      newAddressData: {
        id: null,
        name: "",
        street: "",
        building: "",
        flat: "",
        comment: "",
      },
      editableAddressId: null,
      newAddressForm: false,
    };
  },

  computed: {
    ...mapState("auth", ["user"]),
    ...mapState("addresses", ["addresses"]),

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

  created() {
    this.getAddresses();
  },

  methods: {
    ...mapActions("addresses", ["getAddresses"]),
    ...mapActions("addresses", ["saveAddress"]),

    openFormToEdit(id) {
      this.newAddressForm = false;
      this.editableAddressId = id;
    },
    openNewAddressForm() {
      this.editableAddressId = null;
      this.newAddressForm = true;
    },
    closeNewAddressForm() {
      this.newAddressForm = false;
      this.editableAddressId = null;
    }
  },
};
</script>

<style lang="scss"></style>
