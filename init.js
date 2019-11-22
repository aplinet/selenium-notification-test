const { Builder, By, Capabilities, Key, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const firefox = require("selenium-webdriver/firefox");

const fs = require('fs');


if (!fs.existsSync('Profile/Default')){
    fs.mkdirSync('Profile/Default');
}

fs.copyFile('Preferences.example', 'Profile/Default/Preferences', (err) => {
    if (err) throw err;
  });

let chromeCapabilities = Capabilities.chrome();

// $prefs = [
//     "profile.default_content_setting_values.media_stream_mic" =>1,
//     "profile.default_content_setting_values.media_stream_camera" =>1,
//     "profile.default_content_setting_values.geolocation" => 1,
//     "profile.default_content_setting_values.notifications" => 1
// ];
// $options->setExperimentalOption("profile.default_content_setting_values.media_stream_mic" ,1);
// $options->setExperimentalOption("profile.default_content_setting_values.media_stream_camera",1);
// $options->setExperimentalOption("profile.default_content_setting_values.geolocation" ,1);
// $options->setExperimentalOption("profile.default_content_setting_values.notifications" ,1);
// $options->setExperimentalOption('prefs', $prefs);

// '--headless',
// '--window-size=400,800',
// '--user-data-dir=' . __DIR__ . '/Browser/config/Preferences'

const options = new chrome.Options();
options.addArguments("disable-infobars");
options.addArguments("disable-web-security");
options.addArguments("ignore-certificate-errors");
options.addArguments("disable-gpu");
options.addArguments("no-managed-user-acknowledgment-check");
options.addArguments(
  "user-data-dir=/home/aplinet/Projekty/selenium-test/Profile"
);
chromeCapabilities.set('prefs',{
    "profile.default_content_setting_values.notifications": 1
  })
chromeCapabilities.set('prefs',{
    "DefaultNotificationsSetting": 1
  })
// options.setExperimentalOptions("prefs", {
//   "profile.default_content_setting_values.notifications": 1
// });

// options.addArguments("headless");

// const chromeOptions = { 'args': [
//     '--disable-infobars',
//     '--headless',
//     '--window-size=400,800',
//     '--disable-web-security',
//     '--ignore-certificate-errors',
//     '--disable-gpu',
//     '--no-managed-user-acknowledgment-check',
// ] };
options.set('prefs', {
    "profile.default_content_setting_values.notifications": 1
  });
options.set('prefs', {
    "DefaultNotificationsSetting": 1
  });
chromeCapabilities.setPageLoadStrategy("normal");

let driver = new Builder()
  .forBrowser("chrome")
  .withCapabilities(chromeCapabilities)
  .setChromeOptions(options)
  .setFirefoxOptions(/* ... */)
  .build();

(async function main() {
  try {
    // Navigate to Url
    await driver.get("https://www.bennish.net/web-notifications.html");

    let firstResult = await driver.wait(
      until.elementLocated(By.xpath("/html/body/div/p[4]/button[1]")),
      2000
    );
    const button2 = await driver.findElement(
      By.xpath("/html/body/div/p[4]/button[2]")
    );

    // await firstResult.getAttribute("textContent");
    await firstResult.click();
    await driver.sleep(3000);
    await button2.click();
    await driver.sleep(3000);
  } finally {
    driver.quit();
  }
})();
