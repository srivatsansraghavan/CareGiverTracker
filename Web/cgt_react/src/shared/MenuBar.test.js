import { BrowserRouter } from "react-router-dom";
import MenuBar from "./MenuBar";
import { render, screen, fireEvent } from "@testing-library/react";
import axios from "axios";

jest.mock("axios");

describe("MenuBar Component", () => {
  test("shows Caregiver tracker as header text", () => {
    render(
      <BrowserRouter>
        <MenuBar />
      </BrowserRouter>
    );
    const menubarHeaderText = screen.getByText(/Caregiver Tracker/i);
    expect(menubarHeaderText).toBeInTheDocument();
  });

  test("shows Signup and Login buttons", () => {
    render(
      <BrowserRouter>
        <MenuBar />
      </BrowserRouter>
    );
    const menubarSignupText = screen.getByText(/signup/i);
    expect(menubarSignupText);
    const menubarLoginText = screen.getByText(/login/i);
    expect(menubarLoginText).toBeInTheDocument();
  });

  test("shows Signup Modal when signup button is clicked", () => {
    render(
      <BrowserRouter>
        <MenuBar />
      </BrowserRouter>
    );

    const signUpButton = screen.getByTestId("signup-button");
    fireEvent.click(signUpButton);
    const signUpModal = screen.getByTestId("modal-title");
    expect(signUpModal).toHaveTextContent("Sign Up");
  });

  test("signs up user when correct values are given", () => {
    axios.post.mockResolvedValueOnce({
      access_token: "sdfsf",
      logged_in_user: "abcd",
      logged_in_email: "abcd",
    });
  });
});
