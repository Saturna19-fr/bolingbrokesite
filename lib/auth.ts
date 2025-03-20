import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db/drizzle"; // your drizzle instance
import { eq } from "drizzle-orm";
import { schema } from "@/db/schema";
import { nextCookies } from "better-auth/next-js";
import { customSession, admin as adminPlugin } from "better-auth/plugins";
import {jobPlugin} from "@/lib/jobPlugin";
import { ac, admin, user, formateur, sergent, direction } from "@/lib/permissions"

export const auth = betterAuth({
    emailAndPassword: {
        enabled: true
    },
    database: drizzleAdapter(db, {
        provider: "pg", // or "mysql", "sqlite"
        schema: schema,
    }),
    plugins: [jobPlugin(),adminPlugin(
        {
            ac: ac,
            roles: {
                admin,
                user,
                formateur,
                sergent,
                direction
            },
            adminRoles: ["admin", "direction"],
        } as const
    ),nextCookies(),
        customSession(async ({user, session}) =>{
            const pole = await db.select({pole: schema.user.pole, job: schema.user.job, rib: schema.user.rib, phone: schema.user.phone}).from(schema.user).where(eq(schema.user.email, user.email));
            return {
                user: {
                    ...user,
                    pole: pole[0]?.pole ?? null,
	                job: pole[0]?.job ?? null,
	                rib: pole[0]?.rib ?? null,
	                phone: pole[0]?.phone ?? null,
                    
                },
                session
            }
        })
    ]
});