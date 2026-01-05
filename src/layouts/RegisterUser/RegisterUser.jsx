import SideBar from "@/components/registerUser/SideBar";
import ContentStep from "./ContentStep";

export default function RegisterUser() {

  return (
    <div className="max-h-screen bg-gray-50 flex">
      <SideBar />
      <ContentStep />
    </div>
  );
}
