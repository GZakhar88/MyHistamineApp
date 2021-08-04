import config from "./config";
import express, { json, urlencoded } from "express";
import { ingredients } from "./models/ingredients";
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

app.get("/ingredients", async (req, res) => {
  try {
    const result = await ingredients.findingredientByName(req.query.name);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});
