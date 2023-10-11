//import React from "react";
//import { render, screen, fireEvent } from "@testing-library/react";
//import "@testing-library/jest-dom"; 
//import { UserAuthForm } from "./user-auth-form"; 
//
//describe("UserAuthForm", () => {
//  it("renders without crashing", () => {
//    render(<UserAuthForm />);
//    expect(screen.getByPlaceholderText("Gavin@hooli.com")).toBeInTheDocument();
//    expect(screen.getByPlaceholderText("************")).toBeInTheDocument();
//  });
//
//  it("updates the email and password inputs correctly", () => {
//    render(<UserAuthForm />);
//    const emailInput = screen.getByPlaceholderText("Gavin@hooli.com");
//    const passwordInput = screen.getByPlaceholderText("************");
//
//    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
//    fireEvent.change(passwordInput, { target: { value: "secret123" } });
//
//    expect(emailInput.value).toBe("test@example.com");
//    expect(passwordInput.value).toBe("secret123");
//  });
//
//  // Add more tests as needed...
//});
//function expect(value: any) {
//  throw new Error("Function not implemented.");
//}
