import { initContract } from "@ts-rest/core";

import { authContract } from "./auth-contract";

const c = initContract();

export const webContract = c.router(
  {
    auth: authContract(c),
  },
  {
    pathPrefix: "/api/web",
    strictStatusCodes: true,
  },
);
