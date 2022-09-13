const LoginPage = require('../pageobjects/login.page');
const CabinetPage = require('../pageobjects/cabinet.page');
const FavouritesPage = require('../pageobjects/favourites.page');
const ClientMaintenancePage = require('../pageobjects/ClientMaintenance.page');
const StructureMaintenancePage = require('../pageobjects/structureMaintenance.page');
const CabinetAccessControlPage = require('../pageobjects/cabinetAccessControl.page');
const CabinetSettingsPage = require('../pageobjects/cabinetSettings.page');
const TaskPage = require('../pageobjects/task.page');
const TaskTemplateMaintenancePage = require('../pageobjects/taskTemplateMaintenance.page');
const GroupPermissionMaintenancePage = require('../pageobjects/groupPermissionMaintenance.page');
const SystemAdminWizardPage = require('../pageobjects/systemAdminWizard.page');
const HomePageMaintenancePage = require('../pageobjects/homepagemaintenance.page');
const AuditTrailPage = require('../pageobjects/auditTrail.page');
const FavoritePage = require('../pageobjects/favourites.page');
const IntrayPage = require('../pageobjects/intray.page');
const IntrayAccessControlPage = require('../pageobjects/intrayAccessControl.page');
const UserAuthenticationMaintenancePage = require('../pageobjects/UserAuthenticationMaintenance.page');
const TemplateMaintenancePage = require('../pageobjects/templateMaintenance.page');
const SystemConfigurationPage = require('../pageobjects/systemConfiguration.page');
const UserProfilePage = require('../pageobjects/userProfile.page');
const SearchPage = require('../pageobjects/search.page');

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
var foldername = "AutomationFolder" + new Date().getTime();

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
        await expect($('//span[text()="Home"]')).toBeExisting();
    });
});



//describe('Template Maintenance', () => {

//    it('tc027 Verify the user can access the Administration > Template Maintenance page when that user has "Template Maintenance" permission', async () => {
//        await TemplateMaintenancePage.open();
//        await expect($('button[title="Template Maintenance"]')).toBeExisting();
//    });



//     it('tc030 Verify the user can add/rename/delete folder on the Template Maintenance page', async () => {
//         await TemplateMaintenancePage.open();
//         await TemplateMaintenancePage.rightclickFolder("Claims");
//         await TemplateMaintenancePage.addFolder(foldername);
//         await TemplateMaintenancePage.rightclickFolder(foldername);
//         await TemplateMaintenancePage.addSubFolder(foldername+"1");
//         await expect($('//span[text()=" '+foldername+'1"]')).toBeExisting();

//     });

//     it('tc029 Verify the user can upload templates on the Template Maintenance page', async () => {
//         await TemplateMaintenancePage.open();
//         await TemplateMaintenancePage.clickFolder(foldername);
//         await TemplateMaintenancePage.uploadFileSystem("testfilePDF.pdf");
//         await expect($('//span[text()="testfilePDF.pdf"]')).toBeExisting();
//     });

//     it('tc031 Verify the user can open/ rename templates in a folder on the Template Maintenance page', async () => {
//         await TemplateMaintenancePage.open();
//         await TemplateMaintenancePage.clickFolder(foldername);
//         await TemplateMaintenancePage.openTemplate();

//     });

//    it('tc032 Verify the user can preview templates on the Template Maintenance page and the Templates page', async () => {
//         //await TemplateMaintenancePage.open();
//         //await TemplateMaintenancePage.clickFolder(foldername);
//        await TemplateMaintenancePage.reviewTemplate();     
//        await expect($('(//div[@id="mainContainer"])')).toBeExisting();

//     });
//});





