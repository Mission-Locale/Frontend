import logo from "/assets/img/Logo_Mission_Locale.webp";
import useMobileToggle from "@/hooks/useMobileToggle";
import { useAuth } from "@/hooks/useAuth";

export default function Header() {
  const isMobile = useMobileToggle();
  const { isAuthenticated, logout } = useAuth();

  //TODO: compléter les liens du header

  if (!isMobile) {
    return (
      <header className=" flex justify-between w-full bg-lightBg px-10 py-2 items-center">
        <div className="hidden md:flex items-center w-[150px]">
          <img className="w-full" src={logo} alt="Logo Mission Locale" />
        </div>

        <div className="flex items-center justify-center gap-2">
          <ul className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-15 text-md w-full">
            <li>
              <a href="#">Accueil</a>
            </li>

            <li>
              <a href="#">Les ateliers</a>
            </li>

            <li>
              <a href="#">Actualités</a>
            </li>

            <li>
              <a href="#">Prise de rendez-vous</a>
            </li>
            {!isAuthenticated && (
              <li>
                <a href="/login">Connexion</a>
              </li>
            )}
            {isAuthenticated && (
              <li>
                <button className="cursor-pointer" onClick={logout}>Déconnexion</button>
              </li>
            )}
          </ul>
        </div>
      </header>
    );
  }
  return <header className="w-full"></header>;
}
