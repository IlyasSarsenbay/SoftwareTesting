import { expect, type Locator, type Page } from '@playwright/test';
import type { NewCustomer } from '../data/user.factory';

export class RegisterPage {
  private readonly fields: Record<string, Locator>;
  private readonly submit: Locator;
  private readonly alert: Locator;

  constructor(private readonly page: Page) {
    this.fields = Object.fromEntries(
      ['first-name', 'last-name', 'dob', 'country', 'postal_code', 'house_number', 'street', 'city', 'state', 'phone', 'email', 'password']
        .map((id) => [id, page.getByTestId(id)]),
    );
    this.submit = page.getByTestId('register-submit');
    this.alert = page.getByRole('alert');
  }

  async open() { await this.page.goto('/auth/register'); }
  async register(customer: NewCustomer) {
    for (const [field, value] of Object.entries(customer)) {
      const input = this.fields[field];
      if (field === 'country') await input.selectOption({ label: value });
      else await input.fill(value);
    }
    await this.submit.click();
  }
  async expectRegistrationAccepted() {
    await expect(this.page).toHaveURL(/\/auth\/login/);
    await expect(this.page.getByTestId('login-submit')).toBeVisible();
  }
}
