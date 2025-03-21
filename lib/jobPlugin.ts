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
                    job: {
                        type: "string",
                    },
                    rib: {
                        type: "string",
                    },
                    phone: {
                        type: "string",
                    },
                    globalid: {
                        type: "number",
                    },
                },
            },
        },
    } satisfies BetterAuthPlugin
}