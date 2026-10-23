import { test as base, expect } from '@playwright/test';
import { CartPage } from '../pages/cart.page';
import { CatalogPage } from '../pages/catalog.page';
import { LoginPage } from '../pages/login.page';
import { PasswordResetPage } from '../pages/password-reset.page';
import { RegisterPage } from '../pages/register.page';

type Pages = {
  cartPage: CartPage;
  catalogPage: CatalogPage;
  loginPage: LoginPage;
  passwordResetPage: PasswordResetPage;
  registerPage: RegisterPage;
};

export const test = base.extend<Pages>({
  cartPage: async ({ page }, use) => use(new CartPage(page)),
  catalogPage: async ({ page }, use) => use(new CatalogPage(page)),
  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  passwordResetPage: async ({ page }, use) => use(new PasswordResetPage(page)),
  registerPage: async ({ page }, use) => use(new RegisterPage(page)),
});

export { expect };
