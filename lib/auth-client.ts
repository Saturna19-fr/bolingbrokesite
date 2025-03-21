import { createAuthClient } from "better-auth/react"
import { adminClient } from "better-auth/client/plugins"

export const authClient = createAuthClient({
    baseURL: "http://localhost:3000",
    // baseURL: "https://dataterminal.eu.saturna19.fr", // the base url of your auth server
    plugins: [
        adminClient()
    ]
})