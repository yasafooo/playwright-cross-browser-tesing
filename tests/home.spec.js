// @ts-check
const { test, expect } = require('@playwright/test');
const home = require("../pages/Home");
const errorMessage = require("../constants/ErrorMessages");
const addressData = require('../data/AddressData');

test.beforeEach(async ({ page }) => {
  await page.goto("/maps/");
});

test.describe('Search Address', () => {
  test('should allow user to see the details of distance and route description between colombo and kandy', async ({ page }) => {
    //Success test case
    await home().searchPlace(page, addressData().address_colombo_kandy.end);
    await home().clickDirectionButton(page);
    await home().enterStartPoint(page, addressData().address_colombo_kandy.start);
    await expect(await home().getNumberOfRoutes(page)).toBe(addressData().address_colombo_kandy.routeCount);
    await expect(await home().isRouteDescriptionsAvailable(page, addressData().address_colombo_kandy)).toBe(true);
    await expect(await home().isRouteDistancesAvailable(page, addressData().address_colombo_kandy)).toBe(true)
  });

  test('should allow user to see the details of duration between colombo and kandy', async ({ page }) => {
    //Failure test case
    await home().searchPlace(page, addressData().address_colombo_kandy.end);
    await home().clickDirectionButton(page);
    await home().enterStartPoint(page, addressData().address_colombo_kandy.start);
    await expect(await home().getNumberOfRoutes(page)).toBe(addressData().address_colombo_kandy.routeCount);
    await expect(await home().isRouteDurationsAvailable(page, addressData().address_colombo_kandy)).toBe(true);
  });

  test('should allow user to see error message when user enter invalid address', async ({ page }) => {
    //Negative test case
    await home().searchPlace(page, addressData().invalid_adress.start);
    await expect(await home().getNumberOfRoutes(page)).toBe(addressData().invalid_adress.routeCount);
    await expect(await home().getInvalidAddressErrorMessage(page)).toBe(errorMessage().INVLID_ADDRESS.replace('address',addressData().invalid_adress.start));
  });

  test('should allow user to see the details of distance and drive route description between paris and london', async ({ page }) => {
    //Success test case
    await home().searchPlace(page, addressData().address_london_paris.end);
    await home().clickDirectionButton(page);
    await home().enterStartPoint(page, addressData().address_london_paris.start);
    await home().clickDrivingTravelModeButton(page);
    await expect(await home().getNumberOfRoutes(page)).toBe(addressData().address_london_paris.routeCount);
    await expect(await home().isRouteDescriptionsAvailable(page, addressData().address_london_paris)).toBe(true);
    await expect(await home().isRouteDistancesAvailable(page, addressData().address_london_paris)).toBe(true)
  });
});