import { schema } from "@/db/schema"
import { db } from "@/db/drizzle"
import { eq } from "drizzle-orm"

export async function fetchUserProfilesWithFormations() {
    let userProfiles = await db.select({
      id: schema.user.id,
      name: schema.user.name,
      matricule: schema.user.globalid,
      grade: schema.user.job,
      user_internal_id: schema.user.id,
      pole: schema.user.pole
    }).from(schema.user);
  
    const userProfilesWithFormations = await Promise.all(
      userProfiles.map(async (user) => {
        const formations = user.matricule !== null 
          ? (await db.select({formationName: schema.formations.formationName})
              .from(schema.formations)
              .where(eq(schema.formations.userId, user.matricule)))
              .map(f => f.formationName)
          : [];
        return { ...user, formations };
      })
    );
  
    const safeUserProfiles = userProfilesWithFormations.map(user => ({
      ...user,
      id: user.id ?? '',
      grade: user.grade ?? '',
      pole: user.pole ?? '',
      user_internal_id: Number(user.user_internal_id) ?? '',
    }));
  
    return safeUserProfiles;
  }
  