class Authorities {
    elements = {

        togglesidebarmenu: () => cy.xpath("//a[@class='btn-link toggle-sidebar pg pg-menu']"),
        searchbar: () => cy.xpath('//div[@class="el-row Sidebar-el-menu-searchRow"]'),
        searchbarElement: (modelname) => cy.xpath(`//li[@class="el-menu-item-group"]//span[text()='${modelname}']`),
        breadcumElement: (modelName) => cy.xpath(`//header[@class='el-header breadCrumb-row']//li[contains(text(),'${modelName}')]`),
        addbutton: () => cy.xpath("//i[@class='etp-icon etp-add']"),
        savebutton: () => cy.xpath("//button//span[text()=' Save']"),
        cancelbutton: () => cy.xpath("//button//span[text()=' Cancel']"),
        error: () => cy.get("div[role='alert']"),
        tableheader: () => cy.xpath("//table//thead//th"),
        tablebody: () => cy.xpath("table//tbody//tr//td"),
        selectsearchoption: () => cy.get('div[class="el-col el-col-10 simplesearch-col"] input[placeholder="Select"]'),
        selectsearchoptionkey: () => cy.xpath("//div[@class='el-select-dropdown']//span[text()='Name']"),
        searchinputbox: () => cy.get('div[class="el-col el-col-19 is-guttered"] input[placeholder="Search..."]'),
        totalcount: () => cy.xpath("//span[text()='Total 1']"),
        TOOLTIPlocators: (input) => cy.xpath(`//div[@class="el-button-group actionsButton"]//button[@title='${input}']`),
        Deletemsgbox: (modelName) => cy.xpath(`//div[@class='el-message-box']//span[text()='${modelName}']`),
        DeleteButton: () => cy.xpath("//button//span[text()='Delete']"),
        addsection:()=> cy.xpath('//span[text()="Add Section"]'),
        sectionsave:()=>cy.xpath("//div[@class='el-row p-b-15']//following-sibling::div//span[text()='Save']"),
        atttibuteadd:()=>cy.xpath("//div[@class='el-row p-b-15']//following-sibling::div//span[text()='Add']"),
        updatetemplatebox:()=>cy.xpath('//div[@class="el-message-box"]//span[text()="Update Template"]'),
        updatetemplatexboxokbutton:()=>cy.xpath('//button//span[text()="Ok"]'),
        aliasbreadcum:(modelName)=>cy.xpath(`//header[@class="el-header breadCrumb-row"]//li//a[text()="${modelName }"]`),
        aliasinputbox:()=>cy.xpath('//div[@class="el-popover__title"]//following-sibling::div//input[@type="text"]'),
        aliasinputboxOkButton:()=>cy.xpath('//div[@class="el-popover__title"]//following-sibling::div//button[@class="el-button el-button--primary"]')

    }
    authorityinputfieldElements = {

        inputlocators: (inputName) =>
            cy.xpath(`//label[text()='${inputName}']//following-sibling::div//*[self::input or self::textarea]`),
        inputerrormessage: (errormessage) => cy.xpath(`//div[@class='el-form-item__error' and text()='${errormessage}']`)
            .should('be.visible'),  // Ensure the error message is visible
        //.and(`contain.text', '${errormessage}'`) // Check if the text matches exactly
        authoritycheckboxinhomepage: () =>
            cy.xpath("//button[@class='el-button is-link el-tooltip__trigger']"),
        checkbox: (authorityname) =>
            cy.xpath(`//div[@class='el-checkbox-group el-authorityPopover wrap-scrollbar']//span[text()='${authorityname}']`),
        Apply: () => cy.xpath("//button[@type='button']//span[text()='Apply']"),
        URL: (input) => cy.visit(`https://etrm-stage.anbetrack.com/track/#/workarea${input}`)




    }

