import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import express from "express";

import { generateAccessToken, generateRefreshToken } from "../utils/jwt";

const router = express.Router();
const prisma = new PrismaClient();

/**
 * @swagger
 * /sign-up:
 *   post:
 *     summary: Sign up user
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Access to user profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   id:
 *                     type: integer
 *                   username:
 *                     type: string
 *                   email:
 *                     type: string
 */
router.post("/sign-up", async (req, res) => {
  try {
    const { email, password, username } = req.body;

    const isUnique = await prisma.user.findFirst({
      where: {
        OR: [
          {
            email: email,
          },
          {
            username: username,
          },
        ],
      },
    });

    if (isUnique) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        username,
      },
    });
    const refreshToken = generateAccessToken(user.id);
    const accessToken = generateRefreshToken(user.id);

    await prisma.user.update({
      data: {
        refreshToken: refreshToken,
      },
      where: {
        id: user.id,
      },
    });
    return res
      .status(201)
      .json({
        data: user,
        message: "Login is successful",
        token: accessToken,
      })
      .cookie("refreshCookie", refreshToken, { httpOnly: true, secure: true });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
router.post("/sign-in", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      return res.status(404).json({ message: "User with such email was not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const payload = { id: user.id };
    const refreshToken = generateAccessToken(payload);
    const accessToken = generateAccessToken(payload);

    await prisma.user.update({
      data: {
        refreshToken: refreshToken,
      },
      where: {
        id: user.id,
      },
    });
    return res
      .status(201)
      .json({ message: "Login is successful", token: accessToken })
      .cookie("refreshCookie", refreshToken, { httpOnly: true, secure: true });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
router.put("/updatePassword", (req, res) => {
  try {
    const { email, password } = req.body;
    const user = prisma.user.update({
      data: {
        password: password,
      },
      where: { email },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/logout", (req, res) => {});

router.post("/refreshTokens", (req, res) => {
  return;
});
export default router;
