import { Outlet } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="mx-10 my-6 full-screen-minus-header grid grid-cols-6 grid-rows-2 gap-2">
        <Outlet />
    </div>
  );
}
