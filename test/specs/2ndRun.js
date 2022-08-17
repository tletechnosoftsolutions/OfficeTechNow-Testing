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
const isSuperadmin = false;

var clientname = "Automation" + new Date().getTime();
var clientcode = new Date().getTime();
var structure = "01. Standard Client";
var cabinet_name = "Automation Testing Cabinet" +new Date().getTime();
var new_cabinet_name = "Renamed Automation Testing Cabinet" + new Date().getTime();
var newTemplateName = "Automation Task Template " + new Date().getTime();
var date = new Date().getTime();

describe('Login', () => {
	it('should login with valid credentials', async () => {
		await LoginPage.open();
		if (isSuperadmin) {
			await LoginPage.login(superadmin, password);
		} else await LoginPage.login(user, password);

		await expect($('//span[text()="Home"]')).toBeExisting();
		await expect($('//span[text()="Home"]')).toBeExisting();
		await expect($('//span[text()="Home"]')).toBeExisting();
	});
});


describe('Intray', () => {
    let accountA = superadmin2;
    let fileName = "testfile.xlsx";

    it('tc001 Verify that the current users Intray will be highlighted by default and displayed at the top in Intray/ Folder Browser/ File Browser/ Save form', async () => {
        await IntrayPage.open();
        let isActive = await $('//span[normalize-space()="' + superadmin + '"]/parent::button').getAttribute("class");
        await expect(isActive.includes("active")).toEqual(true);
    });

    it('tc002 Verify that the current user login can do all default action of a file on his own In-tray', async () => {
        //Pre-condition: Upload 02 files in intray
        await IntrayPage.uploadFileSystem(fileName);
        await IntrayPage.uploadFileSystem(fileName);

        //Verify copy file
        await IntrayPage.tickOnFile(fileName);
        await IntrayPage.copyTo(accountA);
        await IntrayPage.goToUserIntray(accountA);
        await expect($('(//span[contains(.,' + fileName + ')]/ancestor::td)[1]')).toBeExisting();

        //Verify move file
        await IntrayPage.goToUserIntray(superadmin);
        await IntrayPage.tickOnFile(fileName);
        await IntrayPage.moveTo(accountA);
        await IntrayPage.goToUserIntray(accountA);
        await expect($('(//span[contains(.,"' + fileName + '")]/ancestor::td)[1]')).toBeExisting();

        //Verify new email
        await IntrayPage.goToUserIntray(superadmin);
        await IntrayPage.tickOnFile(fileName);
        await IntrayPage.newEmail();
        await expect($('app-email-attachments')).toBeExisting();
        await $('//button[.="Cancel"]').click();

        //Verify send to task
        await IntrayPage.sendToTask("Existing");
        await expect($('app-dialog-existing-task')).toBeExisting();
        await $('//button[.="Cancel"]').click();
        await IntrayPage.sendToTask("New");
        await expect($('app-create-task')).toBeExisting();
        await $('//button[.="Cancel"]').click();
        await ks.sendKey('enter');

        //Verify delete file
        await IntrayPage.delete();
        //await expect($('(//span[contains(.,"' + fileName + '")]/ancestor::td)[1]')).not.toBeExisting();
    });

    it('tc003 Verify that user can view peoples intray if user has Read/ Write/Delete permission checked in the IAC', async () => {
        let groupName = "Automation" + date;
        //Pre-condition: Upload 02 files in intray
        await IntrayPage.uploadFileSystem(fileName);
        await IntrayPage.uploadFileSystem(fileName);

        //Verify Read permission (No move/delete permission)
        await IntrayAccessControlPage.open();
        await IntrayAccessControlPage.createNewGroup(groupName);
        await IntrayAccessControlPage.focusOn(groupName);
        await IntrayAccessControlPage.tickOnUser(accountA);
        await IntrayAccessControlPage.tickOnPermission("Read");
        await IntrayAccessControlPage.tickOnIntray(superadmin);
        await IntrayAccessControlPage.save();
        await LoginPage.logout();

        await LoginPage.login(accountA, password);
        await IntrayPage.open();
        await IntrayPage.goToUserIntray(superadmin);
        //await expect($('[mattooltip="Delete"]')).not.toBeExisting();
        //await expect($('[mattooltip="Move To"]')).not.toBeExisting();
        await LoginPage.logout();

        //Verify Write permission (Can move, no delete permission)
        await LoginPage.login(superadmin, password);
        await IntrayAccessControlPage.open();
        await IntrayAccessControlPage.focusOn(groupName);
        await IntrayAccessControlPage.tickOnPermission("Write");
        await IntrayAccessControlPage.save();
        await LoginPage.logout();

        await LoginPage.login(accountA, password);
        await IntrayPage.open();
        await IntrayPage.goToUserIntray(superadmin);
        //await expect($('[mattooltip="Delete"]')).not.toBeExisting(); //File cannot be deleted
        await expect($('[mattooltip="Move To"]')).toBeExisting(); //File can be moved
        await IntrayPage.tickOnFile(fileName);
        await IntrayPage.moveTo(accountA);
        await IntrayPage.goToUserIntray(accountA);
        await expect($('(//span[contains(.,"' + fileName + '")]/ancestor::td)[1]')).toBeExisting();
        await LoginPage.logout();

        //Verify Delete permission (Can delete files)
        await LoginPage.login(superadmin, password);
        await IntrayAccessControlPage.open();
        await IntrayAccessControlPage.focusOn(groupName);
        await IntrayAccessControlPage.tickOnPermission("Delete");
        await IntrayAccessControlPage.save();
        await LoginPage.logout();

        await LoginPage.login(accountA, password);
        await IntrayPage.open();
        await IntrayPage.goToUserIntray(superadmin);
        await IntrayPage.tickOnFile(fileName);
        await IntrayPage.delete();
        //await expect($('(//span[contains(.,"' + fileName + '")]/ancestor::td)[1]')).not.toBeExisting();
    });
});

