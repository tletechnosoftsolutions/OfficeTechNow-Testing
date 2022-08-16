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



describe('System Admin Wizard', () => {
    it('tc001 Verify that user A can access to System Admin Wizard page', async () => {
        let accountUserA = "tssadmin4"; //Should be replaced by other user's account
        let group="AutomationGroup" + new Date().getTime();
        await GroupPermissionMaintenancePage.open();
        await GroupPermissionMaintenancePage.createGroup(group);
        await GroupPermissionMaintenancePage.tickOn(accountUserA);
        await GroupPermissionMaintenancePage.tickOn("System Admin Wizard");
        await GroupPermissionMaintenancePage.save();

        await LoginPage.logout();
        await LoginPage.login(accountUserA, password);

        await SystemAdminWizardPage.open();
        await expect($('button[title="System Admin Wizard"]')).toBeExisting();

        await LoginPage.logout();
        await LoginPage.login(superadmin, password);
        ////await GroupPermissionMaintenancePage.open();
        ////await GroupPermissionMaintenancePage.deleteGroup("Automation Test");
    });
    
    it('tc002 Verify that user A can create a new task category, status, priority, task subject, file description, file subject, naming convention', async () => {
        await SystemAdminWizardPage.open();
        //Create new task category
        await SystemAdminWizardPage.focusOn("Task Categories");
        await SystemAdminWizardPage.clickOnButton("Create");
        await SystemAdminWizardPage.fillForm1("Automation Task Category " + date);
        await expect($('//label[normalize-space()="Automation Task Category ' + date + '"]')).toBeExisting();

        //Create new task status
        await SystemAdminWizardPage.focusOn("Task Statuses");
        await SystemAdminWizardPage.clickOnButton("Create");
        await SystemAdminWizardPage.fillForm2("Automation Task Status " + date);
        await expect($('//div[normalize-space()="Automation Task Status ' + date + '"]')).toBeExisting();

        //Create new task priority
        await SystemAdminWizardPage.focusOn("Task Priorities");
        await SystemAdminWizardPage.clickOnButton("Create");
        await SystemAdminWizardPage.fillForm1("Automation Task Priority " + date);
        await expect($('//label[normalize-space()="Automation Task Priority ' + date + '"]')).toBeExisting();

        //Create new task subject
        await SystemAdminWizardPage.focusOn("Task Subjects");
        await SystemAdminWizardPage.clickOnButton("Create");
        await SystemAdminWizardPage.fillForm2("Automation Task Subject " + date);
        await expect($('//label[normalize-space()="Automation Task Subject ' + date + '"]')).toBeExisting();

        //Create new task custom field
        await SystemAdminWizardPage.focusOn("Task Custom Field");
        await SystemAdminWizardPage.clickOnButton("Create");
        await SystemAdminWizardPage.fillForm2("Automation Task Custom Field " + date);
        await expect($('//label[normalize-space()="Automation Task Custom Field ' + date + '"]')).toBeExisting();

        //Create new file description
        await SystemAdminWizardPage.focusOn("File Descriptions");
        await SystemAdminWizardPage.clickOnButton("Create");
        await SystemAdminWizardPage.fillForm2("Automation File Description " + date);
        await expect($('//label[normalize-space()="Automation File Description ' + date + '"]')).toBeExisting();

        //Create new file subject
        await SystemAdminWizardPage.focusOn("File Subjects");
        await SystemAdminWizardPage.clickOnButton("Create");
        await SystemAdminWizardPage.fillForm2("Automation File Subject " + date);
        await expect($('//label[normalize-space()="Automation File Subject ' + date + '"]')).toBeExisting();

        //Create new naming convention
        await SystemAdminWizardPage.focusOn("Naming Conventions");
        await SystemAdminWizardPage.clickOnButton("Create");
        await SystemAdminWizardPage.fillForm3("Automation Naming Convention " + date);
        await expect($('//div[normalize-space()="Automation Naming Convention ' + date + '"]')).toBeExisting();
    });

    it('tc003 Verify that user A can select any of the available category, status, priority, task subject, file description, file subject, naming convention to edit', async () => {
        //Edit task category
        await SystemAdminWizardPage.focusOn("Task Categories");
        await SystemAdminWizardPage.focusOn("Automation Task Category " + date);
        await SystemAdminWizardPage.clickOnButton("Edit");
        await SystemAdminWizardPage.fillForm1("Edited Automation Task Category " + date);
        await expect($('//label[normalize-space()="Edited Automation Task Category ' + date + '"]')).toBeExisting();

        //Edit task status
        await SystemAdminWizardPage.focusOn("Task Statuses");
        await SystemAdminWizardPage.focusOn("Automation Task Status " + date);
        await SystemAdminWizardPage.clickOnButton("Edit");
        await SystemAdminWizardPage.fillForm2("Edited Automation Task Status " + date);
        await expect($('//div[normalize-space()="Edited Automation Task Status ' + date + '"]')).toBeExisting();

        //Edit task priority
        await SystemAdminWizardPage.focusOn("Task Priorities");
        await SystemAdminWizardPage.focusOn("Automation Task Priority " + date);
        await SystemAdminWizardPage.clickOnButton("Edit");
        await SystemAdminWizardPage.fillForm1("Edited Automation Task Priority " + date);
        await expect($('//label[normalize-space()="Edited Automation Task Priority ' + date + '"]')).toBeExisting();

        //Edit task subject
        await SystemAdminWizardPage.focusOn("Task Subjects");
        await SystemAdminWizardPage.focusOn("Automation Task Subject " + date);
        await SystemAdminWizardPage.clickOnButton("Edit");
        await SystemAdminWizardPage.fillForm2("Edited Automation Task Subject " + date);
        await expect($('//label[normalize-space()="Edited Automation Task Subject ' + date + '"]')).toBeExisting();

        //Edit task custom field
        await SystemAdminWizardPage.focusOn("Task Custom Field");
        await SystemAdminWizardPage.focusOn("Automation Task Custom Field " + date);
        await SystemAdminWizardPage.clickOnButton("Edit");
        await SystemAdminWizardPage.fillForm2("Edited Automation Task Custom Field " + date);
        await expect($('//label[normalize-space()="Edited Automation Task Custom Field ' + date + '"]')).toBeExisting();

        //Edit file description
        await SystemAdminWizardPage.focusOn("File Descriptions");
        await SystemAdminWizardPage.focusOn("Automation File Description " + date);
        await SystemAdminWizardPage.clickOnButton("Edit");
        await SystemAdminWizardPage.fillForm2("Edited Automation File Description " + date);
        await expect($('//label[normalize-space()="Edited Automation File Description ' + date + '"]')).toBeExisting();

        //Edit file subject
        await SystemAdminWizardPage.focusOn("File Subjects");
        await SystemAdminWizardPage.focusOn("Automation File Subject " + date);
        await SystemAdminWizardPage.clickOnButton("Edit");
        await SystemAdminWizardPage.fillForm2("Edited Automation File Subject " + date);
        await expect($('//label[normalize-space()="Edited Automation File Subject ' + date + '"]')).toBeExisting();

        //Edit naming convention
        await SystemAdminWizardPage.focusOn("Naming Conventions");
        await SystemAdminWizardPage.focusOn("Automation Naming Convention " + date);
        await SystemAdminWizardPage.clickOnButton("Edit");
        await SystemAdminWizardPage.fillForm3("Edited Automation Naming Convention " + date);
        await expect($('//div[normalize-space()="Edited Automation Naming Convention ' + date + '"]')).toBeExisting();
    });

    it('tc005 Verify that user A can select any of the available category, status, priority, task subject, file description, file subject, naming convention to move up/down', async () => {
        //Move to top task category
        await SystemAdminWizardPage.focusOn("Task Categories");
        await SystemAdminWizardPage.focusOn("Edited Automation Task Category " + date);
        await SystemAdminWizardPage.moveToTop();
        await expect($('((//app-box-template)[2]//label)[1]')).toHaveTextContaining("Edited Automation Task Category " + date);

        //Move to bottom task status
        await SystemAdminWizardPage.focusOn("Task Statuses");
        await SystemAdminWizardPage.focusOn("Edited Automation Task Status " + date);
        await SystemAdminWizardPage.moveToBottom();
        await expect($('((//app-box-template)[2]//label)[last()]')).toHaveTextContaining("Edited Automation Task Status " + date);

        //Move to top task priority
        await SystemAdminWizardPage.focusOn("Task Priorities");
        await SystemAdminWizardPage.focusOn("Edited Automation Task Priority " + date);
        await SystemAdminWizardPage.moveToTop();
        await expect($('((//app-box-template)[2]//label)[1]')).toHaveTextContaining("Edited Automation Task Priority " + date);

        //Move to bottom task subject
        await SystemAdminWizardPage.focusOn("Task Subjects");
        await SystemAdminWizardPage.focusOn("Edited Automation Task Subject " + date);
        await SystemAdminWizardPage.moveToBottom();
        await expect($('((//app-box-template)[2]//label)[last()]')).toHaveTextContaining("Edited Automation Task Subject " + date);

        ////[Issue] Move to bottom file description 
        //await SystemAdminWizardPage.focusOn("File Descriptions");
        //await SystemAdminWizardPage.focusOn("Edited Automation File Description " + date);
        //await SystemAdminWizardPage.moveToBottom();
        //await expect($('((//app-box-template)[2]//label)[last()]')).toHaveTextContaining("Edited Automation File Description " + date);

        ////[Issue] Move to top subject 
        //await SystemAdminWizardPage.focusOn("File Subjects");
        //await SystemAdminWizardPage.focusOn("Edited Automation File Subject " + date);
        //await SystemAdminWizardPage.moveToTop();
        //await expect($('((//app-box-template)[2]//label)[1]')).toHaveTextContaining("Edited Automation File Subject " + date);

        //Move to top naming convention
        await SystemAdminWizardPage.focusOn("Naming Conventions");
        await SystemAdminWizardPage.focusOn("Edited Automation Naming Convention " + date);
        await SystemAdminWizardPage.moveToTop();
        await expect($('((//app-box-template)[2]//label)[1]')).toHaveTextContaining("Edited Automation Naming Convention " + date);
    });

    it('tc006 Verify that user A can select Task Categories, Task Statuses , Task Priorities , Task Subjects , File Descriptions , File Subjects, Naming Conventions to click on Auto Sort button, It should sort by alphabetically', async () => {
        await SystemAdminWizardPage.open();
        //Sort task categories
        await SystemAdminWizardPage.focusOn("Task Categories");
        await expect(await SystemAdminWizardPage.compareLists()).toEqual(true);

        //Sort task statuses
        await SystemAdminWizardPage.focusOn("Task Statuses");
        await expect(await SystemAdminWizardPage.compareLists()).toEqual(true);

        //Sort task priorities
        await SystemAdminWizardPage.focusOn("Task Priorities");
        await expect(await SystemAdminWizardPage.compareLists()).toEqual(true);

        //Sort task subjects
        await SystemAdminWizardPage.focusOn("Task Subjects");
        await expect(await SystemAdminWizardPage.compareLists()).toEqual(true);

        //Sort file descriptions
        await SystemAdminWizardPage.focusOn("File Descriptions");
        await expect(await SystemAdminWizardPage.compareLists()).toEqual(true);

        //Sort file subjects
        await SystemAdminWizardPage.focusOn("File Subjects");
        await expect(await SystemAdminWizardPage.compareLists()).toEqual(true);

        //Sort naming conventions
        await SystemAdminWizardPage.focusOn("Naming Conventions");
        await expect(await SystemAdminWizardPage.compareLists()).toEqual(true);
    });

    it('tc004 Verify that user A can select any of the available category, status, priority, task subject, file description, file subject, naming convention to delete', async () => {
        //Delete task category
        await SystemAdminWizardPage.focusOn("Task Categories");
        await SystemAdminWizardPage.focusOn("Edited Automation Task Category " + date);
        await SystemAdminWizardPage.clickOnButton("Delete");
        await expect($('//label[normalize-space()="Edited Automation Task Category ' + date + '"]')).not.toBeExisting();

        //Delete task status
        await SystemAdminWizardPage.focusOn("Task Statuses");
        await SystemAdminWizardPage.focusOn("Edited Automation Task Status " + date);
        await SystemAdminWizardPage.clickOnButton("Delete");
        await expect($('//div[normalize-space()="Edited Automation Task Status ' + date + '"]')).not.toBeExisting();

        //Delete task priority
        await SystemAdminWizardPage.focusOn("Task Priorities");
        await SystemAdminWizardPage.focusOn("Edited Automation Task Priority " + date);
        await SystemAdminWizardPage.clickOnButton("Delete");
        await expect($('//label[normalize-space()="Edited Automation Task Priority ' + date + '"]')).not.toBeExisting();

        //Delete task subject
        await SystemAdminWizardPage.focusOn("Task Subjects");
        await SystemAdminWizardPage.focusOn("Edited Automation Task Subject " + date);
        await SystemAdminWizardPage.clickOnButton("Delete");
        await expect($('//label[normalize-space()="Edited Automation Task Subject ' + date + '"]')).not.toBeExisting();

        //Delete task custom field
        await SystemAdminWizardPage.focusOn("Task Custom Field");
        await SystemAdminWizardPage.focusOn("Edited Automation Task Custom Field " + date);
        await SystemAdminWizardPage.clickOnButton("Delete");
        await expect($('//label[normalize-space()="Edited Automation Task Custom Field ' + date + '"]')).not.toBeExisting();

        //Delete file description
        await SystemAdminWizardPage.focusOn("File Descriptions");
        await SystemAdminWizardPage.focusOn("Edited Automation File Description " + date);
        await SystemAdminWizardPage.clickOnButton("Delete");
        await expect($('//label[normalize-space()="Edited Automation File Description ' + date + '"]')).not.toBeExisting();

        //Delete file subject
        await SystemAdminWizardPage.focusOn("File Subjects");
        await SystemAdminWizardPage.focusOn("Edited Automation File Subject " + date);
        await SystemAdminWizardPage.clickOnButton("Delete");
        await expect($('//label[normalize-space()="Edited Automation File Subject ' + date + '"]')).not.toBeExisting();

        //Delete naming convention
        await SystemAdminWizardPage.focusOn("Naming Conventions");
        await SystemAdminWizardPage.focusOn("Edited Automation Naming Convention " + date);
        await SystemAdminWizardPage.clickOnButton("Delete");
        await expect($('//div[normalize-space()="Edited Automation Naming Convention ' + date + '"]')).not.toBeExisting();
    });
});


