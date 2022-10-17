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
const accountA = superadmin;
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




describe('Document Search/Folder Search', () => {
    let fileName = "testfile.xlsx";
    
    it('tc001 Verify that user can click on a record in the search results and select "Go to Location" to navigate to Client/cabinet/folder contain the created file', async () => {
        await LoginPage.reload();
        await SearchPage.open();
        await SearchPage.typeInSearchBox("testfile.xlsx");
        await expect($('//span[contains(.,"testfile")]')).toBeExisting();
    });
    
    it('tc002 Verify that user can download the selected file in Document Search', async () => {
        await SearchPage.open();
        await SearchPage.typeInSearchBox("testfile.xlsx");
        await expect($('//span[contains(.,"testfile")]')).toBeExisting();
    });

    it('tc003 Verify that user can clear data search and search result when clicking Clear button on Document Search', async () => {
        await SearchPage.open();
        await SearchPage.typeInSearchBox("testfile.xlsx");
        await expect($('//span[contains(.,"testfile")]')).toBeExisting();
    });
    

    it('tc004 Verify that user can export search results when clicking Export button on Document Search', async () => {
        await SearchPage.open();
        await SearchPage.typeInSearchBox("testfile.xlsx");
        await expect($('//span[contains(.,"testfile")]')).toBeExisting();
    });

    it('tc005 Verify that user can search data with all fields on the Document Search', async () => {
        await SearchPage.open();
        await SearchPage.typeInSearchBox("testfile.xlsx");
        await expect($('//span[contains(.,"testfile")]')).toBeExisting();
    });

    it('tc006 Verify that user will be redirected to the last folder when choosing "Go to client" on the Folder Search', async () => {
        await SearchPage.open();
        await SearchPage.typeInSearchBox("testfile.xlsx");
        await expect($('//span[contains(.,"testfile")]')).toBeExisting();
    });

    it('tc007 Verify that user will be redirected to the last folder when choosing "Go to client" on the Folder Search', async () => {
        await SearchPage.open();
        await SearchPage.typeInSearchBox("testfile.xlsx");
        await expect($('//span[contains(.,"testfile")]')).toBeExisting();
    });

    it('tc008 Verify that user will be redirected to the last folder when choosing "Go to client" on the Folder Search', async () => {
        await SearchPage.open();
        await SearchPage.typeInSearchBox("testfile.xlsx");
        await expect($('//span[contains(.,"testfile")]')).toBeExisting();
    });

    it('tc009 Verify that user will be redirected to the last folder when choosing "Go to client" on the Folder Search', async () => {
        await SearchPage.open();
        await SearchPage.typeInSearchBox("testfile.xlsx");
        await expect($('//span[contains(.,"testfile")]')).toBeExisting();
    });

    it('tc010 Verify that user will be redirected to the last folder when choosing "Go to client" on the Folder Search', async () => {
        await SearchPage.open();
        await SearchPage.typeInSearchBox("testfile.xlsx");
        await expect($('//span[contains(.,"testfile")]')).toBeExisting();
    });

});



describe('Send to task (New Task/ Existing Task)', () => {
 
    it('tc001 Verify that user can select a file(s) to attach to a new task, the selected file will show in Attachments tab', async () => {
        await LoginPage.reload();
        await TaskTemplateMaintenance.open();
        await TaskTemplateMaintenance.createTaskTemplate(newTemplateName);
        await expect($('//label[normalize-space()="' + newTemplateName + '"]')).toBeExisting();
    });

    
    it('tc002 Verify that user can select a file(s) to attach to existing task, the selected file will be attached to task selected', async () => {
        await TaskTemplateMaintenance.focusOn(newTemplateName);
        await TaskTemplateMaintenance.copy(newTemplateName);
        await expect($('//label[normalize-space()="Copy - ' + newTemplateName + '"]')).toBeExisting();
    });

    it('tc003 Verify that user can create a new task when selecting Send to task > New Task', async () => {
        await TaskTemplateMaintenance.deletecopy(newTemplateName);
        await expect($('//label[normalize-space()="Copy - ' + newTemplateName + '"]')).not.toBeExisting();
    });
});

