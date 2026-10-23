import { test, expect } from '../fixtures/pages.fixture';

test('known account receives the password reset confirmation', async ({ passwordResetPage, page }) => {
  await passwordResetPage.open();
  await passwordResetPage.requestReset('customer@practicesoftwaretesting.com');
  await passwordResetPage.expectPrivacySafeConfirmation();
  await page.screenshot({ path: 'screenshots/password-reset-known-email.png', fullPage: true });
});

test('unknown email receives a validation error', async ({ passwordResetPage, page }) => {
  await passwordResetPage.open();
  await passwordResetPage.requestReset('unknown.sis2@example.com');
  await passwordResetPage.expectUnknownEmailError();
  await page.screenshot({ path: 'screenshots/password-reset-unknown-email.png', fullPage: true });
});
