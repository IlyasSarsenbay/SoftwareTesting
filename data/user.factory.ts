export type NewCustomer = {
  'first-name': string;
  'last-name': string;
  dob: string;
  country: string;
  postal_code: string;
  house_number: string;
  street: string;
  city: string;
  state: string;
  phone: string;
  email: string;
  password: string;
};

export function createNewCustomer(): NewCustomer {
  const runId = `${Date.now()}${Math.floor(Math.random() * 10000)}`;
  return {
    'first-name': 'Playwright',
    'last-name': `Student${runId.slice(-5)}`,
    dob: '1995-05-17',
    country: 'Kazakhstan',
    postal_code: '050000',
    house_number: '12',
    street: 'Test Street',
    city: 'Almaty',
    state: 'Almaty',
    phone: '77010000000',
    email: `sis2.${runId}@example.com`,
    password: 'Playwright#2026',
  };
}
