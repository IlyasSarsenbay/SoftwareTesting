import { test, expect } from '../fixtures/pages.fixture';
import { createNewCustomer } from '../data/user.factory';

test('add a product to the cart and complete checkout', async ({ cartPage, page, registerPage, loginPage }) => {
  const customer = createNewCustomer();
  await registerPage.open();
  await registerPage.register(customer);
  await registerPage.expectRegistrationAccepted();
  await loginPage.open();
  await loginPage.signIn(customer.email, customer.password);
  await loginPage.expectSignedIn();
  await cartPage.addFirstAvailableProduct();
  const productName = await page.getByTestId('product-name').innerText();
  await cartPage.expectProductInCart(productName);
  await cartPage.completeCheckout();
  await expect(page.getByRole('alert')).toBeVisible();
  await page.screenshot({ path: 'screenshots/checkout-complete.png', fullPage: true });
});
