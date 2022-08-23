const LoginPage = require('../pageobjects/login.page');
const UserProfilePage = require('../pageobjects/userProfile.page');
const UserAuthenticationMaintenancePage = require('../pageobjects/UserAuthenticationMaintenance.page');
const SystemConfigurationPage = require('../pageobjects/systemConfiguration.page');
const GroupPermissionMaintenancePage = require('../pageobjects/groupPermissionMaintenance.page');
const ClientMaintenancePage = require('../pageobjects/ClientMaintenance.page');
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


describe('Debug suite', () => {
    var clientname = "Automation1658822404588";
    var clientcode = "1658822404588";

    it('tc005 Verify that user can rename a Client folder', async () => {
        await ClientMaintenancePage.open();
        let newName = "Edited " + clientname;
        let newCode = clientcode + "000";
        await ClientMaintenancePage.searchClient(clientname);
        await ClientMaintenancePage.renameClient(clientname, newName, newCode);
        await LoginPage.reload();
        await ClientMaintenancePage.open();
        await ClientMaintenancePage.searchClient(newName);
        await expect($('//td[normalize-space()="' + newName + '"]')).toBeExisting();
        await expect($('//td[normalize-space()="' + newCode + '"]')).toBeExisting();
    });
});