import { verifyToken } from "./jwt";
import { getTokenCookie } from "./cookies";

export const isAuthenticated = (): boolean => {
  const token = getTokenCookie();
  if (!token) return false;

  const decoded = verifyToken(token);
  return !!decoded;
};
