// const utils = require("../src/utils/utils");
// const ingredients = require("../src/models/ingredients");
import { ingredients } from "../src/models/ingredients";
import { utils } from "../src/utils/utils";

jest.mock("../src/models/ingredients");

describe("try validate INVALID data, item name and tolerance level are missing", () => {
  test("Should return an error(400) and an error message", async () => {
    expect(async () =>
      utils
        .validateNewItem({
          name: "",
          tolerancelevel: "",
        })
        .toThrowError("Item name and tolerance level are required!")
    );
  });
});

describe("try validate INVALID data, item name is missing", () => {
  test("Should return an error(400) and an error message", async () => {
    expect(async () =>
      utils
        .validateNewItem({
          name: "",
          tolerancelevel: 2,
        })
        .toThrowError("Item name required!")
    );
  });
});

describe("try validate INVALID data, item name is missing and tolerance level is out of the range", () => {
  test("Should return an error(400) and an error message", async () => {
    expect(async () =>
      utils
        .validateNewItem({
          name: "",
          tolerancelevel: 4,
        })
        .toThrowError(
          "Item name required, and the tolerance level need to be in range 0-3!"
        )
    );
  });
});

describe("try validate INVALID data, tolerance level is missing", () => {
  test("Should return an error(400) and an error message", async () => {
    expect(async () =>
      utils
        .validateNewItem({
          name: "eper",
          tolerancelevel: "",
        })
        .toThrowError("Tolerance level need to be a number!")
    );
  });
});

describe("try validate INVALID data, tolerance level is not a number", () => {
  test("Should return an error(400) and an error message", async () => {
    expect(async () =>
      utils
        .validateNewItem({
          name: "eper",
          tolerancelevel: "sdfasdf",
        })
        .toThrowError("Tolerance level need to be a number!")
    );
  });
});

//------------------------//

describe("try validate VALID data, BUT item is alerady exist", () => {
  test("Should return an error(400) and an error message", async () => {
    ingredients.findingredientByName.mockResolvedValue({
      results: [
        {
          result: 1, // this means the sql query find a value and send back a "true" bool.
        },
      ],
    });
    expect(async () =>
      utils
        .validateNewItem({
          name: "eper",
          tolerancelevel: 2,
        })
        .toThrowError("Item is already exist!")
    );
  });
});

describe("try validate INVALID data, the item is not exist but the tolerance level is out of the range", () => {
  test("Should return an error(400) and an error message", async () => {
    ingredients.findingredientByName.mockResolvedValue({
      results: [],
    });
    expect(async () =>
      utils
        .validateNewItem({
          username: "eper",
          tolerancelevel: 4,
        })
        .toThrowError("Tolerance level need to be in range 0-3!")
    );
  });
});

describe("try validate VALID data", () => {
  test("Should return a status: valid", async () => {
    ngredients.findingredientByName.mockResolvedValue({
      results: [],
    });
    expect(async () =>
      utils
        .validateNewItem({
          username: "Eper",
          tolerancelevel: 2,
        })
        .not.toThrowError("error")
    );
  });
});
