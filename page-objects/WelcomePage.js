export class WelcomePage {
    constructor(page) {
        this.page = page;
        this.signUpButton = page.getByRole('button', { name: 'Sign up' });
    }

    async open() {
        const url = process.env.BASE_URL;
        const username = process.env.HTTP_USERNAME;
        const password = process.env.HTTP_PASSWORD;
        const cleanUrl = url.replace('https://', '');
        
        await this.page.goto(`https://${username}:${password}@${cleanUrl}`);
    }

    async clickSignUp() {
        await this.signUpButton.click();
    }
}