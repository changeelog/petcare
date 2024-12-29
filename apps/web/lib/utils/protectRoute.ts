import { isAuthenticated } from "./authCheck";
import { redirect } from "next/navigation";

export const protectRoute = () => {
  if (!isAuthenticated()) {
    redirect("/login");
  }
};
