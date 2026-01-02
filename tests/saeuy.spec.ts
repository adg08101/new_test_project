import { test, expect } from "@playwright/test";
import dotenv from "dotenv";
import { askChatGPT } from "../utils/openai";
import { sendEmail } from "../utils/sendEmail";

dotenv.config({ override: true });

test.describe("saeuy E2E Tests", async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(process.env.GUB_TRAMITES_URL!);
    await page.waitForLoadState("networkidle");
  });

  test("should have the correct page title", async ({ page }) => {
    // await page
    //   .getByRole("searchbox", { name: "¿Qué trámite quiero hacer?" })
    //   .fill(process.env.GUB_TRAMITE_SEARCH!);

    await page.getByRole("textbox", { name: "Teléfono*:" }).click();
    await page.getByRole("textbox", { name: "Teléfono*:" }).fill(process.env.GUB_PHONE!);
    await page
      .getByRole("group", { name: "Datos de la partida del" })
      .getByLabel("País*:")
      .selectOption(process.env.GUB_COUNTRY_CODE!);
    await page
      .getByRole("group", { name: "Datos de la partida del" })
      .getByLabel("Partida a inscribir*:")
      .selectOption("1");
    await page.getByRole("textbox", { name: "Nombre completo*:" }).click();
    await page
      .getByRole("textbox", { name: "Nombre completo*:" })
      .fill(process.env.GUB_TITULAR_NOMBRES!.concat(" ", process.env.GUB_TITULAR_APELLIDOS!));
    await page.getByText("Acepto los términos", { exact: true }).click();

    // await page.getByRole("button", { name: "Buscar Trámite" }).click();

    // await page
    //   .getByRole("link", { name: "Iniciar Trámite en Línea" })
    //   .first()
    //   .click();

    // await page.getByLabel("País*:").selectOption(process.env.GUB_COUNTRY_CODE!);

    // // Datos del titular
    // await page
    //   .getByRole("group", { name: "Datos del titular de la" })
    //   .getByLabel("Nombres*:")
    //   .fill(process.env.GUB_TITULAR_NOMBRES!);

    // await page
    //   .getByRole("group", { name: "Datos del titular de la" })
    //   .getByLabel("Apellidos*:")
    //   .fill(process.env.GUB_TITULAR_APELLIDOS!);

    // await page
    //   .getByLabel("Partida a inscribir*:")
    //   .selectOption(process.env.GUB_PARTIDA_TIPO!);

    // await page
    //   .locator('[id="118058"]')
    //   .selectOption(process.env.GUB_COUNTRY_CODE!);

    // await page.locator('[id="118059"]').fill(process.env.GUB_MADRE_NOMBRES!);

    // await page.locator('[id="118060"]').fill(process.env.GUB_MADRE_APELLIDOS!);

    // await page
    //   .locator('[id="118061"]')
    //   .selectOption(process.env.GUB_GENERO_CODE!);

    // await page
    //   .getByLabel("Tipo de documento*:")
    //   .selectOption(process.env.GUB_DOC_TYPE!);

    // await page
    //   .getByRole("textbox", { name: "Documento*:" })
    //   .fill(process.env.GUB_DOC_NUMBER!);

    // // Datos solicitante
    // await page
    //   .getByRole("group", { name: "Datos de quien realiza el trá" })
    //   .getByLabel("Apellidos*:")
    //   .fill(process.env.GUB_SOLICITANTE_APELLIDOS!);

    // await page
    //   .getByRole("group", { name: "Datos de quien realiza el trá" })
    //   .getByLabel("Nombres*:")
    //   .fill(process.env.GUB_SOLICITANTE_NOMBRES!);

    // await page
    //   .getByRole("textbox", { name: "Correo electrónico*:" })
    //   .fill(process.env.GUB_EMAIL!);

    // await page
    //   .getByRole("textbox", { name: "Teléfono*:" })
    //   .fill(process.env.GUB_PHONE!);

    // await page.getByText("Acepto los términos", { exact: true }).click();

    const pregunta = (await page.locator("#lblpreg_118521").innerText()).concat(
      " Responda la pregunta con números."
    );
    const respuesta = await askChatGPT(pregunta);

    await page.locator('[id="118521"]').fill(respuesta);

    await page.getByRole("button", { name: "Siguiente " }).click();

    await page.locator('[name="recurso_118486"]').check();

    // await page.waitForTimeout(5000);

    const loc = page.locator("#sin_fechas_disponibles");

    // await expect
    //   .poll(async () => await loc.count(), {
    //     timeout: 5000,
    //     intervals: [1000, 2500, 4500],
    //   })
    //   .toBe(0);

    await page.waitForLoadState("networkidle");

    await expect(loc).toHaveCount(0);

    await sendEmail({
      to: process.env.SMTP_USER!,
      subject: "Trámite SAEUY iniciado exitosamente",
      text: `El trámite para ${process.env.GUB_TITULAR_NOMBRES} ${process.env.GUB_TITULAR_APELLIDOS} ha sido iniciado exitosamente.`,
    });
  });

  test.afterEach(async ({ page }) => {
    await page.waitForTimeout(60_000);
  });
});