    commonValidation(mockdata) {
        this.elements.togglesidebarmenu().click({ force: true })
        this.elements.searchbar().type(mockdata.searchbarElement)
        // this.elements.searchbarElement((mockdata.searchbarElement)).click()
        this.elements.searchbarElement(mockdata.searchbarElement).click()
        cy.url().then((url)=>{
            cy.log("the url are",url)
            if(['admin/categories', 'admin/subcategories', 'admin/programTypes','admin/markets'].some(sub => url.includes(sub))) 
                {
            //    this.elements.aliasbreadcum(mockdata.searchbarElement).click()
            //    cy.log('loopentered')
            cy.xpath('//header[@class="el-header breadCrumb-row"]').then(($ele)=>{
                cy.wrap($ele).should('be.visible',{timeout:10000}).invoke('text')
                .then((msg)=>{
                    cy.log("the msg are",msg)
                    expect(msg).to.contains(mockdata.searchbarElement)
                })
            })
            }else{
                this.elements.breadcumElement((mockdata.breadcumElement)).should('exist')
            }
        })
        this.elements.addbutton().should('be.visible').click({ force: true })
        this.elements.breadcumElement((mockdata.addbreadcum)).should('be.visible')
        cy.url().then((url)=>{
            if(['/admin/SubCategory'].some(sub => url.includes(sub))) {
                cy.xpath('//button//span[text()="Save"]').click()
            }else{
                this.elements.savebutton().should('be.visible').click()

            }

        })
        this.elements.error().should('be.visible').and('contains.text', mockdata.error)
    }
    tablevalueassert(dataname) {
        if (dataname) {
            this.elements.selectsearchoption().click()
            this.elements.selectsearchoptionkey().click()
            this.elements.searchinputbox().type(`${dataname}{enter}`)
            cy.wait(1000)
            //this.elements.searchinputbox().type(`${mockdata.dataname}{enter}`);
            this.elements.totalcount().should('be.visible')
            this.elements.tableheader().each(($ele, index) => {
                if ($ele.text().trim() === "Name") {
                    cy.xpath(`//table/tbody/tr/td[${index + 1}]`).should('contain.text', dataname);
                    cy.log("The data is present in the table grid")
                }
            })
        }

    }
    //title="Delete",title="View"title="Edit"
    CRUDoperation(mockdata, breadcumvalue, dataname, optionkey,tooltipvalidation,key) {
        if (mockdata === "Edit") {
            this.elements.TOOLTIPlocators(mockdata).should('exist').eq(0).click({ force: true })
            this.elements.breadcumElement(breadcumvalue).should('be.visible')
            cy.log(" ",breadcumvalue)

            //this.authorityinputfieldElements.inputlocators("Description").type('{selectall}{backspace}', { force: true });
            cy.wait(1000)
            this.authorityinputfieldElements.inputlocators("Description").clear().type("ItsgotEdited")
            cy.log("the data is edited")
            cy.wait(1000)

            // cy.log("logged values", this.authorityinputfieldElements.inputlocators("Description").type("Its got Edited"))
            cy.url().then((url)=>{
                if(['/admin/SubCategory'].some(sub => url.includes(sub))) {
                    cy.xpath('//button//span[text()="Save"]').click()
                }else{
                    this.elements.savebutton().should('be.visible').click()
    
                }
    
            })
            cy.url().then((url)=>{
                cy.log("the url are",url)
                if(url.includes('/template')){
                    this.elements.updatetemplatebox().then(($ele)=>{
                        if($ele.length>0){
                            this.elements.updatetemplatexboxokbutton().click()
                        }
                    })
        
                }
            })
        
           
            this.tablevalueassert(dataname)
            this.elements.TOOLTIPlocators(mockdata).should('exist').eq(0).click({ force: true })
            this.authorityinputfieldElements.inputlocators("Description").should('exist').invoke('val').should('eq', "ItsgotEdited", { delay: 100 })
            this.elements.cancelbutton().should('exist').click()
        } else if (mockdata === "View") {
            this.tablevalueassert(dataname)
            cy.log("view dataname", dataname)
            this.elements.TOOLTIPlocators(mockdata).should('exist').eq(0).click({ force: true })
            this.elements.savebutton().should('not.exist')
            this.elements.cancelbutton().should('exist').click()
            cy.log("the data is viewed")
        } else if (mockdata === "Delete" && optionkey) {

            if (optionkey.Y) {
                this.tablevalueassert(dataname)
                this.elements.TOOLTIPlocators(mockdata).should('exist').eq(0).click({ force: true });

                // Wait for delete confirmation box
                this.elements.Deletemsgbox(breadcumvalue).should('exist');

                // Click delete button
                this.elements.DeleteButton().should('exist').click();
                cy.wait(2000)
                this.elements.error().then(($ele) => {
                    cy.wrap($ele)
                    .should('be.visible',{timeeout:10000}).invoke('text')
                    .then((message)=>{
                        cy.log('the message is',message)
                         expect(message).to.eq(tooltipvalidation.deletesuccessmsg)
                        cy.log("the data is deleted")
                    })
                })
            } else {
                cy.log("skipped")
            }
        }

    }

}








export default new Authorities();
