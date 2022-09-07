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
        await $('(//button/span[contains(.,"Search")])[1]').setValue(searchContent);
    }

    /**
     * click on search button
     */
    async clickOnSearch() {
        await $('//button/span[contains(.,"Search")]').click();
        await new Promise(resolve => setTimeout(resolve, 5000));
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
     * open the Search page
     */
    async open() {
        await this.btnHome.click();
        await this.btnSearch.click();
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
}

module.exports = new InTraysPage();
