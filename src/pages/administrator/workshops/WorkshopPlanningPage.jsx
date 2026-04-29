import Box from "@/components/ui/Box";
import WorkshopPlanning from "@/components/planning/WorkshopPlanning";
import useMobileToggle from "@/hooks/useMobileToggle";
import { useNavigate } from "react-router";

export default function WorkshopPlanningPage() {
  const mobileMode = useMobileToggle(900, () => calendarRef.current.width);
  const navigate = useNavigate();
  return (
    <main
      className={`col-span-full row-span-full p-6 ${mobileMode ? "" : "h-screen"}`}
    >
      <div id="calendar" className="h-full">
        <Box>
          <WorkshopPlanning
            linkPrefix="/dashboard/admin/workshops/edit/"
            customButton={{
              text: "Créer un atelier",
              click: function () {
                navigate("/dashboard/admin/workshops/add");
              },
            }}
          />
        </Box>
      </div>
    </main>
  );
}
