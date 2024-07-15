import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import passport from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";

const prisma = new PrismaClient();
const secret = process.env.ACCESS_TOKEN_SECRET || "secret";
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret,
};
const localOptions = { usernameField: "email" };

const localLogin = new LocalStrategy(localOptions, async (email, password, done) => {
  try {
    const user = prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) {
      return done(null, false);
    }
    const isPasswordValid = await bcrypt.compare(password, password);
    if (!isPasswordValid) {
      return done(null, false);
    }
    return done(null, user);
  } catch (error) {
    return done(error);
  }
});

const jwtLogin = new Strategy(jwtOptions, function (payload, done) {
  const user = prisma.user.findUnique({
    where: {
      id: payload.sub,
    },
  });
  try {
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (error) {
    return done(error, false);
  }
});

passport.use(jwtLogin);
passport.use(localLogin);
