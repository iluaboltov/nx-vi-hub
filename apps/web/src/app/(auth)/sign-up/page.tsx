import { loggedInProtection } from "../../../utils/auth-protection";

export default async function Index() {
  await loggedInProtection();

  return;
}
