"use server";

import {auth} from "@/lib/auth";

export const signIn = async () => {
    await auth.api.signInEmail({
        body: {
            email: "test@saturna19.dev",
            password: "password"
        }
    })
}

export const signUp = async () => {
    await auth.api.signUpEmail({
        body: {
            name: "Maxence JONES",
            email: "test@saturna19.dev", // complete the email field
            password: "password" // add password field
        }
    })
}