require 'watir'
require 'rspec'

describe "Verify Login form of Caregiver tracker" do
    before(:all) do
        @browser = Watir::Browser.new
        @browser.goto 'http://localhost:4200/'
    end

    it "should verify whether error message is displayed for empty and invalid fields" do
        @browser.text_field(name: 'loginEmail').send_keys "", :tab
        expect(@browser.span(id: 'loginEmailError').text).to eq 'Email field is required'
        @browser.text_field(name: 'loginEmail').send_keys [:control, 'a'], :backspace, "abc", :tab
        expect(@browser.span(id: 'loginEmailError').text).to eq 'Please enter a valid email'
        @browser.text_field(name: 'loginPassword').send_keys "", :tab
        expect(@browser.span(id: 'loginPasswordError').text).to eq 'Password field is required'
        expect(@browser.button(text: 'Log me In!').attribute_value('disabled')).to eq 'true'
    end

    it "should have login button enabled when entries are valid" do
        @browser.text_field(name: 'loginEmail').send_keys [:control, 'a'], :backspace, "abc@gmail.com", :tab
        @browser.text_field(name: 'loginPassword').send_keys [:control, 'a'], :backspace, "abcA123@", :tab
        expect(@browser.button(text: 'Log me In!').attribute_value('disabled')).to eq nil
    end
end
