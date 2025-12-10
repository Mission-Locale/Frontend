import InputTextLabel from "../../components/Form/InputTextLabel";

export const steps = [
  {
    id: 1,
    label: "Informations personnelles",
    description: "Renseignez vos informations personnelles.",
    content: [
      {
        id: 1,
        components: [InputTextLabel],
        props: {
          label: "Prénom",
          name: "firstName",
          type: "text",
          placeholder: "Entrez votre prénom",
        },
      },
      {
        id: 2,
        components: [InputTextLabel],
        props: {
          label: "Nom",
          name: "lastName",
          type: "text",
          placeholder: "Entrez votre nom",
        },
      },
    ],
  },
];
