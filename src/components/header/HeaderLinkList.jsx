import { selectThemes } from "@/styles/tokensTailwind";
import HeaderLink from "./HeaderLink";
import { useAuth } from "@/hooks/useAuth";

export default function HeaderLinkList({ theme = "brandBlue", links = [] }) {
  const { logout } = useAuth();

  return (
    <ul
      className={`
              absolute top-3.5 z-50 w-full mt-2 rounded-lg bg-white shadow-lg border
              ${selectThemes[theme].dropdown}
              max-h-60 overflow-auto
            `}
    >
      {links.map((link) => (
        <HeaderLink
          key={link.label}
          className={`
                    w-full px-4 py-2 text-left flex items-center justify-between
                    transition-colors duration-150
                    ${selectThemes[theme].option}
                    first:rounded-t-lg last:rounded-b-lg
                  `}
          link={link.link}
          label={link.label}
        />
      ))}
      <li>
        <button
          className={`
                    w-full px-4 py-2 text-left flex items-center justify-between
                    transition-colors duration-150
                    ${selectThemes[theme].option}
                    first:rounded-t-lg last:rounded-b-lg cursor-pointer
                  `}
          onClick={logout}
        >
          Déconnexion
        </button>
      </li>
    </ul>
  );
}
