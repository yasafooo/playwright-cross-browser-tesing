const keyboard = require("../helper/keyborad");
module.exports = function () {
    const home = {};
    let txtSearch= "[id='searchboxinput']";
    let btnSearch= "[id='searchbox-searchbutton']";
    let btnDirection= "//button[@data-value='Directions']";
    let txtStartPint= "(//div[@jsnamespace='directions']//div[@role='list']//input)[1]";
    let txtRouteDescription= "[id='section-directions-trip-title-x']";
    let txtRouteDuration= "(//div[@data-trip-index='y']//div//span)[1]";
    let txtRouteDistance= "//div[@data-trip-index='y']//div[2]//div";
    let rowRouteCount = "//div[@data-trip-index]//img[@aria-label='  Driving  ']";
    let txtSendDirectionsToYourPhone = "text=Send directions to your phone"
    let txtAddressError= "//div/div[1]/div[2]/div/div[1]/div/div/div[2]/div[1]/div[1]";
    let btnDrivingTravelMode= "//img[@aria-label='Driving']/ancestor::button";
    home.typeSearchBox = async function (page, location) {
        await page.locator(txtSearch).fill(location);
    };
    home.clickSearchButton = async function (page) {
        await page.locator(btnSearch).click();
    };
    home.clickDirectionButton = async function (page) {
        await page.locator(btnDirection).click();
    };
    home.clickDrivingTravelModeButton = async function (page) {
        await page.locator(btnDrivingTravelMode).click();
        await page.locator(txtSendDirectionsToYourPhone).waitFor();
    };
    home.enterStartPoint = async function (page, location) {
        await page.locator(txtStartPint).fill(location);
        await keyboard().pressEnter(page);
        await page.locator(txtSendDirectionsToYourPhone).waitFor();

    };
    home.searchPlace = async function (page,location) {
        await this.typeSearchBox(page, location);
        await this.clickSearchButton(page);
    };
    home.isRouteDescriptionsAvailable = async function (page, routeData) {
        let result = false;
        for(let i=0;i<routeData.routeCount;i++){
            if(routeData.route[i].description === await page.locator(txtRouteDescription.replace('x',i)).innerText()){
                result = true;
            }else{
                result = false;
                break;
            }
        }
        return result;
    };
    home.isRouteDistancesAvailable = async function (page, routeData) {
        let result = false;
        for(let i=0;i<routeData.routeCount;i++){
            if(routeData.route[i].distance === await page.locator(txtRouteDistance.replace('y',i)).innerText()){
                result = true;
            }else{
                result = false;
                break;
            }
        }
        return result;
    };
    home.isRouteDurationsAvailable = async function (page, routeData) {
        let result = false;
        for(let i=0;i<routeData.routeCount;i++){
            if(routeData.route[i].duration === await page.locator(txtRouteDuration.replace('y',i)).innerText()){
                result = true;
            }else{
                result = false;
                break;
            }
        }
        return result;
    };
    home.getInvalidAddressErrorMessage = async function (page) {
        let error = await page.locator(txtAddressError).innerText();
        return error.trim();
    };
    home.getNumberOfRoutes = async function (page) {
        return page.locator(rowRouteCount).count();
    };
    return home;
};