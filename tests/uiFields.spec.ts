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

  test('Can select Radio buttons', async ({page}) => {
    const usingTheGridForm = page.locator('nb-card', {hasText: 'Using the Grid'});
    // Get radio button by label
    const option1RadioButton = usingTheGridForm.getByLabel('Option 1');

    // Click radio button
    await option1RadioButton.check({force: true});

    expect(await option1RadioButton.isChecked()).toBeTruthy();

    // Get radio button by role
    const option2RadioButton = usingTheGridForm.getByRole('radio', { name: 'Option 2' });
    await option2RadioButton.check({force: true})

    expect(await option2RadioButton.isChecked()).toBeTruthy();
  })
});
