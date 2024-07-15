import { webContract } from "@/shared/api";
import { SignUpBodySchema, signUpBodySchema } from "@/shared/validation/schemas/auth";
import { Button } from "@/shared-ui/components/button";
import { useForm, zodResolver } from "@/shared-ui/components/form";
import { FormInput } from "@/shared-ui/components/input";
import { toast } from "@/shared-ui/components/toaster";
import { Cross1Icon } from "@radix-ui/react-icons";
import { ClientInferRequest, ClientInferResponses } from "@ts-rest/core";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC } from "react";

import { Logo } from "../../../components/logo";

export type SignUpProps = {
  handleSignUp: (
    data: ClientInferRequest<typeof webContract.auth.signUp>["body"],
  ) => Promise<ClientInferResponses<typeof webContract.auth.signUp>>;
};
export const SignUp: FC<SignUpProps> = ({ handleSignUp }) => {
  const router = useRouter();
  const { control, handleSubmit } = useForm<SignUpBodySchema>({
    defaultValues: {
      agree: false,
      confirmPassword: "",
      email: "",
      password: "",
      username: "",
    },
    resolver: zodResolver(signUpBodySchema),
  });
  const handleFormSubmit = handleSubmit(async data => {
    const res = await handleSignUp(data);
    console.log(res);
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
          name={"username"}
          placeholder={"Username"}
        />
        <FormInput
          className={"h-10"}
          control={control}
          name={"password"}
          placeholder={"Password"}
        />
        <FormInput
          className={"h-10"}
          control={control}
          name={"confirmPassword"}
          placeholder={"Confirm Password"}
        />
      </div>

      <Button type={"submit"}>Sign Up</Button>

      <div>
        Don&#39;t have an account yet? <Link href={"/sign"}>Sign up here</Link>
      </div>
      <Link href={"#"}>Forgot password</Link>
    </form>
  );
};
