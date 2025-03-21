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


export default async function Page() {
  let userProfiles = await db.select({id: schema.user.id, name: schema.user.name, matricule: schema.user.globalid, grade: schema.user.job, user_internal_id: schema.user.id, pole: schema.user.pole}).from(schema.user)
  
  const userProfilesWithFormations = await Promise.all(
    userProfiles.map(async (user) => {
      const formations = user.matricule !== null 
        ? (await db.select({formationName: schema.formations.formationName}).from(schema.formations).where(eq(schema.formations.userId, user.matricule))).map(f => f.formationName)
        : [];
      return { ...user, formations };
    })
  );

  const safeUserProfiles = userProfilesWithFormations.map(user => ({
    ...user,
    id: Number(user.id), // conversion string → number
    grade: user.grade ?? '', // fallback si null
    pole: user.pole ?? '',   // fallback si null
  }))
  
  // console.log(userProfilesWithFormations);

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
