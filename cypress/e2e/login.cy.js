/// <reference types = 'cypress'/>
import loginelements from "../support/pageObject/login"
import loginmockdata from "../fixtures/login.json"
import AuthPom from "../support/pageObject/authorities"
describe("loginsuit",()=>{
    it("loginpositivevalidation",()=>{
        cy.intercept('tps://api-plus-stage.anbetrack.com/etrm-gateway/etrm/api/v1/authorities?q=*').as('authorityQuery')
        loginelements.login(loginmockdata)
        cy.xpath("//a[@class='btn-link toggle-sidebar pg pg-menu']", {timeout:10000}).click()
        AuthPom.elements.searchbar().type("Authorities")
        cy.xpath("//span[@class='ml1 dib fl menuItem-label menu_label-items']", { timeout: 10000 }).click()
        cy.wait(5000)
    })
})


