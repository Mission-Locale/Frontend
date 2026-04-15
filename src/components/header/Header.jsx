import logo from "/assets/img/Logo_Mission_Locale.webp";
import { useAuth } from "@/hooks/useAuth";
import HeaderLink from "./HeaderLink";
import { ADMINISTRATOR, ADVISOR, JOB_SEEKER } from "@/utils/userRole";
import HeaderDropdown from "./HeaderDropdown";

export default function Header() {
  const { isAuthenticated, user } = useAuth();

  //TODO: compléter les liens du header

  let roleDisplay = "";
  let links = [];
  if (isAuthenticated) {
    switch (user.role) {
      case JOB_SEEKER:
        roleDisplay = "Demandeur";
        links = [
          { label: "Tableau de bord", link: "/dashboard/user" },
          { label: "Calendrier", link: "/dashboard/user/planning" },
        ];
        break;
      case ADVISOR:
        roleDisplay = "Conseiller";
        links = [
          { label: "Tableau de bord", link: "/dashboard/advisor" },
          { label: "Calendrier", link: "/dashboard/advisor/planning" },
        ];
        break;
      case ADMINISTRATOR:
        roleDisplay = "Adminstrateur";
        links = [
          { label: "Tableau de bord", link: "/dashboard/admin" },
          {
            label: "Liste des conseillers",
            link: "/dashboard/admin/advisor-list",
          },
        ];
        break;
    }
  }

  return (
    <header className="flex flex-col md:flex-row justify-center md:justify-start w-full bg-lightBg px-5 py-2 gap-4 items-center">
      <div className="items-center w-[175px]">
        <img className="size-full" src={logo} alt="Logo Mission Locale" />
      </div>

      <ul className="flex flex-col sm:flex-row items-center md:items-start not-md:gap-6 md:justify-around text-md w-full">
        <HeaderLink label="Accueil" link="/" />
        <HeaderLink label="Les ateliers" link="/workshop" />
        <HeaderLink label="Actualités" link="#" />
        <HeaderLink label="Prise de rendez-vous" link="#" />

        {!isAuthenticated && <HeaderLink label="Connexion" link="/login" />}
        {isAuthenticated && (
          <HeaderDropdown label={"Espace " + roleDisplay} links={links} />
        )}
      </ul>
    </header>
  );
}
