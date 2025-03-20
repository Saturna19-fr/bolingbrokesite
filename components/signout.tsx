"use client";

import { Button } from "@/components/ui/button";
import {authClient} from "@/lib/auth-client";


export default function SignOut(){
    return <Button size="lg" onClick={()=> {
        authClient.signOut();
        window.location.reload();
    }}>Se déconnecter</Button>
}
