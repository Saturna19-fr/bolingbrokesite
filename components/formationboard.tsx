"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample formation data - replace with your actual Google Doc URLs
const formations = [
  {
    id: "Formation d'introduction",
    name: "Formation d'introduction",
    docUrl:
      "https://docs.google.com/document/d/e/2PACX-1vS35G7qLu0QlU1M9vsHll-52fDBIM8wbBeOT2k7_dHVwG2Plkbt4eI2J-eH9Uc6MkaQ01duZVxBEURD/pub?embedded=true",
  },
  {
    id: "4-3-3",
    name: "4-3-3",
    docUrl:
      "https://docs.google.com/document/d/e/2PACX-1vT8YGBXIxZ_MUvQ9Tv1WMDoxYEwPYHLKEGQlYYp_UP1UYR9DNyLTKMd/pub?embedded=true",
  },
  {
    id: "3-5-2",
    name: "3-5-2",
    docUrl:
      "https://docs.google.com/document/d/e/2PACX-1vRnPxKB8xMCpOQrWyk5iDNcSo4HXmBZGl1Tz90xM_dkxWA5dQvR/pub?embedded=true",
  },
  {
    id: "5-3-2",
    name: "5-3-2",
    docUrl: "https://docs.google.com/document/d/e/2PACX-1vSQlJ9RkEi_AZrLJJfGNs1L8vQg9Tn9MgMxZQ_Cq4Yk/pub?embedded=true",
  },
  {
    id: "4-2-3-1",
    name: "4-2-3-1",
    docUrl: "https://docs.google.com/document/d/e/2PACX-1vTQZxK6YDwZ9xLuZ8oVs_cHdZUJ7UmZL5Tz/pub?embedded=true",
  },
]

export default function FormationBoard() {
  const [selectedFormation, setSelectedFormation] = useState(formations[0])

  const handleFormationChange = (formationId: string) => {
    const formation = formations.find((f) => f.id === formationId)
    if (formation) {
      setSelectedFormation(formation)
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Bibliothèque de formation</CardTitle>
          <CardDescription>Choisissez une formation pour accéder à son contenu</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="w-full max-w-xs">
            <Select onValueChange={handleFormationChange} defaultValue={selectedFormation.id}>
              <SelectTrigger>
                <SelectValue placeholder="Choisissez une formation" />
              </SelectTrigger>
              <SelectContent>
                {formations.map((formation) => (
                  <SelectItem key={formation.id} value={formation.id}>
                    {formation.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="w-full border rounded-lg overflow-hidden bg-muted/20">
            <div className="p-4 bg-muted/50 border-b">
              <h3 className="font-medium">{selectedFormation.name}</h3>
            </div>
            <div className="w-full aspect-[16/9] md:aspect-[4/3] lg:aspect-[16/9]">
              <iframe
                src={selectedFormation.docUrl}
                className="w-full h-full"
                frameBorder="0"
                allowFullScreen
                title={`${selectedFormation.name} Formation Document`}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

