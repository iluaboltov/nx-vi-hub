import { webContract } from "@/shared/api";
import { SignInBodySchema, signInBodySchema } from "@/shared/validation/schemas/auth";
import { Button } from "@/shared-ui/components/button";
import { FormCheckbox } from "@/shared-ui/components/checkbox";
import { useForm, zodResolver } from "@/shared-ui/components/form";
import { FormInput } from "@/shared-ui/components/input";
import { toast } from "@/shared-ui/components/toaster";
import { Cross1Icon } from "@radix-ui/react-icons";
import { ClientInferRequest, ClientInferResponses } from "@ts-rest/core";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC } from "react";

import { Logo } from "../../../components/logo";

export type SignInProps = {
  handleSignIn: (
    props: ClientInferRequest<typeof webContract.auth.signIn>["body"],
  ) => Promise<ClientInferResponses<typeof webContract.auth.signIn>>;
};
export const SignIn: FC<SignInProps> = ({ handleSignIn }) => {
  const router = useRouter();
  const { control, handleSubmit } = useForm<SignInBodySchema>({
    defaultValues: {
      email: "",
      password: "",
      rememberPassword: false,
    },
    resolver: zodResolver(signInBodySchema),
  });
  const handleFormSubmit = handleSubmit(async data => {
    const res = await handleSignIn(data);

    if (res.status === 200) {
      router.push("/");
    } else {
      toast({
        description: res.body.message,
        title: "Error!",
      });
    }
  });
  return (
    <form
      className={"relative flex w-[28vw] flex-col items-center gap-2 bg-zinc-900/85 px-6 pb-4 pt-8"}
      onSubmit={handleFormSubmit}
    >
      <div className={"absolute right-2 top-2"}>
        <Cross1Icon />
      </div>
      <Logo />
      <div>
        Better video experience beyond this{" "}
        <span className={"rounded-sm bg-lime-600 p-0.5"}>point</span>
      </div>

      <div className={"w-full pt-8"}>
        <FormInput className={"h-10"} control={control} name={"email"} placeholder={"Email"} />
        <FormInput
          className={"h-10"}
          control={control}
          name={"password"}
          placeholder={"Password"}
        />
      </div>

      <FormCheckbox control={control} label={"Remember this computer"} name={"rememberPassword"} />

      <Button type={"submit"}>Sign In</Button>

      <div>
        Don&#39;t have an account yet? <Link href={"/sign"}>Sign up here</Link>
      </div>
      <Link href={"#"}>Forgot password</Link>
    </form>
  );
};
