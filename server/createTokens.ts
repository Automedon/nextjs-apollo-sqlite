import { sign } from "jsonwebtoken";

export const createTokens = (user) => {
  const refreshToken = sign(
    JSON.parse(JSON.stringify({ email: user.email })),
    process.env.JWT_REFRESH_TOKEN_SECRET || "your JWT_REFRESH_TOKEN_SECRET",
    { expiresIn: "7d" }
  );
  const accessToken = sign(
    JSON.parse(JSON.stringify({ email: user.email })),
    process.env.JWT_ACCESS_TOKEN_SECRET || "your JWT_ACCESS_TOKEN_SECRET",
    {
      expiresIn: "15min",
    }
  );
  return { accessToken, refreshToken };
};
