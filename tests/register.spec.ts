import { test, expect } from '../fixtures/pages.fixture';
import { createNewCustomer } from '../data/user.factory';

test('register a unique customer with valid details', async ({ registerPage, page }) => {
  await registerPage.open();
  await registerPage.register(createNewCustomer());
  await registerPage.expectRegistrationAccepted();
  await page.screenshot({ path: 'screenshots/registration-result.png', fullPage: true });
});
