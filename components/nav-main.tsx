"use client"

import { IconCirclePlusFilled, IconMail, type Icon } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useState, useEffect } from 'react'

import { authClient } from "@/lib/auth-client"
import { cp } from "fs"

export function NavMain({
  items,
  user,
}: {
  items: {
    title: string
    url: string
    icon?: Icon
    isSecuredByPerm?: string
  }[],
  user: any
}) {
  
  
  const [canAddUser, setCanAddUser] = useState(false);
  const [isFormateur, setIsFormateur] = useState(false);
  useEffect(() => {
    async function userPerms(){
      const canAddUser  = await authClient.admin.hasPermission({
        permission: {
          project: ["newmember"],
        },
      });
      const formateurCheck  = await authClient.admin.hasPermission({
        permission: {
          project: ["readformation"],
        },
      });
      setCanAddUser(canAddUser.data?.success ?? false);
      setIsFormateur(formateurCheck.data?.success ?? false);
    }
    userPerms();
  }, []);
  
  if (!user) return null
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            {canAddUser && (<SidebarMenuButton
              tooltip="Nouveau membre"
              className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"
              onClick={() => location.href = "/newmember"}
            >
              <IconCirclePlusFilled />
              <span>Nouveau membre</span>
            </SidebarMenuButton>)}
            {/* <Button
              size="icon"
              className="size-8 group-data-[collapsible=icon]:opacity-0"
              variant="outline"
            >
              <IconMail />
              <span className="sr-only">Inbox</span>
            </Button> */}
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
        {items.map((item) => {
          if (item.isSecuredByPerm && !isFormateur) {
            return null;
          }
          return (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
          <a href={item.url}>
            {item.icon && <item.icon />}
            <span>{item.title}</span>
          </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
