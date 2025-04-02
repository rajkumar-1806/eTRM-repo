class TRMversion{
    elements={
        selectauthority:()=>cy.get('input[placeholder="Select Authority"]'),
        inputlocators: (inputName) =>
            cy.xpath(`//label[text()='${inputName}']//following-sibling::div//*[self::input or self::textarea]`),
    }
}
export default new TRMversion()