import { signIn, signUp } from "@/server/users";
import {auth} from "@/lib/auth";
import {headers} from "next/headers";
import SignOut from "./signout";
import { Button } from "@/components/ui/button";
export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-2">
      <Button onClick={signIn}>Sign In</Button>
      <Button onClick={signUp}>Sign Up</Button>
      {session && <SignOut />}
      <p>

        {!session ? "Not authenticated" : session.user.email}
      </p>
    </main>
  );
}
