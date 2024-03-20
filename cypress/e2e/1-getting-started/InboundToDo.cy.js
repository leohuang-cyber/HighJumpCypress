/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe('Inbound Printing Module tested by CYP01', () => {
  before(() => {
    //訪問網頁

    cy.fixture('Config.json').then((init) => {
      var AccountID = init.Name1;
      var Password = init.Password1;
      var URL = init.Visit;

      // You can store parameters globally using the Cypress.config() object
      Cypress.Commands.add('Period', (DefaultTimeout, PageLoadTimeout) => {

        Cypress.config(init.DefaultTimeout, Default_Timeout);
        Cypress.config(init.PageLoadTimeout, PageLoad_Timeout);
      });
      
      cy.visit(URL);
      cy.get('.k-textbox[placeholder="User Name"]').type(AccountID);
      cy.get('.k-textbox[placeholder="Password"]').type(Password);

      
    });
    
    const DFTimeout = cy.config('Default_Timeout');
    const PLTimeout = cy.config('PageLoad_Timeout');

    cy.contains('Login').click();
    cy.get('#menuButtonToggle').should('exist');

    //展開選單
    cy.get('#menuButtonToggle', { timeout: DFTimeout } ).click();
    cy.contains('Supply Chain Advantage').click();

  })
    it('Inbound Module tested by CYP01', () => {

      const DFTimeout = cy.config('Default_Timeout');
      const PLTimeout = cy.config('Default_Timeout');

      cy.contains('倉庫管理儀表板', { timeout: DFTimeout }).click();
      cy.contains('入庫').click();
      cy.contains('入庫差異處理').click();

      cy.fixture('User1Data').then((data) => {
        // 'data' now contains the content of 'fixtures/data.json'

        const itemList = data.Po;
        
        // Perform actions using the loaded data
        cy.log(`Total Po: ${itemList.length}`);
        //console.log(`Total items: ${itemList.length}`);
        

        
        itemList.forEach((Po, index) => {
          
          cy.log(`Item ${index + 1}: Value: ${Po.display_po_number}`);
          
          cy.get('.k-textbox:eq(1)').type(Po.display_po_number); 
          
          cy.contains('查詢').click();
          cy.get('[role="rowgroup"]').should('exist'); //等待rowgroup 存在

          //Printing

          cy.contains('span', Po.display_po_number )
          .parents('tr')  // 讀取其在的表格行中
          .find('span:contains("[列印]")') //讀取span=列印
          .eq(1) 
          .click();
          
          

          cy.get('a[data-hj-test-id="active-thread-previous-button"]', { timeout: PLTimeout }).should('exist').click();
          cy.get('.k-textbox:eq(1)').clear(); 

        });
        
        
      });
      
    })

})
