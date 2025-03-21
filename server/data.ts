'use server';
import { db } from "@/db/drizzle";
import { schema } from "@/db/schema";
export async function create() {

    const userProfiles = await db.select({id: schema.user.id, name: schema.user.name, matricule: schema.user.globalid, grade: schema.user.job, user_internal_id: schema.user.id, pole: schema.user.pole}).from(schema.user)
    console.log(userProfiles)
    return userProfiles
}