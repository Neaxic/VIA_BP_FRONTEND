"use client";
import * as React from "react";
import { cn } from "../lib/utils";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { createUserApi } from "../app/api/communication";
import { LoginUserApi } from "../app/api/communication";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [username, SetUsername] = React.useState<string>("");
  const [password, SetPassword] = React.useState<string>("");
  const [isAdmin, SetIsAdmin] = React.useState<boolean>(false);
  const [isCreateURL, setIsCreateURL] = React.useState<boolean>(false); // Initialize with false

  // Use useEffect to update isCreateURL only on the client side
  React.useEffect(() => {
    setIsCreateURL(
      window.location.href === "http://localhost:3000/authentication/create"
      //Kig SIDEBAR
    );
  }, []);

  const login = async () => {
    const data = await LoginUserApi(username, password);
  };
  const create = async () => {
    const data = await createUserApi(username, password, isAdmin);
  };

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    console.log(username, password, isAdmin);
    setIsLoading(true);

    if (isCreateURL) {
      await create();
    } else {
      await login();
    }

    setIsLoading(false);
  }

  const handleAdminCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    SetIsAdmin(e.target.checked);
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="Gavin@hooli.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              onChange={(e) => SetUsername(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              placeholder="************"
              type="password"
              autoCapitalize="none"
              autoComplete="password"
              onChange={(e) => SetPassword(e.target.value)}
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <div>
            <Input
              type="checkbox"
              id="Isadmin"
              name="Isadmin"
              checked={isAdmin}
              onChange={handleAdminCheckboxChange}
              className={!isCreateURL ? "hidden" : ""}
            />
          </div>
          <Button disabled={isLoading} className="mt-4">
            {isLoading ? (
              <> {/* Icons.spinner can be placed here if needed */}</>
            ) : isCreateURL ? (
              "Create"
            ) : (
              "Sign In"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
