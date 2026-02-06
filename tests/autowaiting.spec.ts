import { test, expect } from '@playwright/test';

test.beforeEach('Go to UI Testing Playground', async ({ page }) => {
  await page.goto('http://uitestingplayground.com/ajax');
});

test('Testing Autowating', async ({page}) => {
  const button = await page.locator('.btn-primary')
  button.click();

  await page.waitForSelector('.bg-success')

  const text = await page.locator('.bg-success').allTextContents();
  expect(text).toContain('Data loaded with AJAX get request.')
});
