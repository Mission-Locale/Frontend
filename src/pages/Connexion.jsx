import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "/assets/img/Logo_Mission_Locale.webp";
import InputText from "@/components/ui/Form/InputText";
import Button from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";
import { validateLogin } from "@/utils/validations";
import { JOB_SEEKER, ADVISOR, ADMINISTRATOR } from "@/utils/userRole";
import Footer from "../components/Footer";

export default function Connexion() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    keep_connected: false,
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  async function handleLogin(e) {
    e.preventDefault();
    setErrors({});

    const validationErrors = validateLogin(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);

    try {
      const userData = await login(formData);

      // Redirection selon le rôle de l'utilisateur
      // Route à ajuster selon les besoins
      switch (userData.role) {
        case JOB_SEEKER:
          navigate("/user");
          break;
        case ADVISOR:
          navigate("/advisor");
          break;
        case ADMINISTRATOR:
          navigate("/admin");
          break;
        default:
          navigate("/");
      }
    } catch (error) {
      // Stocke l'erreur pour l'afficher dans le composant input
      const errorMessage =
        error.error.error || "Une erreur est survenue lors de la connexion";
      if (errorMessage.toLowerCase().includes("email")) {
        setErrors({ email: errorMessage });
      } else if (errorMessage.toLowerCase().includes("mot de passe")) {
        setErrors({ password: errorMessage });
      }
    } finally {
      setIsLoading(false);
    }
  }

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <>
      <div className="min-h-screen flex flex-col justify-center items-center bg-lightBg">
        <div className="p-8 rounded-lg shadow-xl bg-white w-100">
          <div className="w-32 mb-8 mx-auto">
            <img src={logo} alt="Logo Mission Locale" />
          </div>
          <h2 className="text-2xl text-center font-bold mb-12 border-b pb-6 border-gray-300">
            Connexion
          </h2>
          <form onSubmit={(e) => handleLogin(e)}>
            <InputText
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              required
              selectTheme="brandBlue"
              disabled={isLoading}
            />
            <InputText
              label="Mot de passe"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              required
              selectTheme="brandBlue"
              disabled={isLoading}
            />

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <input
                  id="keep_connected"
                  name="keep_connected"
                  type="checkbox"
                  checked={formData.keep_connected}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="h-4 w-4 text-blue-600 checked:accent-brandBlue border-gray-300 rounded cursor-pointer"
                />
                <label
                  htmlFor="keep_connected"
                  className="ml-2 block text-sm text-slate-900 cursor-pointer"
                >
                  Rester connecté
                </label>
              </div>
              
              {/* TODO: Add forgot password page */}
              <Link
                to="/forgot-password"
                className="text-sm text-slate-900 hover:underline hover:font-bold"
              >
                Mot de passe oublié ?
              </Link>
              
            </div>

            <div className="flex justify-center gap-4 mt-6">
              <Button
                type="button"
                text="Annuler"
                color="brandBlue"
                size="md"
                variant="outline"
                radiusSize="md"
                width="150px"
                onClick={handleCancel}
                disabled={isLoading}
              />
              <Button
                type="submit"
                text={isLoading ? "Connexion..." : "Se connecter"}
                color="brandBlue"
                size="md"
                variant="full"
                radiusSize="md"
                width="150px"
                disabled={isLoading}
              />
            </div>
          </form>
        </div>
        <div className="mt-6 text-center bg-white p-4 rounded-lg shadow-lg w-100">
          <span className="text-sm text-slate-900">Première connexion ? </span>
          <Link
            to="/register"
            className="text-sm text-slate-900 font-bold hover:underline"
          >
            Inscrivez-vous
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
