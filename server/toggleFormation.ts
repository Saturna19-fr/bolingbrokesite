"use server"

// Import your database client
import { db } from "@/db/drizzle"
import { formations } from "@/db/schema"
import { eq, and } from "drizzle-orm"

type FormationToggleParams = {
  userId: string
  formation: string
  isChecked: boolean
}

export async function toggleFormation({ userId, formation, isChecked }: FormationToggleParams) {
  try {
    // Example database operation
    if (isChecked) {
      // Add formation to user
      console.log(`Adding formation ${formation} to user ${userId}`)

      const dbcall = await db.insert(formations).values({ userId: Number(userId), formationName: formation }).returning({ id: formations.id })
      console.log(dbcall)
      // await db.userFormations.create({ data: { userId, formation } })
    } else {
      // Remove formation from user
      console.log(`Removing formation ${formation} from user ${userId}`)
      const dbcall = await db.delete(formations).where(
        and(
          eq(formations.userId, Number(userId)),
          eq(formations.formationName, formation))
        ).returning({ id: formations.id })
      console.log(dbcall)
    }

    return { success: true }
  } catch (error) {
    console.error("Error toggling formation:", error)
    return { success: false, error: "Failed to update formation" }
  }
}

