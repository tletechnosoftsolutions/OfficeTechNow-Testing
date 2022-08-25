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
const SystemConfigurationPage = require('../pageobjects/systemConfiguration.page');
const UserProfilePage = require('../pageobjects/userProfile.page');
const { exec } = require('node:child_process');
const { group } = require('node:console');

const templatename = "AutomationTemplate" + new Date().getTime();
const newTemplatename = "New" + templatename;
const superadmin = 'tssadmin3';
const superadmin2='tssadmin4';
const user = 'tle@technosoftsolutions.com.au';
const password = 'Abc@12345';
const isSuperadmin = true;
const download_path = "C:/Users/TLe/Downloads/";

var clientname = "Automation" + new Date().getTime();
var clientcode = new Date().getTime();
var structure = "01. Standard Client";
var cabinet_name = "Automation Testing Cabinet" +new Date().getTime();
var new_cabinet_name = "Renamed Automation Testing Cabinet" + new Date().getTime();
var newTemplateName = "Automation Task Template " + new Date().getTime();
var date = new Date().getTime();

var createduser = new Date().getTime();
var license = 1; 
var maximum_license = 24;

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


describe('User Authentication Maintenance', () => {

    it('tc001 Verify the user can see and access the User & Authentication Maintenance page when he has User & Group Maintenance permission', async () => {
        await UserAuthenticationMaintenancePage.open();
        license = await $('//label[contains(.,"Used licenses")]/following-sibling::strong').getText();
        license = parseInt(license.trim()) + 1;
        await expect($('//span[contains(text(), "Invite")]')).toBeExisting();
    });

    it('tc002 Verify the user can add a new user when he clicks on Invite new user button', async () => {
        await UserAuthenticationMaintenancePage.inviteNewUser(createduser);
        await LoginPage.reload();
        await UserAuthenticationMaintenancePage.open();
        await expect($('//p[contains(text(), "'+createduser+'")]')).toBeExisting();
    });


    it('tc008 Verify the user that has User & Group Maintenance permission can access and edit the users profile ', async () => {
        await UserAuthenticationMaintenancePage.editUser(createduser);
        await LoginPage.reload();
        await UserAuthenticationMaintenancePage.open();
        await expect($('//p[contains(text(), "EditAutomation")]')).toBeExisting();
    });


    it('tc009 Verify the user that has System Admin User permission can edit the users email', async () => {
        if (isSuperadmin) {
            await UserAuthenticationMaintenancePage.admineditUser(createduser);
            await LoginPage.reload();
            await UserAuthenticationMaintenancePage.open();
            await expect($('//p[contains(text(), "EditAutomation")]')).toBeExisting();
        }
    });

     it('tc010 Verify the user that has User & Group Maintenance permission can resend invite user ', async () => {
        await UserAuthenticationMaintenancePage.editAndResendUser(createduser);
        await LoginPage.reload();
        await UserAuthenticationMaintenancePage.open();
        await expect($('//p[contains(text(), "EditAutomation")]')).toBeExisting();
     });

    it('tc011 Verify the user that has User & Group Maintenance permission can deactivate user', async () => {
        let username = "Tuyen Le"
        await UserAuthenticationMaintenancePage.open();
        await UserAuthenticationMaintenancePage.deactivateUser(username);
        let isExist = await UserAuthenticationMaintenancePage.isPopupExist("Deactivate user successfully");
        await expect(isExist).toEqual(true);
        await expect($('//p[normalize-space()="' + user + '"]/ancestor::tr//span[contains(.,"Inactive")]')).toBeExisting();
    });

    it('tc012 Verify the user that has User & Group Maintenance permission can re-activate user', async () => {
        let username = "Tuyen Le"
        await UserAuthenticationMaintenancePage.open();
        await UserAuthenticationMaintenancePage.activateUser(username);
        let isExist = await UserAuthenticationMaintenancePage.isPopupExist("Activate user successfully");
        await expect(isExist).toEqual(true);
        await expect($('//p[normalize-space()="' + user + '"]/ancestor::tr//span[contains(.,"Active")]')).toBeExisting();
    });

    it('tc013 Verify the migrated users will have Migrated status', async () => {
        //Precondition: Existing users with status = Migrated
        let userMigrate = "Ken Newton";
        await expect($('//p[normalize-space()="' + userMigrate + '"]/ancestor::tr//span[contains(.,"Migrated")]')).toBeExisting();
    });

    it('tc014 Verify the user can search on the User & Authentication Maintenance ', async () => {
        //Precondition: Clear all search bars
        await UserAuthenticationMaintenancePage.open();
        //Search by status
        await UserAuthenticationMaintenancePage.clearSearchBars();
        await UserAuthenticationMaintenancePage.search("Status", "Active");
        await expect($('//table//span[.="Active"]')).toBeExisting();
        await UserAuthenticationMaintenancePage.clearSearchBars();
        await UserAuthenticationMaintenancePage.search("Status", "Inactive");
        await UserAuthenticationMaintenancePage.search("Status", "Pending");
        await UserAuthenticationMaintenancePage.search("Status", "Migrated");
        await expect($('//table//span[.="Active"]')).not.toBeExisting();
        //Search by 2FA
        await UserAuthenticationMaintenancePage.clearSearchBars();
        await UserAuthenticationMaintenancePage.search("2FA", "Yes");
        await expect($('//table//td[(contains(.,"Yes"))]')).toBeExisting();
        await expect($('//table//td[(contains(.,"No"))]')).not.toBeExisting();
        await expect($('//table//td[(contains(.,"Requested"))]')).not.toBeExisting();
        //Search by username
        await UserAuthenticationMaintenancePage.clearSearchBars();
        await UserAuthenticationMaintenancePage.search("User", user);
        await expect($('//p[normalize-space()="' + user + '"]')).toBeExisting();
        //Postcondition
        await UserAuthenticationMaintenancePage.clearSearchBars();
    });

    it('tc015 Verify displaying the maximum licenses as "Total Licenses" and number of active and pending users as "Used Licenses"', async () => {
        //Verify Total Licenses number after editting in System Configuration
        await SystemConfigurationPage.open();
        await SystemConfigurationPage.editBox("Maximum Licenses", 100); //change into 100 total licenses
        await SystemConfigurationPage.save();
        await UserAuthenticationMaintenancePage.open();
        await expect($('//label[contains(.,"Total licenses")]/following-sibling::*[contains(.,"100")]')).toBeExisting();

        //Verify Used Licenses number

        await expect($('//label[contains(.,"Used licenses")]/following-sibling::*[contains(.,"' + license + '")]')).toBeExisting();

        //Post-condition: return old value of Maximum Licenses in System Configuration
        await SystemConfigurationPage.open();
        await SystemConfigurationPage.editBox("Maximum Licenses", maximum_license); //change into 24 total licenses
        await SystemConfigurationPage.save();
    });

    it('tc016 Verify the "Invite New User" button is disable when the user uses all Licenses"', async () => {
        //Get recent number of used licenses
        await UserAuthenticationMaintenancePage.open();
        let recentNo = await $('//label[contains(.,"Used licenses")]/following-sibling::*').getText();
        recentNo = recentNo.trim();

        //Verify Invite New User button in 03 scenarios
        await SystemConfigurationPage.open();
        await SystemConfigurationPage.editBox("Maximum Licenses", recentNo); //change into recent number of used licenses
        await SystemConfigurationPage.save();
        await UserAuthenticationMaintenancePage.open();
        await expect($('//span[normalize-space()="Invite New User"]/parent::button')).toHaveAttr('disabled','true');

        await SystemConfigurationPage.open();
        await SystemConfigurationPage.editBox("Maximum Licenses", recentNo - 1); //decrease 1 license
        await SystemConfigurationPage.save();
        await UserAuthenticationMaintenancePage.open();
        await expect($('//span[normalize-space()="Invite New User"]/parent::button')).toHaveAttr('disabled','true');

        await SystemConfigurationPage.open();
        await SystemConfigurationPage.editBox("Maximum Licenses", recentNo + 1); //increase 1 license
        await SystemConfigurationPage.save();
        await UserAuthenticationMaintenancePage.open();
        await expect($('//span[normalize-space()="Invite New User"]/parent::button')).not.toHaveAttr('disabled','true');

        //Postcondition
        await SystemConfigurationPage.open();
        await SystemConfigurationPage.editBox("Maximum Licenses", 24); //change back 24
        await SystemConfigurationPage.save();
    });

    it('tc017 Verify the user can export users', async () => {
        await UserAuthenticationMaintenancePage.open();
        await UserAuthenticationMaintenancePage.export();
        let download_fileName = "UserListExport.xlsx";
        let fs = require('fs');
        let isExist = fs.existsSync(download_path + download_fileName);
        await expect(isExist).toEqual(true);
        //Postcondition: delete downloaded file
        fs.unlinkSync(download_path + download_fileName);
    });

    it('tc018 Verify that only Super Admin user can see and use Enable/Disable check CAM buttons ', async () => {
        
        let username = "Tuyen Le"
        await UserAuthenticationMaintenancePage.open();
        await UserAuthenticationMaintenancePage.disableCamUser(username);
        await UserAuthenticationMaintenancePage.enableCamUser(username);
            ////Verify Enable CAM = True
            //await SystemConfigurationPage.open();
            //await SystemConfigurationPage.editList("Enable CAM", "True");
            //await SystemConfigurationPage.save();
            //await LoginPage.reload();
            //await UserAuthenticationMaintenancePage.open();
            //await expect($('//button[normalize-space()="Disable Check CAM"]')).toBeExisting(); //Expected result (1)

            ////await LoginPage.logout();
            ////await LoginPage.login(superadmin2, password);
            ////await UserAuthenticationMaintenancePage.open();
            //////await expect($('//button[normalize-space()="Disable Check CAM"]')).not.toBeExisting(); //Expected result (2)

            //////Verify Enable CAM = False
            ////await LoginPage.logout();
            ////await LoginPage.login(superadmin, password);
            //await SystemConfigurationPage.open();
            //await SystemConfigurationPage.editList("Enable CAM", "False");
            //await SystemConfigurationPage.save();
            //await LoginPage.reload();
            //await UserAuthenticationMaintenancePage.open();
            //await expect($('//button[normalize-space()="Disable Check CAM"]')).not.toBeExisting(); //Expected result (3)

            ////await LoginPage.logout();
            ////await LoginPage.login(superadmin2, password);
            ////await UserAuthenticationMaintenancePage.open();
            ////await expect($('//button[normalize-space()="Disable Check CAM"]')).not.toBeExisting(); //Expected result (4)

            //////Post-condition: login back to automation account
            ////await LoginPage.logout();
            ////await LoginPage.login(superadmin, password);
    });

    it('tc019 Verify that the user can change the password by clicking Change Password button on the User Profile page', async () => {
        if (!isSuperadmin) {
            let current_password="TeChn0Tq18@!"
            let newPassword = current_password + "6";
            await UserProfilePage.open();
            await UserProfilePage.changePassword(current_password, newPassword);
            ////Try to relogin with old password
            //await LoginPage.logout();
            //await LoginPage.login(superadmin, password);
            //await expect($('//div[@role="alert"][normalize-space()="Password is incorrect"]')).toBeExisting();
            ////Try to relogin with new password
            //await LoginPage.login(superadmin, newPassword);
            //await expect($('//span[text()="Home"]')).toBeExisting();
            ////Post-condition: change into old password
            await UserProfilePage.open();
            await UserProfilePage.changePassword(newPassword, password);
        }
    });

    it('tc021 Verify that User Profile will display information the same User information created in the User & Authentication page', async () => {
        await UserProfilePage.open();
        let userEmail = await $('input[id*=email]').getValue();
        let userFirstName = await $('input[id*=firstName]').getValue();
        let userLastName = await $('input[id*=lastName]').getValue();

        await UserAuthenticationMaintenancePage.open();
        await UserAuthenticationMaintenancePage.search("User", superadmin);
        await expect($('//p[contains(.,"' + userEmail + '")]')).toBeExisting();
        await expect($('//p[contains(.,"' + userFirstName + ' ' + userLastName + '")]')).toBeExisting();
    });
});


