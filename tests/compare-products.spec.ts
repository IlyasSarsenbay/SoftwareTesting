import { test, expect } from '../fixtures/pages.fixture';

test('compare two products and verify their names and prices', async ({ catalogPage, page }) => {
  await catalogPage.open();
  await catalogPage.expectAtLeastTwoProducts();
  await catalogPage.expectProductsLoaded();
  const firstName = await catalogPage.productName(0);
  const secondName = await catalogPage.productName(1);
  const firstPrice = await catalogPage.productPrice(0);
  const secondPrice = await catalogPage.productPrice(1);
  expect(firstName).not.toBe(secondName);
  expect(firstPrice).toMatch(/^\$\d+\.\d{2}$/);
  expect(secondPrice).toMatch(/^\$\d+\.\d{2}$/);
  await catalogPage.compare(0);
  await catalogPage.compare(1);
  await catalogPage.openComparison();
  await catalogPage.expectComparisonContains(firstName);
  await catalogPage.expectComparisonContains(secondName);
  await catalogPage.expectComparisonPrice(firstPrice);
  await catalogPage.expectComparisonPrice(secondPrice);
  await page.screenshot({ path: 'screenshots/product-comparison.png', fullPage: true });
});
