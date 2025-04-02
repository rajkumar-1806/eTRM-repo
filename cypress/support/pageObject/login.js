class Login {
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
    get error(){
        return cy.get("div[class='el-message el-message--error']")
    }
    get profileicon(){
        return cy.xpath("//div[@class='userprofile']")
    }
    get signoutbutton(){
        return cy.xpath("//button[@class='el-button el-button--default']//span[text()=' Sign Out']")
    }

    login(data) {
        cy.visit( "https://etrm-stage.anbetrack.com/",);
        //onsole.log('data',data)

        data.forEach((element)=>{
             // Using getters to interact with elements
        if(element.userName && element.password){
            this.userName.should('be.visible').clear().type(element.userName);
            this.password.should('be.visible').clear().type(element.password);
        }
        this.signInButton.should('be.visible').click();
        this.error.should('be.visible').and('contains.text',element.error)
        // Verify successful login
        if(element.valid){
            this.welcomeMessage.should('be.visible');
        }
        

        })

      
    }
}

export default new Login();
