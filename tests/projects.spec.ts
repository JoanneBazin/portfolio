import { expect, test } from "@playwright/test";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

test("la landing page affiche les projets", async ({ page }) => {
  await page.goto(`${BASE_URL}/#projects`);

  await expect(page.locator("li[aria-current=true]")).toHaveText("Projets");

  await page.waitForSelector("[data-testid='project-item']");

  const cards = await page.locator("[data-testid='project-item']").count();
  expect(cards).toBeGreaterThan(0);
});