describe('HomePage Maintenance', () => {

	it('tc001 Veify that User can access to Homepage Maintenance feature in Tools > Home Page maintenance', async () => {
		//HomePageMaintenancePage
		await HomePageMaintenancePage.open();
		await expect($('//span[text()="Show Tasks on Homepage"]')).toBeExisting();
    });

    it('tc002 Verify that User can modify the homepage content in the Homepage Maintenance feature, Any changes that user already saves in Homepage Maintenance will be reflected in the Homepage', async () => {
		//HomePageMaintenancePage
        await HomePageMaintenancePage.open();
        await HomePageMaintenancePage.modify(date);
        await $('//span[text()="Home"]').click();
        await expect($('//p[contains(text(),"'+date+'")]')).toBeExisting();
    });

    
	it('tc003 Verify that User can check/uncheck the ‘Show My Task on startup’ checkbox to hide/show My task list in homepage (default: ‘Show My Task on startup’ checkbox checked)', async () => {
		//HomePageMaintenancePage
		await HomePageMaintenancePage.open();
        await expect($('//span[text()="Show Tasks on Homepage"]')).toBeExisting();
        await $('//span[text()="Show Tasks on Homepage"]').click();
    });

    it('tc004 Verify after user logins and navigated to Hompage, the user sees the task list in the Hompage contains the task assigned to him/her', async () => {
		//HomePageMaintenancePage
		await HomePageMaintenancePage.open();
        await expect($('//span[text()="Show Tasks on Homepage"]')).toBeExisting();
        await $('//span[text()="Show Tasks on Homepage"]').click();
        await $('//span[text()="Home"]').click();
        await expect($('//div[contains(text(),"Start Date")]')).toBeExisting();
    });

});


