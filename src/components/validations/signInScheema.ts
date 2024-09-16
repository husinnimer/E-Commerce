import { z } from "zod";

const signInScheema = z.object({
  email: z.string().min(1, { message: "email Is Required" }).email(),
  password: z.string().min(8, { message: "Password must be 8 characters" }),
});

type TFormInputs = z.infer<typeof signInScheema>;

export { signInScheema, type TFormInputs };
