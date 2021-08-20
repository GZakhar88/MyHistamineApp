import { db } from "../data/connection";

export const ingredients = {
  async allIngredients() {
    const allIngredient = await db.query(
      "SELECT * FROM ingredient ORDER BY name ASC;"
    );
    return allIngredient.results;
  },
  async findingredientByName(input) {
    const ingredient = await db.query(
      "SELECT * FROM ingredient WHERE name = ?",
      [input]
    );
    return ingredient.results;
  },
  async addIngredient(input) {
    const addNewIngredient = await db.query(
      "INSERT INTO ingredient (name, tolerancelevel) VALUES (?, ?);",
      [input.name, input.tolerancelevel]
    );
    const newId = await addNewIngredient.results.insertId;
    const newIngredient = await db.query(
      "SELECT * FROM ingredient WHERE id = ?;",
      [newId]
    );
    return newIngredient.results;
  },
  async updateIngredient(input) {
    const update = await db.query(
      "UPDATE ingredient SET name = ?, tolerancelevel = ? WHERE id = ?;",
      [input.name, input.tolerancelevel, input.id]
    );
    const updatedIngredient = await db.query(
      "SELECT * FROM ingredient WHERE id = ?;",
      [input.id]
    );
    return updatedIngredient.results;
  },
  async deleteIngredient(input) {
    const deleteIngredient = await db.query(
      "DELETE FROM ingredient WHERE id = ?;",
      [input.id]
    );
    return deleteIngredient.results;
  },
};
