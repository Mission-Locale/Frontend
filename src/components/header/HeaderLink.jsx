import { useLocation } from "react-router";

export default function HeaderLink({ label, link, className }) {
  let location = useLocation();

  return (
    <li className={className}>
      <a href={link} className={location == link ? "font-bold" : ""}>
        {label}
      </a>
    </li>
  );
}
