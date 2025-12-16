import { Locator, Page } from "@playwright/test";

export class Base {
  readonly page: Page;
  private readonly _tasksToAdd: string[] = [
    "Buy bread",
    "Take the dog out",
    "Buy apples",
  ];
  public get tasksToAdd(): string[] {
    return this._tasksToAdd;
  }
  readonly newTodo: Locator;
  readonly listItems: Locator;
  readonly activeLink: Locator;
  readonly taskToComplete: Locator;
  readonly completedLink: Locator;
  readonly taskToDelete: Locator;

  constructor(page: Page) {
    this.page = page;
    this.newTodo = page.locator("input.new-todo");
    this.listItems = page.locator("ul.todo-list li");
    this.activeLink = page.getByRole("link", { name: "Active" });
    this.taskToComplete = page
      .getByRole("listitem")
      .filter({ hasText: this.tasksToAdd[2] })
      .getByLabel("Toggle Todo");
    this.completedLink = page.getByRole("link", { name: "Completed" });
    this.taskToDelete = page
      .getByRole("listitem")
      .filter({ hasText: this.tasksToAdd[1] });
  }
}
