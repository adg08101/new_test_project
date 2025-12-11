import { test, expect } from "@playwright/test";

test.describe("Juan another Todos test around", async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://demo.playwright.dev/todomvc/#/");
    await page.waitForLoadState("networkidle");
  });

  test("Add 3 task to Todo list", async ({ page }) => {
    const tasksToAdd: string[] = [
      "Buy bread",
      "Take the dog out",
      "Buy apples",
    ];

    // locators
    // input.new-todo
    const newTodo = page.locator("input.new-todo");
    // ul.todo-list
    const listItems = page.locator("ul.todo-list li");
    // active tasks link
    const activeLink = page.getByRole("link", { name: "Active" });
    // task to complete locator
    const taskToComplete = page
      .getByRole("listitem")
      .filter({ hasText: tasksToAdd[2] })
      .getByLabel("Toggle Todo");

    // completed tasks link
    const completedLink = page.getByRole("link", { name: "Completed" });

    for (let task of tasksToAdd) {
      await newTodo.fill(task);
      await newTodo.press("Enter");
    }

    await expect(listItems).toHaveCount(3);

    await activeLink.click();

    await expect(listItems).toHaveCount(3);

    await taskToComplete.click();

    await expect(listItems).toHaveCount(2);

    await completedLink.click();

    await expect(listItems).toHaveCount(1);
  });

  test.afterEach(async ({ page }) => {
    await page.waitForTimeout(10000);
  });
});