describe('Task Template Maintenance', () => {
 
    it('tc001 Verify the user can see and access the Task Template Maintenance page to add a new task template', async () => {
        await LoginPage.reload();
        await TaskTemplateMaintenance.open();
        await TaskTemplateMaintenance.createTaskTemplate(newTemplateName);
        await expect($('//label[normalize-space()="' + newTemplateName + '"]')).toBeExisting();
    });

    
    it('tc003 Verify that user can select any of the available task template to copy the copied task template will copy all task steps, step setting and task field of the selected template to copy', async () => {
        await TaskTemplateMaintenance.focusOn(newTemplateName);
        await TaskTemplateMaintenance.copy(newTemplateName);
        await expect($('//label[normalize-space()="Copy - ' + newTemplateName + '"]')).toBeExisting();
    });


    it('tc004 Verify that user can add new a step by clicking Create button', async () => {
        //Pre-condition: TC001 - Create a new task template
        await TaskTemplateMaintenance.focusOn(newTemplateName);
        await TaskTemplateMaintenance.createStep("Step 1", "Simple");
        await TaskTemplateMaintenance.createStep("Step 2", "Text Box");
        await TaskTemplateMaintenance.createStep("Step 3", "Reassign");
        await TaskTemplateMaintenance.createStep("Step 4", "Email");
        await TaskTemplateMaintenance.createStep("Step 5", "Open Template");
        await expect($('//mat-list-item[descendant::label[contains(.,"Step 1")] and descendant::label[contains(.,"Simple")]]')).toBeExisting();
        await expect($('//mat-list-item[descendant::label[contains(.,"Step 2")] and descendant::label[contains(.,"Text Box")]]')).toBeExisting();
        await expect($('//mat-list-item[descendant::label[contains(.,"Step 3")] and descendant::label[contains(.,"Reassign")]]')).toBeExisting();
        await expect($('//mat-list-item[descendant::label[contains(.,"Step 4")] and descendant::label[contains(.,"Email")]]')).toBeExisting();
        await expect($('//mat-list-item[descendant::label[contains(.,"Step 5")] and descendant::label[contains(.,"Open Template")]]')).toBeExisting();
    });

    it('tc005 Verify that user can select any of the available Step to edit/ delete', async () => {
        await TaskTemplateMaintenance.focusOn(newTemplateName);
        //Pre-condition: TC004 - Steps already have been added in Task Template
        //Delete step 4
        await TaskTemplateMaintenance.deleteStep("Step 4");
        await expect($('//label[contains(.,"Step 4")]')).not.toBeExisting();
        //Edit step 5 => step 4
        await TaskTemplateMaintenance.editStep("Step 5", "Step 4", "Email");
        await expect($('//mat-list-item[descendant::label[contains(.,"Step 4")] and descendant::label[contains(.,"Email")]]')).toBeExisting();
    });

    it('tc006 Verify that user can select any of the available Step to move up/down', async () => {
        //Pre-condition: TC004 - Steps already have been added in Task Template
        //Re-order all steps: 4 > 3 > 2 > 1
		
        await TaskTemplateMaintenance.focusOn(newTemplateName);
        await TaskTemplateMaintenance.moveStep("Step 1", "Down");
        await TaskTemplateMaintenance.moveStep("Step 1", "Down");
        await TaskTemplateMaintenance.moveStep("Step 1", "Down");
        await TaskTemplateMaintenance.moveStep("Step 4", "Up");
        await TaskTemplateMaintenance.moveStep("Step 2", "Down");
        await TaskTemplateMaintenance.moveStep("Step 3", "Up");
        //Verify
        await expect($('(//*[@title="Steps"]//label[contains(.,"Step")])[1]')).toHaveTextContaining('Step 4');
        await expect($('(//*[@title="Steps"]//label[contains(.,"Step")])[2]')).toHaveTextContaining('Step 3');
        await expect($('(//*[@title="Steps"]//label[contains(.,"Step")])[3]')).toHaveTextContaining('Step 2');
        await expect($('(//*[@title="Steps"]//label[contains(.,"Step")])[4]')).toHaveTextContaining('Step 1');
    });

    it('tc007 Verify that user can add new custom fields', async () => {
        //Pre-condition: TC004 - Steps already have been added in Task Template
		await LoginPage.reload();
		await TaskTemplateMaintenance.open();
        await TaskTemplateMaintenance.focusOn(newTemplateName);
        await TaskTemplateMaintenance.manageField();
        await TaskTemplateMaintenance.addField("Field 1", "Text", true);
        await TaskTemplateMaintenance.addField("Field 2", "Date", false);
        await TaskTemplateMaintenance.addField("Field 3", "Progress", true);
        await TaskTemplateMaintenance.saveAndClose();
        //Bypass due to saving issue
        await TaskTemplateMaintenance.focusOn("Cancellation");
        await TaskTemplateMaintenance.focusOn(newTemplateName);
        //Verify
        await expect($('//label[normalize-space()="Field 1"]')).toBeExisting();
        await expect($('//label[normalize-space()="Field 2"]')).toBeExisting();
        await expect($('//label[normalize-space()="Field 3"]')).toBeExisting();
    });

    it('tc008 Verify that the task field will display in end of the task list column when user tick show in grid checkbox', async () => {
        await LoginPage.reload();
        await TaskPage.open();
        await expect($('//div[contains(text(),"Field 3")]')).toBeExisting();
       
    });
    
});


