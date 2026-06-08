export class WelcomePage {
    constructor(page) {
        this.page = page;
        this.signUpButton = page.getByRole('button', { name: 'Sign up' });
    }

    async open() {
        await this.page.goto('https://guest:welcome2qauto@qauto.forstudy.space/');
    }

    async clickSignUp() {
        await this.signUpButton.click();
    }
}