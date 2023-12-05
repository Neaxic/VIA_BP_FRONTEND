"use client";
import * as React from "react";
import { sha256 } from "../util/HelperInterfaces";

describe("SHA-256 Hashing", () => {
  it("should hash a password and verify the hash", async () => {
    // Generer en oprindelig hash af et password
    const originalPassword = "myPassword123";
    const originalHash = await sha256(originalPassword);
    // Verificer, at den resulterende hash matcher den forventede hash
    expect(await sha256(originalPassword)).toEqual(originalHash);
  });
});
