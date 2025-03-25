'use server';
import { db } from "@/db/drizzle";
import { schema } from "@/db/schema";
import { eq } from "drizzle-orm";
export async function edit_grade(matricule: number, pole: string, job: string) {
    const dbu = await db.update(schema.user).set({job: job, pole: pole}).where(eq(schema.user.globalid, matricule));
}