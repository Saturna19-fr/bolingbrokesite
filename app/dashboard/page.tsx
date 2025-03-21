import { AppSidebar } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

import data from "./data.json"
import { schema } from "@/db/schema"
import { db } from "@/db/drizzle"
import { eq } from "drizzle-orm"
import { fetchUserProfilesWithFormations } from "@/server/userProfile"


export default async function Page() {
  const safeUserProfiles = await fetchUserProfilesWithFormations();
  // console.log(userProfilesWithFormations);
  console.log(safeUserProfiles);
  return (
    
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <div className="px-4 lg:px-6">
                {/* <ChartAreaInteractive /> */}
              </div>

              <DataTable data={safeUserProfiles} />
            </div>
          </div>
        </div>

  )
}
