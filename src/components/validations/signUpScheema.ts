import { z } from "zod";

const signUpScheema = z
  .object({
    firstName: z.string().min(1, { message: "FirstName Is Required" }),
    lastName: z.string().min(1, { message: "lastName Is Required" }),
    email: z.string().min(1, { message: "email Is Required" }).email(),
    password: z.string().min(8, { message: "Password must be 8 characters" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be 8 characters" }),
  })
  .refine((input) => input.password === input.confirmPassword, {
    message: "Password and Confirm does not match",
    path: ["confirmPassword"],
  });

type TFormInputs = z.infer<typeof signUpScheema>;

export { signUpScheema, type TFormInputs };
