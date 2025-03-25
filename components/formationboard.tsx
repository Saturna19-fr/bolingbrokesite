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
    id: "Formulaire de réponse aux docs",
    name: "Formulaire réponse docs",
    docUrl:
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vQdNWRAIs0HTkCKxKSavQLJxmijQiOQZ8XXoTGijpHYjJFRAUXZoUCOPSp7Dfe5ZH-lUGW34-6Q_N2Y/pubhtml?widget=true&amp;headers=false",
  },
  {
    id: "Examen Final",
    name: "4-3-3",
    docUrl:
      "https://docs.google.com/document/d/e/2PACX-1vRsZ67VrnVNt10wvl172bdT9jMSmcm0puL9FGIFVZ1Lp00fbhog1dwHV7Wzg57SXPXlx9KixTm4dyyA/pub?embedded=true",
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

