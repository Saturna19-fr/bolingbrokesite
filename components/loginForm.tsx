'use client'

import { ComputerIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from "@/components/ui/select"
import { authClient } from "@/lib/auth-client";

export default function LoginForm() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const response = await authClient.signIn.email({
      email,
      password
    })
    if (response.data === null) {
      alert(response.error.code)
    } else {
      console.log(response.data)
      window.location.reload();
    }
  }

  return (
    <div className="flex flex-col gap-6 p-3">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <a href="#" className="flex flex-col items-center gap-2 font-medium">
              <div className="flex h-8 w-8 items-center justify-center rounded-md">
                <ComputerIcon className="size-6" />
              </div>
              <span className="sr-only">Logo Bolingbroke.</span>
            </a>
            <h1 className="text-xl font-bold">Se connecter à la plateforme de gestion.</h1>
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" name="email" placeholder="mail@umail.com" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input id="password" type="password" name="password" placeholder="Votre Mot de Passe sécurisé" required />
            </div>
            <div className="flex  items-center justify-center ">
              <Button type="submit" className="w-50 ">
                Se connecter
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
  // return (
  //   <form onSubmit={handleSubmit}>
  //     <input type="text" name="email" placeholder="Email" />
  //     <input type="password" name="password" placeholder="Password" />
  //     <Button type="submit">Submit</Button>
  //   </form>
  // )
}