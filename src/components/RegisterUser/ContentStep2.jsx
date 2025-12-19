import InputText from "@/components/ui/form/InputText";

export default function ContentStep2({ branding , currentStep }) {
  console.log(branding);
  
  return (

        <div className="border-2 border-dashed border-gray-300 rounded-lg h-full flex flex-col items-center justify-center">
          <InputText
            label="Votre prénom"
            name="firstName"
            placeholder="Entrez votre prénom"
            ringColor={branding}
          />
        </div>

  );
}