import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import {
  generateMockStore,
  setPizzaName,
  setAdditionalItems,
  setDough,
  setSauces,
  setSizes
} from "@/store/mocks";
import { SET_ENTITY } from "@/store/mutation-types";
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView";
import pizzaData from "@/static/pizza.json";

const localVue = createLocalVue();
localVue.use(Vuex);

const setIngredients = (store) => {
  store.commit(SET_ENTITY, {
    module: "builder",
    entity: "ingredientsItems",
    value: pizzaData.ingredients.map((ingredient) => {
      return {
        ...ingredient,
        count: 3,
      };
    }),
  });
};

describe("BuilderPizzaView", () => {
  const mocks = {
    $router: {
      push: jest.fn(),
    },
  };

  let store;
  let wrapper;
  let actions;
  const createComponent = (options) => {
    wrapper = mount(BuilderPizzaView, options);
  };

  beforeEach(() => {
    actions = {
      cart: {
        setPizzaSettingsForCart: jest.fn(),
        changeMiscItemQuantity: jest.fn(),
      },
      builder: {
        resetBuilderState: jest.fn(),
        getSaucesData: jest.fn(),
        getSizesData: jest.fn(),
        getIngredientsData: jest.fn(),
        editPizza: jest.fn(),
        getDoughData: jest.fn(),
      },
    };

    store = generateMockStore(actions);
  });


  afterEach(() => {
    wrapper?.destroy();
  });

  it("renders input that displays current pizza name", () => {
    setPizzaName(store);
    createComponent({ localVue, store });
    expect(wrapper.find("input").element.value).toBe("testPizzaName");
  });

  it("sets pizza name when typing in input", async () => {
    createComponent({ localVue, store });
    const spyOnAction = jest.spyOn(wrapper.vm, "setCurrentPizzaName");
    let input = wrapper.find("input[name='pizza_name']");
    input.element.value = "test";
    await input.trigger("input");
    expect(spyOnAction).toHaveBeenCalled();
  });

  it("renders ingredients if there are selected ingredients", () => {
    setIngredients(store);
    createComponent({ localVue, store });
    const ingredient = wrapper.find(".pizza__filling");
    expect(ingredient.exists()).toBeTruthy();
  });

  it("when pizza name is unset and no ingredients selected the button is disabled", () => {
    createComponent({ localVue, store });
    const addToCartBtn = wrapper.find('[data-test="add-to-cart-btn"]');
    expect(addToCartBtn.attributes("disabled")).toBe("disabled");
  });

  it("when pizza name is set but no ingredients selected the button is disabled", () => {
    setIngredients(store);
    createComponent({ localVue, store });
    const addToCartBtn = wrapper.find('[data-test="add-to-cart-btn"]');
    expect(addToCartBtn.attributes("disabled")).toBe("disabled");
  });

  it("when pizza name is unset but ingredients selected the button is disabled", () => {
    setIngredients(store);
    createComponent({ localVue, store });
    const addToCartBtn = wrapper.find('[data-test="add-to-cart-btn"]');
    expect(addToCartBtn.attributes("disabled")).toBe("disabled");
  });

  it("when pizza name is set and ingredients selected the button is enabled", () => {
    setPizzaName(store);
    setIngredients(store);
    createComponent({ localVue, store });
    const addToCartBtn = wrapper.find('[data-test="add-to-cart-btn"]');
    expect(addToCartBtn.attributes("disabled")).toBeUndefined();
  });

  it("saves settings", async () => {
    setPizzaName(store);
    setDough(store);
    setSizes(store);
    setSauces(store);
    setIngredients(store);
    setAdditionalItems(store);
    createComponent({ localVue, store, mocks });
    const addToCartBtn = wrapper.find('[data-test="add-to-cart-btn"]');
    await addToCartBtn.trigger("click");

    expect(actions.cart.setPizzaSettingsForCart).toHaveBeenCalled();
    expect(actions.cart.changeMiscItemQuantity).toHaveBeenCalled();
  });
});
