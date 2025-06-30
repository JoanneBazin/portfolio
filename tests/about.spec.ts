import { expect, test } from "@playwright/test";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

test("la landing page affiche le profil et les compétences", async ({
  page,
}) => {
  await page.goto(`${BASE_URL}/#about`);

  await expect(page.locator("li[aria-current=true]")).toHaveText("À propos");

  await page.waitForSelector("[data-testid='about-item']");

  const aboutItem = await page.locator("[data-testid='about-item']").count();
  expect(aboutItem).toBeGreaterThan(0);

  await page.waitForSelector("[data-testid='skill-item']");

  const skillsItem = await page.locator("[data-testid='skill-item']").count();
  expect(skillsItem).toBeGreaterThan(0);
});
