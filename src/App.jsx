import Calendar from "./components/Calendar";

function App() {
  return (
    <>
      <main className="flex flex-col justify-center p-10 h-screen">
        <div className="border-2 border-lightBorder rounded-4xl shadow-md size-full p-10">
          <Calendar
            events={[
              {
                title: "Présentation des métiers de l'artisan",
                start: "2025-12-02T09:00:00",
                end: "2025-12-02T12:00:00",
                allDay: false,
                backgroundColor: "#AE0066",
                borderColor: "#AE0066",
              },
              {
                title: "Dévelopement Web - Javascript",
                start: "2025-12-04T14:00:00",
                end: "2025-12-04T16:00:00",
                allDay: false,
                backgroundColor: "#AE0066",
                borderColor: "#AE0066",
              },
              {
                title: "Rendez-vous",
                start: "2025-12-05T10:00:00",
                end: "2025-12-05T11:00:00",
                allDay: false,
                backgroundColor: "#FE9107",
                borderColor: "#FE9107",
              },
            ]}
          />
        </div>
      </main>
    </>
  );
}

export default App;
