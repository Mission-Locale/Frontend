import { useState } from "react";
import Button from "@/components/ui/Button";
import JobSeekerRegisteringModal from "./JobSeekerRegisteringModal";
import {
  getWorkshopRecurrence,
  registerJobSeekerToWorkshopRecurrence,
  removeSelfAnimatorFromWorkshopRecurrence,
} from "@/utils/api";
import FoldBox from "@/components/ui/FoldBox";
import WorkshopRecurrencesPills from "./WorkshopRecurrencesPills";
import LoadingFrame from "@/components/ui/LoadingFrame";
import ErrorFrame from "@/components/ui/ErrorFrame";
import { useQuery } from "@tanstack/react-query";
import { formatEvent } from "@/utils/dateFormater";

export default function ActivityPanel({ event }) {
  const [isSending, setIsSending] = useState(false);
  const [modal, setModal] = useState(null);

  //TODO: load recurrence details
  const workshopRecurrenceId =
    event.extendedProps.workshopReccurence.workshop_recurrence_id;
  const { status, data, error } = useQuery({
    queryKey: ["workshop/recurrences", workshopRecurrenceId],
    queryFn: () => getWorkshopRecurrence(workshopRecurrenceId),
  });

  switch (status) {
    case "pending":
      return <LoadingFrame />;
    case "error":
      return <ErrorFrame error={error} />;
  }

  function handleUserRegistering() {
    setModal(
      <JobSeekerRegisteringModal
        onCancel={() => setModal(null)}
        onValidation={(jobSeekerId) => {
          setIsSending(true);
          setModal(null);
          registerJobSeekerToWorkshopRecurrence(
            jobSeekerId,
            workshopRecurrenceId,
          ).then(() => {
            console.log("Registered to workshop");
            setIsSending(false);
          });
        }}
      />,
    );
  }

  function handleAdvisorUnsubscribe() {
    setModal(
      <ConfirmationModal
        modalKey={"unsubConfirmation"}
        question="Êtes-vous sure de vouloir vous désinscrire ?"
        allowColor="brandPink"
        onCancel={() => setModal(null)}
        onAllow={() => {
          setIsSending(true);
          setModal(null);
          removeSelfAnimatorFromWorkshopRecurrence(workshopRecurrenceId).then(
            () => {
              console.log("Unregister from workshop");
              setIsSending(false);
            },
          );
        }}
      />,
    );
  }

  const registeredUsers = [];
  const pendingUsers = [];

  data.registrations.map((registration) => {
    const user = registration.job_seeker.user;
    const component = (
      <li key={user.user_id}>
        {user.last_name} {user.first_name}
      </li>
    );
    switch (registration.state) {
      case "REGISTERED":
        registeredUsers.push(component);
        break;
      case "PENDING":
        pendingUsers.push(component);
        break;
      default:
        console.warn("Unknown registration state : " + registration.state);
        break;
    }
  });

  console.log(data);

  return (
    <div className="flex flex-col justify-between size-full">
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-bold text-center -mt-2">{event.title}</h2>
        <ul className="flex flex-col gap-2">
          <li>
            <b>Début : </b>
            <span>{formatEvent(new Date(data.startTime))}</span>
          </li>
          <li>
            <b>Durée : </b>
            <span>{data.duration}</span>
          </li>
        </ul>
        <hr className="border-gray-500 border -my-2" />
        <ul className="flex flex-col gap-2">
          <li>
            <b>Atelier : </b>
            <span>{data.workshop.name}</span>
          </li>
          <li>
            <b>Prochaines occurences</b>
            <WorkshopRecurrencesPills workshopId={data.workshop_id} />
          </li>
          <li>
            <b>Sujet : </b>
            <span>{data.subject}</span>
          </li>
          <li>
            <b>Animateurs : </b>
            <span>
              {[
                ...data.animators.map(
                  (animator) =>
                    `${animator.advisor.user.last_name} ${animator.advisor.user.first_name}`,
                ),
                ...data.coAnimators.map(
                  (coAnimator) =>
                    `${coAnimator.external_animator.lastName} ${coAnimator.external_animator.firstName}`,
                ),
              ].join(", ")}
            </span>
          </li>
          <li>
            <FoldBox header="Description du Sujet">
              <p>{data.topicDescription}</p>
            </FoldBox>
          </li>
          <li>
            <FoldBox header="Inscrits">
              <ul>{registeredUsers}</ul>
            </FoldBox>
          </li>
          <li>
            <FoldBox header="En liste d'attente">
              <ul>{pendingUsers}</ul>
            </FoldBox>
          </li>
        </ul>
      </div>
      <div className="flex flex-row gap-2 -m-2">
        <Button
          text="Inscrire un demandeur"
          color="brandBlue"
          width="100%"
          variant="full"
          size="md"
          radiusSize="rounded-lg"
          onClick={handleUserRegistering}
          disabled={isSending}
        />
        <Button
          text="Se retirer"
          color="brandPink"
          width="100%"
          variant="full"
          size="md"
          radiusSize="rounded-lg"
          onClick={handleAdvisorUnsubscribe}
          disabled={isSending}
        />
      </div>
      {modal}
    </div>
  );
}
