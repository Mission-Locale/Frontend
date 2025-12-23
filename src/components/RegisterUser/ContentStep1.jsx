import { useFormStore } from "@/stores/useFormStore";
import { useState, useMemo } from "react";
import InputText from "../ui/form/InputText";
import InputDate from "../ui/form/InputDate";
import PasswordRequirements from "../RegisterUser/PasswordRequirements";
import { validatePassword } from "@/utils/validations";

export default function ContentStep1({ branding }) {

  //TODO: Finir les validations des champs

  // modifie le FormStore et le met a jour avec les valeurs des champs
  const personalInfo = useFormStore((state) => state.personalInfo);
  const updatePersonalInfo = useFormStore((state) => state.updatePersonalInfo);

  // state pour afficher/masquer les règles de mot de passe
  const [showRules, setShowRules] = useState(false);


  const handleFieldChange = (fieldName) => (e) => {
    updatePersonalInfo({ [fieldName]: e.target.value });
  }

  const handleDateChange = (date) => {
    updatePersonalInfo({ birthDate: date });
  }

  const currentChecks = useMemo(
    () => validatePassword(personalInfo.password || ""),
    [personalInfo.password]
  )

  return (
    <div className="h-full flex flex-col min-w-[550px] mx-auto">
      <h3 className="w-full mb-2 font-bold text-slate-900">Nom complet</h3>
      <div className="flex gap-4">
        <InputText
          placeholder="Nom de famille"
          selectTheme={branding}
          name="lastName"
          value={personalInfo.lastName}
          onChange={handleFieldChange("lastName")}
        />
        <InputText
          placeholder="Prénom"
          selectTheme={branding}
          name="firstName"
          value={personalInfo.firstName}
          onChange={handleFieldChange("firstName")}
        />
      </div>
      <InputText
        label="Adresse e-mail"
        placeholder="Entrer votre adresse e-mail"
        selectTheme={branding}
        name="email"
        value={personalInfo.email}
        onChange={handleFieldChange("email")}
      />
      <div className="flex gap-4">
        <InputDate
          label="Date de naissance"
          selectTheme={branding}
          name="birthDate"
          value={personalInfo.birthDate}
          onChange={handleDateChange}
        />
        <InputText
          label="Téléphone"
          placeholder="Numéro de téléphone"
          selectTheme={branding}
          name="phone"
          value={personalInfo.phone}
          onChange={handleFieldChange("phone")}
        />
      </div>

      <div className="relative max-w-full">
        <InputText
          label="Mot de passe"
          placeholder="Entrer un mot de passe"
          selectTheme={branding}
          type="password"
          name="password"
          value={personalInfo.password}
          onChange={handleFieldChange("password")}
          onFocus={() => setShowRules(true)}
          onBlur={() => setShowRules(false)}
        />
        <div className="absolute left-full -top-40 ml-5 z-50 whitespace-nowrap">
          {showRules && <PasswordRequirements checks={currentChecks} />}
        </div>
      </div>

      <InputText
        label="Confirmer le mot de passe"
        placeholder="Confirmer le mot de passe"
        selectTheme={branding}
        type="password"
        name="confirmPassword"
        value={personalInfo.confirmPassword}
        onChange={handleFieldChange("confirmPassword")}
      />
    </div>
  );
}
