import { User, IdCard, Bookmark, Car, House, FilePenLine, Ellipsis } from "lucide-react";

export const STEPS = [
  {
    id: 1,
    label: "Informations personnelles",
    description: "Renseignez vos informations personnelles.",
    mainTitle: "Vos informations personnelles",
    subTitle: "Entrez vos informations dans les champs requis",
    branding: "brandPurple",
  },
  {
    id: 2,
    label: "Dossier d'inscription",
    description: "Téléchargez votre dossier d'inscription",
    mainTitle: "Télécharger son dossier d'inscription",
    subTitle:
      "Veuillez télécharger votre dossier d'inscription pour le compléter",
    branding: "brandPink",
  },
  {
    id: 3,
    label: "Documents",
    description:
      "Téléchargez vos documents pour aider le conseiller avant votre rendez-vous.",
    mainTitle: "Télécharger des documents",
    subTitle:
      "Fournissez les documents avant votre rendez-vous (facultatif).\nLes documents peuvent être téléchargés depuis votre espace personnel.",
    branding: "brandBlue",
    inputs: [
      {
        id: "idCard",
        group: "Documents d'identité (minimum un requis)",
        iconGroup: User,
        title: "Pièce d'identité",
        subtitle: "Recto/verso requis",
        icon: IdCard,
        branding: "brandBlue",
      },
      {
        id: "passeport",
        group: "Documents d'identité (minimum un requis)",
        title: "Passeport",
        subtitle: "Page avec photo",
        icon: Bookmark,
        branding: "brandPink",
      },
      {
        id: "transport",
        group: "Transports",
        iconGroup: Car,
        title: "Permis de conduire",
        subtitle: "En cours de validité",
        icon: IdCard,
        branding: "brandGreen",
      },
      {
        id: "domicile",
        group: "Justificatifs de logement",
        iconGroup: House,
        title: "Justificatif de domicile",
        subtitle: "Datant de moins de 3 mois",
        icon: FilePenLine,
        branding: "brandOrange",
      },
      {
        id: "other",
        group: "Autre",
        iconGroup: Ellipsis,
        title: "Autres documents",
        subtitle: "En cours de validité",
        icon: FilePenLine,
        branding: "brandPurple",
        multipleFiles: true,
      },
    ],
  },
  {
    id: 4,
    label: "Prise de rendez-vous",
    description:
      "Prenez rendez-vous immédiatement avec un conseiller pour finaliser votre inscription.",
    mainTitle: "Prendre rendez-vous",
    subTitle: "Choisissez une date pour votre rendez-vous avec un conseiller.",
    branding: "brandGreen",
  },
];
