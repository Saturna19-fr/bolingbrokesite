"use client"

import {
  IconCreditCard,
  IconDotsVertical,
  IconHammer,
  IconLogout,
  IconNotification,
  IconPassword,
  IconPremiumRights,
  IconUserCircle,
} from "@tabler/icons-react"
import { ModeToggle } from "./theme-switch"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { session } from "@/db/schema"
import { toast } from "sonner"
export function NavUser({
  user,
}: any) {
  const { isMobile } = useSidebar()

  if (!user) return null

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <ModeToggle />

          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg grayscale">
                <AvatarImage src={user.image} alt={user.name} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="text-muted-foreground truncate text-xs">
                  {"Pôle " + user.pole}
                </span>
              </div>
              <IconDotsVertical className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.image} alt={user.name} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="text-muted-foreground truncate text-xs">
                    {"Pôle " + user.pole}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <IconUserCircle />
                {"Grade: " + user.job}
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconHammer />
                Groupe d'utilisateur: <code>{user.role}</code>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <Dialog>

      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()} variant="destructive">
          <IconPassword />
          Changer mon mot de passe
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]" >
        <DialogHeader>
          <DialogTitle>Changement de mot de passe</DialogTitle>
          <DialogDescription>
            Pensez à mettre un mot de passe sûr.
          </DialogDescription>
        </DialogHeader>
              <form onSubmit={async (e)=> {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const password = formData.get("password") as string;
                const cpassword = formData.get("currentPWD") as string;
                
                await authClient.changePassword({currentPassword: cpassword, newPassword: password, revokeOtherSessions: true})
                toast("Mot de passe changé avec succès")
                
              }}>
        <div className="grid gap-4 py-4">
          <div className="grid  items-center gap-2">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              defaultValue={user.email}
              className="col-span-3"
              disabled
              />
          </div>
          <div className="grid  items-center gap-2">
            <Label htmlFor="currentPWD" className="text-right">
              Mot de passe actuel
            </Label>
            <Input
              id="currentPWD"
              name="currentPWD"
              className="col-span-3"
              />
          </div>
          <div className="grid items-center gap-2">
            <Label htmlFor="password" className="text-left">
              Mot de passe
            </Label>
            <Input
              id="password"
              className="col-span-3"
              name="password"
              />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
              </form>
      </DialogContent>
    </Dialog>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => authClient.signOut()}>
              <IconLogout />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
