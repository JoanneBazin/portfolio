import { expect, test } from "@playwright/test";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

test("le formulaire de contact fonctionne", async ({ page }) => {
  await page.goto(`${BASE_URL}/#contact`);

  await page.fill("input[name=name]", "Test Contact");
  await page.fill("input[name=email]", "test@test.com");
  await page.fill(
    "textarea[name=message]",
    "Test du formulaire de contact de plus de 10 caractères."
  );

  await page.locator('button[type="submit"]').scrollIntoViewIfNeeded();
  await page.addStyleTag({ content: "footer { display: none !important; }" });
  await page.click('button[type="submit"]');

  await expect(page.locator("text=Message envoyé !")).toBeVisible();
});
