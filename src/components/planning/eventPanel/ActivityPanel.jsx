import { useState } from "react";
import Button from "@/components/ui/Button";
import JobSeekerRegisteringModal from "./JobSeekerRegisteringModal";
import { useAuth } from "@/hooks/useAuth";
//TODO: implement FoldBox
//TODO: implement Pill

export default function ActivityPanel({ event }) {
  const { user } = useAuth();
  const [isSending, setIsSending] = useState(false);
  const [modal, setModal] = useState(null);
  const workshopRecurrence = event.extendedProps.workshopReccurence; //TODO: get clicked iteration

  function handleUserRegistering() {
    setModal(
      <JobSeekerRegisteringModal
        onCancel={() => setModal(null)}
        onValidation={(jobSeeker) => {
          setIsSending(true);
          setModal(null);
          // TODO: Manage job seeker registering
          registerJobSeekerToWorkshopRecurrence(
            jobSeeker.job_seeker_id,
            workshopRecurrence.workshop_recurrence_id,
          );

          setIsSending(false);
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
          // TODO: Manage unsubscription request
          unregisterAnimatorFromWorkshopRecurrence(
            user.advisor_id,
            workshopRecurrence.workshop_recurrence_id,
          );
          setIsSending(false);
        }}
      />,
    );
  }

  return (
    <>
      <h2>{event.title}</h2>
      <ul>
        <li>
          <b>Début : </b>
          <span>{event.startDate}</span>
        </li>
        <li>
          <b>Durée : </b>
          <span>{event.duration}</span>
        </li>
      </ul>
      <hr />
      <ul>
        <li>
          <b>Atelier : </b>
          <span>{workshopRecurrence.workshop.name}</span>
        </li>
        <li>
          <b>Prochaines occurences</b>
          <div>
            {workshopRecurrence.workshop.recurrences.map((recurrence) => (
              <Pill
                key={recurrence.workshop_recurrence_id}
                content={recurrence.startDate}
              />
            ))}
          </div>
        </li>
        <li>
          <b>Sujet : </b>
          <span>{workshopRecurrence.subject}</span>
        </li>
        <li>
          <b>Animateurs : </b>
          <span>
            {[
              ...workshopRecurrence.advisors,
              ...workshopRecurrence.externalAnimators,
            ]}
          </span>
        </li>
        <li>
          <FoldBox header="Description du Sujet">
            <p>{workshopRecurrence.description}</p>
          </FoldBox>
        </li>
        <li>
          <FoldBox header="Inscrits">
            <ul>
              {workshopRecurrence.registeredUsers.map((user) => (
                <li key={user.id}>
                  {user.lastName} {user.firstName}
                </li>
              ))}
            </ul>
          </FoldBox>
        </li>
        <li>
          <FoldBox header="En liste d'attente">
            <ul>
              {workshopRecurrence.waitingUsers.map((user) => (
                <li key={user.id}>
                  {user.lastName} {user.firstName}
                </li>
              ))}
            </ul>
          </FoldBox>
        </li>
      </ul>
      <div className="flex flex-row">
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
    </>
  );
}
