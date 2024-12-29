import jwt from "jsonwebtoken";

const secretKey = "your_secret_key"; 

export const createToken = (payload: { userId: number }): string => {
  return jwt.sign(payload, secretKey, { expiresIn: "1h" });
};

export const verifyToken = (token: string): { userId: number } | null => {
  try {
    return jwt.verify(token, secretKey) as { userId: number };
  } catch (error) {
    return null;
  }
};
