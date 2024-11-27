import { type en } from "./en";

export const de: typeof en = {
  dashboard: {
    create: "Neuer Eintrag",
    pricePer100: "Kosten pro 100km",
    pricePer1: "Kosten pro km",
    totalKm: "Gesamt km",
    totalFuel: "Getankt",
    totalCost: "Gesamtkosten",
    avgPrice: "Durchschnittspreis",
  },
  refuelList: {
    title: "Letzte Tankungen",
    link: "Alle Tankungen",
    noEntries: "Keine Einträge",
    noEntriesHint: "Füge den ersten Eintrag übers Dashboard hinzu.",
  },
  details: {
    totalPrice: "Summe",
    fuelAdded: "Liter getankt",
    kmAdded: "Km geschrieben",
    pricePerLiter: "Preis pro Liter",
    delete: "Löschen",
    deleteTitle: "Eintrag permanent löschen?",
    deleteCancel: "Abbrechen",
    deleteConfirm: "Löschen",
  },
  login: {
    password: "Passwort",
    emailPlaceholder: "email@adresse.de",
    login: "Einloggen",
  },
  newEntry: {
    title: "Neuer Entrag",
    create: "Erstellen",
    addedFuel: "Liter getankt",
    newPedo: "Neuer Kilometerstand",
    date: "Datum",
    fuelPrice: "Preis pro Liter",
    fuelPriceHint: "{{price}}€ für diese Auffüllung?",
    errorNegativePedo: "",
  },
};
