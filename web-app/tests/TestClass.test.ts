"use client";
import * as React from "react";
import { sha256 } from "../util/HelperInterfaces";
import { testConnection } from "../api/adminApi";
import { verifyTokenApi } from "../api/AuthAPI";

//Force env load
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

//VERY IMPORTANT - MAKE SURE THAT THEESE ALIGN, USERNAME & TOKEN MUST BE GENERATED FROM THE SAME USER
const ValidUsername = process.env.NEXT_PUBLIC_TEST_USERNAME;
const ValidPassword = process.env.NEXT_PUBLIC_TEST_PASSWORD;
const ValidWebToken = process.env.NEXT_PUBLIC_TEST_WEBTOKEN;

describe("Test process.env load", () => {
  it("Should load env variables", async () => {
    expect(ValidUsername);
    expect(ValidPassword);
    expect(ValidWebToken);
  })
});

describe("SHA-256 Hashing", () => {
  it("should hash a password and verify the hash", async () => {
    // Generer en oprindelig hash af et password
    const originalPassword = "myPassword123";
    const originalHash = await sha256(originalPassword);
    // Verificer, at den resulterende hash matcher den forventede hash
    expect(await sha256(originalPassword)).toEqual(originalHash);
  });
});

describe("Test webtoken & connection to secure endpoint", () => {
  it("Test webtoken & alignment with username", async () => {
    if (ValidWebToken) {
      //Test webtoken - added force env load to api files & token align to user
      const validToken = await verifyTokenApi(ValidWebToken);
      console.log(validToken)
      expect(ValidUsername).toEqual(validToken.email);
    } else {
      expect(ValidWebToken).toEqual("No webtoken found");
    }
  })
  it("Should return string from server", async () => {
    if (ValidWebToken) {
      //Test endpoint
      const response = await testConnection(ValidWebToken);
      expect(response).toEqual("Connected to Server!");
    } else {
      expect(ValidWebToken).toEqual("No webtoken found");
    }
  });
});

// describe("Test login & session storage", () => {
//   it("Should login, and store the oauth token", async () => {
//     // Generer en oprindelig hash af et password
//     const originalPassword = "myPassword123";
//     const originalHash = await sha256(originalPassword);
//     // Verificer, at den resulterende hash matcher den forventede hash
//     expect(await sha256(originalPassword)).toEqual(originalHash);
//   });
// });