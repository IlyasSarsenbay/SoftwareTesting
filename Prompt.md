# AI prompt record

## Tool

OpenAI Codex desktop coding agent (GPT-6).

## Prompt

Write a TypeScript Playwright Test suite for https://practicesoftwaretesting.com/ in the existing VS Code project. 

Create five independent UI test specs using these existing file names:
1. tests/register.spec.ts — register a customer with a unique email generated for every run.
2. tests/login.spec.ts — cover successful login and invalid credentials.
3. tests/buy-product.spec.ts — add a product to the cart and complete checkout.
4. tests/compare-products.spec.ts — compare two different products and verify their names and prices.
5. tests/reset-password.spec.ts — cover the known-account confirmation and the current unknown-email validation behavior.

Use TypeScript, Playwright Test, Page Object classes in pages/, and shared fixtures in fixtures/pages.fixture.ts. Keep element locators and UI actions in page objects; spec files should describe the behavior and make meaningful assertions. Generate registration data in data/user.factory.ts so tests can run repeatedly and in any order. Positive login and checkout cases may create their own user instead of relying on a shared account.

Configure baseURL and map getByTestId() to the site's data-test attributes. Prefer getByTestId(), accessible roles, and labels. The current product cards use data-test values with a product-ID prefix, so a narrowly scoped selector based only on data-test is acceptable to collect the cards. Do not use CSS classes, positional XPath, or waitForTimeout(). Use retrying web-first assertions. Capture useful screenshots under screenshots/ and configure a useful Playwright report.

```
