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

describe('HJ Volumn testing', () => {
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
    it('Outbound Printing Module tested by CYP01', () => {

      const DFTimeout = cy.config('Default_Timeout');
      const PLTimeout = cy.config('Default_Timeout');

      cy.contains('倉庫管理儀表板', { timeout: DFTimeout }).click();
      cy.contains('出庫').click();
      cy.contains('驗放包裝').click();
      cy.contains('EC 包件單據列印').click();

      // input coditions
  //    cy.get('.k-textbox:eq(0)').type('0'); //波次代號
  //    cy.get('.k-textbox:eq(1)').type('1'); //揀貨批次
  //    cy.get('.k-textbox:eq(2)').type('2'); //出貨單號
  //    cy.get('.k-textbox:eq(3)').type('3'); //系統出庫單號
  //    cy.get('.k-textbox:eq(4)').type('4'); //包件條碼
  //    cy.get('.k-textbox:eq(5)').type('5'); //載具代號
  //    cy.get('.k-textbox:eq(6)').type('6'); //配送編號
  //    cy.get('.k-textbox:eq(7)').type('7'); //發運批次號
      cy.fixture('User1Data').then((data) => {
        // 'data' now contains the content of 'fixtures/data.json'

        //ERP_Site
        cy.get('select[data-role="dropdownlist"]:eq(2)', { timeout: PLTimeout }).invoke('show'); //設定下拉選單屬性變得可見
        cy.get('select[data-role="dropdownlist"]:eq(2)').select(7); // 使用 .select() 選擇所需的選項


        const itemList = data.Carton_Items;
        
        // Perform actions using the loaded data
        cy.log(`Total Carton_Items: ${itemList.length}`);
        //console.log(`Total items: ${itemList.length}`);
        
        // Example: Log values of each item
        itemList.forEach((Carton_Items, index) => {
          cy.log(`Item ${index + 1}: Value: ${Carton_Items.Carton_Label}`);
          
          cy.get('.k-textbox:eq(4)').type(Carton_Items.Carton_Label); 
          
          //cy.get('select[data-role="dropdownlist"]:eq(11)', { timeout: PLTimeout }).invoke('show'); //設定下拉選單屬性變得可見
          //cy.get('select[data-role="dropdownlist"]:eq(11)').select(3); // 使用 .select() 選擇所需的選項
          cy.contains('查詢').click();
          cy.get('[role="rowgroup"]').should('exist'); //等待rowgroup 存在

          //Printing
          
          cy.contains('span', Carton_Items.Carton_Label )
          .parents('tr')  // 讀取其在的表格行中
          .find('span:contains("[出貨明細]")') //讀取span=出貨明細
          .click();
          

          cy.get('a[data-hj-test-id="active-thread-previous-button"]', { timeout: PLTimeout }).should('exist').click();
          cy.get('.k-textbox:eq(4)').clear(); 

        });
        
      });
      
    })

})