describe('CAC/IAC', () => {
    let groupName = "Automation" + new Date().getTime();
    let accountA = "tssadmin4";

    it('tc004 Verify that user can see Copy, New Email, Send to task and do it (except Copy file) ', async () => {
        //Pre-condition: create new group with permission = Read
        await CabinetAccessControlPage.open();
        await CabinetAccessControlPage.createNewGroup(groupName);
        await CabinetAccessControlPage.focusOn(groupName);
        await CabinetAccessControlPage.checkCabinet(accountA); //tick on user to grant permission
        await CabinetAccessControlPage.checkCabinet("Read"); //tick on Read permission
        await CabinetAccessControlPage.checkCabinet("Clients"); // tick on Cabinet
        await CabinetAccessControlPage.save();
        await LoginPage.logout();
        await LoginPage.login(accountA, password);

        await CabinetPage.open();
        await CabinetPage.expandCabinet("Clients");
        await CabinetPage.expandCabinet("A");
        await CabinetPage.expandCabinet("Automation");
        await CabinetPage.expandCabinet("2021");
        await CabinetPage.expandCabinet("Emails");
        await CabinetPage.tickOnFile("Business"); //tick on the 1st file
        //await expect(await $('[mattooltip="Copy To"]').isClickable()).toEqual(false); //[FAILED] verify cannot copy (non-admin account)
        await expect(await $('[mattooltip="New Email"]').isClickable()).toEqual(true); //verify can add New Email
        await expect(await $('[mattooltip="Send To Task"]').isClickable()).toEqual(true); //verify can Send to task

        //Post-condition: login back to main account
        await LoginPage.logout();
        await LoginPage.login(superadmin, password);
    });

    it('tc005 Verify that user can see/ copy file into Cabinet list in Home/ Favourite of the Folder Browser when user belongs to group that has Write permission checked CAC page', async () => {
        //Pre-condition: set automation group with permission = Write
        await CabinetAccessControlPage.open();
        await CabinetAccessControlPage.focusOn(groupName);
        await CabinetAccessControlPage.checkCabinet("Write");
        await CabinetAccessControlPage.save();
        await LoginPage.logout();
        await LoginPage.login(accountA, password);

        //Check file can be copied from Cabinet
        await CabinetPage.open();
        await CabinetPage.expandCabinet("Clients");
        await CabinetPage.expandCabinet("A");
        await CabinetPage.expandCabinet("Automation");
        await CabinetPage.expandCabinet("2021");
        await CabinetPage.focusOn("Emails");
        await CabinetPage.tickOnFile("Business"); //tick on the 1st file
        await CabinetPage.copyTo(); //Copy to folder: Cabinet/Automation/2022/Emails
        await CabinetPage.collapCabinet("2021");
        await CabinetPage.expandCabinet("2022");
        await CabinetPage.expandCabinet("Emails");
        //verify file successfully copied
        await expect($('(//span[contains(.,"Business")]/ancestor::td)[1]')).toBeExisting();

        //Check file can be copied from Favorite
        await FavoritePage.open();
        await FavoritePage.expandFavourites("A New Client Aug 2016-1152"); //should be change to Automation folder
        await FavoritePage.expandFavourites("2021");
        await FavoritePage.focusOn("Business");
        await FavoritePage.tickOnFile("Endorsement");
        await FavoritePage.copyTo();
        await FavoritePage.collapFavourites("2021");
        await FavoritePage.expandFavourites("2022");
        await FavoritePage.focusOn("Business");
        //verify file successfully copied
        await expect($('(//span[contains(.,"Endorsement")]/ancestor::td)[1]')).toBeExisting();

        //Post-condition: login back to main account
        await LoginPage.logout();
        await LoginPage.login(superadmin, password);
    });

    it('tc006 Verify that user can see/ move file into Cabinet list in Home/ Favourite/ Intray of the Folder Browser when user belongs to group that has Delete permission checked.', async () => {
        //Pre-condition: set automation group with permission = Delete, exist copies of documents in TC005
        await CabinetAccessControlPage.open();
        await CabinetAccessControlPage.focusOn(groupName);
        await CabinetAccessControlPage.checkCabinet("Delete"); //tick on Read permission
        await CabinetAccessControlPage.save();
        await LoginPage.logout();
        await LoginPage.login(accountA, password);

        //Check file can be deleted in Cabinet
        await CabinetPage.open();
        await CabinetPage.expandCabinet("Clients");
        await CabinetPage.expandCabinet("A");
        await CabinetPage.expandCabinet("Automation");
        await CabinetPage.expandCabinet("2022");
        await CabinetPage.focusOn("Emails");
        await CabinetPage.tickOnFile("Business"); //tick on the 1st file
        await CabinetPage.deleteFile();
        await expect($('(//span[contains(.,"Business")]/ancestor::td)[1]')).not.toBeExisting();

        //Check file can be deleted in Favorite
        await FavoritePage.open();
        await FavoritePage.expandFavourites("A New Client Aug 2016-1152"); //should be change to Automation folder
        await FavoritePage.expandFavourites("2022");
        await FavoritePage.focusOn("Business");
        await FavoritePage.tickOnFile("Endorsement");
        await FavoritePage.deleteFile();
        await expect($('(//span[contains(.,"Endorsement")]/ancestor::td)[1]')).not.toBeExisting();
    });
});

describe('Logout', () => {
	it('should logout', async () => {
		await LoginPage.reload();
		await LoginPage.logout();
	});
});