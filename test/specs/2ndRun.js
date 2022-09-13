const LoginPage = require('../pageobjects/login.page');
const CabinetPage = require('../pageobjects/cabinet.page');
const FavouritesPage = require('../pageobjects/favourites.page');
const InTraysPage = require('../pageobjects/intray.page');
const ClientMaintenancePage = require('../pageobjects/ClientMaintenance.page');
const StructureMaintenance = require('../pageobjects/structureMaintenance.page');
const CabinetAccessControl = require('../pageobjects/cabinetAccessControl.page');
const CabinetAccessControlPage = require('../pageobjects/cabinetAccessControl.page');
const CabinetSettingsPage = require('../pageobjects/cabinetSettings.page');
const TaskPage = require('../pageobjects/task.page');
const TaskTemplateMaintenance = require('../pageobjects/taskTemplateMaintenance.page');
const GroupPermissionMaintenancePage = require('../pageobjects/groupPermissionMaintenance.page');
const SystemAdminWizardPage = require('../pageobjects/systemAdminWizard.page');
const HomePageMaintenancePage = require('../pageobjects/homepagemaintenance.page');
const AuditTrailPage = require('../pageobjects/auditTrail.page');
const FavoritePage = require('../pageobjects/favourites.page');
const IntrayPage = require('../pageobjects/intray.page');
const IntrayAccessControlPage = require('../pageobjects/intrayAccessControl.page');
const { exec } = require('node:child_process');

const templatename = "AutomationTemplate" + new Date().getTime();
const newTemplatename = "New" + templatename;
const superadmin = 'tssadmin3';
const superadmin2='tssadmin4';
const user = 'tle@technosoftsolutions.com.au';
const password = 'Abc@12345';
const isSuperadmin = true;

var clientname = "Automation" + new Date().getTime();
var clientcode = new Date().getTime();
var structure = "Standard Client";
var cabinet_name = "Automation Testing Cabinet" +new Date().getTime();
var new_cabinet_name = "Renamed Automation Testing Cabinet" + new Date().getTime();
var newTemplateName = "Automation Task Template " + new Date().getTime();
var date = new Date().getTime();

describe('Login', () => {
	it('should login with valid credentials', async () => {
        await LoginPage.open();
		let isExisting = await $('//input[@id="username"]').isExisting();
		console.log(isExisting)
        if (isExisting == true) {
            if (isSuperadmin) {
			await LoginPage.login(superadmin, password);
		} else await LoginPage.login(user, password);

		await expect($('//span[text()="Home"]')).toBeExisting();
		await expect($('//span[text()="Home"]')).toBeExisting();
		await expect($('//span[text()="Home"]')).toBeExisting();
        }
		
	});
});

describe('Cabinet Settings', () => {
    it('tc001 Verify the user can see and access the Cabinet Setting page to add a new cabinet', async () => {
		await LoginPage.reload();
		await CabinetSettingsPage.open();
        await expect($('//td[normalize-space()="Clients"]')).toBeExisting();
        await expect($('//td[normalize-space()="Prospects"]')).toBeExisting();
    });


    it('tc002 Verify that user can see created cabinet in Cabinet list, Cabinet Settings after user apllied Read permission for it on the CAC page', async () => {
        await CabinetSettingsPage.open();
        await CabinetSettingsPage.addCabinet(cabinet_name, "None", isSuperadmin);
        await LoginPage.reload();

        await CabinetAccessControlPage.open();
        await CabinetAccessControlPage.checkCabinet(cabinet_name);
        await CabinetAccessControlPage.save();

        await CabinetPage.open();
        await expect($('(//span[normalize-space()="' + cabinet_name + '"])[last()]')).toBeExisting();

        await CabinetSettingsPage.open();
        await expect($('//td[normalize-space()="' + cabinet_name + '"]')).toBeExisting();
    });
    
    it('tc005 Verify that user can select any of the available cabinet name to apply index type', async () => {
        
        await CabinetSettingsPage.open();
        await CabinetSettingsPage.changeIndexType(cabinet_name, "Alphabetic");

        await CabinetPage.open();
        await CabinetPage.expandCabinet(cabinet_name);
        let str = await CabinetSettingsPage.getStringOfSubFolders();
        await expect(str.includes("#ABCDEFGHIJKLMNOPQRSTUVWXYZ")).toEqual(true);

        await CabinetSettingsPage.open();
        await CabinetSettingsPage.changeIndexType(cabinet_name, "Numeric");

        await CabinetPage.open();
        await CabinetPage.expandCabinet(cabinet_name);
        let str2 = await CabinetSettingsPage.getStringOfSubFolders();
        await expect(str2.includes("+0123456789")).toEqual(true);

        await CabinetSettingsPage.open();
        await CabinetSettingsPage.changeIndexType(cabinet_name, "Alpha-Numeric");

        await CabinetPage.open();
        await CabinetPage.expandCabinet(cabinet_name);
        let str3 = await CabinetSettingsPage.getStringOfSubFolders();
        await expect(str3.includes("+0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ")).toEqual(true);
    });


    it('tc003 Verify that user can select any of the available cabinet name to rename', async () => {
        await CabinetSettingsPage.open();
        await CabinetSettingsPage.renameCabinet(cabinet_name, new_cabinet_name);
        await expect($('//td[normalize-space()="' + new_cabinet_name +'"]')).toBeExisting();
    });

    //it('tc004 Verify that user can select any of the available cabinet name to delete, The deleted cabinet will be removed from the cabinet Setting and not displayed in Cabinet list/Structure Maintennance/ Cabinet Access Control/ Search page', async () => {
    //    let cabinet_name = "Renamed Testing Cabinet";
    //    await CabinetSettingsPage.open();
    //    await CabinetSettingsPage.deleteCabinet(cabinet_name);
    //    await expect($('//td[normalize-space()="' + cabinet_name + '"]')).not.toBeExisting();

    //    await CabinetAccessControlPage.open();
    //    await expect($('//div[normalize-space()="' + cabinet_name + '"]/preceding-sibling::div//input/parent::span')).not.toBeExisting();

    //    await CabinetPage.open();
    //    await expect($('//td[normalize-space()="' + cabinet_name + '"]')).not.toBeExisting();

    //    await $('//input[@placeholder="Quick Find"]').setValue(cabinet_name);
    //    expect($('//span[contains(.,"Cabinet: '+cabinet_name +'")]')).not.toBeExisting();

    //    await StructureMaintenancePage.open();
    //    expect($('(//div[contains(.,"' + cabinet_name + '")])[last()]')).not.toBeExisting();
    //});
});


//describe('Logout', () => {
//	it('should logout', async () => {
//		await LoginPage.reload();
//		//await LoginPage.logout();
//	});
//});