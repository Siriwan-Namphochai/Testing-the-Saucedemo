import { test as base } from "@playwright/test";
import { LoginPage } from "./login.page"; // ✅ Correct

type BaseFixture = {
  loginPage: LoginPage;
};

export const test = base.extend<BaseFixture>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
});
