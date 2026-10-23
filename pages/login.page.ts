import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
  private readonly email: Locator;
  private readonly password: Locator;
  private readonly submit: Locator;
  private readonly alert: Locator;

  constructor(private readonly page: Page) {
    this.email = page.getByTestId('email');
    this.password = page.getByTestId('password');
    this.submit = page.getByTestId('login-submit');
    this.alert = page.getByText('Invalid email or password');
  }

  async open() { await this.page.goto('/auth/login'); }
  async signIn(email: string, password: string) {
    await this.email.fill(email);
    await this.password.fill(password);
    await this.submit.click();
  }
  async expectLoginError() { await expect(this.alert).toBeVisible(); }
  async expectSignedIn() { await expect(this.page).toHaveURL(/\/account/); }
}
