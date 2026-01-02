import { test } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

test("login gub.uy and save storage", async ({ page }) => {
  // await page.goto(process.env.GUB_BASE_URL!);
  // await page.waitForLoadState("networkidle");

  // await page.getByRole("button", { name: "Acceder a gub.uy" }).click();
  // await page
  //   .getByRole("banner")
  //   .getByRole("link", { name: "Perfil gub.uy" })
  //   .click();

  // await page.getByRole("button", { name: "Usuario Gub.uy" }).click();

  // await page.getByRole("link", { name: "No tengo documento uruguayo" }).click();

  // await page
  //   .locator("#pais_emisor")
  //   .selectOption(process.env.GUB_COUNTRY_CODE_EMITTER!);

  // await page.getByPlaceholder("Ej.").fill(process.env.GUB_USER_DOC!);
  // await page.getByTestId("Continuar").click();

  // await page
  //   .getByRole("textbox", { name: "Ingresá tu contraseña" })
  //   .fill(process.env.GUB_PASSWORD!);

  // await page.getByTestId("Continuar").first().click();

  // // ✅ Esperar algo que confirme login
  // await page.getByRole("link", { name: "Servicios", exact: true }).click();

  await page.goto(process.env.GUB_BASE_URL!);
  await page.getByRole("link", { name: "Iniciar la sesión" }).click();
  await page.getByRole("button", { name: "Usuario Gub.uy" }).click();
  await page
    .getByRole("textbox", { name: "Ingresá tu cédula de identidad" })
    .click();
  await page
    .getByRole("textbox", { name: "Ingresá tu cédula de identidad" })
    .fill(process.env.GUB_USER_DOC!);
  await page.getByTestId("Continuar").click();
  await page.getByRole("textbox", { name: "Ingresá tu contraseña" }).click();
  await page
    .getByRole("textbox", { name: "Ingresá tu contraseña" })
    .fill(process.env.GUB_PASSWORD!);
  await page.getByTestId("Continuar").first().click();
  await page.getByRole("link", { name: " Realizar Inscripción de" }).click();

  // 💾 Guardar sesión
  await page.context().storageState({ path: "auth.json" });

  await page.waitForTimeout(30000); // --- IGNORE ---
});
