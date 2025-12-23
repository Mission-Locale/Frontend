import { Check, X } from 'lucide-react';

export default function PasswordRequirements({ checks }) {
  return (
    <div className="relative inline-block">
      <div className="absolute top-51 -left-2 w-4 h-4 bg-white border-l border-t border-gray-100 -rotate-45 shadow-[-2px_-2px_5px_rgba(0,0,0,0.05)]"></div>

      <div className="bg-white rounded-md shadow-xl p-8 border border-gray-100 w-75 flex flex-col gap-5">
        <h3 className="text-lg font-bold text-gray-900 mb-2">
          Votre mot de passe doit<br />contenir au minimum :
        </h3>
        
        <div className="flex flex-col gap-4">
          <Criterion check={checks.length} text="8 caractères" />
          <Criterion check={checks.uppercase} text="1 majuscule" />
          <Criterion check={checks.number} text="1 chiffre" />
          <Criterion check={checks.symbol} text="1 symbole" />
        </div>
      </div>
    </div>
  );
};

const Criterion = ({ check, text }) => (
  <div className="flex items-center gap-3">
    <div className={`flex items-center justify-center w-6 h-6 rounded-full ${check ? 'bg-green-500' : 'bg-red-500'}`}>
      {check ? (
        <Check className="w-4 h-4 text-white" strokeWidth={3} />
      ) : (
        <X className="w-4 h-4 text-white" strokeWidth={3} />
      )}
    </div>
    <span className="text-gray-800 text-lg font-medium">{text}</span>
  </div>
);