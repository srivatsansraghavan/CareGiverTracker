*** Settings ***
Library  SeleniumLibrary

*** Variables ***
${VALID_EMAIL}  abc@gmail.com
${INVALID_EMAIL}    abc
${VALID_PASSWORD}    abcA123@

*** Test Cases ***
Verify Login form of Caregiver Tracker
    Open Browser  url=http://localhost:4200
    Input Text    loginEmail    ${EMPTY}  clear=True
    Press Keys    loginEmail    TAB
    Element Should Contain  loginEmailError  Email field is required
    Input Password    loginPassword    ${EMPTY}  clear=True
    Press Keys    loginPassword    TAB
    Element Should Contain  loginPasswordError  Password field is required

    Input Text    loginEmail    ${INVALID_EMAIL}  clear=True
    Press Keys    loginEmail    TAB
    Element Should Contain  loginEmailError  Please enter a valid email

    Element Should Be Disabled    //button[contains(text(), 'Log me In!')]
    Input Text    loginEmail    ${VALID_EMAIL}  clear=True
    Input Password    loginPassword    ${VALID_PASSWORD} clear=True
    Element Should Be Enabled    //button[contains(text(), 'Log me In!')]
    Close Browser