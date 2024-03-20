@echo "Start Cypress";

set CYPRESS_RECORD_KEY=d0196f11-cbeb-4903-8e37-db6cb241fdc1
set COMMIT_MESSAGE=user1_Out

npx cypress run --record -k %CYPRESS_RECORD_KEY% -t "%COMMIT_MESSAGE%" --spec "cypress/e2e/1-getting-started/OutboundToDo.cy.js"