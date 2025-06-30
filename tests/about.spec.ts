import { expect, test } from "@playwright/test";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

test("la landing page affiche le profil et les compétences", async ({
  page,
}) => {
  await page.goto(`${BASE_URL}/#about`);

  await expect(page.locator("li[aria-current=true]")).toHaveText("À propos");

  await page.waitForSelector(".about-item");

  const aboutItem = await page.locator("#about .about-item").count();
  expect(aboutItem).toBeGreaterThan(0);

  await page.waitForSelector(".skills-item");

  const skillsItem = await page.locator("#about .skills-item").count();
  expect(skillsItem).toBeGreaterThan(0);
});
