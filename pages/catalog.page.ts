import { expect, type Locator, type Page } from '@playwright/test';

export class CatalogPage {
  private readonly products: Locator;

  constructor(private readonly page: Page) {
    this.products = page.locator('a[data-test^="product-"]');
  }

  async open() { await this.page.goto('/'); }
  async productCount() { return this.products.count(); }
  async productName(index: number) {
    return this.products.nth(index).getByTestId('product-name').innerText();
  }
  async productPrice(index: number) {
    return this.products.nth(index).getByTestId('product-price').innerText();
  }
  async compare(index: number) {
    await this.products.nth(index).hover();
    await this.products.nth(index).getByTestId('compare-btn').click();
  }
  async openComparison() {
    await this.page.getByTestId('compare-link').click();
    await expect(this.page).toHaveURL(/\/comparison/);
  }
  async expectComparisonContains(name: string) {
    await expect(this.page.getByRole('columnheader', { name: `Remove ${name} from comparison` })).toBeVisible();
  }
  async expectComparisonPrice(price: string) {
    await expect(this.page.getByText(price, { exact: true })).toBeVisible();
  }
  async expectProductsLoaded() { await expect(this.products.first()).toBeVisible(); }
  async expectAtLeastTwoProducts() { await expect(this.products).toHaveCount(9); }
}
