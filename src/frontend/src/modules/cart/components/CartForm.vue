﻿<template>
  <div class="cart__form">
    <div class="cart-form">
      <label class="cart-form__select">
        <span class="cart-form__label">Получение заказа:</span>

        <select
          name="test"
          class="select"
          @change="changeAddress($event.target.value)"
        >
          <option value="pickup">Заберу сам</option>
          <option value="newAddress">Новый адрес</option>
          <option
            v-for="address in addresses"
            :key="address.id"
            :value="address.id"
            data-test="user-address"
          >
            {{ address.name }}
          </option>
        </select>
      </label>

      <label class="cart-form__phone input input--big-label">
        <span>Контактный телефон:</span>
        <AppInput
          v-model="phone"
          type="text"
          name="tel"
          placeholder="+7 999-999-99-99"
          @change="setOrderAddress"
        />
      </label>

      <div
        v-if="isAddressFormDisplayed"
        class="cart-form__address"
      >
        <span class="cart-form__label">{{ addressFormName }}:</span>

        <div class="cart-form__input">
          <label class="input">
            <span>Улица*</span>
            <AppInput
              v-model="street"
              type="text"
              name="street"
              :error-text="validations.street.error"
              :disabled="disabledInputs"
              @change="setOrderAddress"
            />
          </label>
        </div>

        <div class="cart-form__input cart-form__input--small">
          <label class="input">
            <span>Дом*</span>
            <AppInput
              v-model="building"
              type="text"
              name="building"
              :error-text="validations.building.error"
              :disabled="disabledInputs"
              @change="setOrderAddress"
            />
          </label>
        </div>

        <div class="cart-form__input cart-form__input--small">
          <label class="input">
            <span>Квартира</span>
            <AppInput
              v-model="flat"
              type="text"
              name="flat"
              :disabled="disabledInputs"
              @change="setOrderAddress"
            />
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { validator } from "@/common/mixins";
import AppInput from "@/common/components/AppInput";

export default {
  name: "CartForm",

  components: { AppInput },

  mixins: [validator],

  props: {
    reorderAddressId: {
      type: Number,
      default: null,
    },
  },

  data() {
    return {
      deliveryOption: "pickup",
      addressId: null,
      phone: "",
      street: "",
      building: "",
      flat: "",
      comment: "",
      addressFormName: "Новый адрес",
      disabledInputs: false,
      validations: {
        street: {
          error: "",
          rules: ["required"],
        },
        building: {
          error: "",
          rules: ["required"],
        },
      },
    };
  },

  computed: {
    ...mapState("auth", ["user"]),
    ...mapState("addresses", ["addresses"]),

    isAddressFormDisplayed() {
      return this.deliveryOption !== "pickup";
    },
    isAddressDisabled() {
      return this.deliveryOption !== "newAddress";
    },
  },

  watch: {
    street() {
      this.$clearValidationError("street");
    },
    building() {
      this.$clearValidationError("building");
    },
  },

  async mounted() {
    if (this.user !== null) {
      this.phone = this.user.phone;
      await this.getAddresses();
    }
    if (this.reorderAddressId !== null) {
      document.querySelector(".select").value = this.reorderAddressId;
      this.changeAddress(this.reorderAddressId);
    }
  },

  methods: {
    ...mapActions("addresses", ["getAddresses", "resetAddressesState"]),

    changeAddress(value) {
      this.deliveryOption = value;
      this.disabledInputs = false;
      if (value === "newAddress") {
        this.addressId = null;
        this.street = "";
        this.building = "";
        this.flat = "";
        this.comment = "";
        this.addressFormName = "Новый адрес";
      } else if (value !== "pickup") {
        const address = this.addresses.find((address) => address.id === +value);
        this.addressId = address.id;
        this.street = address.street;
        this.building = address.building;
        this.flat = address.flat;
        this.comment = address.comment;
        this.addressFormName = "Адрес";
        this.disabledInputs = true;
      }
      this.setOrderAddress();
    },

    setOrderAddress() {
      const formAddress = {
        id: this.addressId,
        street: this.street,
        building: this.building,
        flat: this.flat,
        comment: this.comment,
      };
      this.$emit("setAddress", {
        phone: this.phone,
        address: this.deliveryOption === "pickup" ? null : formAddress,
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
