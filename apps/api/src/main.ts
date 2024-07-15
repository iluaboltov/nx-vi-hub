import { webContract } from "@/shared/api";
import { generateOpenApi } from "@ts-rest/open-api";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import passport from "passport";
import * as path from "path";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import auth from "./routes/auth";
import logger from "./utils/logger";

const app = express();

const port = process.env.PORT || 3333;
const globalPrefix = "api";
  
app.use("/assets", express.static(path.join(__dirname, "assets")));

app.use(cors({ origin: "http://localhost:3000" }));
app.use(passport.initialize());
app.use(express.json());
app.use(cookieParser());

const webDocument = generateOpenApi(webContract, {
  apis: ["./routes/*.js"], // Path to the API routes
  definition: {
    components: {
      securitySchemes: {
        cookieAuth: {
          in: "cookie",
          name: "accessToken",
          type: "apiKey",
        },
      },
    },
    openapi: "3.0.0",
  },
  info: {
    title: "API",
    version: "1.0.0",
  },
});
const swaggerDocs = swaggerJsdoc(webDocument);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use("/auth", auth);

app.listen(port, () =>
  logger.info(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`),
);
