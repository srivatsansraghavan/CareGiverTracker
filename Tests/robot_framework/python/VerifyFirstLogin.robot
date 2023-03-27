*** Settings ***
Library  SeleniumLibrary
Library  RequestsLibrary
Library  String
Library    XML

*** Variables ***
${VALID_EMAIL}  abc@gmail.com
${VALID_PASSWORD}    abcA123@
${VALID_FULLNAME}   Full Name

*** Test Cases ***
Verify first login modal dialog and click Save
    ${resp}=    GET    http://localhost:3000/clean-env-db/local

    Open Browser  url=http://localhost:4200
    
    ${SIGNUP_NUMBERS_TEXT}=    Get Text    //label[@for="signUpAddVerify"]
    ${ADD_VERIFY}=    Get Sum of Signup Add Verify Numbers    ${SIGNUP_NUMBERS_TEXT}

    Input Text    signUpEmail    ${VALID_EMAIL}  clear=True
    Input Password    signUpPassword    ${VALID_PASSWORD}   clear=True
    Input Password    signUpRepeatPassword    ${VALID_PASSWORD}   clear=True
    Input Text    signUpFullName    ${VALID_FULLNAME}   clear=True
    Input Text    signUpAddVerify   ${ADD_VERIFY}   clear=True
    Element Should Be Enabled    //button[contains(text(), 'Sign me Up!')]
    Click Button    //button[contains(text(), 'Sign me Up!')]

    Wait Until Element Is Visible    class:modal-dialog
    Element Should Be Visible    class:modal-dialog
    Element Should Be Disabled    //button[contains(text(), 'Save')]
    Select From List By Label    care-taken-of    Infant
    Input Text    care-taken-name    Girl Child
    Input Text    care-taken-dob    2022-02-03
    Select From List By Label    care-taken-gender    Female
    Element Should Be Enabled    //button[contains(text(), 'Save')]
    Click Button    //button[contains(text(), 'Save')]

    Wait Until Element Is Visible    //button[contains(text(), 'Start Feed')]
    Close Browser

Verify first login modal dialog and click later
    ${resp}=    GET    http://localhost:3000/clean-env-db/local

    Open Browser  url=http://localhost:4200

    ${SIGNUP_NUMBERS_TEXT}=    Get Text    //label[@for="signUpAddVerify"]
    ${ADD_VERIFY}=    Get Sum of Signup Add Verify Numbers    ${SIGNUP_NUMBERS_TEXT}

    Input Text    signUpEmail    ${VALID_EMAIL}  clear=True
    Input Password    signUpPassword    ${VALID_PASSWORD}   clear=True
    Input Password    signUpRepeatPassword    ${VALID_PASSWORD}   clear=True
    Input Text    signUpFullName    ${VALID_FULLNAME}   clear=True
    Input Text    signUpAddVerify   ${ADD_VERIFY}   clear=True
    Element Should Be Enabled    //button[contains(text(), 'Sign me Up!')]
    Click Button    //button[contains(text(), 'Sign me Up!')]

    Wait Until Element Is Visible    class:modal-dialog
    Element Should Be Visible    class:modal-dialog
    Element Should Be Disabled    //button[contains(text(), 'Save')]
    Select From List By Label    care-taken-of    Infant
    Input Text    care-taken-name    Girl Child
    Input Text    care-taken-dob    2022-02-03
    Select From List By Label    care-taken-gender    Female
    Element Should Be Enabled    //button[contains(text(), 'Save')]
    Click Button    //button[contains(text(), 'Later')]
    Sleep    8

    Wait Until Element Is Visible    //button[contains(text(), 'Sign me Up!')]
    Input Text    loginEmail    ${VALID_EMAIL}  clear=True
    Input Password    loginPassword    ${VALID_PASSWORD}   clear=True
    Click Button    //button[contains(text(), 'Log me In!')]

    Wait Until Element Is Visible    class:modal-dialog
    Element Should Be Visible    class:modal-dialog
    Element Should Be Disabled    //button[contains(text(), 'Save')]
    Select From List By Label    care-taken-of    Infant
    Input Text    care-taken-name    Girl Child
    Input Text    care-taken-dob    2022-02-03
    Select From List By Label    care-taken-gender    Female
    Element Should Be Enabled    //button[contains(text(), 'Save')]
    Click Button    //button[contains(text(), 'Save')]

    Wait Until Element Is Visible    //button[contains(text(), 'Start Feed')]
    Close Browser

*** Keywords ***
Get Sum of Signup Add Verify Numbers
    [Arguments]    ${ADD_VERIFY_TEXT}
    @{SPLIT_ADD_VERIFY_TEXT}=   Split String    ${ADD_VERIFY_TEXT}    +
    ${LEFT_ADD_VERIFY}=   Convert To Integer   ${SPLIT_ADD_VERIFY_TEXT}[0]
    ${RIGHT_ADD_VERIFY_EQUAL}=    Remove String    ${SPLIT_ADD_VERIFY_TEXT}[1]    =
    ${RIGHT_ADD_VERIFY}=   Convert To Integer    ${RIGHT_ADD_VERIFY_EQUAL}
    ${ADD_VERIFY}=    Evaluate    ${LEFT_ADD_VERIFY} + ${RIGHT_ADD_VERIFY}
    RETURN    ${ADD_VERIFY}