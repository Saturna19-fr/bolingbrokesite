import {auth} from "@/lib/auth";
import {headers} from "next/headers";
import LoginForm from "@/components/loginForm";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  
  const a = await auth.api.userHasPermission({
    body: {
      permission: {
        project: ["readformation"], // This must match the structure in your access control
    },
        role: "admin",
    },
  });
   

  console.log(a.success);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-2">
      {!session && (
        <LoginForm />
      )}
      {session && (
        <>
      <p>
      {!session ? "Not authenticated" : session.user.email}
      </p>
      <p>
      {!session ? "No name available" : session.user.name}
      </p>
      <p>
      {!session ? "No role available" : session.user.role}
      </p>
      <p>
      {!session ? "No pole available" : session.user.pole}

      </p> 
       <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.25.0/themes/prism-okaidia.min.css" /> 

 <div className="max-w mx-auto mt-24 bg-gray-900 rounded-lg overflow-hidden"> 

   <div className="p-2"> 
     <div className="flex items-center justify-between"> 
       <span className="text-gray-200 text-xl font-bold">Données:</span> 
     </div> 
   </div> 

  <div className="px-3 py-">
    <pre className="language-javascript">      <code>{JSON.stringify(session, null, 2)}</code>
    </pre>
  </div>
</div>
     </> )}
      

    </main>
  );
}
