import { BetterAuthPlugin } from "better-auth"

 
export const jobPlugin = ()=>{
    return {
        id: "jobplugin",
        schema: {
            user: {
                fields: {
                    pole: {
                        type: "string",
                    },
                },
            },
        },
    } satisfies BetterAuthPlugin
}