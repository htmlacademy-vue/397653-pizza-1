import { shallowMount } from "@vue/test-utils";
import ItemCounter from "@/common/components/ItemCounter";

describe("ItemCounter", () => {
  const defaultPropsData = {
    count: 0,
  };

  const getPropsData = (params) => {
    return {
      propsData: {
        ...defaultPropsData,
        ...params,
      },
    };
  };

  let wrapper;
  const createComponent = (options) => {
    wrapper = shallowMount(ItemCounter, options);
  };

  afterEach(() => {
    wrapper?.destroy();
  });

  it("sets the initial value", () => {
    createComponent(getPropsData());
    expect(wrapper.find("input").element.value).toBe("0");
  });

  it("emits incremented input value when plus button clicked", async () => {
    createComponent(getPropsData());
    const plusBtn = wrapper.find(".counter__button--plus");
    await plusBtn.trigger("click");
    expect(wrapper.emitted("change")[0][0]).toBe(1);
  });

  it("emits decremented input value when minus button clicked", async () => {
    createComponent(getPropsData({ count: 2 }));
    const minusBtn = wrapper.find(".counter__button--minus");
    await minusBtn.trigger("click");
    expect(wrapper.emitted("change")[0][0]).toBe(1);
  });

  it("plus button is disabled when value is equal to max value", () => {
    createComponent(getPropsData({ count: 3, maxValue: 3 }));
    const plusBtn = wrapper.find(".counter__button--plus");
    expect(plusBtn.attributes("disabled")).toBe("disabled");
  });

  it("minus button is disabled when value is equal to min value", () => {
    createComponent(getPropsData({ count: 0 }));
    const minusBtn = wrapper.find(".counter__button--minus");
    expect(minusBtn.attributes("disabled")).toBe("disabled");
  });
});
