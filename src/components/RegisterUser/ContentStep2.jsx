import {} from "react";
import { textColor, lightBg } from "@/styles/tokensTailwind";
import Button from "@/components/ui/Button";
import { Download } from "lucide-react";

export default function ContentStep2({ branding }) {

  return (
    <div className="rounded-lg h-full flex flex-col items-center gap-6 mx-auto xl:w-[60%]">
      <h3 className="text-center font-bold">Commencez par télécharger le dossier d'inscription, completez-le puis renvoyez-le depuis votre espace personnel avant votre rendez-vous.</h3>
      <DownloadRegisterFile
        id="registerFile"
        title="Télécharger votre dossier d'inscription"
        selectTheme={branding}
      />
    </div>
  );
}

function DownloadRegisterFile({
  selectTheme,
  title,
}) {
  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = '/assets/documents/dossier_inscription.pdf'
    link.download = 'dossier_inscription.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  };

  return (
    <div className="flex items-center justify-center py-4 px-3 gap-6 rounded-lg w-120 border-lightBorder bg-zinc-50 border ">
      <div className={`size-12 flex items-center justify-center rounded-md ${lightBg[selectTheme]}`}>
        <Download className={textColor[selectTheme]}/>
      </div>

      <div className="flex flex-col gap-1 w-50">
        <h4 className="font-medium text-slate-900 text-base">{title}</h4>
      </div>

      <div>
        <Button
          text={"Télécharger"}
          color={selectTheme}
          size="md"
          variant="full"
          radiusSize="md"
          onClick={handleDownload}
        />
      </div>
    </div>
  );
}
