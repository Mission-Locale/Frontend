import Box from "@/components/ui/Box";
import WorkshopPlanning from "./WorkshopPlanning";
import useMobileToggle from "@/hooks/useMobileToggle";

export default function WorkshopPlanningPage() {
  const mobileMode = useMobileToggle(900, () => calendarRef.current.width);
  return (
    <main
      className={`col-span-full row-span-full p-6 ${mobileMode ? "" : "h-screen"}`}
    >
      <div id="calendar" className="h-full">
        <Box>
          <WorkshopPlanning />
        </Box>
      </div>
    </main>
  );
}