describe('Group & Permission Maintenance', () => {
    it('tc001 Verify the user can see and access the Group & Permission Maintenance page when that user has “User & Group Maintenance” permission ', async () => {
        await GroupPermissionMaintenancePage.open();
        let existUrl = await browser.getUrl();
        expect(existUrl).toHaveTextContaining("group-management");
    });

    it('tc002 Verify the user can add a new group', async () => {
        await GroupPermissionMaintenancePage.createGroup(templatename);
        await expect($('//label[normalize-space()="' + templatename + '"]')).toBeExisting();
    });

    it('tc005 Verify the user can search groups on the search bar', async () => {
        await GroupPermissionMaintenancePage.search("Group", templatename);
        await expect($('//label[normalize-space()="' + templatename + '"]')).toBeExisting();
    });

    it('tc006 Verify that the message pop-up: "There are some unsaved changes. Are you sure you want to leave?" will be displayed when the user doesnt save change on a group then switch to another group', async () => {
        await LoginPage.reload();
        await GroupPermissionMaintenancePage.open();
        await GroupPermissionMaintenancePage.focusOn(templatename);
        await GroupPermissionMaintenancePage.tickOn(superadmin2);
        await GroupPermissionMaintenancePage.focusOn("Admin");
        await new Promise(resolve => setTimeout(resolve, 1000));
        let isExist = await GroupPermissionMaintenancePage.isMessageExist("There are some unsaved changes. Are you sure you want to leave?");
        await expect(isExist).toEqual(true);
        await $('//button[.="No"]').click();
        await GroupPermissionMaintenancePage.focusOn("Admin");
        await expect(isExist).toEqual(true);
        await $('//button[.="Yes"]').click();
    });

    it('tc007 Verify the user check permission for other users', async () => {
        await GroupPermissionMaintenancePage.focusOn(templatename);
        await GroupPermissionMaintenancePage.tickOn(superadmin);
        await GroupPermissionMaintenancePage.tickOn(superadmin2);
        await GroupPermissionMaintenancePage.tickOn("Home Page Maintenance");
        await GroupPermissionMaintenancePage.tickOn("Template Maintenance");
        await GroupPermissionMaintenancePage.tickOn("User & Group Maintenance");
        await GroupPermissionMaintenancePage.save();
        await GroupPermissionMaintenancePage.isPopupExist("Update Group & Permission successfully");
        
    });

    it('tc008 Verify that the user list displays all users except Deleted users', async () => {
        //Count users in [Group & Permission Maintenance] then compared with users number in [User & Authentication Maintenance]
        let numOfUser_1 = await $$('//*[@title="Users"]//div[@body]//label').length;
        await UserAuthenticationMaintenancePage.open();
        let numOfUser_2 = await $$('//tbody/tr').length;
        await expect(numOfUser_1).toEqual(numOfUser_2);
    });

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

    it('tc003 Verify the user can rename the group', async () => {
        await GroupPermissionMaintenancePage.focusOn(templatename);
        await GroupPermissionMaintenancePage.renameGroup(templatename);
        await expect($('//label[normalize-space()="Edited ' + templatename + '"]')).toBeExisting();
    });

    it('tc004 Verify the user can delete the group', async () => {
        await GroupPermissionMaintenancePage.deleteGroup("Edited " + templatename);
        await expect($('//label[normalize-space()="Edited ' + templatename + '"]')).not.toBeExisting();
    });
});



