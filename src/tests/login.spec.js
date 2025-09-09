import { expect } from "@playwright/test";
import { test } from "../pages/base";
import { validUsers, problemUsers } from "../test-data/user";

test.beforeEach(async({loginPage})=>{
    await loginPage.goto();
})

test.skip('Input fields should display as the data that was filled', async ({ loginPage }) => {

  await loginPage.fillUserPassword('testuser', 'password');

  expect(await loginPage.getUsername()).toBe('testuser');
  expect(await loginPage.getPassword()).toBe('password');
});


test.skip('Should show an error message if log in without a username', async ({ loginPage }) => {

  await loginPage.fillUserPassword('', 'secret_sauce'); // password ถูกต้อง แต่ไม่มี username
  await loginPage.clickLogin();

  const message = await loginPage.getErrorMessage();
  expect(message).toContain('Username is required');
  expect (await loginPage.isValidUrl()).toBe(true);
});

test.skip('Should show an error message if log in without a password', async ({ loginPage }) => {

  await loginPage.fillUserPassword('standard_user', ''); // username ถูกต้อง แต่ไม่มี password
  await loginPage.clickLogin();

  const message = await loginPage.getErrorMessage();
  expect(message).toContain('Password is required');
  expect (await loginPage.isValidUrl()).toBe(true);
});

test.skip('Should show an error message if log in with both fields blank', async ({ loginPage }) => {

  await loginPage.fillUserPassword('', '');               // ทั้ง username และ password ว่าง
  await loginPage.clickLogin();

  const message = await loginPage.getErrorMessage();
  expect(message).toContain('Username is required');      // เว็บนี้จะแสดงว่า Username ต้องมาก่อน
  expect(await loginPage.isValidUrl()).toBe(true);
});

for (const { username, password } of validUsers) {
  test.skip(`Should logged in successfully with valid credentials: ${username}`, async ({ loginPage }) => {
    await loginPage.login(username, password);
    await expect(await loginPage.isLoginSuccessful()).toBeTruthy();
  });
}

for (const { username, password } of problemUsers) {
  test(`Should fail to login with an error message when using invalid credentials: ${username}`, async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login(username, password);
    await expect(await loginPage.isLoginFailed()).toBeTruthy();
  });
}

  