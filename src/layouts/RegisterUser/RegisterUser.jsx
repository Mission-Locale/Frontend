import ContentStep from "./ContentStep";
import SideBar from "../../components/RegisterUser/SideBar";

export default function RegisterUser() {

  const steps = [
    {
      id: 1,
      label: "Informations personnelles",
      description: "Renseignez vos informations personnelles.",
    },
    {
      id: 2,
      label: "Informations complémentaires",
      description: "Fournissez des informations complémentaires.",
    },
    {
      id: 3,
      label: "Documents",
      description:
        "Téléchargez vos documents pour aider le conseiller avant votre rendez-vous.",
    },
    {
      id: 4,
      label: "Prise de rendez-vous",
      description: "Planifiez votre rendez-vous avec un conseiller.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <SideBar steps={steps} />

      <ContentStep />
    </div>
  );
}
