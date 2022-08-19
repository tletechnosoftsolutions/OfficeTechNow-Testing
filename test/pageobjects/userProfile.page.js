const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class UserProfilePage extends Page {
    /**
     * define selectors using getter methods
     */

    get btnUserAvatar() {
        return $('.avatar-container');
    }

    get btnUserProfile() {
        return $('//button[@role="menuitem"]/span[.="Profile"]');
    }

    /**
     * open the User Profile page
     */
    async open() {
        await this.btnUserAvatar.click();
        await this.btnUserProfile.click();
        await new Promise(resolve => setTimeout(resolve, 1500));
    }

    /**
     * change user's password
     */
    async changePassword(currentPassword, newPassword) {
        await $('//button/span[.="Change password"]').click();
        await new Promise(resolve => setTimeout(resolve, 1000));
        await $('[id*=currentPassword] input').setValue(currentPassword);
        await $('input[placeholder="New Password"]').setValue(newPassword);
        await $('[id*=passwordConfirm] input').setValue(newPassword);
        await $('//button/span[.="Change Password"]').click();
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
}

module.exports = new UserProfilePage();
