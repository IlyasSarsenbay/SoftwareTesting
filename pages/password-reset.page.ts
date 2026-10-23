import { expect, type Locator, type Page } from '@playwright/test';

export class PasswordResetPage {
  private readonly email: Locator;
  private readonly submit: Locator;
  private readonly alert: Locator;

  constructor(private readonly page: Page) {
    this.email = page.getByTestId('email');
    this.submit = page.getByTestId('forgot-password-submit');
    this.alert = page.getByRole('alert');
  }

  async open() { await this.page.goto('/auth/forgot-password'); }
  async requestReset(email: string) {
    await this.email.fill(email);
    await this.submit.click();
  }
  async expectPrivacySafeConfirmation() {
    await expect(this.alert).toBeVisible();
    await expect(this.alert).toHaveText('page.forgot-password.confirm');
  }
  async expectUnknownEmailError() {
    await expect(this.alert).toBeVisible();
    await expect(this.alert).toHaveText('The selected email is invalid.');
  }
}
