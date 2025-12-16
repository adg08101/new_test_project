import { test, expect } from "@playwright/test";
import res from "express/lib/response";

test.describe("Local Tests", () => {
  test.beforeEach(async ({ page }) => {
    // Setup code if needed before each test
    await page.goto("http://localhost:3000");
    await page.waitForLoadState("networkidle");
  });
  test("should load the local page", async ({ page }) => {
    const title = await page.title();
    expect(title).toBe("Países de América – Población y partido en el poder");

    const rows = page.locator("tbody tr");

    const countriesStartingWithC = rows.filter({
      has: page.locator("td:first-child", { hasText: /^C/i }),
    });

    const result = countriesStartingWithC.filter({
      has: page.locator("td:nth-child(2)", {
        hasText: /\d/,
      }),
    });

    for (const country of await countriesStartingWithC.all()) {
      console.log(await country.innerText());
    }

    console.log("--------------------");

    for (const population of await result.all()) {
      console.log(await population.innerText());
    }

    const matchingCountries: string[] = [];
    const items = await result.count();

    for (let i = 0; i < items; i++) {
      const row = result.nth(i);

      const country = await row.locator("td:first-child").innerText();
      const population = await row.locator("td:nth-child(2)").innerText();

      const populationNumber = Number(
        population.replace(/\./g, "").replace(/,/g, "")
      );

      if (populationNumber > 10_000_000) {
        console.log(country, population, populationNumber);
      } else {
        console.log(country, "No match", populationNumber);
      }
    }
  });
  test.afterEach(async ({ page }) => {
    // Teardown code if needed after each test
    await page.waitForTimeout(5000); // Just an example, not usually needed
  });
});
