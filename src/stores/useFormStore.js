import { create } from "zustand";
import { isStep1Valid } from "@/utils/validations";

// Store Zustand pour gérer l'état global du formulaire
export const useFormStore = create((set, get) => ({
  // État des étapes
  currentStep: 1,
  setCurrentStep: (step) => set({ currentStep: step }),
  nextStep: () =>
    set((state) => ({ currentStep: Math.min(5, state.currentStep + 1) })),
  prevStep: () =>
    set((state) => ({ currentStep: Math.max(1, state.currentStep - 1) })),

  // Données du formulaire étape 1
  personalInfo: {
    firstName: "",
    lastName: "",
    email: "",
    birthDate: "",
    phone: "",
    password: "",
    confirmPassword: "",
  },
  updatePersonalInfo: (data) =>
    set((state) => ({
      personalInfo: {
        ...state.personalInfo,
        ...data,
        ...(data.firstName !== undefined && {
          firstName: data.firstName.toLowerCase(),
        }),
        ...(data.lastName !== undefined && {
          lastName: data.lastName.toLowerCase(),
        }),
      },
    })),

  // État des documents uploadés (étape 3)
  uploadedDocs: {
    idCard: null,
    passeport: null,
    transport: null,
    domicile: null,
    other: {},
  },
  addDocument: (docId, file) => {
    set((state) => ({
      uploadedDocs: {
        ...state.uploadedDocs,
        [docId]: {
          name: file.name,
          size: file.size,
          type: file.type,
          file: file,
          uploadedAt: new Date().toISOString(),
        },
      },
    }));

    return true;
  },
  addOtherDocument: (docId, file) => {
    set((state) => ({
      uploadedDocs: {
        ...state.uploadedDocs,
        other: {
          ...state.uploadedDocs.other,
          [docId]: {
            name: file.name,
            size: file.size,
            type: file.type,
            file: file,
            uploadedAt: new Date().toISOString(),
          },
        },
      },
    }));

    return true;
  },

  removeDocument: (docId) =>
    set((state) => {
      const docs = { ...state.uploadedDocs, [docId]: null };
      return { ...state, uploadedDocs: docs };
    }),
  removeOtherDocument: (docId) =>
    set((state) => {
      const { [docId]: _removed, ...rest } = state.uploadedDocs.other;
      return { ...state, uploadedDocs: { ...state.uploadedDocs, other: rest } };
    }),

  // Rendez-vous (étape 4)
  appointment: {}, // TODO: définir les champs initiaux
  updateAppointment: (data) =>
    set((state) => ({
      appointment: { ...state.appointment, ...data },
    })),

  // Validations
  canProceedFromStep1: () => {
    const { personalInfo } = get();
    return isStep1Valid(personalInfo);
  },

  // Reset
  resetForm: () =>
    set({
      currentStep: 1,
      personalInfo: {
        firstName: "",
        lastName: "",
        email: "",
        birthDate: "",
        phone: "",
        password: "",
        confirmPassword: "",
      },
      uploadedDocs: {},
      appointment: {}, // TODO: définir les champs initiaux
    }),
}));
