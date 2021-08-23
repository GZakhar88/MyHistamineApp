import { ingredients } from "../models/ingredients";

export const utils = {
  async validateNewItem(input) {
    const isEmpty = (inp) => inp === "";
    const isNotInRange = (inp) => inp < 0 || inp > 3;
    const isNumber = (inp) => typeof inp == "number";

    async function isItemExist(inp) {
      const check = await ingredients.findingredientByName(inp);
      return check.length === 1;
    }

    try {
      if (isEmpty(input.name) && isNotInRange(input.tolerancelevel)) {
        throw new Error(
          "Item name required, and the tolerance level need to be in range 0-3!"
        );
      } else if (!isNumber(input.tolerancelevel)) {
        throw new Error("Tolerance level need to be a number!");
      } else if (isNumber(input.name)) {
        throw new Error("Ingredient name need to be a string!");
      } else if (isEmpty(input.name) && isEmpty(input.tolerancelevel)) {
        throw new Error("Item name and tolerance level are required!");
      } else if (
        (await isItemExist(input.name)) &&
        isNotInRange(input.tolerancelevel)
      ) {
        throw new Error(
          "Item is already exist, and the tolerance level need to be in range 0-3!"
        );
      } else if (isEmpty(input.name)) {
        throw new Error("Item name required!");
      } else if (isNotInRange(input.tolerancelevel)) {
        throw new Error("Tolerance level need to be in range 0-3!");
      } else if (await isItemExist(input.name)) {
        throw new Error("Item is already exist!");
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
