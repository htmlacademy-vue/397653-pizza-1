import { shallowMount } from "@vue/test-utils";
import RadioButton from "@/common/components/RadioButton";

describe("RadioButton", () => {
  const defaultPropsData = {
    name: "testName",
    value: "testValue",
    isChecked: false,
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
    wrapper = shallowMount(RadioButton, options);
  };

  afterEach(() => {
    wrapper?.destroy();
  });

  it("sets the initial model value", () => {
    createComponent(getPropsData());
    const input = wrapper.find("input");
    expect(input.element.value).toBe(defaultPropsData.value);
    expect(input.element.name).toBe(defaultPropsData.name);
    expect(input.element.checked).toBe(defaultPropsData.isChecked);
  });

  it("emits an input event when change value", () => {
    createComponent(getPropsData());
    const input = wrapper.find("input");
    input.trigger("change");
    expect(wrapper.emitted('changePizza')).toBeTruthy();
  });
});
