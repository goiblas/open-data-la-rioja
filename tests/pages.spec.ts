import { test, expect } from '@playwright/test';

test('Should render fuel consumption page', async ({ page }) => {
  await page.goto('/')
  await page.click('text=Consumo de combustible')
  await expect(page).toHaveURL('/consumo-de-combustible')
  await expect(page.locator('h1')).toContainText('Consumo de combustible')
});

test('Should render electricity page', async ({ page }) => {
  await page.goto('/')
  await page.click('text=Consumo eléctrico')
  await expect(page).toHaveURL('/consumo-electrico')
  await expect(page.locator('h1')).toContainText('Consumo eléctrico')
});

test('Should render unemployment rate page', async ({ page }) => {
  await page.goto('/')
  await page.click('text=Desempleo')
  await expect(page).toHaveURL('/desempleo')
  await expect(page.locator('h1')).toContainText('Desempleo por grupos de edad')
});