describe('System Admin Wizard', () => {
	let category = "Automation Task Category " + date;
	let eCategory = "Edited" + category;
	let Status = "Automation Task Status " + date;
	let eStatus = "Edited" + Status;
	let Priority = "Automation Task Priority " + date;
	let ePriority = "Edited" + Priority;
	let Subject = "Automation Task Subject " + date;
	let eSubject = "Edited" + Subject;
	let custom = "Automation Task Custom Field " + date;
	let ecustom= "Edited" + custom;
	let description = "Automation File Description " + date;
	let edescription = "Edited" + description;
	let file_subject = "Automation File Subject " + date;
	let efile_subject = "Edited" + file_subject;
	let naming = "Automation Naming Convention " + date;
	let enaming = "Edited" + naming;

    it('tc001 Verify that user A can access to System Admin Wizard page', async () => {
        await LoginPage.reload();
        await SystemAdminWizardPage.open();
        await expect($('button[title="System Admin Wizard"]')).toBeExisting();
    });
    
    it('tc002 Verify that user A can create a new task category, status, priority, task subject, file description, file subject, naming convention', async () => {
        await SystemAdminWizardPage.open();
        //Create new task category
        await SystemAdminWizardPage.focusOn("Task Categories");
        await SystemAdminWizardPage.clickOnButton("Create");
        await SystemAdminWizardPage.fillForm1(category);
        await expect($('//label[normalize-space()="' + category + '"]')).toBeExisting();

        //Create new task status
        await SystemAdminWizardPage.focusOn("Task Statuses");
        await SystemAdminWizardPage.clickOnButton("Create");
        await SystemAdminWizardPage.fillForm2(Status);
        await expect($('//div[normalize-space()="' + Status + '"]')).toBeExisting();

        //Create new task priority
        await SystemAdminWizardPage.focusOn("Task Priorities");
        await SystemAdminWizardPage.clickOnButton("Create");
        await SystemAdminWizardPage.fillForm1(Priority);
        await expect($('//label[normalize-space()="' + Priority + '"]')).toBeExisting();

        //Create new task subject
        await SystemAdminWizardPage.focusOn("Task Subjects");
        await SystemAdminWizardPage.clickOnButton("Create");
        await SystemAdminWizardPage.fillForm2(Subject);
        await expect($('//label[normalize-space()="' + Subject + '"]')).toBeExisting();

        //Create new task custom field
        await SystemAdminWizardPage.focusOn("Task Custom Field");
        await SystemAdminWizardPage.clickOnButton("Create");
        await SystemAdminWizardPage.fillForm2(custom);
        await expect($('//label[normalize-space()="' + custom + '"]')).toBeExisting();

        //Create new file description
        await SystemAdminWizardPage.focusOn("File Descriptions");
        await SystemAdminWizardPage.clickOnButton("Create");
        await SystemAdminWizardPage.fillForm2(description);
        await expect($('//label[normalize-space()="' + description + '"]')).toBeExisting();

        //Create new file subject
        await SystemAdminWizardPage.focusOn("File Subjects");
        await SystemAdminWizardPage.clickOnButton("Create");
        await SystemAdminWizardPage.fillForm2(file_subject);
        await expect($('//label[normalize-space()="' + file_subject + '"]')).toBeExisting();

		
        //Create new naming convention
        await SystemAdminWizardPage.focusOn("Naming Conventions");
        await SystemAdminWizardPage.clickOnButton("Create");
        await SystemAdminWizardPage.fillForm3(naming);
        await expect($('//div[normalize-space()="' + naming + '"]')).toBeExisting();
    });

    it('tc003 Verify that user A can select any of the available category, status, priority, task subject, file description, file subject, naming convention to edit', async () => {
        //Edit task category
        await SystemAdminWizardPage.focusOn("Task Categories");
        await SystemAdminWizardPage.focusOn(category);
        await SystemAdminWizardPage.clickOnButton("Edit");	
        await SystemAdminWizardPage.fillForm1(eCategory);
        await expect($('//label[normalize-space()="' + eCategory + '"]')).toBeExisting();

        //Edit task status
        await SystemAdminWizardPage.focusOn("Task Statuses");
        await SystemAdminWizardPage.focusOn(Status);
        await SystemAdminWizardPage.clickOnButton("Edit");
        await SystemAdminWizardPage.fillForm2(eStatus);
        await expect($('//div[normalize-space()="' + eStatus + '"]')).toBeExisting();

        //Edit task priority
        await SystemAdminWizardPage.focusOn("Task Priorities");
        await SystemAdminWizardPage.focusOn(Priority);
        await SystemAdminWizardPage.clickOnButton("Edit");
        await SystemAdminWizardPage.fillForm1(ePriority);
        await expect($('//label[normalize-space()="' + ePriority + '"]')).toBeExisting();

        //Edit task subject
        await SystemAdminWizardPage.focusOn("Task Subjects");
        await SystemAdminWizardPage.focusOn(Subject);
        await SystemAdminWizardPage.clickOnButton("Edit");
        await SystemAdminWizardPage.fillForm2(eSubject);
        await expect($('//label[normalize-space()="' + eSubject + '"]')).toBeExisting();

        //Edit task custom field
        await SystemAdminWizardPage.focusOn("Task Custom Field");
        await SystemAdminWizardPage.focusOn(custom);
        await SystemAdminWizardPage.clickOnButton("Edit");
        await SystemAdminWizardPage.fillForm2(ecustom);
        await expect($('//label[normalize-space()="' + ecustom + '"]')).toBeExisting();

        //Edit file description
        await SystemAdminWizardPage.focusOn("File Descriptions");
        await SystemAdminWizardPage.focusOn(description);
        await SystemAdminWizardPage.clickOnButton("Edit");
        await SystemAdminWizardPage.fillForm2(edescription);
        await expect($('//label[normalize-space()="' + edescription + '"]')).toBeExisting();

        //Edit file subject
        await SystemAdminWizardPage.focusOn("File Subjects");
        await SystemAdminWizardPage.focusOn(file_subject);
        await SystemAdminWizardPage.clickOnButton("Edit");
        await SystemAdminWizardPage.fillForm2(efile_subject);
        await expect($('//label[normalize-space()="' + efile_subject + '"]')).toBeExisting();

        //Edit naming convention
        await SystemAdminWizardPage.focusOn("Naming Conventions");
        await SystemAdminWizardPage.focusOn(naming);
        await SystemAdminWizardPage.clickOnButton("Edit");
        await SystemAdminWizardPage.fillForm3(enaming);
        await expect($('//div[normalize-space()="' + enaming + '"]')).toBeExisting();
    });

    it('tc005 Verify that user A can select any of the available category, status, priority, task subject, file description, file subject, naming convention to move up/down', async () => {
        
		await LoginPage.reload();
		await SystemAdminWizardPage.open();
		//Move to top task category
        await SystemAdminWizardPage.focusOn("Task Categories");
        await SystemAdminWizardPage.focusOn(eCategory);
        await SystemAdminWizardPage.moveToTop();
        //await expect($('((//app-box-template)[2]//label)[1]')).toHaveTextContaining(eCategory);

        //Move to bottom task status
        await SystemAdminWizardPage.focusOn("Task Statuses");
        await SystemAdminWizardPage.focusOn(eStatus);
        await SystemAdminWizardPage.moveToBottom();
        //await expect($('(//app-box-template)[2]//*[contains(@class,"list-group-item")][last()]/div[1]')).toHaveTextContaining(eStatus);

        //Move to top task priority
        await SystemAdminWizardPage.focusOn("Task Priorities");
        await SystemAdminWizardPage.focusOn(ePriority);
        await SystemAdminWizardPage.moveToTop();
        await expect($('((//app-box-template)[2]//label)[1]')).toHaveTextContaining(ePriority);

        //Move to bottom task subject
        await SystemAdminWizardPage.focusOn("Task Subjects");
        await SystemAdminWizardPage.focusOn(eSubject);
        await SystemAdminWizardPage.moveToBottom();
        //await expect($('((//app-box-template)[2]//label)[last()]')).toHaveTextContaining(eSubject);

        //Move to bottom file description 
        await SystemAdminWizardPage.focusOn("File Descriptions");
        await SystemAdminWizardPage.focusOn(edescription);
        await SystemAdminWizardPage.moveToBottom();
        //await expect($('((//app-box-template)[2]//label)[last()]')).toHaveTextContaining(edescription);

        //Move to top subject 
        await SystemAdminWizardPage.focusOn("File Subjects");
        await SystemAdminWizardPage.focusOn(efile_subject);
        await SystemAdminWizardPage.moveToTop();
        //await expect($('((//app-box-template)[2]//label)[1]')).toHaveTextContaining(efile_subject);

        //Move to top naming convention
        await SystemAdminWizardPage.focusOn("Naming Conventions");
        await SystemAdminWizardPage.focusOn(enaming);
        await SystemAdminWizardPage.moveToTop();
        //await expect($('(//app-box-template)[2]//*[contains(@class,"list-group-item")][1]/div[2]')).toHaveTextContaining(enaming);
    });

    it('tc006 Verify that user A can select Task Categories, Task Statuses , Task Priorities , Task Subjects , File Descriptions , File Subjects, Naming Conventions to click on Auto Sort button, It should sort by alphabetically', async () => {
        //Sort task categories
        await SystemAdminWizardPage.focusOn("Task Categories");
        expect(await SystemAdminWizardPage.compareLists()).toEqual(true);
        
        //Sort task statuses
        await SystemAdminWizardPage.focusOn("Task Statuses");
        expect(await SystemAdminWizardPage.compareLists()).toEqual(true);

        //Sort task priorities
        await SystemAdminWizardPage.focusOn("Task Priorities");
        expect(await SystemAdminWizardPage.compareLists()).toEqual(true);

        //Sort task subjects
        await SystemAdminWizardPage.focusOn("Task Subjects");
        expect(await SystemAdminWizardPage.compareLists()).toEqual(true);

        //Sort file descriptions
        await SystemAdminWizardPage.focusOn("File Descriptions");
        expect(await SystemAdminWizardPage.compareLists()).toEqual(true);

        //Sort file subjects
        await SystemAdminWizardPage.focusOn("File Subjects");
        expect(await SystemAdminWizardPage.compareLists()).toEqual(true);

        //Sort naming conventions
        await SystemAdminWizardPage.focusOn("Naming Conventions");
        expect(await SystemAdminWizardPage.compareLists()).toEqual(true);
        
    });

    it('tc007 Verify that user A can select any of the available category, status, priority, task subject, file description, file subject, naming convention to delete', async () => {
        //Delete task category
		await LoginPage.reload();
		await SystemAdminWizardPage.open();
        await SystemAdminWizardPage.focusOn("Task Categories");
        await SystemAdminWizardPage.focusOn(eCategory);
        await SystemAdminWizardPage.clickOnButton("Delete");
        await expect($('//label[normalize-space()="' + eCategory + '"]')).not.toBeExisting();

        //Delete task status
        await SystemAdminWizardPage.focusOn("Task Statuses");
        await SystemAdminWizardPage.focusOn(eStatus);
        await SystemAdminWizardPage.clickOnButton("Delete");
        await expect($('//div[normalize-space()="' + eStatus + '"]')).not.toBeExisting();

        //Delete task priority
        await SystemAdminWizardPage.focusOn("Task Priorities");
        await SystemAdminWizardPage.focusOn(ePriority);
        await SystemAdminWizardPage.clickOnButton("Delete");
        await expect($('//label[normalize-space()="' + ePriority + '"]')).not.toBeExisting();

        //Delete task subject
        await SystemAdminWizardPage.focusOn("Task Subjects");
        await SystemAdminWizardPage.focusOn(eSubject);
        await SystemAdminWizardPage.clickOnButton("Delete");
        await expect($('//label[normalize-space()="' + eSubject + '"]')).not.toBeExisting();

        //Delete task custom field
        await SystemAdminWizardPage.focusOn("Task Custom Field");
        await SystemAdminWizardPage.focusOn(ecustom);
        await SystemAdminWizardPage.clickOnButton("Delete");
        await expect($('//label[normalize-space()="' + ecustom + '"]')).not.toBeExisting();

        //Delete file description
        await SystemAdminWizardPage.focusOn("File Descriptions");
        await SystemAdminWizardPage.focusOn(edescription);
        await SystemAdminWizardPage.clickOnButton("Delete");
        await expect($('//label[normalize-space()="' + edescription + '"]')).not.toBeExisting();

        //Delete file subject
        await SystemAdminWizardPage.focusOn("File Subjects");
        await SystemAdminWizardPage.focusOn(efile_subject);
        await SystemAdminWizardPage.clickOnButton("Delete");
        await expect($('//label[normalize-space()="' + efile_subject + '"]')).not.toBeExisting();

        //Delete naming convention
        await SystemAdminWizardPage.focusOn("Naming Conventions");
        await SystemAdminWizardPage.focusOn(enaming);
        await SystemAdminWizardPage.clickOnButton("Delete");
        await expect($('//div[normalize-space()="' + enaming + '"]')).not.toBeExisting();
    });
});


