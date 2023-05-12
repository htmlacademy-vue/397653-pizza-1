import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import {
  generateMockStore,
  setDough,
  setSauces,
  setSizes,
} from "@/store/mocks";
import { SET_ENTITY } from "@/store/mutation-types";
import pizzaData from "@/static/pizza";
import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter";

const localVue = createLocalVue();
localVue.use(Vuex);

const setIngredients = (store) => {
  store.commit(SET_ENTITY, {
    module: "builder",
    entity: "ingredientsItems",
    value: pizzaData.ingredients.map((ingredient) => {
      return {
        ...ingredient,
        count: 1,
      };
    }),
  });
};

describe("BuilderPriceCounter", () => {
  let store;
  let wrapper;
  const createComponent = (options) => {
    wrapper = mount(BuilderPriceCounter, options);
  };

  beforeEach(() => {
    store = generateMockStore();
  });

  afterEach(() => {
    wrapper?.destroy();
  });

  it("displays current pizza price", async () => {
    setDough(store);
    setSizes(store);
    setSauces(store);
    setIngredients(store);
    createComponent({ localVue, store });
    expect(wrapper.html()).toContain(`${store.getters["builder/getPrice"]} ₽`);
  });
});
