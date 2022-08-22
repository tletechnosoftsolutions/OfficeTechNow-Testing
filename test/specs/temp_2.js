const LoginPage = require('../pageobjects/login.page');
const UserProfilePage = require('../pageobjects/userProfile.page');
const UserAuthenticationMaintenancePage = require('../pageobjects/UserAuthenticationMaintenance.page');
const SystemConfigurationPage = require('../pageobjects/systemConfiguration.page');
const GroupPermissionMaintenancePage = require('../pageobjects/groupPermissionMaintenance.page');
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
    let templatename = "AutomationTemplate1660926084642";

    it('tc009 Verify the user can search users and permissions', async () => {
        let searchPermission = "Task Template Manager";
        await GroupPermissionMaintenancePage.open();
        //Search user
        await GroupPermissionMaintenancePage.search("User", superadmin2);
        await expect($('//div[normalize-space()="' + superadmin2 + '"]')).toBeExisting();
        await expect($$('//*[@title="Users"]//div[@body]//label')).toBeElementsArrayOfSize(1);
        //Search Permission
        await GroupPermissionMaintenancePage.search("Permission", searchPermission);
        await expect($('//div[normalize-space()="' + searchPermission + '"]')).toBeExisting();
        await expect($$('//*[@title="Permissions"]//div[@body]//label')).toBeElementsArrayOfSize(1);
    });
});