import { useAuth } from "@/hooks/useAuth";
import {
  addSelfAnimatorFromWorkshopRecurrence,
  getWorkshopRecurrence,
  registerJobSeekerToWorkshopRecurrence,
  removeSelfAnimatorFromWorkshopRecurrence,
  unregisterJobSeekerToWorkshopRecurrence,
} from "@/utils/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router";
import { textColor } from "@/styles/tokensTailwind";
import { DayFormatter, TimeFormatter } from "@/utils/dateFormater";
import { formatDuration, interval, intervalToDuration } from "date-fns";
import WorkshopRecurrencesPills from "@/components/planning/eventPanel/WorkshopRecurrencesPills";
import RegistrationCount from "./RegistrationCount";
import Button from "@/components/ui/Button";
import { ADVISOR, JOB_SEEKER } from "@/utils/userRole";
import Box from "@/components/ui/Box";
import WorkshopPlanning from "../../components/planning/WorkshopPlanning";
import { useState } from "react";
import LoadingFrame from "@/components/ui/LoadingFrame";
import ErrorFrame from "@/components/ui/ErrorFrame";
import useMobileToggle from "@/hooks/useMobileToggle";
import ConfirmationModal from "@/components/ui/ConfirmationModal";
import { fr } from "date-fns/locale";

