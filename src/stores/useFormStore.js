import { create } from "zustand";

// Store Zustand pour gérer l'état global du formulaire
export const useFormStore = create((set, get) => ({

  // État des étapes
  currentStep: 1,
  setCurrentStep: (step) => set({ currentStep: step }),
  nextStep: () => set((state) => ({ currentStep: Math.min(4, state.currentStep + 1) })),
  prevStep: () => set((state) => ({ currentStep: Math.max(1, state.currentStep - 1) })),
  
  // Données du formulaire étape 1
  personalInfo: {}, // TODO: définir les champs initiaux
  updatePersonalInfo: (data) => set((state) => ({
    personalInfo: { ...state.personalInfo, ...data }
  })),
  
  // Données du formulaire étape 2
  additionalInfo: {}, // TODO: définir les champs initiaux
  updateAdditionalInfo: (data) => set((state) => ({
    additionalInfo: { ...state.additionalInfo, ...data }
  })),
  
  // État des documents uploadés (étape 3)
  uploadedDocs: {},
  addDocument: (docId, file) => {
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      alert('Le fichier est trop volumineux. Taille maximale : 5Mo');
      return false;
    }
    
    if (file.type !== 'application/pdf') {
      alert('Seuls les fichiers PDF sont acceptés');
      return false;
    }
    
    set((state) => ({
      uploadedDocs: {
        ...state.uploadedDocs,
        [docId]: {
          name: file.name,
          size: file.size,
          type: file.type,
          file: file,
          uploadedAt: new Date().toISOString()
        }
      }
    }));
    
    return true;
  },
  
  removeDocument: (docId) => set((state) => {
    const { [docId]: _removed, ...rest } = state.uploadedDocs;
    return { uploadedDocs: rest };
  }),
  
  // Rendez-vous (étape 4)
  appointment: {}, // TODO: définir les champs initiaux
  updateAppointment: (data) => set((state) => ({
    appointment: { ...state.appointment, ...data }
  })),
  
  // Validations
  canProceedFromStep1: () => {
    // const { personalInfo } = get();
    return true; // exemple : personalInfo.firstName && personalInfo.lastName && personalInfo.email && personalInfo.phone;
  },
  
  canProceedFromStep2: () => {
    // const { additionalInfo } = get();
    return true; // exemple : additionalInfo.address && additionalInfo.city && additionalInfo.postalCode;
  },
  
  canProceedFromStep3: () => {
    const { uploadedDocs } = get();
    return Object.keys(uploadedDocs).length > 0; // Au moins un document uploadé
  },
  
  // Reset
  resetForm: () => set({ 
    currentStep: 1, 
    personalInfo: {}, // TODO: définir les champs initiaux
    additionalInfo: {}, // TODO: définir les champs initiaux
    uploadedDocs: {},
    appointment: {} // TODO: définir les champs initiaux
  })
}));
