const LoginPage = require('../pageobjects/login.page');
const UserProfilePage = require('../pageobjects/userProfile.page');
const UserAuthenticationMaintenancePage = require('../pageobjects/UserAuthenticationMaintenance.page');
const SystemConfigurationPage = require('../pageobjects/systemConfiguration.page');
const templatename = "AutomationTemplate" + new Date().getTime();
const newTemplatename = "New" + templatename;
const superadmin = 'tssadmin3';
const superadmin2='tssadmin4';
const user = 'tle@technosoftsolutions.com.au';
const password = 'Abc@12345';
const isSuperadmin = true;
const download_path = "C:/Users/TLe/Downloads/";

describe('Login', () => {
    it('should login with valid credentials', async () => {
       await LoginPage.open();
      if (isSuperadmin) {
			await LoginPage.login(superadmin, password);
		} else await LoginPage.login(user, password);

        await expect($('//span[text()="Home"]')).toBeExisting();
        await expect($('//span[text()="Home"]')).toBeExisting();
        await expect($('//span[text()="Home"]')).toBeExisting();
        await expect($('//span[text()="Home"]')).toBeExisting();
    });
});


describe('User Profile', () => {
    //let user = "Thanh 1 Vo";
    it('tc021 Verify that User Profile will display information the same User information created in the User & Authentication page', async () => {
        await UserProfilePage.open();
        let userEmail = await $('input[id*=email]').getValue();
        let userFirstName = await $('input[id*=firstName]').getValue();
        let userLastName = await $('input[id*=lastName]').getValue();

        await UserAuthenticationMaintenancePage.open();
        await UserAuthenticationMaintenancePage.search("User", superadmin);
        await expect($('//p[contains(.,"' + userEmail + '")]')).toBeExisting();
        await expect($('//p[contains(.,"' + userFirstName + ' ' + userLastName + '")]')).toBeExisting();
    });
});