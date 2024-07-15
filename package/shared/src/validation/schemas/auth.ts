import { z } from "zod";

export type SignInBodySchema = z.infer<typeof signInBodySchema>;
export const signInBodySchema = z.object({
  email: z.string().min(1, "Email is required").email(),
  password: z.string().min(1, "Password is required"),
  rememberPassword: z.boolean().optional(),
});
export type SignUpBodySchema = z.infer<typeof signUpBodySchema>;
export const signUpBodySchema = z
  .object({
    agree: z.boolean({ required_error: "Your agreement is required" }),
    confirmPassword: z.string().min(1, "Confirm password"),
    email: z.string().min(1, "Email is required").email(),
    password: z.string().min(6, "Password is required").max(18, "Password is too big"),
    username: z.string().min(4, "Username is required"),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords should match",
        path: ["confirmPassword"],
      });
    }
  });
