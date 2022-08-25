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






describe('Logout', () => {
	it('should logout', async () => {
		await LoginPage.reload();
		await LoginPage.logout();
	});
});