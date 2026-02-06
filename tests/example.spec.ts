import { test, expect } from '@playwright/test';

test.beforeEach('Go to project', async ({ page }) => {
  await page.goto('http://localhost:4200/');
});

test.describe('Sign up form tests', async () => {
  test.beforeEach('Go to forms', async ({page}) => {
    await page.getByText('Forms').click();
    await page.getByText('Form Layouts').click();
  })
  test('Find email text box', async ({page}) => {
    await page.locator('#inputEmail1').click()
    await page.click('#inputEmail1');
  })

  test('Find checkbox', async ({page}) => {
    await page.locator('nb-radio :text-is("Option 1")').click();
    await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click();
  });

  test('Using the Grid', async ({page}) => {
    await page.locator(':text-is("Using the Grid")').locator('..').getByRole('textbox', {name: "Email"}).click();
  })

  test('Filling out a sign up form', async ({page}) => {
    const basicForm = page.locator('nb-card').filter({hasText: 'Basic form'});
    const emailField = basicForm.getByRole('textbox', {name: 'Email'});
    await basicForm.getByRole('textbox', {name: 'Email'}).fill('Chandler@email.com');
    await basicForm.getByRole('textbox', {name: 'Password'}).fill('myPassword123');
    await basicForm.getByRole('button').click();

    await expect(emailField).toHaveValue('Chandler@email.com');
  })

  test('Exracting values from elements', async ({page}) => {
    const basicForm = page.locator('nb-card').filter({hasText: 'Basic form'});
    const emailField = basicForm.getByRole('textbox', {name: 'Email'});

    // assert button has value
    const button = await basicForm.getByRole('button').textContent();
    expect(button).toEqual('Submit');
    // assert input has value
    await emailField.fill('test@test.com');
    expect(emailField).toHaveValue('test@test.com');

    // assert input has attribute
    expect(await emailField.getAttribute('placeholder')).toEqual('Email')
  })
});
