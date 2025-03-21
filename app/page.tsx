import { signIn, signUp} from "@/server/users";
import {auth} from "@/lib/auth";
import {headers} from "next/headers";
import SignOut from "../components/signout";
import { Button } from "@/components/ui/button";
import LoginForm from "@/components/loginForm";
import Welcome from "@/components/welcome";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });


  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-2">
      {!session && (
        <>
        <LoginForm />
        
        {/* <Button onClick={signUp}>Sign Up</Button> */}
        </>
      )}
      {session && (
        <Welcome />
      )}
    </main>
  );
}
