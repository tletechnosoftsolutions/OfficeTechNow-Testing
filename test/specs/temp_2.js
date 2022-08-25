const LoginPage = require('../pageobjects/login.page');
const CabinetPage = require('../pageobjects/cabinet.page');
const CabinetSettingsPage = require('../pageobjects/cabinetSettings.page');
const CabinetAccessControlPage = require('../pageobjects/cabinetAccessControl.page');
const UserProfilePage = require('../pageobjects/userProfile.page');
const UserAuthenticationMaintenancePage = require('../pageobjects/UserAuthenticationMaintenance.page');
const SystemConfigurationPage = require('../pageobjects/systemConfiguration.page');
const GroupPermissionMaintenancePage = require('../pageobjects/groupPermissionMaintenance.page');
const ClientMaintenancePage = require('../pageobjects/ClientMaintenance.page');
const StructureMaintenancePage = require('../pageobjects/structureMaintenance.page');
const date = new Date().getTime();
const superadmin = 'tssadmin3';
const superadmin2='tssadmin4';
const user = 'tle@technosoftsolutions.com.au';
const password = 'Abc@12345';
const isSuperadmin = true;
const download_path = "C:/Users/TLe/Downloads/";
const templatename = "AutomationTemplate" + new Date().getTime();
var cabinet_name = "Automation Testing Cabinet" +new Date().getTime();
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
    let date = "1661261346625";

    it('tc011 Verify the user can add a new cabinet', async () => {
        let message1 = "The cabinet \'" + cabinet_name + "\' has been created.";
        let message2 = "Please apply access permissions for this cabinet via 'Administration - Cabinet Access Control'.";
        let message3 = "This cabinet is not available to users until permissions are applied. Would you like to set Cabinet Access Control permission for '" + cabinet_name + "' now?";
        
        await CabinetSettingsPage.addCabinet(cabinet_name, "None");
        await expect($('//p[contains(.,"' + message1 + '")]')).toBeExisting();
        await expect($('//p[contains(.,"' + message2 + '")]')).toBeExisting();
        await expect($('//p[contains(normalize-space(),"' + message3 + '")]')).toBeExisting();
        await $('//button[.="No"]').click();
    });
});