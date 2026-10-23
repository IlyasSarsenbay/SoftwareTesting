import { expect, type Locator, type Page } from '@playwright/test';

export class CartPage {
  private readonly product: Locator;
  private readonly cartLink: Locator;

  constructor(private readonly page: Page) {
    this.product = page.locator('[data-test^="product-"]').first();
    this.cartLink = page.getByTestId('nav-cart');
  }

  async addFirstAvailableProduct() {
    await this.page.goto('/');
    await expect(this.product).toBeVisible();
    await this.product.click();
    await expect(this.page).toHaveURL(/\/product\//);
    await this.page.getByTestId('add-to-cart').click();
    await this.cartLink.click();
  }
  async expectProductInCart(name: string) {
    await expect(this.page).toHaveURL(/\/checkout/);
    await expect(this.page.getByText(name, { exact: true })).toBeVisible();
    await expect(this.page.getByTestId('product-quantity')).toHaveValue('1');
  }
  async completeCheckout() {
    await this.page.getByTestId('proceed-1').click();
    await this.page.getByRole('button', { name: 'Proceed to checkout' }).click();
    await this.page.getByLabel('Country').selectOption({ label: 'Kazakhstan' });
    await this.page.getByRole('textbox', { name: 'Postal code' }).fill('050000');
    await this.page.getByRole('textbox', { name: 'House number' }).fill('12');
    await this.page.getByRole('textbox', { name: 'Street' }).fill('Test Street');
    await this.page.getByRole('textbox', { name: 'City' }).fill('Almaty');
    await this.page.getByRole('textbox', { name: 'State' }).fill('Almaty');
    await this.page.getByRole('button', { name: 'Proceed to checkout' }).click();
    await this.page.getByTestId('payment-method').selectOption({ label: 'Cash on Delivery' });
    await this.page.getByTestId('finish').click();
  }
}
