"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { sendDiscordMessage } from "@/server/logger"

const payes_par_heures = {
  // Corps de Direction
  Direction: 100000,
  Administrateur: 100000,
  // État Major
  "Etat-Major": 90000,
  Capitaine: 90000,
  "Médecin Chef": 90000,
  Lieutenant: 80000,
  "Médecin Chef-Adjoint": 80000,
  // Corps d'Encadrement
  "GS-8 OSS": 70000,
  "Sergent Chef": 65000,
  Sergent: 65000,
  "Médecin Expérimenté": 65000,
  // Corps d'Application
  "GS-7": 60000,
  Médecin: 50000,
  "GS-6": 50000,
  "GS-5": 40000,
}

type JobTitle = keyof typeof payes_par_heures

export function TableDemo({ users }: { users: any[] }) {
  const [timeInputs, setTimeInputs] = useState<{
    [key: number]: { days: number; hours: number; minutes: number }
  }>({})
  const [totalPay, setTotalPay] = useState(0)

  // Initialize time inputs
  useEffect(() => {
    const initialTimeInputs: { [key: number]: { days: number; hours: number; minutes: number } } = {}
    users.forEach((user) => {
      initialTimeInputs[user.globalid] = { days: 0, hours: 0, minutes: 0 }
    })
    setTimeInputs(initialTimeInputs)
  }, [users])

  // Calculate total hours from days, hours, minutes, seconds
  const calculateTotalHours = (days: number, hours: number, minutes: number) => {
    return days * 24 + hours + minutes / 60
  }

  // Calculate pay for a user
  const calculatePay = (userId: number) => {
    const user = users.find((u) => u.globalid === userId)
    if (!user || !user.job || !timeInputs[userId]) return 0

    const hourlyRate = payes_par_heures[user.job as JobTitle] || 0
    const { days, hours, minutes } = timeInputs[userId]
    const totalHours = calculateTotalHours(days, hours, minutes)

    return Math.min(totalHours * hourlyRate, 1_500_000)
  }

  // Update time input for a specific user
  const handleTimeInputChange = (userId: number, field: "days" | "hours" | "minutes", value: string) => {
    const numValue = value === "" ? 0 : Number.parseInt(value, 10)

    setTimeInputs((prev) => ({
      ...prev,
      [userId]: {
        ...prev[userId],
        [field]: numValue,
      },
    }))
  }

  // Calculate total pay whenever time inputs change
  useEffect(() => {
    let total = 0
    users.forEach((user) => {
      total += calculatePay(user.globalid)
    })
    setTotalPay(total)
  }, [timeInputs, users])

  // Generate detailed message for Discord
  const generateDetailedMessage = () => {
    let message = "Payes détaillées:\n"

    users.forEach((user) => {
      const pay = calculatePay(user.globalid)
      message += `${user.name} - $${pay.toFixed(0)}\n`
    })

    message += `\nTotal: $${totalPay.toFixed(0)}`

    return message
  }

  return (
    <>
      <Table>
        <TableCaption>Calculateur automatique de paye par heures.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Identité</TableHead>
            <TableHead>Grade</TableHead>
            <TableHead>Heures</TableHead>
            <TableHead className="text-right">Paye</TableHead>
          </TableRow>
          <TableRow>
            <TableHead className="w-[100px]"></TableHead>
            <TableHead></TableHead>
            <TableHead>Jour - Heure - Minute</TableHead>
            <TableHead className="text-right">Paye</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.globalid}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>
                {user.job} ({user.job && payes_par_heures[user.job as JobTitle]}$ / h)
              </TableCell>
              <TableCell>
                <div className="flex gap-6">
                  <Input
                    type="number"
                    className="w-30"
                    min="0"
                    value={timeInputs[user.globalid]?.days || 0}
                    onChange={(e) => handleTimeInputChange(user.globalid, "days", e.target.value)}
                  />
                  <Input
                    type="number"
                    className="w-30"
                    min="0"
                    max="23"
                    value={timeInputs[user.globalid]?.hours || 0}
                    onChange={(e) => handleTimeInputChange(user.globalid, "hours", e.target.value)}
                  />

                  <Input
                    type="number"
                    className="w-30"
                    min="0"
                    max="59"
                    value={timeInputs[user.globalid]?.minutes || 0}
                    onChange={(e) => handleTimeInputChange(user.globalid, "minutes", e.target.value)}
                  />
                </div>
              </TableCell>
              <TableCell className="text-right">${calculatePay(user.globalid)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">${totalPay.toFixed(0)}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      <Button
        variant="secondary"
        onClick={async (e) => {
          e.preventDefault()
          const detailedMessage = generateDetailedMessage()
          await sendDiscordMessage(detailedMessage)
        }}
      >
        Valider
      </Button>
    </>
  )
}

