import { toTypedSchema } from "@vee-validate/zod";
import { object, string } from "zod";

const validationSchema = toTypedSchema(
  object({
    username: string().min(6, "Required"),
    password: string().min(8, "Required"),
  }),
);

export default validationSchema