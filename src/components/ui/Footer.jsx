import logo from "/assets/img/Logo_Mission_Locale.webp";

export default function Footer() {
  return (
    <footer className="w-full bg-lightBg">
      <RainbowBar />

      <div className="py-4 flex md:gap-10 lg:gap-40 items-center justify-center border-b border-gray-300">
        <div className="hidden md:flex items-center lg:ml-40 w-[150px]">
          <img className="w-full" src={logo} alt="Logo Mission Locale" />
        </div>

        <div className="flex flex-col gap-2 h-full">
          <h4 className="hidden md:block text-brandBlue font-bold">
            INFORMATIONS
          </h4>

          <ul className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8 text-md w-full">
            <li>
              <a href="#">Politique de confidentialité</a>
            </li>

            <li>
              <a href="#">Mentions légales</a>
            </li>

            <li>
              <a className="text-brandOrange font-medium" href="#">
                A propos
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <p className="text-center text-xs text-gray-500 py-3">
          © {new Date().getFullYear()} Mission Locale. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}

function RainbowBar() {
  const div = [
    "bg-brandPurple",
    "bg-brandPink",
    "bg-brandBlue",
    "bg-brandGreen",
    "bg-brandOrange",
  ];

  return (
    <div className="flex w-full">
      {div.map((bgClass, index) => (
        <div key={index} className={`w-1/5 h-1.5 ${bgClass}`}></div>
      ))}
    </div>
  );
}