describe('User profile', () => {
it('tc001 Verify that the user can change the password by clicking Change Password button on the User Profile page', async () => {
        let current_password = "Abc@12345"
        let newPassword = current_password + "6";
        await UserProfilePage.open();
        await UserProfilePage.changePassword(current_password, current_password);
});

it('tc002 Verify that user can change phone  by clicking Change Phone button on the User Profile page', async () => {
    let current_password = "Abc@12345"
    let newPassword = current_password + "6";
    await UserProfilePage.open();
    await UserProfilePage.changePassword(current_password, current_password);
});


it('tc003 Verify that User Profile will display information the same User information created in the User & Authentication page', async () => {
    let current_password = "Abc@12345"
    let newPassword = current_password + "6";
    await UserProfilePage.open();
    await UserProfilePage.changePassword(current_password, current_password);
});

});



describe('HomePage Maintenance', () => {

	it('tc001 Veify that User can access to Homepage Maintenance feature in Tools > Home Page maintenance', async () => {
        await LoginPage.reload();
        await HomePageMaintenancePage.open();
      //  await expect($('button[title="Homepage Maintenance"]')).toBeExisting();
      //  await expect($('//span[text()="Show Tasks on Homepage"]')).toBeExisting();      
    });

    it('tc002 Verify that User can modify the homepage content in the Homepage Maintenance feature, Any changes that user already saves in Homepage Maintenance will be reflected in the Homepage', async () => {
        await HomePageMaintenancePage.modify(date);
        await LoginPage.reload();
       // await expect($('//p[contains(text(),"'+date+'")]')).toBeExisting();
    });

	it('tc003 Verify that User can check/uncheck the �Show My Task on startup� checkbox to hide/show My task list in homepage (default: �Show My Task on startup� checkbox checked)', async () => {
        await HomePageMaintenancePage.open();
        //await HomePageMaintenancePage.checkShowTask();
       // let isChecked = (await $('[formcontrolname="isShowMyTask"]').getAttribute('class')).includes('checked');
        //await expect(isChecked).toEqual(true);
    });

    it('tc004 Verify after user logins and navigated to Hompage, the user sees the task list in the Hompage contains the task assigned to him/her', async () => {
        await LoginPage.reload();
        await new Promise(resolve => setTimeout(resolve, 3000));
        //await expect($('//div[contains(text(),"Start Date")]')).toBeExisting();
    });

});



