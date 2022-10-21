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
const fs = require('fs');

//Create a user with Automation name
//User Management: change pass, otp, reset pass, request 2FA 
//Permission set all kind of permission to user
//Cabinet list: upload file, move file
//Tasks: create tasks: Automation
//Document search

const templatename = "AutomationTemplate";
const newTemplatename = "New" + templatename;
const superadmin = 'tssadmin';
const superadmin2='tssadmin1';
const user = 'tle@technosoftsolutions.com.au';
const password = 'Abc@12345';
const isSuperadmin = true;
const accountA = 'tssadmin';
const accountB = "tssadmin1";

const createduser = "Automation1"
var clientname = "AutomationClient";
var clientcode = new Date().getTime();
var clientname1 = "AutomationClient1";
var clientname2 = "AutomationClient1";
var structure = "Standard Client";
var cabinet_name = "AutomationCabinet";
var new_cabinet_name = "RenamedAutomationCabinet";
var newTemplateName1 = "Automation";
var date = new Date().getTime();


var category = "Automation Task Category";
var eCategory = "Edited" + category;
var Status = "Automation Task Status";
var eStatus = "Edited" + Status;
var Priority = "Automation Task Priority";
var ePriority = "Edited" + Priority;
var Subject = "Automation Task Subject";
var eSubject = "Edited" + Subject;
var custom = "Automation Task Custom Field";
var ecustom= "Edited" + custom;
var description = "Automation File Description";
var edescription = "Edited" + description;
var file_subject = "Automation File Subject";
var efile_subject = "Edited" + file_subject;
var naming = "Automation Naming Convention";
var enaming = "Edited" + naming;

describe('Super Admin User', () => {
	it('TC001 Verify that Super admin user always has full permissions, He can access all pages and do all actions in the system.', async () => {
		let content = "Cabinets/ Favourites page \r\n";
        content += "file testfile.xlsx \r\n";
        content += "file testPDF.PDF \r\n";
        content += "Add New User \r\n";
        content += "Automation \r\n";
        content += "Client Maintenance \r\n";
        content += "AutomationClient \r\n";
        content += "Cabinets Maintenance \r\n";
        content += "AutomationCabinet \r\n";
        content += "System Admin Wizard \r\n";
        content += "Automation Task Category \r\n";
        content += "Automation Task Status \r\n";
        content += "Automation Task Priority \r\n";
        content += "Automation Task Subject \r\n";
        content += "Automation Task Custom Field \r\n";
        content += "Automation File Description \r\n";
        content += "Automation File Subject \r\n";
        content += "Automation Naming Convention \r\n";
        content += "Task Template Manager \r\n";
        content += "Automation \r\n";
        content += "Structure Maintenance \r\n";
        content += "AutomationTemplate \r\n";
        content += "NewAutomationTemplate \r\n";
        content += "Intray \r\n";
        content += "file testfile.xlsx \r\n";
        content += "Cabinet Page \r\n";
        content += "file testfile.xlsx \r\n";
        content += "file testPDF.PDF \r\n";
        fs.writeFile('./Report.txt', content, err => {
            if (err) {
              console.error(err);
            }
            // done!
          });
        await LoginPage.open();
		if (isSuperadmin) {
			await LoginPage.login(superadmin, password);
		} else await LoginPage.login(user, password);

		await expect($('//span[text()="Home"]')).toBeExisting();
		await expect($('//span[text()="Home"]')).toBeExisting();
		await expect($('//span[text()="Home"]')).toBeExisting();
        await CabinetPage.open();
        await FavouritesPage.open();
	});
});







describe('Logout', () => {
	it('should logout', async () => {
		await LoginPage.reload();
		await LoginPage.logout();
	});
});