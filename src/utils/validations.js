// Valide que le champ contient uniquement des lettres, espaces, tirets et apostrophes
export function validateTextOnly(value) {
  if (!value || value.trim() === "") return false;
  // Accepte les lettres (avec accents), espaces, tirets et apostrophes
  return /^[a-zA-ZÀ-ÿ\s'-]+$/.test(value);
}

// Valide qu'un champ n'est pas vide
export function validateRequired(value) {
  return value && value.toString().trim() !== "";
}

// Valide le format email
export function validateEmail(email) {
  if (!email) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Valide le numéro de téléphone (10 chiffres)
export function validatePhone(phone) {
  if (!phone) return false;
  // Supprime tous les espaces, tirets, points
  const cleanPhone = phone.replace(/[\s.-]/g, "");
  return /^[0-9]{10}$/.test(cleanPhone);
}

// Valide les critères du mot de passe
export function validatePassword(password) {
  return {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    symbol: /[!@#$%^&*(),.?":{}|<>+]/.test(password),
  };
}

// Valide que les mots de passe correspondent
export function validatePasswordMatch(password, confirmPassword) {
  return password && confirmPassword && password === confirmPassword;
}

// Valide que le mot de passe respecte tous les critères
export function isPasswordValid(password) {
  const checks = validatePassword(password);
  return checks.length && checks.uppercase && checks.number && checks.symbol;
}

// Valide tous les champs de l'étape 1 et retourne les erreurs
export function validateStep1(personalInfo) {
  const errors = {};

  // nom et prenom
  if (!validateRequired(personalInfo.lastName)) {
    errors.lastName = "Le nom est requis";
  } else if (!validateTextOnly(personalInfo.lastName)) {
    errors.lastName = "Cela ne doit contenir que des lettres";
  }

  if (!validateRequired(personalInfo.firstName)) {
    errors.firstName = "Le prénom est requis";
  } else if (!validateTextOnly(personalInfo.firstName)) {
    errors.firstName = "Cela ne doit contenir que des lettres";
  }

  // email
  if (!validateRequired(personalInfo.email)) {
    errors.email = "L'email est requis";
  } else if (!validateEmail(personalInfo.email)) {
    errors.email = "Format d'email invalide";
  }

  // date de naissance
  if (!validateRequired(personalInfo.birthDate)) {
    errors.birthDate = "La date de naissance est requise";
  }

  // téléphone
  if (!validateRequired(personalInfo.phone)) {
    errors.phone = "Le téléphone est requis";
  } else if (!validatePhone(personalInfo.phone)) {
    errors.phone = "Le numéro doit contenir 10 chiffres";
  }

  // mot de passe
  if (!validateRequired(personalInfo.password)) {
    errors.password = "Le mot de passe est requis";
  } else if (!isPasswordValid(personalInfo.password)) {
    errors.password = "Le mot de passe ne respecte pas les critères requis";
  }

  // confirmation du mot de passe
  if (!validateRequired(personalInfo.confirmPassword)) {
    errors.confirmPassword = "La confirmation est requise";
  } else if (
    !validatePasswordMatch(personalInfo.password, personalInfo.confirmPassword)
  ) {
    errors.confirmPassword = "Les mots de passe ne correspondent pas";
  }

  return errors;
}

// Vérifie si l'étape 1 est entièrement valide
export function isStep1Valid(personalInfo) {
  return (
    validateRequired(personalInfo.lastName) &&
    validateTextOnly(personalInfo.lastName) &&
    validateRequired(personalInfo.firstName) &&
    validateTextOnly(personalInfo.firstName) &&
    validateRequired(personalInfo.email) &&
    validateEmail(personalInfo.email) &&
    validateRequired(personalInfo.birthDate) &&
    validateRequired(personalInfo.phone) &&
    validatePhone(personalInfo.phone) &&
    validateRequired(personalInfo.password) &&
    isPasswordValid(personalInfo.password) &&
    validateRequired(personalInfo.confirmPassword) &&
    validatePasswordMatch(personalInfo.password, personalInfo.confirmPassword)
  );
}

// Valide les champs de connexion
export function validateLogin(loginData) {
  const errors = {};

  // email
  if (!validateRequired(loginData.email)) {
    errors.email = "L'email est requis";
  } else if (!validateEmail(loginData.email)) {
    errors.email = "Format d'email invalide";
  }

  // mot de passe
  if (!validateRequired(loginData.password)) {
    errors.password = "Le mot de passe est requis";
  }

  return errors;
}

// Valide tous les champs de la modal d'ajout/édition d'un conseiller
export function validateModalAdvisor(personalInfo) {
  const errors = {};

  // nom et prenom
  if (!validateRequired(personalInfo.last_name)) {
    errors.last_name = "Le nom est requis";
  } else if (!validateTextOnly(personalInfo.last_name)) {
    errors.last_name = "Cela ne doit contenir que des lettres";
  }

  if (!validateRequired(personalInfo.first_name)) {
    errors.first_name = "Le prénom est requis";
  } else if (!validateTextOnly(personalInfo.first_name)) {
    errors.first_name = "Cela ne doit contenir que des lettres";
  }

  // email
  if (!validateRequired(personalInfo.email)) {
    errors.email = "L'email est requis";
  } else if (!validateEmail(personalInfo.email)) {
    errors.email = "Format d'email invalide";
  }

  // date de naissance
  if (!validateRequired(personalInfo.birth_date)) {
    errors.birth_date = "La date de naissance est requise";
  }

  // téléphone
  if (!validateRequired(personalInfo.phone)) {
    errors.phone = "Le téléphone est requis";
  } else if (!validatePhone(personalInfo.phone)) {
    errors.phone = "Le numéro doit contenir 10 chiffres";
  }
  return errors;
}
