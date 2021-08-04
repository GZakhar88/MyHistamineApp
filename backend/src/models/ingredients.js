import { db } from "../data/connection";

export const ingredients = {
  async findingredientByName(input) {
    const ingredient = await db.query(
      "SELECT * FROM ingredient WHERE name = ?",
      [input]
    );
    // console.log("INGREDIENT: " + ingredient);
    return ingredient.results;
  },
};
