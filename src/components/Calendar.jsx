import FullCalendar from "@fullcalendar/react";
import DayGridPlugin from "@fullcalendar/daygrid";
import TimeGridPlugin from "@fullcalendar/timegrid";
import ListPlugin from "@fullcalendar/list";

export default function Calendar({ mobileMode = false, events }) {
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

  // update/reset current view on mobileMode change

  return (
    <FullCalendar
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
      // customButtons={{
      //   createAppointment: {
      //     text: "Programmez un rendez-vous",
      //     click: function () {
      //       alert("This is a test!");
      //     },
      //   },
      // }}
      // headerToolbar= false
      headerToolbar={
        mobileMode
          ? { left: "title", center: "", right: "listMonth,timeGridDay" }
          : {
              left: "prev,next today",
              center: "title",
              right: "timeGridWeek,dayGridMonth",
            }
      }
      footerToolbar={mobileMode ? { center: "prev,today,next" } : false}
      // footerToolbar: {
      //   left: "prev,today,next",
      //   right: "createAppointment",
      // },
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
