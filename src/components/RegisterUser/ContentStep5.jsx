import { Calendar, Check, Users } from "lucide-react";

export default function ContentStep5() {
  return (
    <div className="mt-20 flex flex-col items-center justify-center">
      <div className="bg-amber-50 rounded-full p-4 border-20 border-yellow-700 mb-6">
        <Check size={48} className="text-yellow-700" />
      </div>
      <h3 className="text-white text-4xl text-center font-bold">
        Félicitations votre inscription <br />
        est désormais terminée.
      </h3>
      <div className="flex flex-col bg-gray-50 rounded-lg px-6 py-4 mt-8 w-150">
        <h4 className="font-semibold text-lg">Votre rendez-vous</h4>
        <div className="flex mt-4 gap-2 justify-between">
            <span className="flex items-center font-medium text-base text-gray-500 gap-2">
                <Calendar />
                Date & Heure
            </span>
            <p>Le 25 juin 2026 à 10h00</p>
        </div>
        <div className="flex mt-4 gap-2 justify-between">
            <span className="flex items-center font-medium text-base text-gray-500 gap-2">
                <Users />
                Conseiller
            </span>
            <p>Jean Dupont</p>
        </div>
      </div>
        <a href="/login" className="mt-10 w-1/2 bg-gray-50 text-center py-3 rounded-md font-semibold text-black hover:bg-yellow-600 hover:text-white transition-colors">
          Aller dans votre espace personnel
        </a>
    </div>
  );
}
