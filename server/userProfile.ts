import { schema } from "@/db/schema"
import { db } from "@/db/drizzle"
import { eq } from "drizzle-orm"
const grade_grid = {
  // Corps de Direction
  Direction: 1,
  Administrateur: 2,
  // État Major
  "Etat-Major": 3,
  Capitaine: 4,
  "Médecin Chef": 5,
  Lieutenant: 6,
  "Médecin Chef-Adjoint": 7,
  // Corps d'Encadrement
  "GS-8 OSS": 8,
  "Sergent Chef": 9,
  Sergent: 9,
  "Médecin Expérimenté": 10,
  // Corps d'Application
  "GS-7": 11,
  Médecin: 12,
  "GS-6": 13,
  "GS-5": 14,
}


function sortByPriority<T extends Record<string, any>, K extends keyof T>(
  data: T[],
  priorityMap: Record<string, number>,
  field: K
): T[] {
  return [...data].sort((a, b) => {
    // Get the field values, handling null/undefined
    const valueA = a[field] as string | null | undefined;
    const valueB = b[field] as string | null | undefined;
    
    // Handle null/undefined values (place them at the end)
    if (!valueA && valueA !== '') return 1;
    if (!valueB && valueB !== '') return -1;
    if (!valueA && !valueB) return 0;
    
    // Get priority values from the priority map (default to Infinity if not found)
    const priorityA = valueA ? (priorityMap[valueA] ?? Infinity) : Infinity;
    const priorityB = valueB ? (priorityMap[valueB] ?? Infinity) : Infinity;
    
    // Sort by priority (lower number = higher priority)
    return priorityA - priorityB;
  });
}

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
    }));
    const users = sortByPriority(safeUserProfiles, grade_grid, "grade")

    return users;
  }
  