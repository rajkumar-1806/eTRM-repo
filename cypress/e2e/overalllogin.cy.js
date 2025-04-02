/// <reference types = 'cypress'/>
import loginpageobjectelements from "../../cypress/support/pageObject/overalllogin"
import loginmockdata from "../../cypress/fixtures/overalllogin.json"
import AuthPom from "../support/pageObject/authorities"

describe("login", () => {
    it("loginpositvevalidation", () => {
        let insertedID
        cy.intercept('https://api-plus-stage.anbetrack.com/etrm-gateway/etrm/api/v1/authorities?q=*').as('authorityQuery')
        loginpageobjectelements.login(loginmockdata)
        //  loginelements.login(loginmockdata)
        cy.xpath("//a[@class='btn-link toggle-sidebar pg pg-menu']", { timeout: 10000 }).click()
        AuthPom.elements.searchbar().type("Authorities")
        cy.get('.ml1').click()
        // cy.wait(5000)
        // let b = "https://api-plus-stage.anbetrack.com/etrm-gateway/etrm/api/v1/authorities"
        // let c = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNDkyNTBlZjA5OTU3NmMxZTI5MDZkMSIsImZpcnN0TmFtZSI6IlJhamt1bWFyLiIsImxhc3ROYW1lIjoiZXRybSIsImVtYWlsIjoicmFqa3VtYXJAYW5ic3lzdGVtcy5jb20iLCJvcmdhbml6YXRpb24iOiJBTkIgU3lzdGVtcyIsInRlbmFudCI6ImV0cm1fYmEiLCJyb2xlcyI6WyJTdXBlckFkbWluIiwiVGVzdGluZ1B1cnBvc2UiXSwibG9naW4iOiJSYWprdW1hci5ldHJtIiwicHJvZHVjdCI6ImVUUk0iLCJkZWZhdWx0Um9sZSI6IlN1cGVyQWRtaW4iLCJoYXNSZXBvcnRBY2Nlc3MiOmZhbHNlLCJzb3VyY2UiOiJ1aSIsImVudmlyb25tZW50Ijoic3RhZ2UiLCJpYXQiOjE3NDA1MDY4ODcsImV4cCI6MTc0MDU5MzI4N30.6RTc1_HLPznC93UGR1XU6R9HETQq3ZY5W8UIsehc-JY"
        // let d = {
        //     "name": "esttinggggggggg4",
        //     "code": "fsafwaf32",
        //     "address": "fgeaagdfa",
        //     "contactName": "asrfasf",
        //     "contactPhone": "9876543210",
        //     "contactEmailId": "a@mail.com",
        //     "url": "www.a.com",
        //     "active": true
        // }
        // cy.request({
        //     url: b,
        //     method: "POST",
        //     headers: {
        //         "Authorization": "Bearer " + c
        //     },
        //     body: d
        // }).then((res) => {
        //     console.log("res", res)
        //     insertedID = res.body.insertedId
        //     cy.log('this is inserted ID', insertedID)

        // }).then(() => {
        //     cy.request({
        //         url: b + "/" + insertedID,
        //         method: "DELETE",
        //         headers: {
        //             "Authorization": "Bearer " + c
        //         },
        //         body: d
        //     }).then((delRes) => {
        //         expect(delRes.status).to.eq(200)
        //     })
        // })


    })
})