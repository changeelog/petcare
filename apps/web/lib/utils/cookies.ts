import { cookies } from "next/headers";

export const setTokenCookie = (token: string) => {
  cookies().set("auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60, // 1 час
    path: "/",
  });
};

export const getTokenCookie = (): string | null => {
  return cookies().get("auth_token")?.value || null;
};

export const deleteTokenCookie = () => {
  cookies().delete("auth_token");
};
