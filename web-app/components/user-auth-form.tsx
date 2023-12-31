"use client";
import * as React from "react";
import { cn } from "../lib/utils";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { usePathname } from "next/navigation";
import { useUserContext } from "../contexts/UserContext";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { sha256 } from "../util/HelperInterfaces";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const { login } = useUserContext();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [username, SetUsername] = React.useState<string>("");
  const [password, SetPassword] = React.useState<string>("");
  const [isAdmin, SetIsAdmin] = React.useState<boolean>(false);
  const [isCreateURL, setIsCreateURL] = React.useState<boolean>(false); // Initialize with false
  const pathname = usePathname(); // Get the pathname using the hook
  // Use useEffect to log the third part of the pathname

  const Router = useRouter();

  // Use useEffect to update isCreateURL only on the client side
  React.useEffect(() => {
    if (pathname.includes("/create")) {
      setIsCreateURL(true);
    } else {
      setIsCreateURL(false);
    }
  }, [pathname]);

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    const hashedPassword = await sha256(password);
    console.log("Hashed Password:", hashedPassword);


    const isAuthed = await login(username, hashedPassword); //Retunere bool
    if (isAuthed) {
      Router.push("/s/dashboard/overview");
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

          {isCreateURL && (
            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="password">
                Name
              </Label>
              <Input
                id="text"
                placeholder="Insert Firstname"
                type="Text"
                autoCapitalize="none"
                autoComplete="password"
                onChange={(e) => SetPassword(e.target.value)}
                autoCorrect="off"
                disabled={isAdmin}
              />
            </div>
          )}

          {isCreateURL && (
            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="password">
                Lastname
              </Label>
              <Input
                id="text"
                placeholder="Insert Lastname"
                type="Text"
                autoCapitalize="none"
                autoComplete="password"
                onChange={(e) => SetPassword(e.target.value)}
                autoCorrect="off"
                disabled={isAdmin}
              />
            </div>
          )}
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
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              </>
            ) : isCreateURL ? (
              "Create"
            ) : (
              "Sign In"
            )}
          </Button>
          <div className="relative mt-6 mb-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Contact admins to gain access
              </span>
            </div>
          </div>
          {/* <Button
            variant="outline"
            type="button"
            disabled={isLoading}
            onClick={() => Router.push("create")}
          >
            Request Access
          </Button> */}
        </div>
      </form>
    </div>
  );
}
