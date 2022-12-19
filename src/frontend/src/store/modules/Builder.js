import pizza from '@/static/pizza.json'
import { normalizeIngredients } from '@/common/helpers'

export default {
  actions: {},
  mutations: {},
  state: {
    ingredients: pizza.ingredients.map(ingredient => normalizeIngredients(ingredient)),
    sauces: pizza.sauces,
    dough: pizza.dough,
    sizes: pizza.sizes,
  },
  getters: {}
}
