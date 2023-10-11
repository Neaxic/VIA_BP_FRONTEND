//import React from "react";
//import { render } from "@testing-library/react";
//import "@testing-library/jest-dom/extend-expect"; // for the "toHaveTextContent" matcher
//import { UserAuthForm } from "./path-to-your-UserAuthForm";
//
//describe("UserAuthForm", () => {
//  // Cleanup after each test
//  afterEach(() => {
//    delete window.location;
//    window.location = new URL("http://test.com");
//  });
//
//  it('shows "Create" on the button when on the /authentication/create URL', () => {
//    window.location = new URL("http://localhost:3000/authentication/create");
//
//    const { getByRole } = render(<UserAuthForm />);
//    const button = getByRole("button");
//    expect(button).toHaveTextContent("Create");
//  });
//
//  it('shows "Sign In" on the button when on any other URL', () => {
//    window.location = new URL("http://localhost:3000/authentication/login");
//
//    const { getByRole } = render(<UserAuthForm />);
//    const button = getByRole("button");
//    expect(button).toHaveTextContent("Sign In");
//  });
//});
