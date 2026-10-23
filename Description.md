# SIS 2 — Description

## Goal

Automate five high-value end-to-end scenarios for the Toolshop training site using Playwright Test with TypeScript. The application is a public demo, so checks use isolated browser contexts and fresh customer data rather than assuming one test ran before another.

## Test cases to automate

| ID | Test case | Expected result | Suite design |
|---|---|---|---|
| TC-01 | Register a new customer | A unique customer is accepted and the application opens the sign-in page. | UI / end-to-end; a fresh email is generated for every run. |
| TC-02a | Sign in with valid credentials | A newly registered customer reaches the account page. | UI / end-to-end; setup data is created in the test itself. |
| TC-02b | Sign in with invalid credentials | The app shows “Invalid email or password” and stays on the sign-in page. | UI negative case. |
| TC-03 | Buy a product | A product appears in the cart at quantity one and checkout reaches its confirmation state. | UI / end-to-end; creates and signs in a fresh user. |
| TC-04 | Compare two products | The comparison page contains the selected product names and prices. | UI; captures each value before adding both products to comparison. |
| TC-05a | Reset a known account password | The site shows its password-reset confirmation. | UI; uses the seeded course account. |
| TC-05b | Reset an unknown email | The site shows its current invalid-email validation message. | UI negative case. |


