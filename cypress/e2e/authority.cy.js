/// <reference types = 'cypress'/>
import loginelements from "../support/pageObject/overalllogin"
import loginmockdata from "../fixtures/overalllogin.json"
import authorityelements from "../support/pageObject/authorities"
import Authoritiesmockdata from "../fixtures/authorities.json"
import TRMmockdatatablevalidation from "../fixtures/trm.json"
import TRMelements from "../support/pageObject/trm"
const TRMmockdata = require("../fixtures/trm")()
import Templatemockdata from "../fixtures/Templates.json"
import Templatemockdata from "../fixtures/Templates.json"

describe("authorityTrmTeamplatesuit", () => {
    before(() => {
        cy.session('usersession', () => {
            loginelements.login(loginmockdata)// Tenant user login
        })
    })
    var generatedAuthorityName = ''
    it("authoritysuit", () => {
        authorityelements.authorityinputfieldElements.URL("/admin/authorities")
        // Functionality wise common validation
        authorityelements.commonValidation(Authoritiesmockdata.commonvalidationData);
        //input fields validation
        Authoritiesmockdata.authorityDats.forEach((element, index) => {
            cy.log("the key and values are", element)
            for (let keys in element) {
                if (keys === "phoneerromsg" || keys === "emailerror" || keys === "Description")//neglecting these keys from the object bcoz both are the erro messsages 
                {
                    continue;
                }
                cy.log("keys are", keys)
                cy.log("valuese", element[keys])
                authorityelements.authorityinputfieldElements.inputlocators(keys).type("{selectall}{del}" + element[keys])
                if (keys === "Name" || keys === "Contact Name" || keys === "Code")//generating the random string for these keys
                {
                    const randomname = Math.random().toString(36).substring(7, 10);
                    authorityelements.authorityinputfieldElements.inputlocators(keys).type(randomname)
                    if (keys === "Name") {
                        generatedAuthorityName = randomname; // Store the name for later use

                    }
                }
                if (index === 0 && keys === "Contact Email") //email field wise validation
                {
                    authorityelements.elements.savebutton().click()
                    authorityelements.authorityinputfieldElements.inputerrormessage(Authoritiesmockdata.authorityDats[0].emailerror)
                    authorityelements.elements.error()
                        .should('be.visible')
                        .and('contain.text', Authoritiesmockdata.commonvalidationData.error)
                }
            }
        })
        authorityelements.elements.savebutton().click()//save the authority with the valid credentials
        cy.log(`Generated Authority Name: ${generatedAuthorityName}`);
        cy.wait(10000)
        cy.reload()//reloading the page to fetch the created authority in the tenant
        cy.wait(10000)
        authorityelements.authorityinputfieldElements.URL("/home")//visiting the home page
        authorityelements.authorityinputfieldElements.authoritycheckboxinhomepage().click()
        cy.wait(10000)
        authorityelements.authorityinputfieldElements.checkbox(generatedAuthorityName).click()//checking the created authority
        authorityelements.authorityinputfieldElements.Apply().click()
        cy.wait(10000)
        // authorityelements.authorityinputfieldElements.URL("/admin/authorities")
        authorityelements.authorityinputfieldElements.URL("/admin/authorities")
        authorityelements.tablevalueassert(generatedAuthorityName)//asserting the creating record in the table grid
        Object.entries(Authoritiesmockdata.tooltipvalidation).forEach(([key, value]) => {
            cy.log("the key and values are", key, value)
            authorityelements.CRUDoperation(key, value, generatedAuthorityName, Authoritiesmockdata.tooltipvalidation)
        })

    })
    it("TRM suit", () => {
        let TRMversionName = ""
        cy.log("TRMmockdata", TRMmockdata)
        authorityelements.authorityinputfieldElements.URL("/admin/trmVersions")
        authorityelements.commonValidation(TRMmockdata.commonvalidationData)
        TRMmockdata.trmvalidationdata.forEach((element) => {
            cy.log("The elements are", element);
            for (let keys in element) {
                cy.log("the keys are ", keys)
                cy.log("the values are", element[keys])
                if (keys === "Description" || keys === "error") {
                    continue; // Skip these fields
                }
                if (keys === "Name") {
                    const randomname = Math.random().toString(36).substring(7, 10);
                    TRMelements.elements.inputlocators(keys).clear().type(randomname);
                    cy.log("The TRM Name is", randomname);
                    if (keys === "Name") {
                        TRMversionName = randomname; // Store the name for later use
                        cy.log(`the logged trm name is,${TRMversionName}`)
                    }
                }
                else if (keys === "Authority") {
                    TRMelements.elements.inputlocators(keys).click();
                    cy.get('div.el-select-dropdown').then(($dropdown) => {
                        if (!generatedAuthorityName) {
                            cy.wrap($dropdown).find('span').first().click()
                        } else {
                            cy.wrap($dropdown).contains('span', generatedAuthorityName)
                                .click();
                        }
                    })
                }
                else {
                    TRMelements.elements.inputlocators(keys).clear().type(element[keys])
                }
            }
            authorityelements.elements.savebutton().click()
            authorityelements.elements.error().should('be.visible').and('contains.text', element["error"])

        })
        authorityelements.tablevalueassert(TRMversionName)
        Object.entries(TRMmockdatatablevalidation.tooltipvalidation).forEach(([key, value]) => {
            cy.log("the key and values are", key, value)
            authorityelements.CRUDoperation(key, value, TRMversionName, { Y: true }, TRMmockdatatablevalidation.tooltipvalidation)
        })

    });
    it.only("templatesuit", () => {
        let templateName = ""
        authorityelements.authorityinputfieldElements.URL("/admin/templates")
        authorityelements.commonValidation(Templatemockdata.commonvalidationData);
        Object.entries(Templatemockdata.inputData).forEach(([keys, values]) => {
            cy.log("the keys are", keys)
            cy.log("the values are", values)
            const randomname = Math.random().toString(36).substring(7, 10);
            if (keys === "Name") {
                authorityelements.authorityinputfieldElements.inputlocators(keys).type(randomname)
                authorityelements.elements.savebutton().should('exist').click()
                authorityelements.elements.error().should('be.visible').and('contains.text', values)
                if(keys==="Name"){
                    templateName = randomname
                    cy.log("the template name",templateName)
                }
            } else if (keys === "Authority") {
                cy.log("the loop netered")
                authorityelements.authorityinputfieldElements.inputlocators(keys).click()
                cy.get('div.el-select-dropdown').then(($dropdown) => {
                    if (!generatedAuthorityName) {
                        cy.wrap($dropdown).find('span').first().click()
                    } else {
                        cy.wrap($dropdown).contains('span', generatedAuthorityName)
                            .click()
                    }
                    authorityelements.elements.savebutton().should('exist').click()
                    authorityelements.elements.error().should('be.visible').and('contains.text', values)
                    authorityelements.elements.addsection().should('exist').click()
                })
            } else if (keys === "Section Name ") {
                authorityelements.authorityinputfieldElements.inputlocators(keys).type(randomname)
                authorityelements.elements.sectionsave().should('exist').click()
                authorityelements.elements.error().should('be.visible').and('contains.text', values)
            } else if (keys === "Attribute Name") {
                authorityelements.authorityinputfieldElements.inputlocators(keys).type(randomname)
                authorityelements.elements.atttibuteadd().should('exist').click()
                authorityelements.elements.error().should('be.visible').and('contains.text', values)
            } else if (keys === "Display Name") {
                authorityelements.authorityinputfieldElements.inputlocators(keys).type(randomname)
                authorityelements.elements.atttibuteadd().should('exist').click()
                authorityelements.elements.savebutton().should('exist').click()
                authorityelements.elements.error().should('be.visible').and('contains.text', values)
            }
           
            
        })
        authorityelements.tablevalueassert(templateName)
        Object.entries(Templatemockdata.tooltipvalidation).forEach(([key, value]) => {
            cy.log("the key and values are", key, value)
            authorityelements.CRUDoperation(key, value, templateName, { Y: true }, Templatemockdata.tooltipvalidation)
        })

       
        
       
        
    })






})
