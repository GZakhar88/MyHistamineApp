export async function getAllIngredient({ setList }) {
  try {
    const fetchItem = await fetch("http://localhost:8080/ingredients/all", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const response = await fetchItem.json();
    setList(response);
  } catch (error) {
    console.log(error);
  }
}
