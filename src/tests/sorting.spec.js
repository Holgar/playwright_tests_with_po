const { expect } = require("@playwright/test");
const { test } = require("../fixture/fixture");

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
    console.log(options.allTextContents);
    expect(await options.count()).toBe(4);

    const namesOfOption = ['Name (A to Z)Name (Z to A)Price (low to high)Price (high to low)']
    const receivedNames = await (inventoryPage.selectProductSort).allTextContents();
    expect(namesOfOption).toEqual(receivedNames)
  });

  const selectOptions = ["az", "za", "lohi", "hilo"];
  for (const option of selectOptions) {
    test.only(`Parameterized selecting option with ${option}`, async ({inventoryPage}) => {
        await (inventoryPage.selectSortDropdown).selectOption(`${option}`);
        const labelElements = await (inventoryPage.inventoryItemName).allTextContents();
        const priceElements = await (inventoryPage.inventoryItemPrice).allTextContents();
        function parsePrice(priceString) {
          return parseFloat(priceString.replace('$', ''));
        };
        if(option === "az"){
          const alphabeticalSort = [...labelElements].sort();
          expect(labelElements).toEqual(alphabeticalSort)
        }else if (option === "za"){
          const reverseAlphabeticalSort = [...labelElements].sort((a, b) => b.localeCompare(a));
          expect(labelElements).toEqual(reverseAlphabeticalSort)
        }else if (option === "lohi"){
          const lohiSort = priceElements.sort((a, b) => parsePrice(a) - parsePrice(b));
          expect(priceElements).toEqual(lohiSort);
        }else if (option === "hilo"){
          const hiloSort = priceElements.sort((a, b) => parsePrice(b) - parsePrice(a));
          expect(priceElements).toEqual(hiloSort);
        }
    });
  }
});
