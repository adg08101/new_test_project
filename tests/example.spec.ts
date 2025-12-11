import { test, expect } from "@playwright/test";

// test('has title', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Expect a title "to contain" a substring.
//   await expect(page).toHaveTitle(/Playwright/);
// });

// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });

test.describe("Testing around to practice some", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://dev.to/playwright");
    await page.waitForLoadState("networkidle");
  });
  test("Just a test around", { tag: "@test_aroung" }, async ({ page }) => {
    const author: string = "Debbie O'Brien";
    let count: number = 0;

    await expect(page).toHaveTitle(
      "Playwright end to end Testing - DEV Community"
    );

    const blogs = page
      .locator("div .crayons-story")
      .filter({ has: page.getByRole("button") })
      .filter({ hasText: author });

    count = await blogs.count();

    expect(count).toBe(26);

    for (let i = 0; i < count; i++) {
      await blogs.nth(i).hover();
      await page.waitForTimeout(100);
      console.log(await blogs.nth(i).textContent());
    }

    await expect(
      page.getByRole("button", {
        name: "Follow organization: Playwright end to end Testing",
      })
    ).toBeVisible();
  });
  test("Get all authors from page", async ({ page }) => {
    const authorsLocator =
      "div[class*=crayons-story] button[id*=story-author-preview]";

    const authors = await page.locator(authorsLocator).all();
    let authorsArray: string[] = [];
    const authorCount: Record<string, number> = {};

    for (const author of authors) {
      let authorName: string = (await author.textContent()) || "Unknown";
      authorName = authorName.trim();

      if (!authorsArray.includes(authorName)) {
        authorsArray.push(authorName);
      }

      if (!authorCount[authorName]) {
        authorCount[authorName] = 0;
      }
      authorCount[authorName]++;
    }
    console.log(authorCount);

    const authorsKeys = Object.keys(authorCount);

    for (const author of authorsKeys) {
      console.log("Hovering author " + author);

      const locator = page.locator(authorsLocator).filter({ hasText: author });
      const counter: number = await locator.count();

      for (let i = 0; i < counter; i++) {
        await locator.nth(i).hover();
        await page.waitForTimeout(300);
      }
    }
  });
});
