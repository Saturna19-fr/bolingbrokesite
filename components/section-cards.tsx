import { IconTrendingDown, IconTrendingUp, IconReportMedical, IconShieldFilled } from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { db } from "@/db/drizzle";
import {user} from "@/db/schema"
import { eq } from "drizzle-orm"
const getMembersCount = async () => {
  const data = (await db.select().from(user).where(eq(user.pole, "Sécuritaire"))).length;
  const data_medical = (await db.select().from(user).where(eq(user.pole, "Médical"))).length;
  return {"medical":data_medical,"securitaire":data};
};
const getGlobalMemberCount = async () => {
  const data = (await db.select().from(user)).length;
  return data;
};

const members_cached = getMembersCount();
export function SectionCards() {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Stats Personnel</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {members_cached.then((data) => data.securitaire)}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconShieldFilled />
              Surveillants
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Agents du département Sécuritaire
          </div>
          <div className="text-muted-foreground">
            (Agents Actifs uniquement)
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Stats Personnel</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          {members_cached.then((data) => data.medical)}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconReportMedical />
              Médecins
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Médecins du Pénitencier 
          </div>
          <div className="text-muted-foreground">
          (Médecins Actifs uniquement)
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Comptes enregistrés</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {getGlobalMemberCount().then((data) => data)}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +12.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Strong user retention <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">Engagement exceed targets</div>
        </CardFooter>
      </Card>
      {/* <Card className="@container/card">
        <CardHeader>
          <CardDescription>Growth Rate</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            4.5%
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +4.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Steady performance increase <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">Meets growth projections</div>
        </CardFooter>
      </Card> */}
    </div>
  )
}
