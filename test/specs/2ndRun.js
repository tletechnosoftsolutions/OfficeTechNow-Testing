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
const UserAuthenticationMaintenancePage = require('../pageobjects/UserAuthenticationMaintenance.page');
const { exec } = require('node:child_process');
const UserProfilePage = require('../pageobjects/userProfile.page');
const SearchPage = require('../pageobjects/search.page');

const templatename = "AutomationTemplate" + new Date().getTime();
const newTemplatename = "New" + templatename;
const superadmin = 'tssadmin';
const superadmin2='tssadmin4';
const user = 'tle@technosoftsolutions.com.au';
const password = 'Abc@12345';
const isSuperadmin = true;
const accountA = "tssadmin1";
const accountB = "Courtney Davies";

var clientname = "Automation" + new Date().getTime();
var clientcode = new Date().getTime();
var structure = "Standard Client";
var cabinet_name = "Automation Testing Cabinet" +new Date().getTime();
var new_cabinet_name = "Renamed Automation Testing Cabinet" + new Date().getTime();
var newTemplateName = "Automation Task Template " + new Date().getTime();
var date = new Date().getTime();

describe('Super Admin User', () => {
	it('TC001 Verify that Super admin user always has full permissions, He can access all pages and do all actions in the system.', async () => {
		await LoginPage.open();
		if (isSuperadmin) {
			await LoginPage.login(superadmin, password);
		} else await LoginPage.login(user, password);

		await expect($('//span[text()="Home"]')).toBeExisting();
		await expect($('//span[text()="Home"]')).toBeExisting();
		await expect($('//span[text()="Home"]')).toBeExisting();
	});
});


describe('Audit Trail', () => {
    it('tc001 Verify that user can access to Administration> Audit Trail when user has "Audit Trail Master" permission checked on the Goup & Permission Maintenance', async () => {
		let today = new Date().toLocaleDateString(); //DD/MM/YYYY
        await LoginPage.reload();
            await AuditTrailPage.openIndividual();
            await AuditTrailPage.clickOnSelectUser();
            await AuditTrailPage.tickOn("Select All");
            await AuditTrailPage.clickOnSelectAction();
             await AuditTrailPage.tickOn("Select All");
            await AuditTrailPage.refresh();
    });

    it('tc002 Verify that user can access to Invidual Audit Trail when user has "Audit Trail Individual " permission checked on the Goup & Permission Maintenance', async () => {
		let today = new Date().toLocaleDateString(); //DD/MM/YYYY
        await LoginPage.reload();
            await AuditTrailPage.openIndividual();
            await AuditTrailPage.clickOnSelectUser();
            await AuditTrailPage.tickOn("Select All");
            await AuditTrailPage.fillDate("01/05/2022", today);
            await AuditTrailPage.clickOnSelectAction();
             await AuditTrailPage.tickOn("Select All");
            await AuditTrailPage.refresh();
    });


    it('tc003 Verify that user can see System Wizard Audit Trail, User & Group Maintenance, Authentication Management, CAC Audit, IAC Audit, Team Maintenance, Task Template, Structure Maintenance when user has "Audit Trail Individual " permission', async () => {
            await AuditTrailPage.open();
            await expect($('button[title="System Wizard Audit Trail"]')).toBeExisting();
            await expect($('button[title="User & Group Maintenance Audit Trail"]')).toBeExisting();
            await expect($('button[title="Authentication Management Audit Trail"]')).toBeExisting();
            await expect($('button[title="CAC Audit Audit Trail"]')).toBeExisting();
            await expect($('button[title="IAC Audit Audit Trail"]')).toBeExisting();
            await expect($('button[title="Task Template Audit Trail"]')).toBeExisting();
            await expect($('button[title="Structure Maintenance Audit Trail"]')).toBeExisting();
    });

    it('tc005 Verify that user can see search results when searching by User/ Action dropdown', async () => {
        let today = new Date().toLocaleDateString(); //DD/MM/YYYY
        await AuditTrailPage.open();
        await AuditTrailPage.goToSystemWizard();
        await AuditTrailPage.clickOnSelectUser();
        await AuditTrailPage.tickOn("Select All");
        await AuditTrailPage.fillDate("01/07/2022", today);
        await AuditTrailPage.clickOnSelectAction();
        await AuditTrailPage.tickOn("Select All");
        await AuditTrailPage.refresh();
        await expect($('//span[contains(.,"tssadmin")]')).toBeExisting();
    });

    it('tc006 Verify that user can export search results by clicking Export button', async () => {
        //Pre-condition: TC005
        await AuditTrailPage.export();
    });

});



describe('Logout', () => {
	it('should logout', async () => {
		await LoginPage.reload();
		await LoginPage.logout();
	});
});