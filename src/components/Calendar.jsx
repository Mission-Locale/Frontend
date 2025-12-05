import FullCalendar from "@fullcalendar/react";
import DayGridPlugin from "@fullcalendar/daygrid";
import TimeGridPlugin from "@fullcalendar/timegrid";
import ListPlugin from "@fullcalendar/list";
import { useEffect, useRef } from "react";

// TODO: Custom button example for calendar integration
//   {
//     text: "Programmez un rendez-vous",
//     click: function () {
//       alert("This is a test!");
//     },
//   }

export default function Calendar({
  mobileMode = false,
  events,
  noNavigation = false,
  customButton = undefined,
}) {
  const calendarRef = useRef(null);

  useEffect(() => {
    calendarRef.current
      .getApi()
      .changeView(mobileMode ? "listMonth" : "timeGridWeek");
  }, [mobileMode]);

  const startDateDisplay = new Date();
  startDateDisplay.setDate(1);
  const endDateDisplay = new Date();
  const endMonth = endDateDisplay.getMonth() + 2;
  if (endMonth > 12) {
    endDateDisplay.setUTCFullYear(
      endDateDisplay.getUTCFullYear() + 1,
      endMonth - 12,
      1
    );
  } else endDateDisplay.setMonth(endMonth, 1);

  return (
    <FullCalendar
      ref={calendarRef}
      viewClassNames="capitalize"
      plugins={[DayGridPlugin, TimeGridPlugin, ListPlugin]}
      height={mobileMode ? "auto" : "100%"}
      contentHeight={mobileMode ? "auto" : undefined}
      expandRows={true}
      locale="fr"
      initialView={mobileMode ? "listMonth" : "timeGridWeek"}
      firstDay={1}
      validRange={{
        start: startDateDisplay.toISOString().split("T")[0],
        end: endDateDisplay.toISOString().split("T")[0],
      }}
      customButton={{ customButton: customButton }}
      headerToolbar={
        noNavigation
          ? false
          : mobileMode
          ? { left: "title", center: "", right: "listMonth,timeGridDay" }
          : {
              left: "prev,next today",
              center: "title",
              right:
                (customButton ? "customButton " : "") +
                "timeGridWeek,dayGridMonth",
            }
      }
      footerToolbar={
        !noNavigation && mobileMode
          ? customButton
            ? {
                left: "prev,today,next",
                right: "customButton",
              }
            : { center: "prev,today,next" }
          : false
      }
      buttonHints={{
        today: "Aujourd'hui",
        next: "Suivant",
        prev: "Précédent",
        dayGridMonth: "Mois",
        timeGridWeek: "Semaine",
      }}
      viewHint=""
      buttonText={{
        today: "Aujourd'hui",
        month: "Mois",
        week: "Semaine",
        day: "Jour",
        list: "Liste",
      }}
      slotMinTime="08:00:00"
      slotMaxTime="20:00:00"
      nowIndicator={true}
      views={{
        dayGridMonth: {
          dayHeaderFormat: {
            weekday: "long",
          },
        },
        timeGridWeek: {
          titleFormat: { year: "numeric", month: "long", day: "numeric" },
          allDaySlot: false,
          dayHeaderFormat: {
            weekday: "long",
            day: "numeric",
            month: "numeric",
            omitCommas: true,
          },
        },
        timeGridDay: { allDaySlot: false },
      }}
      eventDisplay="block"
      displayEventEnd={true}
      eventTimeFormat={{
        hour: "numeric",
        minute: "2-digit",
      }}
      events={events}
    />
  );
}