export default function WorkshopPage() {
  let { id } = useParams();
  id = parseInt(id);

  const [isSending, setIsSending] = useState(false);
  const [modal, setModal] = useState(null);
  const mobileMode = useMobileToggle(900, () => calendarRef.current.width);

  const { isAuthenticated, user } = useAuth();
  const queryClient = useQueryClient();
  const { status, data, error } = useQuery({
    queryKey: ["workshop/recurrences", id],
    queryFn: () => getWorkshopRecurrence(id),
  });

  switch (status) {
    case "pending":
      return (
        <div className="col-span-full row-span-full">
          <LoadingFrame />
        </div>
      );

    case "error":
      return (
        <div className="col-span-full row-span-full">
          <ErrorFrame error={error} />
        </div>
      );

    case "success":
      const registerState =
        isAuthenticated && user.role == JOB_SEEKER
          ? data.registrations.length > 0
            ? data.registrations[0].state
            : "UNREGISTERED"
          : undefined;

      const isAnimating =
        isAuthenticated && user.role == ADVISOR
          ? data.animators.some(
              (animator) => animator.advisor.user.user_id == user.id,
            )
          : undefined;

      function handleJobSeekerSelfRegistering() {
        setIsSending(true);
        registerJobSeekerToWorkshopRecurrence(id)
          .then(() => {
            queryClient.invalidateQueries({
              queryKey: ["workshop/recurrences", id],
            });
            queryClient.invalidateQueries({
              queryKey: ["workshop/registrations", id],
            });
            queryClient.invalidateQueries({
              queryKey: ["planning", user.id],
            });
          })
          .finally(() => setIsSending(false));
      }

      function handleJobSeekerSelfUnregistering() {
        setModal(
          <ConfirmationModal
            modalKey={"unregisterConfirmation"}
            question="Êtes-vous sure de vouloir vous désinscrire ?"
            allowColor="brandPink"
            onCancel={() => setModal(null)}
            onAllow={() => {
              setIsSending(true);
              setModal(null);
              unregisterJobSeekerToWorkshopRecurrence(id)
                .then(() => {
                  queryClient.invalidateQueries({
                    queryKey: ["workshop/recurrences", id],
                  });
                  queryClient.invalidateQueries({
                    queryKey: ["workshop/registrations", id],
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

      function handleAdvisorUnsubscribe() {
        setIsSending(true);
        removeSelfAnimatorFromWorkshopRecurrence(id)
          .then(() => {
            queryClient.invalidateQueries({
              queryKey: ["workshop/recurrences", id],
            });
            queryClient.invalidateQueries({
              queryKey: ["planning", user.id],
            });
          })
          .finally(() => setIsSending(false));
      }

      function handleAdvisorSubscribe() {
        setIsSending(true);
        addSelfAnimatorFromWorkshopRecurrence(id)
          .then(() => {
            queryClient.invalidateQueries({
              queryKey: ["workshop/recurrences", id],
            });
            queryClient.invalidateQueries({
              queryKey: ["planning", user.id],
            });
          })
          .finally(() => setIsSending(false));
      }

      const startTime = new Date(data.startTime);
      const endTime = new Date(data.endTime);

      return (
        <main className="col-span-full row-span-full flex flex-col gap-8">
          <section className="relative h-[33dvh]">
            {/* Header */}
            {data.workshop.backgroundImagePath != "" && (
              <img
                className="size-full object-cover"
                src={data.workshop.backgroundImagePath}
                alt="Image d'atelier"
              />
            )}
            <div className="absolute top-0 size-full flex flex-col justify-center items-center">
              <div className="p-8 size-fit bg-white/60 rounded-2xl backdrop-blur-sm">
                <h1 className="size-fit text-3xl">{data.workshop.title}</h1>
              </div>
            </div>
          </section>
          <section className="py-4 px-12 flex flex-col md:flex-row gap-8 md:min-h-[60dvh]">
            {/* description */}
            <div className="md:w-2/3">
              <Box color="lightBg">
                <div className="p-4 flex flex-col gap-4">
                  <h2 className="text-2xl font-bold">{data.topic}</h2>
                  <p>{data.topicDescription}</p>
                </div>
              </Box>
            </div>
            <div className="md:w-1/3">
              <Box color="lightBg">
                <ul className="p-4 flex flex-col size-full justify-between gap-4">
                  <li className="flex flex-col gap-2">
                    <h3 className="font-bold">Session Sélectionnée</h3>
                    <div className="pl-4 flex flex-col">
                      <p>
                        <span className={textColor.brandBlue}>
                          {DayFormatter.format(startTime)}
                        </span>{" "}
                        à{" "}
                        <span className={textColor.brandBlue}>
                          {TimeFormatter.format(startTime)}
                        </span>
                      </p>
                      <p>
                        <b>Durée : </b>
                        {formatDuration(
                          intervalToDuration(interval(startTime, endTime)),
                          { locale: fr },
                        )}
                      </p>
                    </div>
                  </li>
                  <li className="flex flex-col gap-2">
                    <h3 className="font-bold">Animateur(s)</h3>
                    <ul className="pl-4 flex flex-col">
                      {[
                        ...data.animators.map((animator) => (
                          <li key={`a-${animator.animator_id}`}>
                            {animator.advisor.user.last_name}{" "}
                            {animator.advisor.user.first_name}
                          </li>
                        )),
                        ...data.coAnimators.map((coAnimator) => (
                          <li key={`ca-${coAnimator.co_animator_id}`}>
                            {coAnimator.external_animator.lastName}{" "}
                            {coAnimator.external_animator.firstName}
                          </li>
                        )),
                      ]}
                    </ul>
                  </li>
                  <li className="flex flex-col gap-2">
                    <h3 className="font-bold">Prochaines sessions</h3>
                    <WorkshopRecurrencesPills
                      workshopId={data.workshop_id}
                      size="md"
                    />
                  </li>
                  <li className="-mb-4 flex flex-col gap-1 items-center">
                    <RegistrationCount workshopRecurrence={data} />
                    {registerState == "UNREGISTERED" && (
                      <Button
                        text="S'inscrire"
                        color="brandBlue"
                        size="lg"
                        radiusSize="sm"
                        variant="full"
                        width="50%"
                        disabled={isSending}
                        onClick={handleJobSeekerSelfRegistering}
                      />
                    )}
                    {(registerState == "PENDING" ||
                      registerState == "REGISTERED") && (
                      <Button
                        text="Se désinscrire"
                        color="brandPink"
                        size="lg"
                        radiusSize="sm"
                        variant="full"
                        width="50%"
                        disabled={isSending}
                        onClick={handleJobSeekerSelfUnregistering}
                      />
                    )}
                    {isAnimating == false && (
                      <Button
                        text="Animer"
                        color="brandBlue"
                        size="lg"
                        radiusSize="sm"
                        variant="full"
                        width="50%"
                        onClick={handleAdvisorSubscribe}
                        disabled={isSending}
                      />
                    )}
                    {isAnimating == true && (
                      <Button
                        text="Se retirer"
                        color="brandPink"
                        size="lg"
                        radiusSize="sm"
                        variant="full"
                        width="50%"
                        onClick={handleAdvisorUnsubscribe}
                        disabled={isSending}
                      />
                    )}
                  </li>
                </ul>
              </Box>
            </div>
          </section>
          <section className="py-4 px-12">
            {/* Planning */}
            <h2 className="pl-8 text-2xl font-bold">Tout nos ateliers</h2>
            <div className={`py-8 ${mobileMode ? "" : "h-dvh"}`}>
              <Box>
                <WorkshopPlanning defaultDate={data.startTime} />
              </Box>
            </div>
          </section>
          {modal}
        </main>
      );
    default:
      throw "Unknown status : " + status;
  }
}
