module.exports = function () {
    const keyboard = {};
    keyboard.pressEnter = async function (page) {
       await page.keyboard.press('Enter');
    };

    return keyboard;
};