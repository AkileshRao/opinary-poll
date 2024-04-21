import { test, expect } from '@playwright/test';

test('Init: 0 votes', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await expect(page.locator('#poll')).toContainText('0%');
  await expect(page.locator('#poll')).toContainText('Reading books and exploring new ideas.(0 votes)');
  await expect(page.locator('#poll')).toContainText('0 votes');
});

test('Total votes increment check', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByText('Reading books and exploring new ideas.(0 votes) 0%').click();
  await page.getByRole('button', { name: 'Select option' }).first().click();
  await expect(page.locator('#poll')).toContainText('1 vote');
});

test('Individual votes increment check', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByText('Reading books and exploring').click();
  await page.getByRole('button', { name: 'Select option' }).first().click();
  await page.getByText('Reading books and exploring').click();
  await page.locator('div').filter({ hasText: /^1 vote\|Fri Apr 19 2024Select option$/ }).getByRole('button').click();
  await expect(page.locator('#poll')).toContainText('Reading books and exploring new ideas.(2 votes)');
});