*** Settings ***
Library  SeleniumLibrary
Library    String

*** Variables ***
${VALID_EMAIL}  abc@gmail.com
${INVALID_EMAIL}    abc
@{INVALID_PASSWORD}    abc    ABC    123    abcABC    abc123    ABC123    abcA123    ABCa123    abc@123    ABC@123
...    abc@ABC    123@456
${VALID_PASSWORD}    abcA123@
${INVALID_REPEAT_PASSWORD}    abcA123!
@{INVALID_FULLNAME}    Full_Name    Full1Name
${VALID_FULLNAME}   Full Name

*** Test Cases ***
Verify Signup form of Caregiver Tracker
    Open Browser  url=http://localhost:4200
    Input Text    signUpEmail    ${EMPTY}  clear=True
    Press Keys    signUpEmail    TAB
    Element Should Contain  signUpEmailError  Email field is required
    Input Password    signUpPassword    ${EMPTY}  clear=True
    Press Keys    signUpPassword    TAB
    Element Should Contain  signUpPasswordError  Password field is required
    Input Text    signUpRepeatPassword    ${EMPTY}  clear=True
    Press Keys    signUpRepeatPassword    TAB
    Element Should Contain  signUpRepeatPasswordError  Repeat Password field is required
    Input Text    signUpFullName    ${EMPTY}  clear=True
    Press Keys    signUpFullName    TAB
    Element Should Contain  signUpFullNameError  Full Name field is required
    Input Text    signUpAddVerify    ${EMPTY}  clear=True
    Press Keys    signUpAddVerify    TAB
    Element Should Contain  signUpAddVerifyError  Adding numbers is required

    Input Text    signUpEmail    ${INVALID_EMAIL}  clear=True
    Press Keys    signUpEmail    TAB
    Element Should Contain  signUpEmailError  Please enter a valid email

    Input Text    signUpEmail    ${VALID_EMAIL}  clear=True
    Press Keys    signUpEmail    TAB
    Element Should Not Be Visible    signUpEmailError

    FOR    ${password}    IN    @{INVALID_PASSWORD}
        Input Text    signUpPassword    ${password}    clear=True
        Press Keys    signUpPassword    TAB
        Element Should Contain  signUpPasswordError  Password should have atleast one uppercase, lowercase, number and special character
    END

    Input Password    signUpPassword    ${VALID_PASSWORD}    clear=True
    Press Keys    signUpRepeatPassword    TAB
    Element Should Not Be Visible    signUpPasswordError
    Input Password    signUpRepeatPassword    ${INVALID_REPEAT_PASSWORD}    clear=True
    Press Keys    signUpRepeatPassword    TAB
    Element Should Contain   signUpRepeatPasswordError   Password and Repeat Password should be the same
    Input Password    signUpRepeatPassword    ${VALID_PASSWORD}    clear=True
    Press Keys    signUpRepeatPassword    TAB
    Element Should Not Be Visible    signUpRepeatPasswordError

    FOR    ${fullname}    IN    @{INVALID_FULLNAME}
        Input Text    signUpFullName   ${fullname}     clear=True
        Press Keys    signUpFullName    TAB
        Element Should Contain   signUpFullNameError   Full name cannot have number or special characters
    END

    Input Text    signUpFullName    ${VALID_FULLNAME}    clear=True
    Press Keys    signUpFullName    TAB
    Element Should Not Be Visible   signUpFullNameError
    
    ${SIGNUP_NUMBERS_TEXT}=    Get Text    //label[@for="signUpAddVerify"]
    ${ADD_VERIFY}=    Get Sum of Signup Add Verify Numbers    ${SIGNUP_NUMBERS_TEXT}

    Element Should Be Disabled    //button[contains(text(), 'Sign me Up!')]
    Input Text    signUpEmail    ${VALID_EMAIL}  clear=True
    Input Password    signUpPassword    ${VALID_PASSWORD}   clear=True
    Input Password    signUpRepeatPassword    ${VALID_PASSWORD}   clear=True
    Input Text    signUpFullName    ${VALID_FULLNAME}   clear=True
    Input Text    signUpAddVerify   ${ADD_VERIFY}   clear=True
    Element Should Be Enabled    //button[contains(text(), 'Sign me Up!')]
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