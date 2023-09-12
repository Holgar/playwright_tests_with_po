const { expect } = require("@playwright/test");
const { test } = require("../fixture/fixture");
const { parsePrice } = require("../helpers/parsePrice")

test.describe("Sorting option", () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigate();
    await loginPage.performLogin("standard_user", "secret_sauce");
  });

  test("Default sorting state", async ({ inventoryPage }) => {
    await expect(inventoryPage.defaultSelect).toHaveText("Name (A to Z)");
  });

  test("Check names of sort options", async ({ inventoryPage }) => {
    const options = await (inventoryPage.selectProductSort).locator("option");
    expect(await options.count()).toBe(4);

    const namesOfOption = ['Name (A to Z)Name (Z to A)Price (low to high)Price (high to low)']
    const receivedNames = await (inventoryPage.selectProductSort).allTextContents();
    expect(namesOfOption).toEqual(receivedNames)
  });

  const selectOptions = [
    { option: "az", sort: (elements) => [...elements].sort() },
    { option: "za", sort: (elements) => [...elements].sort((a, b) => b.localeCompare(a)) },
    { option: "lohi", sort: (elements) => elements.sort((a, b) => parsePrice(a) - parsePrice(b)) },
    { option: "hilo", sort: (elements) => elements.sort((a, b) => parsePrice(b) - parsePrice(a)) }
  ];
  
  for (const {option, sort} of selectOptions) {
    test.only(`Parameterized selecting option with ${option}`, async ({inventoryPage}) => {
      await (inventoryPage.selectSortDropdown).selectOption(`${option}`);
      const labelElements = await (inventoryPage.inventoryItemName).allTextContents();
      const priceElements = await (inventoryPage.inventoryItemPrice).allTextContents();
      const elements = option === "az" || option === "za" ? labelElements : priceElements;
      const sortedElements = sort(elements);
      expect(elements).toEqual(sortedElements);
    });
  }
  
});
