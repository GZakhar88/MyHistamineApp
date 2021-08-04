import * as React from "react";
const URL = "http://localhost:8080/ingredients";

const FetchFoodItem = (props) => {
  async function getFood(props, input) {
    const searchedItem = JSON.stringify({ name: `${input}` });
    try {
      const fetchItem = await fetch(URL, {
        method: "GET",
        headers: { "Content-type": "application/json" },
        body: searchedItem,
      });
      const response = await fetchItem.json();
      console.log("RESPONSE: ", response);
      props.setResult(response);
    } catch (error) {
      console.log(error);
    }
  }
};

export default FetchFoodItem;
