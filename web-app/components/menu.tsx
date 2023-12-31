import { useTheme } from "next-themes"
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "../components/ui/menubar"
import { useUserContext } from "../contexts/UserContext"

export function Menu() {
  const { setTheme, theme } = useTheme()
  const { signOut, user } = useUserContext()

  return (
    <Menubar className="rounded-none border-b border-none px-2 lg:px-4">
      <MenubarMenu>
        <MenubarTrigger className="font-bold">VELUX LIVEFEED</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            Preferences... <MenubarShortcut>⌘,</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarShortcut />
          <MenubarItem>
            Quit Dashboard <MenubarShortcut>⌘Q</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      {/* <MenubarMenu>
        <MenubarTrigger className="relative">File</MenubarTrigger>
        <MenubarContent>
          <MenubarSub>
            <MenubarSubTrigger>New</MenubarSubTrigger>
            <MenubarSubContent className="w-[230px]">
              <MenubarItem>
                Playlist <MenubarShortcut>⌘N</MenubarShortcut>
              </MenubarItem>
              <MenubarItem disabled>
                Playlist from Selection <MenubarShortcut>⇧⌘N</MenubarShortcut>
              </MenubarItem>
              <MenubarItem>
                Smart Playlist... <MenubarShortcut>⌥⌘N</MenubarShortcut>
              </MenubarItem>
              <MenubarItem>Playlist Folder</MenubarItem>
              <MenubarItem disabled>Genius Playlist</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarItem>
            Open Stream URL... <MenubarShortcut>⌘U</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Close Window <MenubarShortcut>⌘W</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>Library</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Update Cloud Library</MenubarItem>
              <MenubarItem>Update Genius</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Organize Library...</MenubarItem>
              <MenubarItem>Export Library...</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Import Playlist...</MenubarItem>
              <MenubarItem disabled>Export Playlist...</MenubarItem>
              <MenubarItem>Show Duplicate Items</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Get Album Artwork</MenubarItem>
              <MenubarItem disabled>Get Track Names</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarItem>
            Import... <MenubarShortcut>⌘O</MenubarShortcut>
          </MenubarItem>
          <MenubarItem disabled>Burn Playlist to Disc...</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            Show in Finder <MenubarShortcut>⇧⌘R</MenubarShortcut>{" "}
          </MenubarItem>
          <MenubarItem>Convert</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Page Setup...</MenubarItem>
          <MenubarItem disabled>
            Print... <MenubarShortcut>⌘P</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarItem disabled>
            Undo <MenubarShortcut>⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarItem disabled>
            Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem disabled>
            Cut <MenubarShortcut>⌘X</MenubarShortcut>
          </MenubarItem>
          <MenubarItem disabled>
            Copy <MenubarShortcut>⌘C</MenubarShortcut>
          </MenubarItem>
          <MenubarItem disabled>
            Paste <MenubarShortcut>⌘V</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            Select All <MenubarShortcut>⌘A</MenubarShortcut>
          </MenubarItem>
          <MenubarItem disabled>
            Deselect All <MenubarShortcut>⇧⌘A</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            Smart Dictation...{" "}
            <MenubarShortcut>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4"
                viewBox="0 0 24 24"
              >
                <path d="m12 8-9.04 9.06a2.82 2.82 0 1 0 3.98 3.98L16 12" />
                <circle cx="17" cy="7" r="5" />
              </svg>
            </MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Emoji & Symbols{" "}
            <MenubarShortcut>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
            </MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>*/}
      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent>
          <MenubarCheckboxItem onClick={() => setTheme("dark")} checked={theme && theme == "dark" ? true : false}>Dark theme</MenubarCheckboxItem>
          <MenubarCheckboxItem onClick={() => setTheme("light")} checked={theme && theme == "light" ? true : false}>Light theme</MenubarCheckboxItem>
          <MenubarCheckboxItem onClick={() => setTheme("system")} checked={theme && theme == "system" ? true : false}>System theme</MenubarCheckboxItem>
          <MenubarSeparator />
          <MenubarItem inset>Hide Sidebar</MenubarItem>
          <MenubarItem disabled inset>
            Enter Full Screen
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger className="hidden md:block">Account</MenubarTrigger>
        <MenubarContent forceMount>
          <MenubarLabel inset>Switch Account</MenubarLabel>
          <MenubarSeparator />
          <MenubarRadioGroup value="andy">
            <MenubarRadioItem value="andy">{user?.username}</MenubarRadioItem>
          </MenubarRadioGroup>
          <MenubarSeparator />
          <MenubarItem inset onClick={() => signOut()}>Sign out...</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger className="hidden md:block">Notification</MenubarTrigger>
        <MenubarContent forceMount>
          <MenubarSub>
            <MenubarSubTrigger inset>Active</MenubarSubTrigger>
            <MenubarSubContent className="w-[230px]">
              <MenubarRadioGroup value="benoit">
                <MenubarRadioItem value="andy">On</MenubarRadioItem>
                <MenubarRadioItem value="noti">Off</MenubarRadioItem>
              </MenubarRadioGroup>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarRadioGroup value="benoit">
            <MenubarRadioItem value="andy">Everything</MenubarRadioItem>
            <MenubarRadioItem value="benoit">Production</MenubarRadioItem>
            <MenubarRadioItem value="Luis">Quality control</MenubarRadioItem>
            <MenubarRadioItem value="Luis">Fatal errors</MenubarRadioItem>
          </MenubarRadioGroup>
          <MenubarSeparator />
          <MenubarItem inset>Revalidate permission</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}
