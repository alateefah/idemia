import { test, expect } from '@playwright/test';

const BASE_URL: string = process.env['baseURL'] || "http://localhost:4200";

test.describe('Reservation App', () => {
  test("should load default route", async ({page}) => {
    await page.goto(BASE_URL);

    await expect(page).toHaveTitle("Idemia - Angular");
  })

  test('should get header text', async ({page}) => {
    await page.goto(BASE_URL);

    const header = await page.locator('h2').textContent()

    await expect(header).toEqual('Reservations');
  });

  test('should allow search', async ({page}) => {
    await page.goto(BASE_URL);

    const initialNumberOfRows = await page.locator('tbody tr').count();
    expect(initialNumberOfRows).toEqual(2)

    await page.getByLabel('Last Name').fill('PM');
    await page.getByRole('button', { name: 'Search' }).click();

    const numberOfRowsAfterSearch = await page.locator('tbody tr').count();
    await expect(numberOfRowsAfterSearch).toEqual(1);
  });

  test('should submit new reservation with correct details', async ({page}) => {
    await page.goto(BASE_URL);

    const initialNumberOfRows = await page.locator('tbody tr').count();
    expect(initialNumberOfRows).toEqual(2)

    await page.getByRole('button', { name: 'Add New' }).click();

    const header = await page.locator('h2').last().textContent()
    await expect(header).toEqual('New Reservation');
    
    const submitButton = await page.getByRole('button', { name: 'Submit' })
    await expect(submitButton.isDisabled()).toBeTruthy();

    // fill form
    await page.getByLabel('Date of Arrival').fill('08/21/2023');
    await page.getByLabel('Date of Departure').fill('8/25/2023');
    const selectBoxes = await page.locator('mat-select');
    await selectBoxes.nth(0).click();
    await page.locator(`mat-option:has-text("Presidential Suite")`).click();
    await page.getByLabel('Room Quantity').fill('2');
    await page.getByRole('textbox', { name: 'First Name' }).fill('Lateefah');
    await page.getByRole('textbox', { name: 'Last Name' }).fill('Abdulkareem');
    await page.getByLabel('Email').fill('queen@gmail.com');
    await page.getByRole('textbox', { name: 'Phone' }).fill('+19034432233');
    await page.getByLabel('Street Name').fill('Haley Street');
    await page.getByLabel('Street Number').fill('234');
    await page.getByLabel('Zip').fill('LALALA');
    await page.getByLabel('City').fill('Ojulari');  
    await page.getByLabel('Personal Note').fill('Note');
    await page.getByLabel('Cash').check();   
    await page.getByLabel('Send me a reminder').check();
    await page.getByLabel('Subscribe to newsletter').check();
    await page.getByLabel('I confirm the information given above').check();
    // await selectBoxes.nth(1).click();
    // await page.locator(`mat-option:has-text("Extra TV")`).click();
    // await page.locator(`mat-option:has-text("Extra Parking")`).click();
    await page.getByLabel('State').fill('Arizona');
    await page.getByLabel('City').fill('Ojulari');  

    await expect(await submitButton.isDisabled()).toBeFalsy();
    await submitButton.click();
    
    await page.waitForTimeout(2000);
    
    const numberOfRowsAfterSearch = await page.locator('tbody tr').count();
    await expect(numberOfRowsAfterSearch).toEqual(3);
    
  });

  test('should update firstname of the first record is updated', async ({page}) => {
    await page.goto(BASE_URL);

    const submitButton = await page.getByRole('button', { name: 'Submit' })
    
    const firstRowActions = await page.locator('tbody tr').first().locator('td').last();
    await firstRowActions.locator('button').nth(1).click();
    
    const header = await page.locator('h2').last().textContent()
    await expect(header).toEqual('Edit Reservation');

    await page.getByRole('textbox', { name: 'First Name' }).fill('Lateefah');
    await page.getByRole('textbox', { name: 'Last Name' }).fill('Abdulkareem');
    await submitButton.click();

    await page.waitForTimeout(1000);
    const updatedRow = await page.locator('tbody tr').last().locator('td').first();
    await expect(await updatedRow.textContent()).toEqual("Lateefah Abdulkareem");
  });

  test('should delete a record', async ({page}) => {
    await page.goto(BASE_URL);
    const firstRowActions = await page.locator('tbody tr').first().locator('td').last();
    await firstRowActions.locator('button').nth(2).click();
    
    const submitButton = await page.getByRole('button', { name: 'Confirm' })
    submitButton.click();

    await page.waitForTimeout(1000);

    const numberOfRowsAfterDelete = await page.locator('tbody tr').count();
    await expect(numberOfRowsAfterDelete).toEqual(1);
  });


});