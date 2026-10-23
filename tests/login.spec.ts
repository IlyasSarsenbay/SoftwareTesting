import { test, expect } from '../fixtures/pages.fixture';
import { createNewCustomer } from '../data/user.factory';

test('valid customer credentials open the account page', async ({ loginPage, registerPage, page }) => {
  const customer = createNewCustomer();
  await registerPage.open();
  await registerPage.register(customer);
  await registerPage.expectRegistrationAccepted();
  await loginPage.open();
  await loginPage.signIn(customer.email, customer.password);
  await loginPage.expectSignedIn();
  await page.screenshot({ path: 'screenshots/login-account.png', fullPage: true });
});

test('invalid credentials show an error and keep the user signed out', async ({ loginPage, page }) => {
  await loginPage.open();
  await loginPage.signIn('not-a-customer@example.com', 'incorrect-password');
  await loginPage.expectLoginError();
  await expect(page).toHaveURL(/\/auth\/login/);
});
