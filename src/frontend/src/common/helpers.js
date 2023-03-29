import resources from '@/common/enums/resources';
import {
  AuthApiService,
  CrudApiService,
  ReadOnlyApiService,
  BuilderApiService,
} from "@/services/api.service";
import { DOUGH, INGREDIENTS, SAUCE, SIZE } from "./constants";
import colaImage from "@/assets/img/cola.svg";
import sauceImage from "@/assets/img/sauce.svg";
import potatoImage from "@/assets/img/potato.svg";

export const createResources = (notifier) => {
  return {
    [resources.AUTH]: new AuthApiService(notifier),
    [resources.BUILDER]: new BuilderApiService(resources.BUILDER, notifier),
    [resources.MISC]: new ReadOnlyApiService(resources.MISC, notifier),
    [resources.ADDRESSES]: new CrudApiService(resources.ADDRESSES, notifier),
    [resources.ORDERS]: new CrudApiService(resources.ORDERS, notifier),
  };
};

export const setAuth = (store) => {
  store.$api.auth.setAuthHeader();
  store.dispatch("auth/getMe");
};

export const getItemById = (list, id) => {
  return list.find((item) => item.id === id);
};

export const isEmpty = (obj) => {
  for (let key in obj) {
    return false;
  }
  return true;
};

export const normalizeDough = (dough) => {
  return {
    ...dough,
    ...DOUGH.find(({ name }) => dough.name === name),
  };
};

export const normalizeIngredients = (ingredient) => {
  return {
    ...ingredient,
    ...INGREDIENTS.find(({ name }) => ingredient.name === name),
    count: 0,
  };
};

export const normalizeSauce = (souce) => {
  return {
    ...souce,
    ...SAUCE.find(({ name }) => souce.name === name),
  };
};

export const normalizeSize = (size) => {
  return {
    ...size,
    ...SIZE.find(({ name }) => size.name === name),
  };
};

export const normalizeAdditionalItems = (item) => {
  return {
    ...item,
    count: 0,
  };
};

export const normalizeIngredientsItems = (item) => {
  return {
    ...item,
    count: 0,
    label: item.image.replace(".svg", "").replace("/public/img/filling/", ""),
  };
};

export const normalizeItems = (item) => {
  return {
    ...item,
    label: "",
  };
};

let additionalImages = [colaImage, sauceImage, potatoImage];

export const normilizeAdditional = (additionals) => {
  return additionals.map((item, index) => {
    return {
      ...item,
      image: additionalImages[index],
      count: 0,
    };
  });
};
