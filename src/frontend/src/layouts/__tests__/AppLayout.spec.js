import { shallowMount } from "@vue/test-utils";
import AppLayout from "@/layouts/AppLayout";

describe("AppLayout", () => {
  const stubs = ["AppNotifications"];
  const mocks = {
    $route: {
      meta: {
        layout: '',
      },
    },
  };

  let wrapper;
  const createComponent = (options) => {
    wrapper = shallowMount(AppLayout, options);
  };

  it("is rendered", () => {
    createComponent({ mocks, stubs });
    expect(wrapper.exists()).toBeTruthy();
  });
});
