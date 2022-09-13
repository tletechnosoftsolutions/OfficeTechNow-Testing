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
const SearchPage = require('../pageobjects/search.page');
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
const download_path = "C:/Users/TLe/Downloads/";


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


describe('Document Search/Folder Search', () => {
    let accountA = superadmin2;
    let fileName = "testfile.xlsx";
    
    it('tc001 Verify that user can click on a record in the search results and select "Go to Location" to navigate to Client/cabinet/folder contain the created file', async () => {
        await SearchPage.open();
        await SearchPage.typeInSearchBox("testfile.xlsx");
        await SearchPage.clickOnSearch();
        await SearchPage.tickOn("Clients\\A New Client Aug 2016-1152\\2021")
        await SearchPage.goToLocation();
        await expect($('[aria-label="toggle A New Client Aug 2016-1152"]')).toBeExisting();
    });
    
    it('tc002 Verify that user can download the selected file in Document Search', async () => {
        await SearchPage.open();
        await new Promise(resolve => setTimeout(resolve, 25000)); //take time to search again
        //await SearchPage.typeInSearchBox("testfile.xlsx");
        //await SearchPage.clickOnSearch();
        await SearchPage.tickOn("2022.08.30-15.43-testfile.xlsx")
        await SearchPage.downloadFile();

        let download_fileName = "2022.08.30-15.43-testfile.xlsx";
        let fs = require('fs');
        let isExist = fs.existsSync(download_path + download_fileName);
        await expect(isExist).toEqual(true);
    });

    it('tc003 Verify that user can clear data search and search result when clicking Clear button on Document Search', async () => {
        //Fulfill all fields
        await SearchPage.tickOnMatchWholeWord();
        await SearchPage.selectFileType(".xlsx");
        await SearchPage.typeMaxResult("300");
        await SearchPage.typeCabinet("Prospects");
        await SearchPage.selectClient("AutomationTest");
        await SearchPage.selectAuthor(superadmin);
        await SearchPage.typeSubject("Subject A");
        await SearchPage.typeComment("testing comment");
        await SearchPage.selectNamingConvention("File Note");
        await SearchPage.typeFromToDate();
        await SearchPage.selectFileDate("2022", "9", "8");
        await SearchPage.clearSearch();
    });
    

    it('tc004 Verify that user can export search results when clicking Export button on Document Search', async () => {
        let fs = require('fs');
        let files = fs.readdirSync(download_path);
        let fileName_prefix = "SearchResults_";

        let today = new Date();
        let date_postfix = ('0' + today.getDate()).slice(-2) + ('0' + (today.getMonth() + 1)).slice(-2) + today.getFullYear();

        await SearchPage.typeInSearchBox("testfile.xlsx");
        await SearchPage.clickOnSearch();
        await SearchPage.exportSearch();
        await expect(files.toString().includes(fileName_prefix + date_postfix)).toEqual(true);
    });

    it('tc005 Verify that user can search data with all fields on the Document Search', async () => {
        let fileName = '2022.08.30-15.43-testfile.xlsx';
        await SearchPage.typeInSearchBox(fileName);
        await SearchPage.tickOnClientCabinetOnly();
        await SearchPage.selectFileType(".xlsx");
        await SearchPage.typeMaxResult("300");
        await SearchPage.selectClient("A New Client Aug 2016-1152");
        await SearchPage.selectAuthor(superadmin);
        await SearchPage.typeSubject("Subject A");
        await SearchPage.typeComment("testing upload");
        await SearchPage.selectNamingConvention("File Note");
        await SearchPage.typeFromToDate('8/6/22','8/9/22');
        await SearchPage.clickOnSearch();

        await expect($('//span[text()="' + fileName + '"]')).toBeExisting();
    });

    it('tc006 Verify that user will be redirected to the last folder when choosing "Go to client" on the Folder Search', async () => {

    });
});
