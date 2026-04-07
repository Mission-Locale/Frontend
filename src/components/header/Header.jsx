import logo from "/assets/img/Logo_Mission_Locale.webp";
import useMobileToggle from "@/hooks/useMobileToggle";
import { useAuth } from "@/hooks/useAuth";
import HeaderLink from "./HeaderLink";
import { ADMINISTRATOR, ADVISOR, JOB_SEEKER } from "@/utils/userRole";
import HeaderDropdown from "./HeaderDropdown";

export default function Header() {
  const isMobile = useMobileToggle();
  const { isAuthenticated, user, logout } = useAuth();

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

  if (!isMobile) {
    return (
      <header className="flex justify-between w-full bg-lightBg px-10 py-2 items-center">
        <div className="hidden md:flex items-center w-[150px]">
          <img className="w-full" src={logo} alt="Logo Mission Locale" />
        </div>

        <div className="flex items-center justify-center gap-2">
          <ul className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-15 text-md w-full">
            <HeaderLink label="Accueil" link="/" />
            <HeaderLink label="Les ateliers" link="/workshop" />
            <HeaderLink label="Actualités" link="#" />
            <HeaderLink label="Prise de rendez-vous" link="#" />

            {!isAuthenticated && <HeaderLink label="Connexion" link="/login" />}
            {isAuthenticated && (
              <HeaderDropdown label={"Espace " + roleDisplay} links={links} />
            )}
          </ul>
        </div>
      </header>
    );
  }
  return <header className="w-full"></header>;
}
