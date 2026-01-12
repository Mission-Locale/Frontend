// POUR TESTING UNIQUEMENT

import { useAuth } from "@/hooks/useAuth";
export default function User() {
  const { user } = useAuth();
  console.log(user);
  return (
    <div>User {user ? user.email : "Guest"}</div>
  )
}