import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import PasswordRequirements from "@/components/RegisterUser/PasswordRequirements";
import { validatePassword, isPasswordValid, validatePasswordMatch } from "@/utils/validations";
import { resetPassword, verifyResetToken } from "@/utils/api";
import logo from "/assets/img/Logo_Mission_Locale.webp";
import InputText from "@/components/ui/Form/InputText";
import Button from "@/components/ui/Button";
import Footer from "@/components/Footer";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(true);
  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [tokenError, setTokenError] = useState(false);

  const passwordChecks = validatePassword(formData.password);

  useEffect(() => {
    async function checkToken() {
      if (!token) {
        setTokenError(true);
        setIsVerifying(false);
        return;
      }
      try {
        const result = await verifyResetToken(token);
        if (!result.valid) {
          setTokenError(true);
        }
      } catch (error) {
        console.error("Erreur lors de la vérification du token:", error);
        setTokenError(true);
      } finally {
        setIsVerifying(false);
      }
    }

    checkToken();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handlePasswordFocus = () => {
    setShowPasswordRequirements(true);
  };

  const handlePasswordBlur = () => {
    setShowPasswordRequirements(false);
  };

  const validateForm = () => {
    const validationErrors = {};

    if (!formData.password) {
      validationErrors.password = "Le mot de passe est requis";
    } else if (!isPasswordValid(formData.password)) {
      validationErrors.password = "Le mot de passe ne respecte pas les critères requis";
    }

    if (!formData.confirmPassword) {
      validationErrors.confirmPassword = "La confirmation est requise";
    } else if (!validatePasswordMatch(formData.password, formData.confirmPassword)) {
      validationErrors.confirmPassword = "Les mots de passe ne correspondent pas";
    }

    return validationErrors;
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setErrors({});

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);

    try {
      await resetPassword({
        token: token,
        password: formData.password,
        confirm_password: formData.confirmPassword,
      });

      setIsSuccess(true);
    } catch (error) {
      const errorMessage = error.error?.error || error.message;
      
      if (errorMessage.toLowerCase().includes("token") || 
          errorMessage.toLowerCase().includes("expiré") ||
          errorMessage.toLowerCase().includes("invalide")) {
        setTokenError(true);
      } else {
        setErrors({ general: errorMessage });
      }
    } finally {
      setIsLoading(false);
    }
  }

  if (isVerifying) {
    return (
      <>
        {/* TODO: Affichage du loading screen */}
      </>
    );
  }

  // Affichage erreur de token
  if (tokenError) {
    return (
      <>
        <div className="min-h-screen flex flex-col justify-center items-center bg-lightBg">
          <div className="p-8 rounded-lg shadow-xl bg-white w-100 text-center">
            <div className="w-32 mb-8 mx-auto">
              <img src={logo} alt="Logo Mission Locale" />
            </div>
            <div className="mb-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Lien invalide ou expiré</h2>
              <p className="text-gray-600 mb-6">
                Ce lien de réinitialisation n'est plus valide. Veuillez faire une nouvelle demande.
              </p>
            </div>
            <Link
              to="/login"
              className="inline-block text-brandBlue hover:underline font-medium"
            >
              Retour à la connexion
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // Affichage succès
  if (isSuccess) {
    return (
      <>
        <div className="min-h-screen flex flex-col justify-center items-center bg-lightBg">
          <div className="p-8 rounded-lg shadow-xl bg-white w-100 text-center">
            <div className="w-32 mb-8 mx-auto">
              <img src={logo} alt="Logo Mission Locale" />
            </div>
            <div className="mb-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Mot de passe modifié !</h2>
              <p className="text-gray-600 mb-6">
                Votre mot de passe a été réinitialisé avec succès. Vous pouvez maintenant vous connecter.
              </p>
            </div>
            <Button
              text="Se connecter"
              color="brandBlue"
              variant="full"
              size="md"
              radiusSize="md"
              width="100%"
              onClick={() => navigate("/login")}
            />
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // Formulaire de réinitialisation
  return (
    <>
      <div className="min-h-screen flex flex-col justify-center items-center bg-lightBg">
        <div className="p-8 rounded-lg shadow-xl bg-white w-100">
          <div className="w-32 mb-8 mx-auto">
            <img src={logo} alt="Logo Mission Locale" />
          </div>
          <h2 className="text-2xl text-center font-bold mb-4 border-b pb-6 border-gray-300">
            Réinitialiser le mot de passe
          </h2>
          <p className="text-gray-600 text-center mb-6">
            Veuillez créer votre nouveau mot de passe.
          </p>

          {errors.general && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-600 text-sm text-center">{errors.general}</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="relative">
              <InputText
                label="Nouveau mot de passe"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                onFocus={handlePasswordFocus}
                onBlur={handlePasswordBlur}
                error={errors.password}
                required
                selectTheme="brandBlue"
                disabled={isLoading}
              />
              {showPasswordRequirements && (
                <div className="absolute left-32 sm:left-70 -top-40 ml-5 z-50 whitespace-nowrap">
                  <PasswordRequirements checks={passwordChecks} />
                </div>
              )}
            </div>

            <InputText
              label="Confirmer le mot de passe"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              required
              selectTheme="brandBlue"
              disabled={isLoading}
            />

            <div className="flex flex-col gap-3 mt-6">
              <Button
                type="submit"
                text={isLoading ? "Chargement..." : "Réinitialiser le mot de passe"}
                color="brandBlue"
                variant="full"
                size="md"
                radiusSize="md"
                width="100%"
                disabled={isLoading}
              />
              <Link
                to="/login"
                className="text-center text-sm text-slate-900 hover:underline"
              >
                Retour à la connexion
              </Link>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
