import jwt from "jsonwebtoken";

const refreshTokenExpiresIn = process.env.REFRESH_SECRET_TOKEN_EXPIRES_IN ?? "7d";
const refreshTokenSecret = process.env.REFRESH_SECRET_TOKEN ?? "";
const accessTokenExpiresIn = process.env.ACCESS_SECRET_TOKEN_EXPIRES_IN ?? "1d";
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET ?? "secret access token";

export const generateAccessToken = (user: any) => {
  return jwt.sign(user, accessTokenSecret, { expiresIn: accessTokenExpiresIn });
};

export const generateRefreshToken = (user: any) => {
  return jwt.sign(user, refreshTokenSecret, { expiresIn: refreshTokenExpiresIn });
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, refreshTokenSecret);
};
