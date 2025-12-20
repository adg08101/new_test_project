import { test } from "@playwright/test";
import dotenv from "dotenv";
import { askChatGPT } from "../utils/openai";

dotenv.config({ override: true });

test.describe("saeuy E2E Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(process.env.GUB_TRAMITES_URL!);
    await page.waitForLoadState("networkidle");
  });

  test("should have the correct page title", async ({ page }) => {
    await page
      .getByRole("searchbox", { name: "¿Qué trámite quiero hacer?" })
      .fill(process.env.GUB_TRAMITE_SEARCH!);

    await page.getByRole("button", { name: "Buscar Trámite" }).click();

    await page
      .getByRole("link", { name: "Iniciar Trámite en Línea" })
      .first()
      .click();

    await page.getByLabel("País*:").selectOption(process.env.GUB_COUNTRY_CODE!);

    // Datos del titular
    await page
      .getByRole("group", { name: "Datos del titular de la" })
      .getByLabel("Nombres*:")
      .fill(process.env.GUB_TITULAR_NOMBRES!);

    await page
      .getByRole("group", { name: "Datos del titular de la" })
      .getByLabel("Apellidos*:")
      .fill(process.env.GUB_TITULAR_APELLIDOS!);

    await page
      .getByLabel("Partida a inscribir*:")
      .selectOption(process.env.GUB_PARTIDA_TIPO!);

    await page
      .locator('[id="118058"]')
      .selectOption(process.env.GUB_COUNTRY_CODE!);

    await page.locator('[id="118059"]').fill(process.env.GUB_MADRE_NOMBRES!);

    await page.locator('[id="118060"]').fill(process.env.GUB_MADRE_APELLIDOS!);

    await page
      .locator('[id="118061"]')
      .selectOption(process.env.GUB_GENERO_CODE!);

    await page
      .getByLabel("Tipo de documento*:")
      .selectOption(process.env.GUB_DOC_TYPE!);

    await page
      .getByRole("textbox", { name: "Documento*:" })
      .fill(process.env.GUB_DOC_NUMBER!);

    // Datos solicitante
    await page
      .getByRole("group", { name: "Datos de quien realiza el trá" })
      .getByLabel("Apellidos*:")
      .fill(process.env.GUB_SOLICITANTE_APELLIDOS!);

    await page
      .getByRole("group", { name: "Datos de quien realiza el trá" })
      .getByLabel("Nombres*:")
      .fill(process.env.GUB_SOLICITANTE_NOMBRES!);

    await page
      .getByRole("textbox", { name: "Correo electrónico*:" })
      .fill(process.env.GUB_EMAIL!);

    await page
      .getByRole("textbox", { name: "Teléfono*:" })
      .fill(process.env.GUB_PHONE!);

    await page.getByText("Acepto los términos", { exact: true }).click();

    const pregunta = await page.locator("#lblpreg_118080").innerText();
    const respuesta = await askChatGPT(pregunta);

    await page.locator('[id="118080"]').fill(respuesta);

    await page.getByRole("button", { name: "Siguiente " }).click();

    await page.locator('[name="recurso_118050"]').check();
  });

  test.afterEach(async ({ page }) => {
    await page.pause();
    console.log("All tests completed.");
  });
});
