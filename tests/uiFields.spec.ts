import { test, expect } from '@playwright/test';

test.beforeEach('Go to Form Layouts', async ({ page }) => {
  await page.goto('http://localhost:4200/');
  await page.getByText('Forms').click();
  await page.getByText('Form Layouts').click();
});

test.describe('Testing fields on Use the Grid form', async () => {
  test('Can fill email field', async ({page}) => {
    const testEmail = 'test@testEmail.com';
    const emailInputField = page.locator('#inputEmail1')

    await emailInputField.pressSequentially(testEmail, {delay: 500})

    const value = await emailInputField.inputValue();
    expect(value).toEqual(testEmail);
  });
});
