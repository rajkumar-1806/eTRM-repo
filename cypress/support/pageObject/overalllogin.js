class overALLlogin{
    get userName() {
        return cy.xpath("//input[@name='username']", { timeout: 10000 });
    }

    get password() {
        return cy.xpath("//input[@name='password']");
    }

    get signInButton() {
        return cy.xpath("//button[@class='btn btn-primary btn-cons m-t-10']");
    }

    get welcomeMessage() {
        return cy.xpath("//span[contains(text(),'Welcome')]", { timeout: 10000 });
    }
    login(data){
         data.forEach(element => {
            cy.visit( "https://etrm-stage.anbetrack.com/",);

            this.userName.should('be.visible').type(element.userName)
            this.password.should('be.visible').type(element.password)
            this.signInButton.should('be.visible').click()
            this.welcomeMessage.should('be.visible',{timeout:10000})

         });
    }
}
export default new overALLlogin()

