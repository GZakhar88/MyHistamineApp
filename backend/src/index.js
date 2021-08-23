import config from "./config";
import express, { json, urlencoded } from "express";
import { ingredients } from "./models/ingredients";
import { utils } from "./utils/utils";
const app = express();
const PORT = config.port;
app.use(json());
app.use(urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(
    `Histamine App backend is up and running at http://localhost:${PORT}`
  );
});
app.get("/", (req, res) => {
  res.send("My Histamine App");
});

app.get("/ingredients/all", async (req, res) => {
  try {
    const result = await ingredients.allIngredients();
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

app.get("/ingredients/:name", async (req, res) => {
  try {
    const result = await ingredients.findingredientByName(req.params.name);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

app.post("/ingredients", async (req, res) => {
  try {
    await utils.validateNewItem(req.body);
    const result = await ingredients.addIngredient(req.body);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

app.put("/ingredients", async (req, res) => {
  try {
    const result = await ingredients.updateIngredient(req.body);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

app.delete("/ingredients", async (req, res) => {
  try {
    const result = await ingredients.deleteIngredient(req.body);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});
