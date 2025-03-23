'use client';
import { ComputerIcon } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from "@/components/ui/select"
import { authClient } from "@/lib/auth-client";
import { sendDiscordMessage } from "@/server/logger";
import { toast } from "sonner";

const securityRanks = [
  "GS-5",
  "GS-6",
  "GS-7",
  "Sergent",
  "Sergent Chef",
  "GS-8 OSS",
  "Lieutenant",
  "Capitaine",
  "Etat-Major",
  "Administrateur",
  "Direction",
]
const medicalRanks = ["Médecin Recrue", "Médecin", "Médecin Expérimenté", "Médecin Chef-Adjoint", "Médecin Chef"]
const pole = ["Sécuritaire", "Médical"]
const fieldLabels = [
  "Prénom et Nom",
  "Numéro de téléphone",
  "RIB",
  "Matricule"
]

function generateRandomPassword(length: number = 10): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
  let password = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    password += chars[randomIndex];
  }

  return password;
}

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  
  const { data: session, isPending } = authClient.useSession();
  
  const [branch, setBranch] = useState<string>("")
  const [newAccData, setNewAccData] = useState<any>({})
  const getRanksForBranch = () => {
    if (branch === "Sécuritaire") {
      return securityRanks
    } else if (branch === "Médical") {
      return medicalRanks
    }
    return []
  }
  
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    
    e.preventDefault();
    // Capture the form element immediately
    const form = e.currentTarget;
    
    // Now you can safely create FormData from it
    const formData = new FormData(form);
    
    // Log the form data entries to see what's being submitted
    console.log(Object.fromEntries(formData.entries()));
    const password = generateRandomPassword(10);
    await authClient.admin.createUser({
      name: formData.get("prenom_et_nom") as string,
      email: formData.get("email") as string,
      password: password,
      role: "user",
      // pole: branch,
      data: {
        // any additional on the user table including plugin fields and custom fields
        phone: formData.get("numéro_de_téléphone") as string,
        pole: branch,
        job: formData.get("job") as string,
        rib: formData.get("rib") as string,
        matricule: formData.get("matricule") as string,
        globalid: formData.get("matricule") ? Number(formData.get("matricule")) : null,
      },
    }).then(async (newUser) => {
      if (!newUser.error){
        toast("Compte créé avec succès")
      } else {
        toast("Erreur lors de la création du compte (" + newUser.error.message+")")
        return
      }
      console.log(newUser)

      setNewAccData(newUser)
      await sendDiscordMessage("New acc created: " + JSON.stringify(newUser)+ " by "+session?.user?.name+" ("+session?.user?.email+")")
      await sendDiscordMessage("Le compte de **"+ newUser.data.user.name + "** a été créé avec succès. \n__Voici ses informations de connexion:__ \nEmail: `"+newUser.data.user.email+"`\nMot de passe: `"+password+"`.\nIl fait parti du pôle "+ branch +" et a le rang "+ formData.get("job") +".")
    }).catch((error) => {
      console.log("erreur")
      toast("Une erreur s'est produite" + error)
    });

    
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <a href="#" className="flex flex-col items-center gap-2 font-medium">
              <div className="flex h-8 w-8 items-center justify-center rounded-md">
                <ComputerIcon className="size-6" />
              </div>
              <span className="sr-only">Logo Bolingbroke.</span>
            </a>
            <h1 className="text-xl font-bold">Ajouter un nouveau compte.</h1>
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" name="email" placeholder="mail@umail.com" required />
            </div>
            {fieldLabels.map((label, index) => {
              // Create a name from the label (remove spaces, accents, etc.)
              const fieldName = label.toLowerCase().replace(/\s+/g, '_').normalize("NFD").replace(/[\u0300-\u036f]/g, "");
              
              return (
                <div key={index} className="grid gap-2">
                  <Label htmlFor={`field-${index}`}>{label}</Label>
                  <Input
                    id={`field-${index}`}
                    name={fieldName}
                    type="text"
                    placeholder={`Entrez votre ${label.toLowerCase()}`}
                  />
                </div>
              );
            })}
            <div className="grid gap-2">
              <Label htmlFor="branch">Branch</Label>
              <Select value={branch} onValueChange={setBranch} name="branch" required>
                <SelectTrigger id="branch">
                  <SelectValue placeholder="Select branch" />
                </SelectTrigger>
                <SelectContent>
                  {pole.map((p) => (
                    <SelectItem key={p} value={p}>
                      {p}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {branch && (
              <div className="grid gap-2">
                <Label htmlFor="job">Job</Label>
                <Select name="job" required>
                  <SelectTrigger id="job">
                    <SelectValue placeholder="Select job" />
                  </SelectTrigger>
                  <SelectContent>
                  {getRanksForBranch().map((rank) => (
                      <SelectItem key={rank} value={rank}>
                        {rank}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <Button type="submit" className="w-full">
              Ajouter le compte
            </Button>
          </div>
          </div>
      </form>
      {newAccData && (
              <div className="max-w mx-auto mt-24 bg-gray-900 rounded-lg overflow-hidden">
              <div className="p-2">
              <div className="flex items-center justify-between">
                <span className="text-gray-200 text-xl font-bold">Données:</span>
              </div>
            </div>
          
            <div className="px-3 py-">
              <pre className="language-javascript">      <code>{JSON.stringify(newAccData, null, 2)}</code>
              </pre>
            </div>
          </div>
            )}
            </div>
  )
}