describe('Client Cabinet Structure Template', () => {
    it('tc001 Verify the user can see and access the Client Maintenance page when he has “Add Client” permission', async () => {
        //Pre-condition: grant permission "Add Client" to account
        await LoginPage.reload();
        await GroupPermissionMaintenancePage.open();
        await GroupPermissionMaintenancePage.createGroup("Automation " + date);
        await GroupPermissionMaintenancePage.tickOn(superadmin2);
        await GroupPermissionMaintenancePage.tickOn("Add Client");
        await GroupPermissionMaintenancePage.save();

        await LoginPage.logout();
        await LoginPage.login(superadmin2, password);

        await ClientMaintenancePage.open();
        await expect($('//button//i[.="person_add"]')).toBeExisting();
    });

    it('tc002 Verify the user can add a new client', async () => {
        await ClientMaintenancePage.createClient(clientname, clientcode);
        await expect($('//td[normalize-space()="' + clientname + '"]')).toBeExisting();
        await CabinetPage.openQuickFind(clientname);
        await expect($('[aria-label="toggle ' + clientname + '"]')).toBeExisting();
    });

    it('tc004 Verify that if Client Code Required = False, the client code field is hidden when adding/editting a new client.', async () => {
        //Pre-condition: edit Client Code Required = False in [System Configuration]
        await SystemConfigurationPage.open();
        await SystemConfigurationPage.editList("Client Code Required", "False");
        await SystemConfigurationPage.save();

        await LoginPage.reload();
        await ClientMaintenancePage.open();
        await $('//button//i[.="person_add"]').click();
        await expect($('[formcontrolname="clientID"]')).not.toBeExisting();
        await $('//button[normalize-space()="Cancel"]').click();

        await ClientMaintenancePage.searchClient(clientname);
        await $('//td[normalize-space()="' + clientname + '"]/parent::tr//button[@mattooltip="Rename Client"]').click();
        await expect($('[formcontrolname="clientID"]')).not.toBeExisting();
        await $('//button[normalize-space()="Cancel"]').click();
    });

    it('tc003 Verify that if Client Code Required = True, the Client Code field is shown and required when adding/editing a new client.', async () => {
        //Pre-condition: edit Client Code Required = True in [System Configuration]
        await SystemConfigurationPage.open();
        await SystemConfigurationPage.editList("Client Code Required", "True");
        await SystemConfigurationPage.save();

        await LoginPage.reload();
        await ClientMaintenancePage.open();
        await $('//button//i[.="person_add"]').click();
        await expect($('[formcontrolname="clientID"]')).toBeExisting();
        await $('//button[normalize-space()="Cancel"]').click();

        await ClientMaintenancePage.searchClient(clientname);
        await $('//td[normalize-space()="' + clientname + '"]/parent::tr//button[@mattooltip="Rename Client"]').click();
        await expect($('[formcontrolname="clientID"]')).toBeExisting();
        await $('//button[normalize-space()="Cancel"]').click();
    });

    it('tc006 Verify the user cannot add/ rename a client with the name that already exists', async () => {
        await ClientMaintenancePage.createClient(clientname, clientcode);
        let isExist = await ClientMaintenancePage.isPopupExist("The client " + clientname + " already exists");
        await expect(isExist).toEqual(true);
        await $('//button[normalize-space()="Cancel"]').click();
    });

    it('tc007 Verify that user can add Client Structure for a client', async () => {
        //Pre-condition: grant Add Client Structure permission
        await LoginPage.logout();
        await LoginPage.login(superadmin, password);
        await GroupPermissionMaintenancePage.open();
        await GroupPermissionMaintenancePage.focusOn("Automation " + date);
        await GroupPermissionMaintenancePage.tickOn("Add Client Structure");
        await GroupPermissionMaintenancePage.save();
        await LoginPage.logout();

        await LoginPage.login(superadmin2, password);
        await ClientMaintenancePage.open();
        await ClientMaintenancePage.searchClient(clientname);
        await $('//button//i[.="account_tree"]').click();
        //Verify client name and client code are disabled
        await expect($('[formcontrolname="clientName"]')).toHaveAttr('disabled');
        await expect($('[formcontrolname="clientID"]')).toHaveAttr('disabled');
        await $('//button[normalize-space()="Cancel"]').click();
        //Verify user can change client's structure
        await ClientMaintenancePage.addStructure(clientname, "DO NOT delete - Automation Template");
        let isExist = await ClientMaintenancePage.isPopupExist("Add client structure successfully");
        await expect(isExist).toEqual(true);

        await CabinetPage.openQuickFind(clientname);
        await expect($('//span[normalize-space()="Automation Folder"]')).toBeExisting();
    });

    it('tc005 Verify that user can rename a Client folder', async () => {
        let newName = "Edited " + clientname;
        let newCode = clientcode + "000";
        await ClientMaintenancePage.open();
        await ClientMaintenancePage.searchClient(clientname);
        await ClientMaintenancePage.renameClient(clientname, newName, newCode);
        await LoginPage.reload();
        await ClientMaintenancePage.open();
        await ClientMaintenancePage.searchClient(newName);
        await expect($('//td[normalize-space()="' + newName + '"]')).toBeExisting();
        await expect($('//td[normalize-space()="' + newCode + '"]')).toBeExisting();
    });

    it('tc008 Verify that user can delete the client folder', async () => {
        //Pre-condition: grant Delete Client permission
        await LoginPage.logout();
        await LoginPage.login(superadmin, password);
        await GroupPermissionMaintenancePage.open();
        await GroupPermissionMaintenancePage.focusOn("Automation " + date);
        await GroupPermissionMaintenancePage.tickOn("Delete Client");
        await GroupPermissionMaintenancePage.save();
        await LoginPage.logout();

        await LoginPage.login(superadmin2, password);
        await ClientMaintenancePage.open();
        await ClientMaintenancePage.searchClient(clientname);
        await ClientMaintenancePage.deleteClient(clientname);
        let isExist = await ClientMaintenancePage.isPopupExist("Delete successfully");
        await expect(isExist).toEqual(true);
        await new Promise(resolve => setTimeout(resolve, 2000));
        await $('//input[@placeholder="Quick Find"]').setValue(clientname);
        await new Promise(resolve => setTimeout(resolve, 1000));
        await expect($('//span[contains(text(),"' + clientname + '")]')).not.toBeExisting();
    });

    it('tc009 Verify that user cannot delete a client if there is any task that is assigned to that client', async () => {
        //Precondition 1: create a new client
        //Precondition 2: create a task and in Entity field, select client in Precondition 1
        let clientname = "A New Client Aug 2016-1152";
        let errorMessage = "Cannot delete the client \"" + clientname + "\" because it is assigned to one or more tasks.";
        await LoginPage.reload();
        await ClientMaintenancePage.open();
        await ClientMaintenancePage.searchClient(clientname);
        await $('//button//i[.="delete"]').click();
        await expect($("//p[contains(text(),'" + errorMessage + "')]")).toBeExisting();
    });

    it('tc010 Verify the user can see and access the Cabinet Setting page to add a new cabinet when user has “CAC Manager” permission', async () => {
        //Precondition: grant CAC Managers permission to account under test
        await LoginPage.reload();
        await LoginPage.logout();
        await LoginPage.login(superadmin, password);
        await GroupPermissionMaintenancePage.open();
        await GroupPermissionMaintenancePage.focusOn("Automation " + date);
        await GroupPermissionMaintenancePage.tickOn("CAC Managers");
        await GroupPermissionMaintenancePage.save();
        await LoginPage.logout();

        await LoginPage.login(superadmin2, password);
        await CabinetAccessControlPage.open();
        await expect($('button[title="Cabinet Access Control"]')).toBeExisting();
        await CabinetSettingsPage.open();
        await expect($('button[title="Cabinet Settings"]')).toBeExisting();
    });

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

describe('Logout', () => {
	it('should logout', async () => {
		await LoginPage.reload();
		await LoginPage.logout();
	});
});