describe('Client Cabinet Structure Template', () => {
    it('tc001 Verify the user can see and access the Client Maintenance page when he has “Add Client” permission', async () => {
        //Pre-condition: grant permission "Add Client" to account
       // await GroupPermissionMaintenancePage.open();
       // await GroupPermissionMaintenancePage.createGroup("Automation " + date);
       // await GroupPermissionMaintenancePage.tickOn(superadmin2);
       // await GroupPermissionMaintenancePage.tickOn("Add Client");
       // await GroupPermissionMaintenancePage.save();

       // await LoginPage.logout();
       // await LoginPage.login(superadmin2, password);

        await ClientMaintenancePage.open();
        await expect($('//button//i[.="person_add"]')).toBeExisting();
    });

    it('tc002 Verify the user can add a new client', async () => {
        await ClientMaintenancePage.createClient(clientname, clientcode);
        await expect($('//td[normalize-space()="' + clientname + '"]')).toBeExisting();
        await CabinetPage.openQuickFind(clientname);
        await expect($('[aria-label="toggle ' + clientname + '"]')).toBeExisting();
    });

    //it('tc004 Verify that if Client Code Required = False, the client code field is hidden when adding/editting a new client.', async () => {
    //    //Pre-condition: edit Client Code Required = False in [System Configuration]
    //    await SystemConfigurationPage.open();
    //    await SystemConfigurationPage.editList("Client Code Required", "False");
    //    await SystemConfigurationPage.save();

    //    await LoginPage.reload();
    //    await ClientMaintenancePage.open();
    //    await $('//button//i[.="person_add"]').click();
    //    await expect($('[formcontrolname="clientID"]')).not.toBeExisting();
    //    await $('//button[normalize-space()="Cancel"]').click();

    //    await ClientMaintenancePage.searchClient(clientname);
    //    await $('//td[normalize-space()="' + clientname + '"]/parent::tr//button[@mattooltip="Rename Client"]').click();
    //    await expect($('[formcontrolname="clientID"]')).not.toBeExisting();
    //    await $('//button[normalize-space()="Cancel"]').click();
    //});

    //it('tc003 Verify that if Client Code Required = True, the Client Code field is shown and required when adding/editing a new client.', async () => {
    //    //Pre-condition: edit Client Code Required = True in [System Configuration]
    //    await SystemConfigurationPage.open();
    //    await SystemConfigurationPage.editList("Client Code Required", "True");
    //    await SystemConfigurationPage.save();

    //    await LoginPage.reload();
    //    await ClientMaintenancePage.open();
    //    await $('//button//i[.="person_add"]').click();
    //    await expect($('[formcontrolname="clientID"]')).toBeExisting();
    //    await $('//button[normalize-space()="Cancel"]').click();

    //    await ClientMaintenancePage.searchClient(clientname);
    //    await $('//td[normalize-space()="' + clientname + '"]/parent::tr//button[@mattooltip="Rename Client"]').click();
    //    await expect($('[formcontrolname="clientID"]')).toBeExisting();
    //    await $('//button[normalize-space()="Cancel"]').click();
    //});

    it('tc006 Verify the user cannot add/ rename a client with the name that already exists', async () => {
        await ClientMaintenancePage.open();
        await ClientMaintenancePage.createClient(clientname, clientcode);
        let isExist = await ClientMaintenancePage.isPopupExist("The client " + clientname + " already exists");
        await expect(isExist).toEqual(true);
        await $('//button[normalize-space()="Cancel"]').click();
    });

    it('tc007 Verify that user can add Client Structure for a client', async () => {
        ////Pre-condition: grant Add Client Structure permission
        ////await LoginPage.logout();
        ////await LoginPage.login(superadmin, password);
        //await GroupPermissionMaintenancePage.open();
        //await GroupPermissionMaintenancePage.focusOn("Automation " + date);
        //await GroupPermissionMaintenancePage.tickOn("Add Client Structure");
        //await GroupPermissionMaintenancePage.save();
        //await LoginPage.logout();

        //await LoginPage.login(superadmin2, password);
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
        //await LoginPage.logout();
        //await LoginPage.login(superadmin, password);
        //await GroupPermissionMaintenancePage.open();
        //await GroupPermissionMaintenancePage.focusOn("Automation " + date);
        //await GroupPermissionMaintenancePage.tickOn("Delete Client");
        //await GroupPermissionMaintenancePage.save();
        //await LoginPage.logout();

        //await LoginPage.login(superadmin2, password);
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

//    it('tc009 Verify that user cannot delete a client if there is any task that is assigned to that client', async () => {
//        //Precondition 1: create a new client
//        //Precondition 2: create a task and in Entity field, select client in Precondition 1
//        let clientname = "A New Client Aug 2016-1152";
//        let errorMessage = "Cannot delete the client \"" + clientname + "\" because it is assigned to one or more tasks.";
//        await LoginPage.reload();
//        await ClientMaintenancePage.open();
//        await ClientMaintenancePage.searchClient(clientname);
//        await $('//button//i[.="delete"]').click();
//        await expect($("//p[contains(text(),'" + errorMessage + "')]")).toBeExisting();
//    });

//    //it('tc010 Verify the user can see and access the Cabinet Setting page to add a new cabinet when user has “CAC Manager” permission', async () => {
//    //    //Precondition: grant CAC Managers permission to account under test
//    //    await LoginPage.reload();
//    //    await LoginPage.logout();
//    //    await LoginPage.login(superadmin, password);
//    //    await GroupPermissionMaintenancePage.open();
//    //    await GroupPermissionMaintenancePage.focusOn("Automation " + date);
//    //    await GroupPermissionMaintenancePage.tickOn("CAC Managers");
//    //    await GroupPermissionMaintenancePage.save();
//    //    await LoginPage.logout();

//    //    await LoginPage.login(superadmin2, password);
//    //    await CabinetAccessControlPage.open();
//    //    await expect($('button[title="Cabinet Access Control"]')).toBeExisting();
//    //    await CabinetSettingsPage.open();
//    //    await expect($('button[title="Cabinet Settings"]')).toBeExisting();
//    //});

//    it('tc011 Verify the user can add a new cabinet', async () => {
//        let message1 = "The cabinet \'" + cabinet_name + "\' has been created.";
//        let message2 = "Please apply access permissions for this cabinet via 'Administration - Cabinet Access Control'.";
//        let message3 = "This cabinet is not available to users until permissions are applied. Would you like to set Cabinet Access Control permission for '" + cabinet_name + "' now?";
        
//        await CabinetSettingsPage.addCabinet(cabinet_name, "None");
//        await expect($('//p[contains(.,"' + message1 + '")]')).toBeExisting();
//        await expect($('//p[contains(.,"' + message2 + '")]')).toBeExisting();
//        await expect($('//p[contains(normalize-space(),"' + message3 + '")]')).toBeExisting();
//        await $('//button[.="No"]').click();
//    });

//    it('tc012 Verify that user can see the cabinets in Cabinets/ Favourites list, Cabinet Settings page, Quickfind after applying Read permission for it on the CAC page', async () => {
//        //Precondition: grant Read Cabinet permission
//        //await LoginPage.logout();
//        //await LoginPage.login(superadmin, password);
//        //await CabinetAccessControlPage.open();
//        //await CabinetAccessControlPage.createNewGroup("Automation " + date);
//        //await CabinetAccessControlPage.focusOn("Automation " + date);
//        //await CabinetAccessControlPage.tickOnUser(superadmin2);
//        //await CabinetAccessControlPage.tickOnPermission("Read");
//        //await CabinetAccessControlPage.tickOnCabinet(cabinet_name);
//        //await CabinetAccessControlPage.save();
//        //await LoginPage.logout();

//        ////Verify in Cabinet
//        //await LoginPage.login(superadmin2, password);
//        await CabinetPage.open();
//        await expect($('//span[normalize-space()="' + cabinet_name + '"]')).toBeExisting();

//        //Verify in Favourite (issue: admin account cannot add to Favourite)
//        //await CabinetPage.addToFavourite(cabinet_name);
//        //await FavouritesPage.open();
//        //await expect($('//span[normalize-space(text())="' + cabinet_name + '"]')).toBeExisting();

//        //Verify in Quick Find
//        await $('//input[@placeholder="Quick Find"]').setValue(cabinet_name);
//        await new Promise(resolve => setTimeout(resolve, 2000));
//        await expect($('(//span[contains(text(),"' + cabinet_name + '")])')).toBeExisting();

//        //Verify in Cabinet Setting
//        await CabinetSettingsPage.open();
//        await expect($('//td[normalize-space()="' + cabinet_name + '"]')).toBeExisting();
//    });

//    it('tc014 Verify the user can not add/ rename a cabinet with the name that already exists', async () => {
//        //Precondition: grant Write Cabinet permission
//        let newCabinetName = "Clients";
//        let errorMessage = "The cabinet " + newCabinetName + " already exist";

//        //await LoginPage.logout();
//        //await LoginPage.login(superadmin, password);
//        //await CabinetAccessControlPage.open();
//        //await CabinetAccessControlPage.focusOn("Automation " + date);
//        //await CabinetAccessControlPage.tickOnPermission("Write");
//        //await CabinetAccessControlPage.save();
//        //await LoginPage.logout();

//        //await LoginPage.login(superadmin2, password);
//        await CabinetSettingsPage.open();
//        await CabinetSettingsPage.renameCabinet(cabinet_name, newCabinetName);
//        let isExist = await CabinetSettingsPage.isPopupExist(errorMessage);
//        await expect(isExist).toEqual(true);
//    });

//    it('tc013 Verify that user can select any of the available cabinet name to rename', async () => {
//        let newCabinetName = "Renamed " + cabinet_name;
//        await CabinetSettingsPage.renameCabinet(cabinet_name, newCabinetName);
//        await expect($('//td[normalize-space()="' + newCabinetName + '"]')).toBeExisting();
//    });

//    it('tc015 Verify that user can select any of the available cabinet name to delete', async () => {
//        //Precondition: grant Delete Cabinet permission
//        //await LoginPage.logout();
//        //await LoginPage.login(superadmin, password);
//        //await CabinetAccessControlPage.open();
//        //await CabinetAccessControlPage.focusOn("Automation " + date);
//        //await CabinetAccessControlPage.tickOnPermission("Delete");
//        //await CabinetAccessControlPage.save();
//        //await LoginPage.logout();

//        //await LoginPage.login(superadmin2, password);
//        await CabinetSettingsPage.open();
//        await CabinetSettingsPage.deleteCabinet("Renamed " + cabinet_name);
//        await expect($('//td[normalize-space()="' + "Renamed " + cabinet_name + '"]')).not.toBeExisting();
//    });

//    //task issue - update late
//    it('tc016 Verify the user cannot disable/ delete a DCM cabinet if there is any task that is assigned to a DCM folder in that DCM cabinet', async () => {
//        //Precondition: create task and attach in cabinet folder
//        let cabinetUnderTest = "Clients";

//        //await CabinetSettingsPage.open();
//        await $('//td[normalize-space()="' + cabinetUnderTest + '"]/following-sibling::*//i[.="create"]').click();
//        await new Promise(resolve => setTimeout(resolve, 1000));
//        await expect($('//label[normalize-space()="Enable DCM"]/preceding-sibling::input')).not.toBeExisting();
//        //Postcondition for TC017
//        await $('//button[.="Cancel"]').click();
//        await LoginPage.logout();
//    });
});