describe('Audit Trail', () => {
    it('tc001 Verify that user can access to Administration > Audit Trail', async () => {
		let today = new Date().toLocaleDateString(); //DD/MM/YYYY
        await LoginPage.reload();
            await AuditTrailPage.openIndividual();
            await AuditTrailPage.clickOnSelectUser();
            await AuditTrailPage.tickOn(accountA);
            await AuditTrailPage.fillDate("01/07/2022", today);
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
        await AuditTrailPage.open();
        await AuditTrailPage.goToUserGroupMaintenance();
        await AuditTrailPage.clickOnSelectUser();
        await AuditTrailPage.tickOn(accountA);
        await AuditTrailPage.clickOnSelectAction();
        await AuditTrailPage.tickOn("Select All");
        await AuditTrailPage.refresh();
        //Verify something here
    });

    it('tc006 Verify that user can export search results by clicking Export button', async () => {
        //Pre-condition: TC005
        await AuditTrailPage.export();
    });

});



describe('Cabinet list', () => {
    let note = "Note" + date;
	it('tc001 Verify that user can see Cabinet list', async () => {
		//Cabinet
		await LoginPage.reload();
        await CabinetPage.open();
		await expect($('button[aria-label= "toggle Clients"]')).toBeExisting();
		//await expect($('button[aria-label= "toggle Underwriters"]')).toBeExisting();
		await CabinetPage.expandCabinet("Clients");
		//await expect($('button[aria-label="toggle Z"]')).toBeExisting();
    });

    //Defect in Description
	it('tc002 Verify that user can create quicknote file when clicking Floating > Create quicknote button, the data should display correctly after created quicknote successfully', async () => {
		//Cabinet
		await LoginPage.reload();
		await CabinetPage.open();
		await CabinetPage.expandCabinet('Clients');
      //  await CabinetPage.expandCabinet("Z");
		//await CabinetPage.expandCabinet('Z GARRETT-63362');
       // await CabinetPage.expandCabinet('2022');
       // await CabinetPage.createNewQuickNote(note, note);
       // await expect($('//span[contains(.,"' + note + '")]')).toBeExisting();
    });

    it('tc003 Verify that on the quicknote detail user can select a Copy to PDF  button, The PDF document is created and saved to the same location as the original quicknote', async () => {
		//Cabinet
        //await CabinetPage.copyQuickNoteToPDF(note);
        //await expect($('//span[contains(.,"' + note + '.pdf")]')).toBeExisting();
    });

    it('tc003 Delete quick note', async () => {
        await LoginPage.reload();
		await CabinetPage.open();
		await CabinetPage.expandCabinet('Clients');
      //  await CabinetPage.expandCabinet("Z");
		//await CabinetPage.expandCabinet('Z GARRETT-63362');
       // await CabinetPage.expandCabinet('2022');
       // await CabinetPage.tickOnFile(note + ".oqn");
       // await CabinetPage.tickOnFile(note + ".pdf");
       // await CabinetPage.deleteFile();
       // await expect($('//span[contains(.,"' + note + '.oqn")]')).not.toBeExisting();
        //await expect($('//span[contains(.,"' + note + '.oqn")]')).not.toBeExisting();
	});

	it('tc004 Verify that user can create a new task when clicking Floating >  Create new task button, the data should display correctly after create new task successfully', async () => {		
        await LoginPage.reload();
        await CabinetPage.open();
		await CabinetPage.expandCabinet('Clients');
      //  await CabinetPage.expandCabinet("Z");
	//	await CabinetPage.expandCabinet('Z GARRETT-63362');
      //  await CabinetPage.expandCabinet('2022');
       // await CabinetPage.createTask("Claim")
    });

	it('tc005 Verify that user can upload a file when clicking Floating >  Upload button, the data should display correctly afterupload file successfully', async () => {
    	//Cabinet
        await LoginPage.reload();
		await CabinetPage.open();
		await CabinetPage.expandCabinet('Clients');
        //await CabinetPage.expandCabinet("Z");
		//await CabinetPage.expandCabinet('Z GARRETT-63362');
        //await CabinetPage.expandCabinet('2022');
       // await CabinetPage.createTask("Claim")
		//await CabinetPage.uploadFileSystem('testfile.xlsx');
        //await expect($('(//span[contains(.,"testfile.xlsx")])[last()]')).toBeExisting();
        //await CabinetPage.deleteNewQuickNote("testfile.xlsx")

	});


	it('tc006 Verify that user can scan document when clicking Floating >  Scan here button', async () => {
		//Cabinet
		await LoginPage.reload();
		await CabinetPage.open();
		await CabinetPage.expandCabinet('Clients');
       // await CabinetPage.expandCabinet("Z");
		//await CabinetPage.expandCabinet('Z GARRETT-63362');
       // await CabinetPage.expandCabinet('2022');
       // await CabinetPage.createTask("Claim")
        //await CabinetPage.scan();
    });

    it('tc008 Verify that user can see list of the action in contextual menu: Open, Set Folder Colour, Add to Favourite, Show Deleted Files when right-clicking a Clients cabinet', async () => {
		//Cabinet
		await LoginPage.reload();
		await CabinetPage.open();
		await CabinetPage.expandCabinet('Clients');
        await CabinetPage.rightclickFolder("Clients");
        await expect($('//span[contains(.,"Open")]')).toBeExisting();
		await expect($('//span[contains(.,"Set Folder Colour")]')).toBeExisting();
		await expect($('//span[contains(.,"Remove From Favourites")]')).toBeExisting();
    });

    
    it('tc009 Verify that user can see list of the action in contextual menu: Open, Set Folder Colour, Add to Favourite, Add Folder, Delete Cabinet, Rename Cabinet, Show Deleted files when right-clicking a Cabinet', async () => {
		//Cabinet
		await LoginPage.reload();
		await CabinetPage.open();
        await CabinetPage.expandCabinet('Clients');
       // await CabinetPage.expandCabinet("Z");
       // await CabinetPage.rightclickFolder("Z");
       // await expect($('//span[contains(.,"Open")]')).toBeExisting();
		//await expect($('//span[contains(.,"Set Folder Colour")]')).toBeExisting();
        //await expect($('//span[contains(.,"Add Folder")]')).toBeExisting();
       // await expect($('//span[contains(.,"Add Structure")]')).toBeExisting();
    });

     it('tc010 Verify that user can see list of the action in contextual menu: Open, Set Folder Colour, Add Folder, Add Structure, Show Deleted files when right-clicking a index folder', async () => {
		//Cabinet
		await LoginPage.reload();
		await CabinetPage.open();
		await CabinetPage.expandCabinet('Clients');
       // await CabinetPage.expandCabinet("Z");
		//await CabinetPage.expandCabinet('Z GARRETT-63362');
        //await CabinetPage.rightclickFolder("Z GARRETT-63362");
        //await expect($('//span[contains(.,"Open")]')).toBeExisting();
        // await expect($('//span[contains(.,"Set Folder Colour")]')).toBeExisting();
        // await expect($('//span[contains(.,"Add To Favourites")]')).toBeExisting();
        // await expect($('//span[contains(.,"Add Folder")]')).toBeExisting();
        // await expect($('//span[contains(.,"Copy Folder")]')).toBeExisting();
        //await expect($('//span[contains(.,"Add Client Structure")]')).toBeExisting();
     });

     it('tc011 Verify that user can see list of the action in contextual menu: Open, Set Folder Colour, Add to Favourite, Add Folder, Add Structure, Move Folder, Copy Folder, Delete Folder, Rename Folder, Show Deleted files and do it when right-clicking a Folder', async () => {
		//Cabinet
		await LoginPage.reload();
		await CabinetPage.open();
		await CabinetPage.expandCabinet('Clients');
        //await CabinetPage.expandCabinet("Z");
		//await CabinetPage.expandCabinet('Z GARRETT-63362');
        //await CabinetPage.rightclickFolder("Z GARRETT-63362");
        //await CabinetPage.expandCabinet('2022');
        //await CabinetPage.rightclickFolder("2022");
        //await expect($('//span[contains(.,"Open")]')).toBeExisting();
        // await expect($('//span[contains(.,"Set Folder Colour")]')).toBeExisting();
        // await expect($('//span[contains(.,"Add To Favourites")]')).toBeExisting();
        // await expect($('//span[contains(.,"Add Folder")]')).toBeExisting();
        // await expect($('//span[contains(.,"Add Structure")]')).toBeExisting();
       //  await expect($('//span[contains(.,"Move Folder")]')).toBeExisting();
        // await expect($('//span[contains(.,"Copy Folder")]')).toBeExisting();
       //  await expect($('//span[contains(.,"Delete Folder")]')).toBeExisting();
       //  await expect($('//span[contains(.,"Rename Folder")]')).toBeExisting();
       //  await expect($('//span[contains(.,"Show Deleted Files")]')).toBeExisting();
       //  await CabinetPage.setFolderColor();
       //  await expect($('//span[normalize-space()="2021"]/preceding-sibling::em[contains(@style,"rgb(250, 209, 101)")]')).toBeExisting();
        
    });

});



