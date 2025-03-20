import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db/drizzle"; // your drizzle instance
import { eq } from "drizzle-orm";
import { schema } from "@/db/schema";
import { nextCookies } from "better-auth/next-js";
import { customSession, admin } from "better-auth/plugins";
import {jobPlugin} from "@/lib/jobPlugin";
export const auth = betterAuth({
    emailAndPassword: {
        enabled: true
    },
    database: drizzleAdapter(db, {
        provider: "pg", // or "mysql", "sqlite"
        schema: schema,
    }),
    plugins: [jobPlugin(),admin(),nextCookies(),
        customSession(async ({user, session}) =>{
            const pole = await db.select({pole: schema.user.pole}).from(schema.user).where(eq(schema.user.email, user.email));
            return {
                user: {
                    ...user,
                    pole: pole[0]?.pole ?? null
                },
                session
            }
        })
    ]
});