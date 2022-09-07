

const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class FavouritesPage extends Page {
    /**
     * define selectors using getter methods
     */
   
    get btnFavourites() {
        return $('button[title="Favourites"]');
    }


    /**
    * a method to encapsule automation code to interact with the page
    * e.g. to login using username and password
    */
    async expandFavourites(folder) {
        await new Promise(resolve => setTimeout(resolve, 3000));
        await $('button[aria-label="toggle ' + folder + '"]').click();
        await new Promise(resolve => setTimeout(resolve, 500));
    }

     /**
    * a method to collap folder
    */
    async collapFavourites(folder) {
        await $('button[aria-label="toggle ' + folder + '"]').click();
        await new Promise(resolve => setTimeout(resolve, 500));
    }

    /**
     * focus on folder
     */
    async focusOn(folderName) {
        await $('//button/span[normalize-space()="' + folderName + '"]').scrollIntoView();
        await $('//button/span[normalize-space()="' + folderName + '"]').click();
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

     /**
     * tick on file
     */
    async tickOnFile(fileName) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        await $('(//span[contains(.,"' + fileName + '")]/ancestor::td)[1]').click();
    }

     /**
     * copy file to new directory
     */
    async copyTo() {
        await $('[mattooltip="Copy To"]').click();
        await new Promise(resolve => setTimeout(resolve, 2000));
        await $('app-dialog-folder-browser [aria-label="toggle 2022"]').click();
        await $('(//app-dialog-folder-browser//button/span[contains(.,"Business")])[last()]').click();
        await new Promise(resolve => setTimeout(resolve, 500));
        await $('//button/span[.="Select"]').click();
        await new Promise(resolve => setTimeout(resolve, 3000));
    }

    /**
     * delete file
     */
    async deleteFile() {
        await $('[mattooltip="Delete"]').click();
        await new Promise(resolve => setTimeout(resolve, 1000));
        await $('//textarea').setValue("Automation test deleting");
        await $('//button[.="Delete"]').click();
        await new Promise(resolve => setTimeout(resolve, 3000));
    }

    /**
     * open the Cabinet page
     */
    async open () {
        await this.btnFavourites.click();
    }
}

module.exports = new FavouritesPage();