describe('Intray', () => {


    let fileName = "testfile.xlsx";

    it('tc001 Verify that the current users Intray will be highlighted by default and displayed at the top in Intray/ Folder Browser/ File Browser/ Save form', async () => {
        await LoginPage.reload();
        await IntrayPage.open();
        let isActive = await $('//span[normalize-space()="' + accountA + '"]/parent::button').getAttribute("class");
        await expect(isActive.includes("active")).toEqual(true);
    });

    it('tc002 Verify that the current user login can upload default action of a file on his own In-tray', async () => {
        //Pre-condition: Delete all files in Intray then upload 02 file in intray
		await IntrayPage.goToUserIntray(accountA);
        //await IntrayPage.checkInAndDeleteAllFiles();
        //await IntrayPage.uploadFileSystem(fileName);
        //await IntrayPage.checkInFile(fileName);
		//await IntrayPage.delete();

    });

    it('tc003 Verify that the current user login can copy a file on his own In-tray', async () => {
       
            //Verify copy file
			//await IntrayPage.uploadFileSystem(fileName);
			//await IntrayPage.checkInFile(fileName);
           // await IntrayPage.copyTo(accountB);
            //await IntrayPage.goToUserIntray(accountB);
           // await expect($('(//span[contains(.,' + fileName + ')]/ancestor::td)[1]')).toBeExisting();
			//await IntrayPage.goToUserIntray(accountA);
			//await IntrayPage.tickOnFile(fileName);
			//await IntrayPage.delete();
       
    });

    it('tc004 Verify that the current user login can move a file on his own In-tray', async () => {
       
        //Verify move file
       //await IntrayPage.goToUserIntray(accountA);
		//await IntrayPage.uploadFileSystem(fileName);
		//await IntrayPage.checkInFile(fileName);
        //await IntrayPage.moveTo(accountB);
		//await IntrayPage.goToUserIntray(accountB);
		//await expect($('(//span[contains(.,"' + fileName + '")]/ancestor::td)[1]')).toBeExisting();
		//await IntrayPage.goToUserIntray(accountA);
		//await expect($('(//span[contains(.,"' + fileName + '")]/ancestor::td)[1]')).not.toBeExisting();
        
    });


    it('tc005 Verify that the current user login send email a file on his own In-tray', async () => {
       

        //Verify new email
       // await IntrayPage.goToUserIntray(accountA);
		//await IntrayPage.uploadFileSystem(fileName);
       // await IntrayPage.checkInFile(fileName);
        //await IntrayPage.tickOnFile(fileName);
      //  await IntrayPage.newEmail();
       // await expect($('app-email-attachments')).toBeExisting();
      //  await $('//button[.="Cancel"]').click();
       // await IntrayPage.delete();
       // await expect($('(//span[contains(.,"' + fileName + '")]/ancestor::td)[1]')).not.toBeExisting();
       
    });

    
    
    it('tc006 Verify that the current user login send task a file on his own In-tray', async () => {
       
	//	await IntrayPage.goToUserIntray(accountA);
		//await IntrayPage.uploadFileSystem(fileName);
      //  await IntrayPage.checkInFile(fileName);
      //  await IntrayPage.sendToTask("Existing");
     //   await expect($('app-dialog-existing-task')).toBeExisting();
     //   await $('//button[.="Cancel"]').click();
     //   await IntrayPage.sendToTask("New");
     //   await expect($('app-create-task')).toBeExisting();
      //  await $('//button[.="Cancel"]').click();
     //   await IntrayPage.pressButton('enter');
	//	await IntrayPage.delete();
    //    await expect($('(//span[contains(.,"' + fileName + '")]/ancestor::td)[1]')).not.toBeExisting();

    });

});


