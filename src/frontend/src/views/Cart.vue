<template>
  <div>
    <form class="layout-form">
      <main class="content cart">
        <div class="container">
          <div class="cart__title">
            <h1 class="title title--big">Корзина</h1>
          </div>

          <CartEmpty v-if="pizza.length == 0" />

          <ul v-if="pizza.length > 0" class="cart-list sheet">
            <li class="cart-list__item" v-for="item in pizza" :key="item.id">
              <div class="product cart-list__product">
                <img
                  src="@/assets/img/product.svg"
                  class="product__img"
                  width="56"
                  height="56"
                  alt="Пицца"
                />
                <div class="product__text">
                  <h2>{{ item.label }}</h2>
                  <ul>
                    <li v-for="desc in item.description" :key="desc.id">{{ desc }}</li>
                  </ul>
                </div>
              </div>
              <div class="counter cart-list__counter">
                <ItemCounter
                  @change="itemCountPizza($event, item)"
                  :count="item.count"
                />
              </div>

              <div class="cart-list__price">
                <b>{{ item.price * item.count }} ₽</b>
              </div>

              <div class="cart-list__button">
                <button
                  @click="setPizzaToBuilder(item)"
                  type="button"
                  class="cart-list__edit"
                >
                  Изменить
                </button>
              </div>
            </li>
          </ul>

          <div v-if="pizza.length > 0" class="cart__additional">
            <ul class="additional-list">
              <li
                v-for="item in labeledMisc"
                :key="item.id"
                class="additional-list__item sheet"
              >
                <p class="additional-list__description">
                  <img :src="item.image" width="39" height="60" />
                  <span>{{ item.name }}</span>
                </p>

                <div class="additional-list__wrapper">

                  <ItemCounter
                    @change="itemCountMisc($event, item)"
                    :count="item.count"
                  />

                  <div class="additional-list__price">
                    <b>× {{ item.price }}</b>
                  </div>
                </div>

              </li>
            </ul>
          </div>

          <CartForm
            v-if="pizza.length > 0"
            @setAddress="setAddress"
            :reorderAddressId="addressId"
          ></CartForm>
        </div>
      </main>

      <transition name="replace">
        <CartModal @close="closeModal" v-if="isModal" />
      </transition>

      <section class="footer">
        <div class="footer__more">
          <router-link to="/" class="button button--border button--arrow">
            Хочу еще одну
          </router-link>
        </div>
        <p class="footer__text">
          Перейти к конструктору<br />чтоб собрать ещё одну пиццу
        </p>
        <div class="footer__price">
          <b>Итого: {{ resultPrice }} ₽</b>
        </div>
        <div class="footer__submit">
          <button class="button" type="submit" @click.prevent="saveOrder">Оформить заказ</button>
        </div>
      </section>
    </form>
  </div>
</template>

<script>
import ItemCounter from "@/common/components/ItemCounter";
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import CartModal from "@/modules/cart/components/CartModal";
import CartEmpty from "@/modules/cart/components/CartEmpty";
import CartForm from "@/modules/cart/components/CartForm";
import { validator } from "@/common/mixins";
export default {
  name: "Cart",
  mixins: [validator],
  components: {
    ItemCounter,
    CartModal,
    CartEmpty,
    CartForm,
  },
  data() {
    return {
      isModal: false,
      address: null,
      addressId: null,
      phone: "",
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
  async mounted() {
    this.addressId = this.$route.params.addressId;
    await this.getMiscData()
  },
  computed: {
    ...mapGetters("cart", ["labeledMisc", "getPriceMisc", "getPricePizzas"]),
    ...mapState("auth", ["user"]),
    ...mapState("addresses", ["addresses"]),
    ...mapState("cart", ["misc", "pizza"]),
    resultPrice() {
      this.setTotalPrice(this.getPricePizzas + this.getPriceMisc);
      return this.getPricePizzas + this.getPriceMisc;
    },
  },
  methods: {
    ...mapMutations("cart", ["setCountMisc", "setCountPizza", "setTotalPrice"]),
    ...mapActions("orders", ["createOrder"]),
    ...mapActions("builder", ["editPizza"]),
    ...mapActions("cart", ["resetCartState", "getMiscData"]),
    itemCountMisc(count, label) {
      let item = { label: label, count: count };
      this.setCountMisc(item);
    },
    itemCountPizza(count, label) {
      let item = { label: label, count: count };
      this.setCountPizza(item);
    },
    closeModal() {
      this.isModal = false;
    },
    setAddress({ phone, address }) {
      this.phone = phone;
      this.address = address;
    },
    normalizePizzas() {
      return this.pizza.map((pizza) => {
        return {
          name: pizza.label,
          quantity: pizza.count,
          doughId: pizza.dough.id,
          sauceId: pizza.sauce.id,
          sizeId: pizza.size.id,
          ingredients: pizza.ingredients.map((ingredient) => {
            return {
              ingredientId: ingredient.id,
              quantity: ingredient.count,
            };
          }),
        };
      });
    },
    normalizeMisc() {
      return this.misc.map((item) => {
        return {
          miscId: item.id,
          quantity: item.count,
        };
      });
    },
    async setPizzaToBuilder(pizza) {
      this.editPizza(pizza);
      await this.$router.push({ name: "IndexHome" });
    },
    async saveOrder() {
      if (
        this.address !== null &&
        this.address.id === null &&
        !this.$validateFields(
          { street: this.address.street, building: this.address.building },
          this.validations
        )
      ) {
        console.log("error");
        return;
      }
      const order = {
        userId: this.user ? this.user.id : null,
        phone: this.phone,
        address: this.address,
        pizzas: this.normalizePizzas(),
        misc: this.normalizeMisc(),
      };
      await this.createOrder(order);
      this.isModal = true;
    },
  },
};
</script>

<style scoped>
  .layout-form {
    height: calc(100vh - 61px)
  }

  .additional-list__wrapper {
    justify-content: space-between;
  }

  .ingredients__counter {
    margin-top: 0;
    margin-left: 0;
  }

  .replace-enter-active,
  .replace-leave-active {
    transition: opacity .5s;
  }

  .replace-enter,
  .replace-leave-to {
    opacity: 0;
  }
</style>
