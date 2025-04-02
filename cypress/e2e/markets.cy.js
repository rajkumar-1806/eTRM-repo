/// <reference types = 'cypress'/>
import loginelements from "../support/pageObject/overalllogin"
import loginmockdata from "../fixtures/overalllogin.json"
import authorityelements from "../support/pageObject/authorities"
import marketsmockdata from "../fixtures/markets.json"
describe("markets", () => {
    before(() => {                           //Using hooks to maintain the session storage for the each it suit
        cy.session("sessionstorage", () => {
            loginelements.login(loginmockdata)//tenantlogin
        })
    })
    it("marketssuit", () => {
        let marketsName = ''   //declaring globalName for future use
        authorityelements.authorityinputfieldElements.URL("admin/markets")//visiting the url
        authorityelements.commonValidation(marketsmockdata.commonvalidationData)//page commonvalidation

        // Fill all input fields
Object.keys(marketsmockdata.inputData).forEach((key) => {
    if(key==="Name"||key==="Code"){
        const randomname = Math.random().toString(36).substring(7, 10)
        authorityelements.authorityinputfieldElements.inputlocators(key).type(randomname);
        if (key === "Name") {
            marketsName = randomname;
        }
    }
    
});

// Click the save button **AFTER** all fields are filled
cy.wait(500); // Add a small wait if needed to ensure all inputs are processed
authorityelements.elements.savebutton().should("exist").click();

// Verify the expected success/error message
authorityelements.elements.error()
    .should("be.visible")
    .and("contain.text", marketsmockdata.inputData.savemsg);
authorityelements.tablevalueassert(marketsName)    //asserting the created record in the page tablegrid
Object.entries(marketsmockdata.tooltipvalidation).forEach(([key, value]) => {  // performing the tooltip functionlaity
    cy.log("the key and values are", key, value)
    authorityelements.CRUDoperation(key, value, marketsName, { Y: true }, marketsmockdata.tooltipvalidation)
})


       


    })
})