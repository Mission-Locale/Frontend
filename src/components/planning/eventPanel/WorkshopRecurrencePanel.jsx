import { useState } from "react";
import Button from "@/components/ui/Button";
import JobSeekerRegisteringModal from "./JobSeekerRegisteringModal";
import {
  getWorkshopRecurrence,
  registerJobSeekerToWorkshopRecurrence,
  removeSelfAnimatorFromWorkshopRecurrence,
  unregisterJobSeekerToWorkshopRecurrence,
} from "@/utils/api";
import FoldBox from "@/components/ui/FoldBox";
import WorkshopRecurrencesPills from "./WorkshopRecurrencesPills";
import LoadingFrame from "@/components/ui/LoadingFrame";
import ErrorFrame from "@/components/ui/ErrorFrame";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { formatEvent } from "@/utils/dateFormater";
import ConfirmationModal from "@/components/ui/ConfirmationModal";
import { useAuth } from "@/hooks/useAuth";
import { differenceInMinutes } from "date-fns";
import Pill from "@/components/ui/Pill";
import RegistrationCount from "./RegistrationCount";

export default function WorkshopRecurrencePanel({ event, onClose }) {
  const [isSending, setIsSending] = useState(false);
  const [modal, setModal] = useState(null);
  const { user } = useAuth();
  const queryClient = useQueryClient();

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

  function handleJobSeekerSelfRegistering() {
    setIsSending(true);
    registerJobSeekerToWorkshopRecurrence(workshopRecurrenceId)
      .then(() => {
        queryClient.invalidateQueries({
          queryKey: ["workshop/recurrences", workshopRecurrenceId],
        });
        queryClient.invalidateQueries({
          queryKey: ["workshop/registrations", workshopRecurrenceId],
        });
        queryClient.invalidateQueries({
          queryKey: ["planning", user.id],
        });
      })
      .finally(() => setIsSending(false));
  }

  function handleJobSeekerSelfUnregistering() {
    setIsSending(true);
    unregisterJobSeekerToWorkshopRecurrence(workshopRecurrenceId)
      .then(() => {
        queryClient.invalidateQueries({
          queryKey: ["workshop/recurrences", workshopRecurrenceId],
        });
        queryClient.invalidateQueries({
          queryKey: ["workshop/registrations", workshopRecurrenceId],
        });
        queryClient.invalidateQueries({
          queryKey: ["planning", user.id],
        });
      })
      .finally(() => setIsSending(false));
  }

  function handleJobSeekerRegistering() {
    setModal(
      <JobSeekerRegisteringModal
        onCancel={() => setModal(null)}
        onValidation={(jobSeekerId) => {
          setIsSending(true);
          setModal(null);
          registerJobSeekerToWorkshopRecurrence(
            workshopRecurrenceId,
            jobSeekerId,
          )
            .then(() => {
              queryClient.invalidateQueries({
                queryKey: ["workshop/recurrences", workshopRecurrenceId],
              });
              queryClient.invalidateQueries({
                queryKey: ["workshop/registrations", workshopRecurrenceId],
              });
            })
            .finally(() => setIsSending(false));
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
          removeSelfAnimatorFromWorkshopRecurrence(workshopRecurrenceId)
            .then(() => {
              onClose();
              queryClient.invalidateQueries({
                queryKey: ["workshop/recurrences", workshopRecurrenceId],
              });
              queryClient.invalidateQueries({
                queryKey: ["planning", user.id],
              });
            })
            .finally(() => setIsSending(false));
        }}
      />,
    );
  }

  const registeredUsers = [];
  const pendingUsers = [];
  let registerState = undefined;

  switch (user.role) {
    case "ADVISOR":
    case "ADMINISTRATOR":
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
      break;
    case "JOB_SEEKER":
      registerState =
        data.registrations.length > 0
          ? data.registrations[0].state
          : "UNREGISTERED";
      break;
    default:
      break;
  }

  console.log(registerState);

  const startDate = new Date(data.startTime);

  return (
    <div className="flex flex-col justify-between size-full">
      <div className="flex flex-col gap-4 relative">
        <h2 className="text-xl font-bold text-center -mt-2">{event.title}</h2>
        <span className="absolute -top-1 -right-1">
          {registerState == "REGISTERED" && (
            <Pill content="Inscrit" theme="brandGreen" />
          )}
          {registerState == "PENDING" && (
            <Pill content="Liste d'attente" theme="brandOrange" />
          )}
          {registerState == "UNREGISTERED" && (
            <Pill content="Non inscrit" theme="brandPurple" />
          )}
        </span>
        <ul className="flex flex-col gap-2">
          <li>
            <b>Début : </b>
            <span>{formatEvent(startDate)}</span>
          </li>
          <li>
            <b>Durée : </b>
            <span>{differenceInMinutes(data.endTime, startDate)}</span>
          </li>
        </ul>
        <hr className="border-gray-500 border -my-2" />
        <ul className="flex flex-col gap-2">
          <li>
            <b>Atelier : </b>
            <span>{data.workshop.title}</span>
          </li>
          <li>
            <b>Prochaines occurences</b>
            <WorkshopRecurrencesPills workshopId={data.workshop_id} />
          </li>
          <li>
            <b>Sujet : </b>
            <span>{data.topic}</span>
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
          {(user.role == "ADVISOR" || user.role == "ADMINISTRATOR") && (
            <>
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
            </>
          )}
          {user.role == "JOB_SEEKER" && (
            <li className="flex flex-row gap-2">
              <RegistrationCount workshopRecurrenceId={workshopRecurrenceId} />
            </li>
          )}
        </ul>
      </div>
      <div className="flex flex-row gap-2 -m-2">
        {(user.role == "ADVISOR" || user.role == "ADMINISTRATOR") && (
          <Button
            text="Inscrire un demandeur"
            color="brandBlue"
            width="100%"
            variant="full"
            size="sm"
            radiusSize="lg"
            onClick={handleJobSeekerRegistering}
            disabled={isSending}
          />
        )}
        {user.role == "ADVISOR" && (
          <Button
            text="Se retirer"
            color="brandPink"
            width="100%"
            variant="full"
            size="sm"
            radiusSize="lg"
            onClick={handleAdvisorUnsubscribe}
            disabled={isSending}
          />
        )}
        {user.role == "JOB_SEEKER" &&
          ((registerState != "UNREGISTERED" && (
            <Button
              text="Se désinscrire"
              color="brandPink"
              width="100%"
              variant="full"
              size="sm"
              radiusSize="lg"
              onClick={handleJobSeekerSelfUnregistering}
              disabled={isSending}
            />
          )) ||
            (registerState == "UNREGISTERED" && (
              <Button
                text="S'inscrire"
                color="brandBlue"
                width="100%"
                variant="full"
                size="sm"
                radiusSize="lg"
                onClick={handleJobSeekerSelfRegistering}
                disabled={isSending}
              />
            )))}
      </div>
      {modal}
    </div>
  );
}
