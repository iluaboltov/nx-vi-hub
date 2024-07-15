import { webContract } from "@/shared/api";
import { ClientInferRequest } from "@ts-rest/core";

import { api } from "../../../utils/auth";
import { loggedInProtection } from "../../../utils/auth-protection";
import { SignIn } from "./sign-in";

export default async function Index() {
  await loggedInProtection();

  const handleSignIn = async (data: ClientInferRequest<typeof webContract.auth.signIn>["body"]) => {
    "use server";

    return await api.auth.signIn({ body: data });
  };

  return <SignIn handleSignIn={handleSignIn} />;
}
