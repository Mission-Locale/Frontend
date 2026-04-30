import EditableQueryTable from "@/components/table/EditableQueryTable";
import Box from "@/components/ui/Box";
import Button from "@/components/ui/Button";
import InputFileCard from "@/components/ui/Form/InputFileCard";
import InputText from "@/components/ui/Form/InputText";
import InputTextArea from "@/components/ui/Form/InputTextarea";
import {
  createExternalAnimator,
  createWorkshop,
  getAdvisors,
  getExternalAnimators,
} from "@/utils/api";
import { formatInput } from "@/utils/dateFormater";
import { parseISO } from "date-fns";
import { Image } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

function getDefaultDate() {
  const date = new Date();
  date.setSeconds(0, 0);
  return date;
}

export default function WorkshopAddPage() {
  const [isSending, setIsSending] = useState(false);
  const [errors, setErrors] = useState({});

  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [startTime, setStartTime] = useState(getDefaultDate());
  const [duration, setDuration] = useState(60);
  const [slots, setSlots] = useState(10);

  const [advisors, setAdvisors] = useState([]);
  const [externalAnimators, setExternalAnimators] = useState([]);

  const [cardImageFile, setCardImageFile] = useState(null);
  const [backgroundImageFile, setBackgroundImageFile] = useState(null);

  const [workshopDescription, setWorkshopDescription] = useState("");
  const [subjectDescription, setSubjectDescription] = useState("");

  const navigate = useNavigate();

  function handleExternalAnimatorCreate(fullName) {
    createExternalAnimator(...fullName.split(" ", 2)).then((animator) =>
      setExternalAnimators((externalAnimators) => [
        ...externalAnimators,
        animator,
      ]),
    );
  }

  function handleCreateWorkshop() {
    setIsSending(true);
    createWorkshop(
      title,
      workshopDescription,
      cardImageFile,
      backgroundImageFile,
      subject,
      subjectDescription,
      startTime,
      duration,
      slots,
    )
      .then((workshop) =>
        // TODO: redirect to edit page
        //navigate("/dashboard/admin/workshops/edit/" + workshop.workshop_id)
        navigate("/dashboard/admin/workshops/list/"),
      )
      .catch((error) => setErrors(error.error))
      .finally(() => setIsSending(false));
  }

  function handleCancel() {
    navigate(-1);
  }

  return (
    <main className="col-span-full row-span-full">
      <Box>
        <div id="content" className="flex flex-col gap-3 size-full">
          <div className="flex flex-row gap-5">
            <InputText
              label="Titre"
              placeholder="Titre de l'atelier"
              disabled={isSending}
              required={true}
              error={errors.title}
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
            <InputText
              label="Sujet"
              placeholder="Sujet de l'atelier"
              disabled={isSending}
              required={true}
              error={errors.subject}
              onChange={(e) => setSubject(e.target.value)}
              value={subject}
            />
          </div>
          <div className="flex flex-row gap-5">
            <InputText
              label="Date de début"
              type="datetime-local"
              disabled={isSending}
              required={true}
              error={errors.startTime}
              value={formatInput(startTime)}
              onChange={(e) =>
                setStartTime(parseISO(e.currentTarget.value) || startTime)
              }
            />
            <InputText
              label="Durée"
              type="number"
              placeholder="Durée de l'atelier"
              disabled={isSending}
              required={true}
              error={errors.duration}
              onChange={(e) => setDuration(e.target.value)}
              value={duration}
            />
            <InputText
              label="Places"
              type="number"
              placeholder="Nombre de places"
              disabled={isSending}
              required={true}
              error={errors.maxOccupation}
              onChange={(e) => setSlots(e.target.value)}
              value={slots}
            />
          </div>
          <div className="flex flex-row gap-5">
            <EditableQueryTable
              label="Conseiller(s)"
              lines={advisors.map(
                (advisor) =>
                  `${advisor.user.last_name} ${advisor.user.first_name}`,
              )}
              fetchKey="search/advisors"
              fetchfunction={getAdvisors}
              optionMapper={(advisor) => {
                return {
                  value: advisor,
                  label: `${advisor.user.last_name} ${advisor.user.first_name}`,
                };
              }}
              onAdd={(advisor) =>
                setAdvisors((advisors) => [...advisors, advisor])
              }
              onDelete={(advisor) =>
                setAdvisors((advisors) =>
                  advisors.filter(
                    (element) => element.advisor_id != advisor.advisor_id,
                  ),
                )
              }
            />
            <EditableQueryTable
              label="Autre(s) Animateur(s)"
              lines={externalAnimators.map(
                (animator) => `${animator.lastName} ${animator.firstName}`,
              )}
              fetchKey="search/externalAnimators"
              fetchfunction={getExternalAnimators}
              optionMapper={(animator) => {
                return {
                  value: animator,
                  label: `${animator.lastName} ${animator.firstName}`,
                };
              }}
              onCreate={handleExternalAnimatorCreate}
              onAdd={(animator) =>
                setExternalAnimators((externalAnimators) => [
                  ...externalAnimators,
                  animator,
                ])
              }
              onDelete={(animator) =>
                setExternalAnimators((externalAnimators) =>
                  externalAnimators.filter(
                    (element) =>
                      element.external_animator_id !=
                      animator.external_animator_id,
                  ),
                )
              }
            />
          </div>
          <div className="flex flex-row gap-5">
            <InputFileCard
              id="backgroundImage"
              title="Image d'arrière plan"
              subtitle="Image haute résolution pour l'entête de l'atelier"
              selectTheme="brandOrange"
              width="w-1/2"
              icon={Image}
              file={backgroundImageFile}
              onFileChange={setBackgroundImageFile}
              allowedTypes={[
                "image/jpeg",
                "image/png",
                "image/webp",
                "image/gif",
              ]}
            />
            <InputFileCard
              id="cardImage"
              title="Miniature pour la vitrine"
              subtitle="Miniature pour la liste des ateliers"
              selectTheme="brandOrange"
              width="w-1/2"
              icon={Image}
              file={cardImageFile}
              onFileChange={setCardImageFile}
              allowedTypes={[
                "image/jpeg",
                "image/png",
                "image/webp",
                "image/gif",
              ]}
            />
          </div>
          <div className="flex flex-row gap-5 size-full">
            <InputTextArea
              label="Description de l'atelier"
              placeholder="Entrez la description de l’atelier"
              disabled={isSending}
              required={true}
              error={errors.description}
              value={workshopDescription}
              onChange={(e) => setWorkshopDescription(e.target.value)}
            />
            <InputTextArea
              label="Description du sujet"
              placeholder="Entrez la description du sujet"
              disabled={isSending}
              required={true}
              error={errors.topicDescription}
              value={subjectDescription}
              onChange={(e) => setSubjectDescription(e.target.value)}
            />
          </div>
          <div className="flex flex-row gap-5">
            <Button
              text="Valider"
              color="brandBlue"
              width="100%"
              variant="full"
              size="sm"
              radiusSize="lg"
              onClick={handleCreateWorkshop}
              disabled={isSending}
            />
            <Button
              text="Annuler"
              color="brandOrange"
              width="100%"
              variant="outline"
              size="sm"
              radiusSize="lg"
              onClick={handleCancel}
              disabled={isSending}
            />
          </div>
        </div>
      </Box>
    </main>
  );
}
