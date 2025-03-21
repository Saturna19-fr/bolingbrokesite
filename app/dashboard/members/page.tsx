import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectGroup,
    SelectLabel
  } from "@/components/ui/select"
import { db } from "@/db/drizzle";
import {user} from "@/db/schema"
import { eq } from "drizzle-orm"
const getMembersCount = async () => {
  const data = (await db.select().from(user).where(eq(user.pole, "Sécuritaire"))).length;
  const data_medical = (await db.select().from(user).where(eq(user.pole, "Médical"))).length;
  return {"medical":data_medical,"securitaire":data};
};


export default function MembersPage(){
    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
          <h1 className="text-3xl font-bold">Construction en cours...</h1>
    </div>
      )
}