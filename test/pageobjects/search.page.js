const Page = require('./page');
const ks = require('node-key-sender');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class InTraysPage extends Page {
    /**
     * define selectors using getter methods
     */
    get btnHome() {
        return $('//span[text()="Home"]');
    }
   
    get btnSearch() {
        return $('button[title="Search"]');
    }

    /**
     * searchType: Document Search, Folder Search
     */
    async goTo(searchType) {
        await $('//span[contains(text(),"' + searchType + '")]').click();
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    /**
     * type in search box
     */
    async typeInSearchBox(searchContent) {
        await $('(//input[@type="text"])[2]').setValue(searchContent);
    }

    /**
     * click on search button
     */
    async clickOnSearch() {
        await $('(//button/span[contains(.,"Search")])[1]').click();
        await new Promise(resolve => setTimeout(resolve, 25000));
    }

    /**
     * tick on radiobox of file or document
     */
    async tickOn(objName) {
        await $('(//span[contains(.,"' + objName + '")])[1]').click();
        await new Promise(resolve => setTimeout(resolve, 100));
    }

    /**
     * go to location cabinet after tick on file
     */
    async goToLocation() {
        await $('button[mattooltip="Go to location"]').click();
        await new Promise(resolve => setTimeout(resolve, 2000));
    }

    /**
     * download file after tick on file
     */
    async downloadFile() {
        await $('[mattooltip="Download file"]').click();
        await new Promise(resolve => setTimeout(resolve, 5000));
    }
    /**
     * fulfill methods
     */
    async tickOnClientCabinetOnly() {
        await $('//span[contains(normalize-space(),"Client Cabinet only")]').click();
    }

    async tickOnMatchWholeWord() {
        await $('//span[contains(normalize-space(),"Match Whole Word")]').click();
    }

    async typeMaxResult(numResult) {
        await $('[formcontrolname="maxItemsToRetrieve"]').setValue(numResult);
    }

    async selectFileType(fileType) {
        await $('[formcontrolname="fileExtension"] input').click();
        await new Promise(resolve => setTimeout(resolve, 200));
        await $('//ng-dropdown-panel//div[contains(normalize-space(text()),"' + fileType + '")]').scrollIntoView();
        await $('//ng-dropdown-panel//div[contains(normalize-space(text()),"' + fileType + '")]').click();
        await new Promise(resolve => setTimeout(resolve, 500));
    }

    async typeCabinet(cabinetName) {
        await $('[formcontrolname="cabinet"] input').setValue(cabinetName);
        await new Promise(resolve => setTimeout(resolve, 1000));
        await $('(//ng-dropdown-panel//div[normalize-space(text())="' + cabinetName + '"])[1]').click();
    }

    async selectClient(clientName) {
        await $('[formcontrolname="client"] input').click();
        await new Promise(resolve => setTimeout(resolve, 200));
        await $('//ng-dropdown-panel//div[normalize-space(text())="' + clientName + '"]').scrollIntoView();
        await $('//ng-dropdown-panel//div[normalize-space(text())="' + clientName + '"]').click();
        await new Promise(resolve => setTimeout(resolve, 500));
    }

    async selectAuthor(authorName) {
        await $('[formcontrolname="author"] input').click();
        await new Promise(resolve => setTimeout(resolve, 200));
        await $('//ng-dropdown-panel//div[normalize-space(text())="' + authorName + '"]').scrollIntoView();
        await $('//ng-dropdown-panel//div[normalize-space(text())="' + authorName + '"]').click();
        await new Promise(resolve => setTimeout(resolve, 500));
    }

    async typeSubject(content) {
        await $('[formcontrolname="subject"]').setValue(content);
    }

    async typeComment(content) {
        await $('[formcontrolname="comment"]').setValue(content);
    }
    
    async selectNamingConvention(conventionName) {
        await $('[formcontrolname="fileTypePrefix"] input').click();
        await new Promise(resolve => setTimeout(resolve, 200));
        await $('//ng-dropdown-panel//div[contains(normalize-space(text()),"' + conventionName + '")]').scrollIntoView();
        await $('//ng-dropdown-panel//div[contains(normalize-space(text()),"' + conventionName + '")]').click();
        await new Promise(resolve => setTimeout(resolve, 500));
    }

    async typeFromToDate(fromDate, toDate) {
        if ((fromDate == "" || fromDate == null) && (toDate == "" || toDate == null)) {
            let today = new Date();
            let option = { day: 'numeric', month: 'numeric', year: '2-digit' };
            let fromDate = today.setDate(dateFormat3.getDate() - 30); //last month
            let toDate = today.setDate(dateFormat3.getDate() + 30); //next month
            await $('[formcontrolname = "fromDateCreated"] input').setValue(fromDate.toLocaleDateString(undefined, option));
            await $('[formcontrolname = "toDateCreated"] input').setValue(toDate.toLocaleDateString(undefined, option));
        }
        else {
            await $('[formcontrolname = "fromDateCreated"] input').setValue(fromDate);
            await $('[formcontrolname = "toDateCreated"] input').setValue(toDate);
        }
    }


    async selectFileDate(year, month, day) {
        if (year != null || year != "") {
            await $('//mat-label[.="Year"]//following-sibling::*//*[@class="ng-input"]').click();
            await new Promise(resolve => setTimeout(resolve, 100));
            await $('//ng-dropdown-panel//div[normalize-space(text())="' + year + '"]').scrollIntoView();
            await $('//ng-dropdown-panel//div[normalize-space(text())="' + year + '"]').click();
        }
        if (month != null || month != "") {
            await $('//mat-label[.="Month"]//following-sibling::*//*[@class="ng-input"]').click();
            await new Promise(resolve => setTimeout(resolve, 100));
            await $('//ng-dropdown-panel//div[normalize-space(text())="' + month + '"]').scrollIntoView();
            await $('//ng-dropdown-panel//div[normalize-space(text())="' + month + '"]').click();
        }
        if (day != null || day != "") {
            await $('//mat-label[.="Day"]//following-sibling::*//*[@class="ng-input"]').click();
            await new Promise(resolve => setTimeout(resolve, 100));
            await $('//ng-dropdown-panel//div[normalize-space(text())="' + day + '"]').scrollIntoView();
            await $('//ng-dropdown-panel//div[normalize-space(text())="' + day + '"]').click();
        }
    }

    /**
     * clear all search
     */
    async clearSearch() {
        await $('//span[contains(.,"Clear")]').click();
        await new Promise(resolve => setTimeout(resolve, 200));
    }

    /**
     * export search result
     */
    async exportSearch() {
        await $('//span[contains(.,"Export")]').click();
        await new Promise(resolve => setTimeout(resolve, 10000));
    }

    /**
     * open the Search page
     */
    async open() {
        await this.btnHome.click();
        await this.btnSearch.click();
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
}

module.exports = new InTraysPage();
