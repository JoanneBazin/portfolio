import { expect, test } from "@playwright/test";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

test("les liens du footer fonctionnent", async ({ page }) => {
  await page.goto(`${BASE_URL}`);

  const githubLink = page.locator("[data-testid='footer-github-link']");

  await expect(githubLink).toBeVisible();
  await expect(githubLink).toHaveAttribute("href", /github\.com/);
  await expect(githubLink).toHaveAttribute("target", "_blank");

  const linkedinLink = page.locator("[data-testid='footer-linkedin-link']");

  await expect(linkedinLink).toBeVisible();
  await expect(linkedinLink).toHaveAttribute("href", /linkedin\.com/);
  await expect(linkedinLink).toHaveAttribute("target", "_blank");
});

test("les liens des projets fonctionnent", async ({ page }) => {
  await page.goto(`${BASE_URL}/#projects`);

  await page.waitForSelector("[data-testid='project-item']");

  const firstProject = page.locator("[data-testid='project-item']").first();
  await firstProject.click();

  await page.waitForSelector("[data-testid='project-modal']");

  const projectGithubLink = page.locator("[data-testid='project-github-link']");
  const githubLinkExists = (await projectGithubLink.count()) > 0;

  if (githubLinkExists) {
    await expect(projectGithubLink).toBeVisible();
    await expect(projectGithubLink).toHaveAttribute("href", /github\.com/);
    await expect(projectGithubLink).toHaveAttribute("target", "_blank");
  }

  const projectLiveLink = page.locator("[data-testid='project-live-link']");
  const liveLinkExists = (await projectLiveLink.count()) > 0;

  if (liveLinkExists) {
    await expect(projectLiveLink).toBeVisible();
    await expect(projectLiveLink).toHaveAttribute("href");
    await expect(projectLiveLink).toHaveAttribute("target", "_blank");
  }

  await page.keyboard.press("Escape");
});