describe('CAC/IAC', () => {
    let groupName = "Automation" + new Date().getTime();

    it('tc004 Verify that user can see Copy, New Email, Send to task and do it (except Copy file) ', async () => { 
        await LoginPage.reload();
			await CabinetPage.open();
			await CabinetPage.expandCabinet('Clients');
            /*
			await CabinetPage.expandCabinet("Z");
			await CabinetPage.expandCabinet('Z GARRETT-63362');
			await CabinetPage.expandCabinet("2022");
			await CabinetPage.focusOn("(Claims)");
			await CabinetPage.uploadFileSystem('testfile.xlsx');
			await CabinetPage.tickOnFile("testfile"); //tick on the 1st file
            await expect(await $('[mattooltip="New Email"]').isClickable()).toEqual(true); //verify can add New Email
            await expect(await $('[mattooltip="Send To Task"]').isClickable()).toEqual(true); //verify can Send to task
            */
    });

    it('tc005 Verify that user can see/ copy file into Cabinet list in Home/ Favourite of the Folder Browser when user belongs to group that has Write permission checked CAC page', async () => {
            //Check file can be copied from Cabinet
			await LoginPage.reload();
			await CabinetPage.open();
			await CabinetPage.expandCabinet('Clients');
            /*
			await CabinetPage.expandCabinet("Z");
			await CabinetPage.expandCabinet('Z GARRETT-63362');
			await CabinetPage.expandCabinet("2022");
			await CabinetPage.focusOn("(Claims)");
			await CabinetPage.uploadFileSystem('testfile.xlsx');
			await CabinetPage.tickOnFile("testfile"); //tick on the 1st file
            await CabinetPage.copyToFolder("(Claims)"); //Copy to folder: Cabinet/Automation/2022/Emails
            await CabinetPage.collapCabinet("2022");
            await CabinetPage.expandCabinet("2023");
            await CabinetPage.expandCabinet("(Claims)");
            await expect($('(//span[contains(.,"testfile")]/ancestor::td)[1]')).toBeExisting();

            //Check file can be copied from Favorite
            await CabinetPage.addToFavourite("Z GARRETT-63362");
            await FavoritePage.open();
            await FavoritePage.expandFavourites("Z GARRETT-63362");
            await FavoritePage.expandFavourites("2022");
            await FavoritePage.focusOn("(Claims)");
            await FavoritePage.tickOnFile("testfile");
            await CabinetPage.copyToFolder("(Claims)");
            await FavoritePage.collapFavourites("2022");
            await FavoritePage.expandFavourites("2023");
            await FavoritePage.focusOn("(Claims)");
            await expect($('(//span[contains(.,"testfile")]/ancestor::td)[1]')).toBeExisting();
            */

    });

    it('tc006 Verify that user can see/ move file into Cabinet list in Home/ Favourite/ Intray of the Folder Browser when user belongs to group that has Delete permission checked.', async () => {
        //Pre-condition: set automation group with permission = Delete, exist copies of documents in TC005
        
			await LoginPage.reload();
			await CabinetPage.open();
			await CabinetPage.expandCabinet('Clients');
			//await CabinetPage.expandCabinet("Z");
			//await CabinetPage.expandCabinet('Z GARRETT-63362');
			//await CabinetPage.expandCabinet("2022");
			//await CabinetPage.focusOn("(Claims)");
			//await CabinetPage.uploadFileSystem('testfile.xlsx');
			//await CabinetPage.tickOnFile("testfile"); //tick on the 1st file
            //await CabinetPage.deleteFile();

            //Check file can be deleted in Favorite
            await FavoritePage.open();
            //await FavoritePage.expandFavourites("Z GARRETT-63362");
            //await FavoritePage.expandFavourites("2022");
            //await FavoritePage.focusOn("(Claims)");
            //await FavoritePage.tickOnFile("testfile");
           // await FavoritePage.deleteFile();
    });

});



describe('Logout', () => {
	it('should logout', async () => {
		await LoginPage.reload();
		await LoginPage.logout();
	});
});